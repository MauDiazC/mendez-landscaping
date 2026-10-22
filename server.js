// =============================================
// MAIN SERVER - EXPRESS & CMS (Turso Cloud + Local SQLite)
// D&G Mendez Landscaping LLC
// =============================================

const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./lib/db');
const { COOKIE_NAME, signToken, requireAuth, authenticateUser } = require('./lib/auth');
const upload = require('./lib/upload');
const templates = require('./lib/templates');

const app = express();
const PORT = process.env.PORT || 3000;

// Dynamic Server-Side Settings Injection for HTML pages
function renderHtmlWithSettings(filePath, settings) {
  let html = fs.readFileSync(filePath, 'utf8');
  const s = settings || {};

  const phone = s.phone || '(502) 677-9020';
  const phoneRaw = s.phone_raw || phone.replace(/[^0-9]/g, '');

  // 1. Inject synchronous bootstrap script in <head>
  const bootstrapScript = `<script id="site-settings-bootstrap">window.siteSettings = ${JSON.stringify(s)};</script>`;
  html = html.replace('</head>', `  ${bootstrapScript}\n</head>`);

  // 2. Replace hardcoded phone links and text
  html = html.replace(/href="tel:502\d{7}"/g, `href="tel:${phoneRaw}"`);
  html = html.replace(/\(502\)\s*\d{3}-\d{4}/g, phone);

  // 3. Replace hero section if present
  if (s.hero_badge_en) {
    html = html.replace(/(<span data-i18n="index\.badge_about">)[^<]*(<\/span>)/, `$1${s.hero_badge_en}$2`);
  }
  if (s.hero_title_en) {
    html = html.replace(/(<h1[^>]*data-i18n="index\.hero_title"[^>]*>)[\s\S]*?(<\/h1>)/, `$1\n          ${s.hero_title_en}\n$2`);
  }
  if (s.hero_desc_en) {
    html = html.replace(/(<p[^>]*data-i18n="index\.hero_desc"[^>]*>)[\s\S]*?(<\/p>)/, `$1\n          ${s.hero_desc_en}\n$2`);
  }
  if (s.hero_card_badge_en) {
    html = html.replace(/(<span[^>]*data-i18n="index\.hero_card_badge"[^>]*>)[^<]*(<\/span>)/, `$1${s.hero_card_badge_en}$2`);
  }
  if (s.hero_card_title_en) {
    html = html.replace(/(<h3[^>]*data-i18n="index\.hero_card_title"[^>]*>)[^<]*(<\/h3>)/, `$1${s.hero_card_title_en}$2`);
  }
  if (s.hero_image) {
    html = html.replace(/id="hero-panoramic-image"[^>]*style="background-image:\s*url\('[^']*'\)"/, `id="hero-panoramic-image" class="w-full h-[380px] md:h-[500px] bg-cover bg-center" style="background-image: url('${s.hero_image}')"`);
  }

  return html;
}

// Body & Cookie Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// =============================================
// PUBLIC ROUTES
// =============================================

// 1. Home Page (SSR Injected with Live Settings)
app.get('/', async (req, res) => {
  const settings = await db.getSettings();
  const html = renderHtmlWithSettings(path.join(__dirname, 'index.html'), settings);
  res.send(html);
});

// 2. Service Areas Page (SSR Injected with Live Settings)
app.get('/pages/service-areas.html', async (req, res) => {
  const settings = await db.getSettings();
  const html = renderHtmlWithSettings(path.join(__dirname, 'pages', 'service-areas.html'), settings);
  res.send(html);
});

// Static Assets
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/components', express.static(path.join(__dirname, 'components')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// 3. Blog & Project Showcase List
app.get('/blog', async (req, res) => {
  const { category, q } = req.query;
  const posts = await db.getPublishedPosts({ category, search: q });
  const categories = await db.getCategories();
  const settings = await db.getSettings();

  const html = templates.renderBlogList({
    posts,
    categories,
    selectedCategory: category || 'All',
    search: q || '',
    settings
  });
  res.send(html);
});

// 4. Single Blog Post & Case Study
app.get('/blog/:slug', async (req, res) => {
  const { slug } = req.params;
  const post = await db.getPostBySlug(slug);

  if (!post || (!post.published && !req.cookies[COOKIE_NAME])) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Article Not Found | D&G Mendez Landscaping</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-[#f1fcf2] min-h-screen flex items-center justify-center p-4 text-center font-sans">
        <div>
          <h1 class="text-6xl font-bold text-[#002714]">404</h1>
          <h2 class="text-2xl font-bold text-[#002714] mt-2">Case Study Not Found</h2>
          <p class="text-gray-600 mt-2">The article you are looking for has been moved or does not exist.</p>
          <a href="/blog" class="inline-block mt-6 px-6 py-2.5 rounded-full bg-[#1a6c36] text-white font-bold text-sm">
            ← Browse All Projects
          </a>
        </div>
      </body>
      </html>
    `);
  }

  const recentPosts = await db.getRecentPosts(4);
  const settings = await db.getSettings();
  const html = templates.renderBlogPost({ post, recentPosts, settings });
  res.send(html);
});

// 5. API: Submit Free Estimate Lead
app.post('/api/leads', async (req, res) => {
  const { name, email, phone, service, zip_code, message } = req.body;

  if (!name || (!phone && !email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a name and at least a phone number or email address.'
    });
  }

  try {
    await db.createLead({
      name,
      email: email || null,
      phone: phone || null,
      service: service || 'General Estimate',
      zip_code: zip_code || null,
      message: message || null
    });

    return res.json({
      success: true,
      message: 'Thank you! Your estimate request has been received. Our team will contact you within 24-48 hours.'
    });
  } catch (err) {
    console.error('[LEAD SUBMISSION ERROR]', err);
    const settings = await db.getSettings();
    return res.status(500).json({
      success: false,
      error: `Unable to save your request. Please call us directly at ${settings.phone || '(502) 677-9020'}.`
    });
  }
});

// 6. API: Get Latest Posts (JSON for dynamic widgets)
app.get('/api/posts', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 3, 10);
  const posts = await db.getRecentPosts(limit);
  res.json({ success: true, posts });
});

// 7. API: Get Public Site Settings (JSON for frontend sync)
app.get('/api/settings', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  const settings = await db.getSettings();
  res.json({ success: true, settings });
});

// =============================================
// ADMIN AUTHENTICATION
// =============================================

// Admin Login Page
app.get('/admin/login', (req, res) => {
  if (req.cookies[COOKIE_NAME]) {
    return res.redirect('/admin');
  }
  const error = req.query.error ? decodeURIComponent(req.query.error) : null;
  res.send(templates.renderAdminLogin({ error }));
});

// Admin Login Handler
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await authenticateUser(username, password);

  if (!user) {
    return res.redirect('/admin/login?error=' + encodeURIComponent('Invalid username or password.'));
  }

  const token = signToken(user.id, user.username);
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'lax'
  });

  res.redirect('/admin');
});

// Admin Logout
app.get('/admin/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.redirect('/admin/login');
});

// =============================================
// ADMIN DASHBOARD & MANAGEMENT (Protected)
// =============================================

// Dashboard Overview
app.get('/admin', requireAuth, async (req, res) => {
  const stats = await db.getStats();
  const recentLeads = await db.getRecentLeads(5);
  const recentPosts = await db.getRecentPosts(5);

  const content = templates.renderAdminDashboard({
    stats,
    recentLeads,
    recentPosts
  });

  const html = templates.renderAdminLayout({
    title: 'Dashboard',
    activeTab: 'dashboard',
    user: req.user,
    content
  });

  res.send(html);
});

// Posts List
app.get('/admin/posts', requireAuth, async (req, res) => {
  const posts = await db.getAllPosts();
  const flash = req.query.msg ? decodeURIComponent(req.query.msg) : null;

  const content = templates.renderAdminPosts({ posts });
  const html = templates.renderAdminLayout({
    title: 'Projects & Blog',
    activeTab: 'posts',
    user: req.user,
    content,
    flashMessage: flash
  });

  res.send(html);
});

// Create Post Form
app.get('/admin/posts/new', requireAuth, (req, res) => {
  const content = templates.renderAdminPostForm({ isEdit: false });
  const html = templates.renderAdminLayout({
    title: 'New Project Post',
    activeTab: 'posts',
    user: req.user,
    content
  });
  res.send(html);
});

// Helper to extract and consolidate multiple images
function extractImagesFromRequest(req) {
  const imageList = [];

  // 1. Existing retained images (from edit mode)
  if (req.body.existing_images) {
    const existing = Array.isArray(req.body.existing_images)
      ? req.body.existing_images
      : [req.body.existing_images];
    for (const img of existing) {
      if (img && typeof img === 'string' && img.trim()) {
        const trimmed = img.trim();
        if (!imageList.includes(trimmed)) {
          imageList.push(trimmed);
        }
      }
    }
  }

  // 2. Newly uploaded files from multiple 'images' input
  if (req.files && req.files.images) {
    for (const f of req.files.images) {
      imageList.push(`/uploads/${f.filename}`);
    }
  }

  // 3. Newly uploaded file from single 'image' input (legacy compatibility)
  if (req.files && req.files.image && req.files.image[0]) {
    imageList.push(`/uploads/${req.files.image[0].filename}`);
  }

  // 4. Primary cover_image_url field if provided
  if (req.body.cover_image_url && req.body.cover_image_url.trim()) {
    const url = req.body.cover_image_url.trim();
    if (!imageList.includes(url)) {
      imageList.push(url);
    }
  }

  // 5. Additional external image URLs (one per line or comma-separated)
  if (req.body.extra_image_urls && req.body.extra_image_urls.trim()) {
    const urls = req.body.extra_image_urls
      .split(/[\r\n,]+/)
      .map(u => u.trim())
      .filter(u => u.startsWith('http'));
    for (const u of urls) {
      if (!imageList.includes(u)) {
        imageList.push(u);
      }
    }
  }

  // Determine cover image: specific selection or first in list
  let coverImage = null;
  if (req.body.selected_cover && imageList.includes(req.body.selected_cover.trim())) {
    coverImage = req.body.selected_cover.trim();
  } else if (imageList.length > 0) {
    coverImage = imageList[0];
  }

  return {
    imageList,
    imagesJson: JSON.stringify(imageList),
    coverImage
  };
}

// Create Post Action (Supports multiple images)
app.post('/admin/posts/new', requireAuth, upload.fields([{ name: 'images', maxCount: 30 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  const { title, slug, category, location, summary, content, published } = req.body;
  const { imageList, imagesJson, coverImage } = extractImagesFromRequest(req);

  // Clean slug
  const cleanSlug = (slug || title || 'post')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  try {
    await db.createPost({
      title,
      slug: cleanSlug,
      category: category || 'Projects',
      location: location || 'Louisville, KY',
      summary: summary || null,
      content,
      cover_image: coverImage,
      images: imagesJson,
      published: published ? 1 : 0
    });

    res.redirect('/admin/posts?msg=' + encodeURIComponent('Project post created successfully with ' + imageList.length + ' image(s)!'));
  } catch (err) {
    console.error('[POST INSERT ERROR]', err);
    const formContent = templates.renderAdminPostForm({
      post: { ...req.body, images: imagesJson, cover_image: coverImage },
      isEdit: false,
      error: 'A post with this URL slug already exists. Please choose a different title or slug.'
    });
    const html = templates.renderAdminLayout({
      title: 'New Project Post',
      activeTab: 'posts',
      user: req.user,
      content: formContent
    });
    res.send(html);
  }
});

// Edit Post Form
app.get('/admin/posts/edit/:id', requireAuth, async (req, res) => {
  const post = await db.getPostById(req.params.id);
  if (!post) {
    return res.redirect('/admin/posts?msg=' + encodeURIComponent('Post not found.'));
  }

  const content = templates.renderAdminPostForm({ post, isEdit: true });
  const html = templates.renderAdminLayout({
    title: `Edit: ${post.title}`,
    activeTab: 'posts',
    user: req.user,
    content
  });
  res.send(html);
});

// Edit Post Action (Supports multiple images)
app.post('/admin/posts/edit/:id', requireAuth, upload.fields([{ name: 'images', maxCount: 30 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  const { id } = req.params;
  const { title, slug, category, location, summary, content, published } = req.body;

  const existing = await db.getPostById(id);
  if (!existing) {
    return res.redirect('/admin/posts?msg=' + encodeURIComponent('Post not found.'));
  }

  const { imageList, imagesJson, coverImage } = extractImagesFromRequest(req);

  const cleanSlug = (slug || title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  try {
    await db.updatePost(id, {
      title,
      slug: cleanSlug,
      category: category || 'Projects',
      location: location || 'Louisville, KY',
      summary: summary || null,
      content,
      cover_image: coverImage,
      images: imagesJson,
      published: published ? 1 : 0
    });

    res.redirect('/admin/posts?msg=' + encodeURIComponent('Post updated successfully with ' + imageList.length + ' image(s)!'));
  } catch (err) {
    console.error('[POST UPDATE ERROR]', err);
    const formContent = templates.renderAdminPostForm({
      post: { ...req.body, id, cover_image: coverImage, images: imagesJson },
      isEdit: true,
      error: 'Unable to update post. Make sure the URL slug is unique.'
    });
    const html = templates.renderAdminLayout({
      title: 'Edit Post',
      activeTab: 'posts',
      user: req.user,
      content: formContent
    });
    res.send(html);
  }
});

// Delete Post Action
app.post('/admin/posts/delete/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  await db.deletePost(id);
  res.redirect('/admin/posts?msg=' + encodeURIComponent('Post deleted.'));
});

// Leads Management
app.get('/admin/leads', requireAuth, async (req, res) => {
  const leads = await db.getAllLeads();
  const content = templates.renderAdminLeads({ leads });
  const html = templates.renderAdminLayout({
    title: 'Customer Leads',
    activeTab: 'leads',
    user: req.user,
    content
  });
  res.send(html);
});

// Update Lead Status
app.post('/admin/leads/:id/status', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await db.updateLeadStatus(id, status);
  res.redirect('/admin/leads');
});

// =============================================
// SITE SETTINGS MANAGEMENT (Hero & Phone Numbers)
// =============================================

// Settings Page View
app.get('/admin/settings', requireAuth, async (req, res) => {
  const settings = await db.getSettings();
  const flash = req.query.msg ? decodeURIComponent(req.query.msg) : null;
  const content = templates.renderAdminSettings({ settings });
  const html = templates.renderAdminLayout({
    title: 'Hero & Phone Settings',
    activeTab: 'settings',
    user: req.user,
    content,
    flashMessage: flash
  });
  res.send(html);
});

// Update Settings Handler
app.post('/admin/settings', requireAuth, upload.single('hero_image_file'), async (req, res) => {
  try {
    const current = await db.getSettings();
    const {
      phone,
      phone_raw,
      hero_badge_en,
      hero_badge_es,
      hero_title_en,
      hero_title_es,
      hero_desc_en,
      hero_desc_es,
      hero_card_badge_en,
      hero_card_badge_es,
      hero_card_title_en,
      hero_card_title_es,
      hero_image_url
    } = req.body;

    let heroImage = current.hero_image;
    if (req.file) {
      heroImage = `/uploads/${req.file.filename}`;
    } else if (hero_image_url && hero_image_url.trim()) {
      heroImage = hero_image_url.trim();
    }

    const cleanPhoneRaw = phone_raw && phone_raw.trim()
      ? phone_raw.replace(/[^0-9]/g, '')
      : (phone ? phone.replace(/[^0-9]/g, '') : '5026779020');

    await db.updateSettings({
      phone: phone ? phone.trim() : current.phone,
      phone_raw: cleanPhoneRaw,
      hero_badge_en: hero_badge_en !== undefined ? hero_badge_en.trim() : current.hero_badge_en,
      hero_badge_es: hero_badge_es !== undefined ? hero_badge_es.trim() : current.hero_badge_es,
      hero_title_en: hero_title_en !== undefined ? hero_title_en.trim() : current.hero_title_en,
      hero_title_es: hero_title_es !== undefined ? hero_title_es.trim() : current.hero_title_es,
      hero_desc_en: hero_desc_en !== undefined ? hero_desc_en.trim() : current.hero_desc_en,
      hero_desc_es: hero_desc_es !== undefined ? hero_desc_es.trim() : current.hero_desc_es,
      hero_card_badge_en: hero_card_badge_en !== undefined ? hero_card_badge_en.trim() : current.hero_card_badge_en,
      hero_card_badge_es: hero_card_badge_es !== undefined ? hero_card_badge_es.trim() : current.hero_card_badge_es,
      hero_card_title_en: hero_card_title_en !== undefined ? hero_card_title_en.trim() : current.hero_card_title_en,
      hero_card_title_es: hero_card_title_es !== undefined ? hero_card_title_es.trim() : current.hero_card_title_es,
      hero_image: heroImage
    });

    res.redirect('/admin/settings?msg=' + encodeURIComponent('Hero and Phone settings successfully updated!'));
  } catch (err) {
    console.error('[SETTINGS UPDATE ERROR]', err);
    const settings = await db.getSettings();
    const content = templates.renderAdminSettings({
      settings,
      error: 'An error occurred while updating settings: ' + err.message
    });
    const html = templates.renderAdminLayout({
      title: 'Hero & Phone Settings',
      activeTab: 'settings',
      user: req.user,
      content
    });
    res.send(html);
  }
});

// Initialize database and start the server
async function startServer() {
  await db.initDatabase();

  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🌿 D&G Mendez Landscaping CMS Server Running!`);
    console.log(`📡 Database: ${db.isTurso ? '☁️  Turso Cloud' : '💾 Local SQLite'}`);
    console.log(`🌐 Public Website: http://localhost:${PORT}`);
    console.log(`📖 Projects Blog:   http://localhost:${PORT}/blog`);
    console.log(`🔐 Admin Panel:     http://localhost:${PORT}/admin`);
    console.log(`🔑 Default Admin:   admin / mendez2026!`);
    console.log(`===============================================`);
  });
}

startServer().catch(err => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
