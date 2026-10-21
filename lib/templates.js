// =============================================
// TEMPLATES ENGINE (Tailwind CSS + Brand Theme)
// D&G Mendez Landscaping LLC - CMS
// =============================================

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Complete Tailwind Design Tokens (Colors, Spacing, Typography, Radii)
const SHARED_TAILWIND_CONFIG = `tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "surface": "#f1fcf2", "error-container": "#ffdad6", "secondary-fixed": "#a3f5b1", "on-primary-fixed": "#002110", "surface-dim": "#d1ddd3", "secondary-container": "#a1f2ae", "primary-fixed": "#c3edce", "on-secondary": "#ffffff", "secondary": "#1a6c36", "outline-variant": "#c1c8c0", "on-tertiary-fixed": "#111e17", "primary-fixed-dim": "#a7d0b3", "error": "#ba1a1a", "surface-container": "#e5f1e7", "tertiary-fixed-dim": "#bbcabf", "primary": "#002714", "tertiary-fixed": "#d6e6da", "on-error-container": "#93000a", "on-tertiary-fixed-variant": "#3c4a41", "tertiary-container": "#2b3931", "on-tertiary-container": "#93a298", "tertiary": "#16231c", "surface-bright": "#f1fcf2", "outline": "#727972", "on-primary-fixed-variant": "#294e38", "on-tertiary": "#ffffff", "background": "#f1fcf2", "primary-container": "#183d28", "inverse-primary": "#a7d0b3", "on-surface-variant": "#414843", "on-primary-container": "#81a88d", "surface-variant": "#dae5dc", "on-error": "#ffffff", "on-surface": "#141e18", "surface-container-lowest": "#ffffff", "surface-container-highest": "#dae5dc", "on-primary": "#ffffff", "on-background": "#141e18", "secondary-fixed-dim": "#88d896", "on-secondary-fixed": "#00210a", "on-secondary-fixed-variant": "#005224", "surface-tint": "#41664e", "inverse-surface": "#28332c", "surface-container-high": "#e0ebe1", "inverse-on-surface": "#e8f4ea", "surface-container-low": "#ebf7ed", "on-secondary-container": "#20713a" }, "borderRadius": { "DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px" }, "spacing": { "gutter-sm": "1rem", "margin-lg": "5rem", "space-md": "1rem", "space-sm": "0.75rem", "gutter-lg": "2rem", "gutter": "1.5rem", "space-3xl": "6rem", "space-lg": "1.5rem", "margin": "1.5rem", "margin-md": "3rem", "space-2xs": "0.25rem", "space-2xl": "4rem", "space-xs": "0.5rem", "space-xl": "2.5rem" }, "fontFamily": { "headline-lg-mobile": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "title-md": ["Plus Jakarta Sans"], "display-hero": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"], "label-caps": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "display-hero-mobile": ["Plus Jakarta Sans"] }, "fontSize": { "headline-lg-mobile": ["28px", { "lineHeight": "36px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "headline-md": ["28px", { "lineHeight": "36px", "letterSpacing": "-0.015em", "fontWeight": "600" }], "body-md": ["15px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" }], "body-sm": ["13px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "400" }], "body-lg": ["17px", { "lineHeight": "28px", "letterSpacing": "-0.005em", "fontWeight": "400" }], "title-md": ["18px", { "lineHeight": "26px", "letterSpacing": "-0.005em", "fontWeight": "600" }], "display-hero": ["56px", { "lineHeight": "64px", "letterSpacing": "-0.03em", "fontWeight": "700" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.02em", "fontWeight": "600" }], "headline-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.025em", "fontWeight": "700" }], "headline-sm": ["20px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "label-caps": ["11px", { "lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "700" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.04em", "fontWeight": "600" }], "display-hero-mobile": ["38px", { "lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700" }] } } } };`;

// ---------------------------------------------
// 1. PUBLIC BLOG LISTING PAGE (/blog)
// ---------------------------------------------
function renderBlogList({ posts, categories, selectedCategory, search }) {
  const postCards = posts.length === 0 
    ? `
      <div class="col-span-full py-16 text-center bg-surface-container-low rounded-2xl p-8">
        <span class="material-symbols-outlined text-4xl text-on-surface-variant mb-2">article</span>
        <h3 class="text-title-md font-bold text-primary">No articles found</h3>
        <p class="text-body-md text-on-surface-variant mt-1">Try searching with different keywords or choosing another category.</p>
        <a href="/blog" class="inline-block mt-4 px-4 py-2 rounded-full bg-secondary text-on-secondary font-label-md">View All Projects</a>
      </div>
    `
    : posts.map(post => {
        let photoCount = 1;
        try {
          const parsed = JSON.parse(post.images || '[]');
          if (Array.isArray(parsed) && parsed.length > 0) photoCount = parsed.length;
        } catch (e) {}

        return `
      <article class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group border border-surface-container">
        <a href="/blog/${escapeHtml(post.slug)}" class="block h-56 overflow-hidden relative bg-surface-container">
          <img src="${escapeHtml(post.cover_image || 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80')}" 
               alt="${escapeHtml(post.title)}" 
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               loading="lazy" />
          <div class="absolute top-3 left-3 bg-primary/85 backdrop-blur-md text-on-primary text-xs font-bold px-3 py-1 rounded-full">
            ${escapeHtml(post.category)}
          </div>
          ${photoCount > 1 ? `
            <div class="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <span class="material-symbols-outlined text-[14px]">collections</span>
              <span>${photoCount} Photos</span>
            </div>
          ` : ''}
          ${post.location ? `
            <div class="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <span class="material-symbols-outlined text-[14px] text-secondary">pin_drop</span>
              <span>${escapeHtml(post.location)}</span>
            </div>
          ` : ''}
        </a>
        <div class="p-6 flex flex-col flex-1 justify-between gap-4">
          <div>
            <div class="text-xs text-on-surface-variant mb-2 flex items-center gap-2">
              <span>${formatDate(post.created_at)}</span>
              <span>•</span>
              <span class="text-secondary font-medium">Project Case Study</span>
            </div>
            <h3 class="text-title-md font-bold text-primary group-hover:text-secondary transition-colors leading-snug">
              <a href="/blog/${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a>
            </h3>
            <p class="text-body-sm text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
              ${escapeHtml(post.summary || '')}
            </p>
          </div>
          <div class="pt-4 border-t border-surface-container flex items-center justify-between">
            <a href="/blog/${escapeHtml(post.slug)}" class="inline-flex items-center gap-1 text-label-md font-bold text-secondary hover:text-primary transition-colors">
              <span>Read Case Study</span>
              <span class="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </a>
          </div>
        </div>
      </article>
    `;
    }).join('');

  const categoryChips = categories.map(cat => {
    const isSelected = selectedCategory === cat;
    const href = cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`;
    return `
      <a href="${href}" class="px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
        isSelected 
          ? 'bg-primary text-on-primary shadow-sm' 
          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
      }">
        ${escapeHtml(cat)}
      </a>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html class="scroll-smooth" lang="en">
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Project Case Studies &amp; Landscape Guides | D&amp;G Mendez Landscaping</title>
  <meta name="description" content="Explore real residential landscape transformations, stonework projects, and horticultural tips across Greater Louisville and Kentuckiana estates." />

  <!-- Google Fonts & Icons -->
  <link href="https://fonts.googleapis.com" rel="preconnect" />
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

  <link rel="stylesheet" href="/css/styles.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script id="tailwind-config">
${SHARED_TAILWIND_CONFIG}
  </script>

  <script src="/js/translations.js"></script>
  <script src="/components/navbar.js"></script>
  <script src="/components/footer.js"></script>
</head>
<body class="bg-surface font-body-md text-on-surface antialiased">

  <!-- Navbar -->
  <app-navbar active-page="our-work" root-path="/"></app-navbar>

  <main class="w-full pt-28 xl:pt-24 min-h-screen">
    <!-- Hero Header -->
    <header class="py-12 bg-gradient-to-b from-surface via-surface-container-low to-surface border-b border-surface-container">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div class="flex flex-col items-center text-center max-w-3xl mx-auto gap-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-secondary text-xs font-bold">
            <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>Craftsmanship Journal &amp; Project Archive</span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-bold text-primary tracking-tight">
            Our Work &amp; Horticultural Guides
          </h1>
          <p class="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Real estate transformations, natural stone masonry, and seasonal gardening advice crafted for homeowners across Louisville and Greater Kentuckiana.
          </p>

          <!-- Search & Filter Bar -->
          <div class="w-full max-w-xl mt-4">
            <form action="/blog" method="GET" class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px]">search</span>
              <input type="text" name="q" value="${escapeHtml(search || '')}" 
                     placeholder="Search projects (e.g. Bluestone, Anchorage, Lawn Care)..." 
                     class="w-full pl-12 pr-24 py-3 rounded-full bg-surface-container-lowest text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm" />
              <button type="submit" class="absolute right-1.5 px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all">
                Search
              </button>
            </form>
          </div>

          <!-- Category Chips -->
          <div class="flex flex-wrap items-center justify-center gap-2 mt-3">
            ${categoryChips}
          </div>
        </div>
      </div>
    </header>

    <!-- Post Grid Section -->
    <section class="max-w-[1280px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-xl md:py-space-2xl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        ${postCards}
      </div>
    </section>
  </main>

  <!-- Reusable Footer Web Component -->
  <app-footer root-path="/"></app-footer>

  <script src="/js/main.js"></script>
</body>
</html>`;
}

// Helper to render adaptive post gallery (1, 2, 3, 4, 5+ photos)
function renderPostGallery(gallery, postTitle) {
  if (!gallery || gallery.length === 0) return '';
  const total = gallery.length;

  // Case 1: Single full-width featured hero photo
  if (total === 1) {
    return `
      <div class="rounded-2xl overflow-hidden shadow-lg mb-10 max-h-[520px] w-full bg-surface-container group relative cursor-pointer" onclick="openBlogLightbox(0)">
        <img src="${escapeHtml(gallery[0])}" alt="${escapeHtml(postTitle)}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]" />
        <div class="absolute bottom-3 right-3 bg-primary/85 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
          <span class="material-symbols-outlined text-[16px]">fullscreen</span>
          <span>View Fullscreen</span>
        </div>
      </div>
    `;
  }

  // Case 2: 2-column comparative layout
  if (total === 2) {
    return `
      <div class="mb-10">
        <div class="flex items-center justify-between mb-3 text-xs text-on-surface-variant font-bold">
          <span class="flex items-center gap-1 text-secondary">
            <span class="material-symbols-outlined text-[16px]">collections</span>
            <span>Project Gallery (2 Photos)</span>
          </span>
          <span class="text-[11px] font-normal">Click any photo to enlarge</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${gallery.map((img, idx) => `
            <div class="rounded-2xl overflow-hidden shadow-md h-[280px] sm:h-[360px] bg-surface-container group relative cursor-pointer" onclick="openBlogLightbox(${idx})">
              <img src="${escapeHtml(img)}" alt="${escapeHtml(postTitle)} - View ${idx + 1}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span class="text-white text-xs font-bold flex items-center gap-1 bg-primary/80 backdrop-blur-md px-3 py-1 rounded-full">
                  <span class="material-symbols-outlined text-[14px]">zoom_in</span>
                  <span>View Photo ${idx + 1}</span>
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Case 3: 3-column mosaic (1 prominent featured + 2 stacked)
  if (total === 3) {
    return `
      <div class="mb-10">
        <div class="flex items-center justify-between mb-3 text-xs text-on-surface-variant font-bold">
          <span class="flex items-center gap-1 text-secondary">
            <span class="material-symbols-outlined text-[16px]">collections</span>
            <span>Project Gallery (3 Photos)</span>
          </span>
          <span class="text-[11px] font-normal">Click any photo to enlarge</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="md:col-span-2 rounded-2xl overflow-hidden shadow-md h-[280px] md:h-[440px] bg-surface-container group relative cursor-pointer" onclick="openBlogLightbox(0)">
            <img src="${escapeHtml(gallery[0])}" alt="${escapeHtml(postTitle)} - Main" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute bottom-3 left-3 bg-primary/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">star</span>
              <span>Featured Shot</span>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-1 gap-4">
            <div class="rounded-2xl overflow-hidden shadow-md h-[180px] md:h-[212px] bg-surface-container group relative cursor-pointer" onclick="openBlogLightbox(1)">
              <img src="${escapeHtml(gallery[1])}" alt="${escapeHtml(postTitle)} - View 2" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div class="absolute bottom-2 right-2 bg-primary/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="material-symbols-outlined text-[16px]">zoom_in</span>
              </div>
            </div>
            <div class="rounded-2xl overflow-hidden shadow-md h-[180px] md:h-[212px] bg-surface-container group relative cursor-pointer" onclick="openBlogLightbox(2)">
              <img src="${escapeHtml(gallery[2])}" alt="${escapeHtml(postTitle)} - View 3" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div class="absolute bottom-2 right-2 bg-primary/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="material-symbols-outlined text-[16px]">zoom_in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Case 4: 2x2 grid
  if (total === 4) {
    return `
      <div class="mb-10">
        <div class="flex items-center justify-between mb-3 text-xs text-on-surface-variant font-bold">
          <span class="flex items-center gap-1 text-secondary">
            <span class="material-symbols-outlined text-[16px]">collections</span>
            <span>Project Gallery (4 Photos)</span>
          </span>
          <span class="text-[11px] font-normal">Click any photo to enlarge</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${gallery.map((img, idx) => `
            <div class="rounded-2xl overflow-hidden shadow-md h-[250px] sm:h-[280px] bg-surface-container group relative cursor-pointer" onclick="openBlogLightbox(${idx})">
              <img src="${escapeHtml(img)}" alt="${escapeHtml(postTitle)} - View ${idx + 1}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div class="absolute bottom-3 right-3 bg-primary/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">zoom_in</span>
                <span>Photo ${idx + 1}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Case 5+: Featured Showcase + 4-column responsive thumbnail gallery
  const remaining = gallery.slice(1);
  return `
    <div class="mb-10 space-y-4">
      <div class="flex items-center justify-between text-xs text-on-surface-variant font-bold">
        <span class="flex items-center gap-1 text-secondary">
          <span class="material-symbols-outlined text-[16px]">collections</span>
          <span>Project Gallery (${total} Photos)</span>
        </span>
        <span class="text-[11px] font-normal">Click any photo to open full gallery viewer</span>
      </div>

      <!-- Main Showcase Photo -->
      <div class="rounded-2xl overflow-hidden shadow-lg h-[320px] sm:h-[460px] bg-surface-container group relative cursor-pointer" onclick="openBlogLightbox(0)">
        <img src="${escapeHtml(gallery[0])}" alt="${escapeHtml(postTitle)} - Main" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
        <div class="absolute bottom-4 left-4 bg-primary/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <span class="material-symbols-outlined text-[16px]">photo_camera</span>
          <span>Primary View</span>
        </div>
        <div class="absolute bottom-4 right-4 bg-primary/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <span class="material-symbols-outlined text-[16px]">fullscreen</span>
          <span>Browse All ${total} Photos</span>
        </div>
      </div>

      <!-- Gallery Grid of remaining images -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${remaining.map((img, idx) => `
          <div class="rounded-xl overflow-hidden shadow-sm h-[120px] sm:h-[150px] bg-surface-container group relative cursor-pointer border border-surface-container" onclick="openBlogLightbox(${idx + 1})">
            <img src="${escapeHtml(img)}" alt="${escapeHtml(postTitle)} - Photo ${idx + 2}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            <div class="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="w-8 h-8 rounded-full bg-surface/90 text-primary flex items-center justify-center shadow-md">
                <span class="material-symbols-outlined text-[18px]">zoom_in</span>
              </span>
            </div>
            <span class="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              ${idx + 2} / ${total}
            </span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ---------------------------------------------
// 2. PUBLIC SINGLE BLOG POST PAGE (/blog/:slug)
// ---------------------------------------------
function renderBlogPost({ post, recentPosts, settings }) {
  let gallery = [];
  try {
    gallery = Array.isArray(post.images) ? post.images : JSON.parse(post.images || '[]');
  } catch (e) {
    gallery = [];
  }
  if (gallery.length === 0 && post.cover_image) {
    gallery = [post.cover_image];
  }

  const galleryHtml = renderPostGallery(gallery, post.title);

  const relatedCards = recentPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3)
    .map(p => `
      <a href="/blog/${escapeHtml(p.slug)}" class="group flex gap-4 items-center p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all border border-surface-container">
        <img src="${escapeHtml(p.cover_image || 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=400&q=80')}" 
             alt="${escapeHtml(p.title)}" 
             class="w-20 h-20 rounded-lg object-cover shrink-0" />
        <div class="flex-1 min-w-0">
          <span class="text-[11px] font-bold text-secondary uppercase">${escapeHtml(p.category)}</span>
          <h4 class="text-xs sm:text-sm font-bold text-primary group-hover:text-secondary truncate mt-0.5">${escapeHtml(p.title)}</h4>
          <span class="text-[11px] text-on-surface-variant">${formatDate(p.created_at)}</span>
        </div>
      </a>
    `).join('');

  return `<!DOCTYPE html>
<html class="scroll-smooth" lang="en">
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>${escapeHtml(post.title)} | D&amp;G Mendez Landscaping</title>
  <meta name="description" content="${escapeHtml(post.summary || post.title)}" />

  <!-- Google Fonts & Icons -->
  <link href="https://fonts.googleapis.com" rel="preconnect" />
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

  <link rel="stylesheet" href="/css/styles.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script id="tailwind-config">
${SHARED_TAILWIND_CONFIG}
  </script>

  <script src="/js/translations.js"></script>
  <script src="/components/navbar.js"></script>
  <script src="/components/footer.js"></script>
</head>
<body class="bg-surface font-body-md text-on-surface antialiased">

  <app-navbar active-page="our-work" root-path="/"></app-navbar>

  <main class="w-full pt-28 xl:pt-24 min-h-screen">
    <!-- Article Header -->
    <article class="max-w-[1020px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-xl pb-space-3xl pb-24">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-xs text-on-surface-variant mb-6">
        <a href="/" class="hover:text-primary transition-colors">Home</a>
        <span>/</span>
        <a href="/blog" class="hover:text-primary transition-colors">Our Work</a>
        <span>/</span>
        <span class="text-primary font-medium truncate">${escapeHtml(post.title)}</span>
      </nav>

      <!-- Category & Meta -->
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
          ${escapeHtml(post.category)}
        </span>
        ${post.location ? `
          <span class="px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-medium flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px] text-secondary">location_on</span>
            ${escapeHtml(post.location)}
          </span>
        ` : ''}
        <span class="text-xs text-on-surface-variant">${formatDate(post.created_at)}</span>
      </div>

      <h1 class="text-3xl sm:text-5xl font-bold text-primary tracking-tight leading-tight mb-6">
        ${escapeHtml(post.title)}
      </h1>

      ${post.summary ? `
        <p class="text-lg sm:text-xl text-on-surface-variant font-medium leading-relaxed mb-8 border-l-4 border-secondary pl-4 py-1 italic">
          ${escapeHtml(post.summary)}
        </p>
      ` : ''}

      <!-- Adaptive Project Images Gallery (1, 2, 3, 4, 5+ photos) -->
      ${galleryHtml}

      <!-- Main Article Content -->
      <div class="prose prose-lg max-w-none text-on-surface leading-relaxed space-y-6">
        ${post.content}
      </div>

      <!-- Author Box & Share CTA -->
      <div class="mt-12 p-6 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-lg">
            HM
          </div>
          <div>
            <h4 class="font-bold text-primary">Henry Mendez</h4>
            <p class="text-xs text-on-surface-variant">Director &amp; Lead Horticulturist at D&amp;G Mendez Landscaping</p>
          </div>
        </div>
        <a href="tel:${escapeHtml(settings?.phone_raw || '5026679020')}" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary-container hover:text-on-secondary-container transition-all">
          <span class="material-symbols-outlined text-[16px]">call</span>
          <span>${escapeHtml(settings?.phone || '(502) 667-9020')}</span>
        </a>
      </div>

      <!-- Related Case Studies -->
      ${relatedCards ? `
        <div class="mt-16 pt-8 border-t border-surface-container">
          <h3 class="text-xl font-bold text-primary mb-6">More Recent Case Studies &amp; Projects</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${relatedCards}
          </div>
        </div>
      ` : ''}

      <!-- Back to all link -->
      <div class="mt-10 text-center">
        <a href="/blog" class="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to All Projects &amp; Articles</span>
        </a>
      </div>
    </article>
  </main>

  <!-- Interactive Lightbox Modal -->
  <div id="blog-lightbox" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md hidden items-center justify-center p-4">
    <!-- Close Button -->
    <button type="button" onclick="closeBlogLightbox()" class="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
      <span class="material-symbols-outlined text-[24px]">close</span>
    </button>

    <!-- Photo Counter -->
    <div id="lightbox-counter" class="absolute top-5 left-5 z-20 text-white/90 text-xs font-mono font-bold bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
      1 / ${gallery.length}
    </div>

    <!-- Previous Arrow -->
    <button type="button" onclick="prevBlogLightbox(event)" class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 sm:w-14 h-11 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
      <span class="material-symbols-outlined text-[28px]">chevron_left</span>
    </button>

    <!-- Active Image Container -->
    <div class="max-w-5xl max-h-[85vh] flex items-center justify-center p-2" onclick="event.stopPropagation()">
      <img id="lightbox-img" src="" alt="Full view" class="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl transition-all" />
    </div>

    <!-- Next Arrow -->
    <button type="button" onclick="nextBlogLightbox(event)" class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 sm:w-14 h-11 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
      <span class="material-symbols-outlined text-[28px]">chevron_right</span>
    </button>
  </div>

  <app-footer root-path="/"></app-footer>

  <script src="/js/main.js"></script>

  <!-- Lightbox Script -->
  <script>
    const blogGalleryImages = ${JSON.stringify(gallery)};
    let activeLightboxIdx = 0;

    function openBlogLightbox(index) {
      if (!blogGalleryImages || blogGalleryImages.length === 0) return;
      activeLightboxIdx = index;
      updateLightboxDisplay();
      const modal = document.getElementById('blog-lightbox');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeBlogLightbox() {
      const modal = document.getElementById('blog-lightbox');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
      document.body.style.overflow = '';
    }

    function updateLightboxDisplay() {
      const img = document.getElementById('lightbox-img');
      const counter = document.getElementById('lightbox-counter');
      if (img && blogGalleryImages[activeLightboxIdx]) {
        img.src = blogGalleryImages[activeLightboxIdx];
      }
      if (counter) {
        counter.textContent = (activeLightboxIdx + 1) + ' / ' + blogGalleryImages.length;
      }
    }

    function prevBlogLightbox(e) {
      if (e) e.stopPropagation();
      activeLightboxIdx = (activeLightboxIdx - 1 + blogGalleryImages.length) % blogGalleryImages.length;
      updateLightboxDisplay();
    }

    function nextBlogLightbox(e) {
      if (e) e.stopPropagation();
      activeLightboxIdx = (activeLightboxIdx + 1) % blogGalleryImages.length;
      updateLightboxDisplay();
    }

    // Backdrop click to close
    document.getElementById('blog-lightbox')?.addEventListener('click', (e) => {
      if (e.target.id === 'blog-lightbox') {
        closeBlogLightbox();
      }
    });

    // Touch swipe gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const lightboxModal = document.getElementById('blog-lightbox');
    if (lightboxModal) {
      lightboxModal.addEventListener('touchstart', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          touchStartX = e.changedTouches[0].screenX;
        }
      }, { passive: true });

      lightboxModal.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          touchEndX = e.changedTouches[0].screenX;
          const diff = touchEndX - touchStartX;
          if (Math.abs(diff) > 40) {
            if (diff < 0) {
              nextBlogLightbox();
            } else {
              prevBlogLightbox();
            }
          }
        }
      }, { passive: true });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('blog-lightbox');
      if (!modal || modal.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeBlogLightbox();
      if (e.key === 'ArrowLeft') prevBlogLightbox();
      if (e.key === 'ArrowRight') nextBlogLightbox();
    });
  </script>
</body>
</html>`;
}

// ---------------------------------------------
// 3. ADMIN SHELL LAYOUT
// ---------------------------------------------
function renderAdminLayout({ title, activeTab, user, content, flashMessage }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} | D&amp;G Mendez CMS</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script id="tailwind-config">
tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "surface": "#f1fcf2", "error-container": "#ffdad6", "secondary-fixed": "#a3f5b1", "primary": "#002714", "secondary": "#1a6c36", "surface-container": "#e5f1e7", "surface-container-low": "#ebf7ed", "surface-container-lowest": "#ffffff", "surface-container-high": "#e0ebe1", "on-primary": "#ffffff", "on-secondary": "#ffffff", "on-surface": "#141e18", "on-surface-variant": "#414843" } } } };
  </script>
</head>
<body class="bg-surface font-['Plus_Jakarta_Sans',sans-serif] text-on-surface antialiased min-h-screen flex flex-col md:flex-row">

  <!-- Mobile Topbar -->
  <header class="md:hidden bg-primary text-on-primary px-4 py-3 flex items-center justify-between shadow-md">
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-secondary-fixed text-2xl">yard</span>
      <span class="font-bold text-sm tracking-tight">D&amp;G Mendez CMS</span>
    </div>
    <div class="flex items-center gap-3">
      <a href="/admin/settings" class="text-xs text-secondary-fixed hover:underline flex items-center gap-1">
        <span class="material-symbols-outlined text-[14px]">tune</span>
        <span>Settings</span>
      </a>
      <a href="/" target="_blank" class="text-xs text-secondary-fixed hover:underline">View Site</a>
      <a href="/admin/logout" class="p-1 rounded text-on-primary hover:bg-white/10">
        <span class="material-symbols-outlined text-[20px]">logout</span>
      </a>
    </div>
  </header>

  <!-- Sidebar -->
  <aside class="w-full md:w-64 bg-primary text-on-primary flex flex-col justify-between shrink-0 p-3 md:p-5 md:min-h-screen">
    <div>
      <!-- Brand -->
      <div class="hidden md:flex items-center gap-3 pb-6 border-b border-white/10">
        <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary shrink-0 shadow-sm">
          <span class="material-symbols-outlined text-[22px]">yard</span>
        </div>
        <div>
          <h2 class="font-bold text-base leading-tight">D&amp;G Mendez</h2>
          <span class="text-xs text-secondary-fixed font-medium">Control Panel</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="mt-1 md:mt-6 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0 scroll-smooth" style="scrollbar-width: none; -ms-overflow-style: none;">
        <a href="/admin" class="shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
          activeTab === 'dashboard' 
            ? 'bg-secondary text-on-secondary shadow-sm' 
            : 'text-white/80 hover:bg-white/10 hover:text-white'
        }">
          <span class="material-symbols-outlined text-[18px] md:text-[20px]">dashboard</span>
          <span>Dashboard</span>
        </a>

        <a href="/admin/posts" class="shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
          activeTab === 'posts' 
            ? 'bg-secondary text-on-secondary shadow-sm' 
            : 'text-white/80 hover:bg-white/10 hover:text-white'
        }">
          <span class="material-symbols-outlined text-[18px] md:text-[20px]">article</span>
          <span>Projects &amp; Blog</span>
        </a>

        <a href="/admin/leads" class="shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
          activeTab === 'leads' 
            ? 'bg-secondary text-on-secondary shadow-sm' 
            : 'text-white/80 hover:bg-white/10 hover:text-white'
        }">
          <span class="material-symbols-outlined text-[18px] md:text-[20px]">inbox</span>
          <span>Customer Leads</span>
        </a>

        <a href="/admin/settings" class="shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
          activeTab === 'settings' 
            ? 'bg-secondary text-on-secondary shadow-sm' 
            : 'text-white/80 hover:bg-white/10 hover:text-white'
        }">
          <span class="material-symbols-outlined text-[18px] md:text-[20px]">tune</span>
          <span>Hero &amp; Phone</span>
        </a>

        <a href="/" target="_blank" class="shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all">
          <span class="material-symbols-outlined text-[18px] md:text-[20px]">open_in_new</span>
          <span>View Site</span>
        </a>
      </nav>
    </div>

    <!-- User & Logout -->
    <div class="hidden md:flex flex-col gap-3 pt-6 border-t border-white/10">
      <div class="flex items-center gap-3 px-2">
        <div class="w-8 h-8 rounded-full bg-secondary-fixed text-primary flex items-center justify-center font-bold text-xs shrink-0">
          ${escapeHtml(user?.username?.[0]?.toUpperCase() || 'A')}
        </div>
        <div class="truncate">
          <p class="text-xs font-bold truncate">${escapeHtml(user?.name || user?.username || 'Admin')}</p>
          <span class="text-[11px] text-white/60">Administrator</span>
        </div>
      </div>
      <a href="/admin/logout" class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-error-container hover:bg-red-500/20 transition-colors">
        <span class="material-symbols-outlined text-[18px]">logout</span>
        <span>Sign Out</span>
      </a>
    </div>
  </aside>

  <!-- Main Content Area -->
  <main class="flex-1 p-4 sm:p-8 overflow-y-auto">
    ${flashMessage ? `
      <div class="mb-6 p-4 rounded-xl bg-secondary-container text-on-secondary-container text-sm font-semibold flex items-center gap-2 shadow-sm">
        <span class="material-symbols-outlined text-[20px]">check_circle</span>
        <span>${escapeHtml(flashMessage)}</span>
      </div>
    ` : ''}

    ${content}
  </main>

</body>
</html>`;
}

// ---------------------------------------------
// 4. ADMIN LOGIN PAGE
// ---------------------------------------------
function renderAdminLogin({ error }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Login | D&amp;G Mendez Landscaping</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script id="tailwind-config">
tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "surface": "#f1fcf2", "primary": "#002714", "secondary": "#1a6c36", "surface-container": "#e5f1e7", "surface-container-lowest": "#ffffff", "on-primary": "#ffffff", "on-surface": "#141e18" } } } };
  </script>
</head>
<body class="bg-surface font-['Plus_Jakarta_Sans',sans-serif] min-h-screen flex items-center justify-center p-4">

  <div class="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl p-8 border border-surface-container">
    <div class="text-center mb-8">
      <div class="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center mx-auto mb-3 shadow-md">
        <span class="material-symbols-outlined text-[28px]">lock</span>
      </div>
      <h1 class="text-2xl font-bold text-primary">D&amp;G Mendez CMS</h1>
      <p class="text-xs text-on-surface-variant mt-1">Please sign in to manage projects and leads</p>
    </div>

    ${error ? `
      <div class="mb-5 p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2 border border-red-200">
        <span class="material-symbols-outlined text-[18px]">error</span>
        <span>${escapeHtml(error)}</span>
      </div>
    ` : ''}

    <form action="/admin/login" method="POST" class="space-y-4">
      <div>
        <label class="block text-xs font-bold text-primary mb-1.5" for="username">Username</label>
        <div class="relative flex items-center">
          <span class="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[18px]">person</span>
          <input type="text" id="username" name="username" required autofocus
                 placeholder="admin"
                 class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-primary mb-1.5" for="password">Password</label>
        <div class="relative flex items-center">
          <span class="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[18px]">key</span>
          <input type="password" id="password" name="password" required
                 placeholder="••••••••"
                 class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
        </div>
      </div>

      <button type="submit" class="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-secondary transition-colors shadow-md mt-2 flex items-center justify-center gap-2">
        <span>Sign In</span>
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </form>

    <div class="mt-6 pt-4 border-t border-surface-container text-center">
      <a href="/" class="text-xs text-secondary font-semibold hover:underline">← Return to Website</a>
    </div>
  </div>

</body>
</html>`;
}

// ---------------------------------------------
// 5. ADMIN DASHBOARD OVERVIEW
// ---------------------------------------------
function renderAdminDashboard({ stats, recentLeads, recentPosts }) {
  const leadRows = recentLeads.length === 0
    ? `<tr><td colspan="5" class="p-6 text-center text-xs text-on-surface-variant">No leads received yet.</td></tr>`
    : recentLeads.map(lead => `
      <tr class="border-b border-surface-container hover:bg-surface-container-low transition-colors text-xs">
        <td class="p-3.5 font-bold text-primary">${escapeHtml(lead.name)}</td>
        <td class="p-3.5">${escapeHtml(lead.phone || '—')}</td>
        <td class="p-3.5 text-on-surface-variant">${escapeHtml(lead.service || 'General Inquiry')}</td>
        <td class="p-3.5">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
            lead.status === 'new' 
              ? 'bg-amber-100 text-amber-800' 
              : lead.status === 'contacted' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
          }">
            ${escapeHtml(lead.status)}
          </span>
        </td>
        <td class="p-3.5 text-on-surface-variant">${formatDate(lead.created_at)}</td>
      </tr>
    `).join('');

  return `
    <div class="space-y-8">
      <!-- Welcome Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-primary">Overview Dashboard</h1>
          <p class="text-xs sm:text-sm text-on-surface-variant mt-1">Manage project case studies, inquiries, and site publications.</p>
        </div>
        <div class="flex items-center gap-2">
          <a href="/admin/settings" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high text-primary text-xs font-bold hover:bg-surface-container-highest transition-all">
            <span class="material-symbols-outlined text-[18px]">tune</span>
            <span>Hero &amp; Phone</span>
          </a>
          <a href="/admin/posts/new" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-secondary transition-all shadow-sm">
            <span class="material-symbols-outlined text-[18px]">add</span>
            <span>New Project Post</span>
          </a>
        </div>
      </div>

      <!-- Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Articles</span>
            <p class="text-3xl font-bold text-primary mt-1">${stats.totalPosts}</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-surface-container text-secondary flex items-center justify-center">
            <span class="material-symbols-outlined text-[24px]">article</span>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">New Inquiries</span>
            <p class="text-3xl font-bold text-amber-600 mt-1">${stats.newLeads}</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-[24px]">mark_email_unread</span>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Leads</span>
            <p class="text-3xl font-bold text-primary mt-1">${stats.totalLeads}</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-[24px]">inbox</span>
          </div>
        </div>

        <a href="/admin/settings" class="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-center justify-between hover:border-secondary transition-all group">
          <div>
            <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Site Settings</span>
            <p class="text-sm font-bold text-primary mt-1 flex items-center gap-1 group-hover:text-secondary">
              <span>Hero &amp; Phone</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span class="material-symbols-outlined text-[24px]">tune</span>
          </div>
        </a>
      </div>

      <!-- Recent Customer Inquiries Table -->
      <div class="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm overflow-hidden">
        <div class="p-5 border-b border-surface-container flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary text-[20px]">mark_chat_unread</span>
            <h3 class="font-bold text-sm text-primary">Recent Customer Inquiries &amp; Estimates</h3>
          </div>
          <a href="/admin/leads" class="text-xs font-bold text-secondary hover:underline">View All Leads →</a>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-surface-container-low text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th class="p-3.5">Client Name</th>
                <th class="p-3.5">Phone</th>
                <th class="p-3.5">Requested Service</th>
                <th class="p-3.5">Status</th>
                <th class="p-3.5">Date</th>
              </tr>
            </thead>
            <tbody>
              ${leadRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ---------------------------------------------
// 6. ADMIN POSTS LIST
// ---------------------------------------------
function renderAdminPosts({ posts }) {
  const rows = posts.length === 0
    ? `<tr><td colspan="6" class="p-8 text-center text-xs text-on-surface-variant">No posts created yet. Click "New Project Post" above.</td></tr>`
    : posts.map(post => `
      <tr class="border-b border-surface-container hover:bg-surface-container-low transition-colors text-xs">
        <td class="p-3.5 font-bold text-primary">
          <div class="flex items-center gap-3">
            <img src="${escapeHtml(post.cover_image || 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=150&q=80')}" 
                 class="w-12 h-12 rounded-lg object-cover shrink-0" alt="" />
            <div>
              <p class="font-bold text-sm text-primary">${escapeHtml(post.title)}</p>
              <span class="text-[11px] text-on-surface-variant">/blog/${escapeHtml(post.slug)}</span>
            </div>
          </div>
        </td>
        <td class="p-3.5 font-semibold text-secondary">${escapeHtml(post.category)}</td>
        <td class="p-3.5 text-on-surface-variant">${escapeHtml(post.location || '—')}</td>
        <td class="p-3.5">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }">
            ${post.published ? 'Published' : 'Draft'}
          </span>
        </td>
        <td class="p-3.5 text-on-surface-variant">${formatDate(post.created_at)}</td>
        <td class="p-3.5 text-right">
          <div class="inline-flex items-center gap-1.5">
            <a href="/blog/${escapeHtml(post.slug)}" target="_blank" title="View Public Post"
               class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container">
              <span class="material-symbols-outlined text-[18px]">visibility</span>
            </a>
            <a href="/admin/posts/edit/${post.id}" title="Edit Post"
               class="p-1.5 rounded-lg text-secondary hover:bg-secondary-container">
              <span class="material-symbols-outlined text-[18px]">edit</span>
            </a>
            <form action="/admin/posts/delete/${post.id}" method="POST" onsubmit="return confirm('Are you sure you want to delete this post?');" class="inline">
              <button type="submit" title="Delete Post" class="p-1.5 rounded-lg text-error hover:bg-red-50">
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </form>
          </div>
        </td>
      </tr>
    `).join('');

  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-primary">Projects &amp; Blog Posts</h1>
          <p class="text-xs sm:text-sm text-on-surface-variant mt-1">Publish case studies, before/after stories, and horticultural guides.</p>
        </div>
        <a href="/admin/posts/new" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-secondary transition-all shadow-sm self-start">
          <span class="material-symbols-outlined text-[18px]">add</span>
          <span>New Project Post</span>
        </a>
      </div>

      <div class="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-surface-container-low text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th class="p-3.5">Post &amp; Slug</th>
                <th class="p-3.5">Category</th>
                <th class="p-3.5">Location</th>
                <th class="p-3.5">Status</th>
                <th class="p-3.5">Created</th>
                <th class="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ---------------------------------------------
// 7. ADMIN POST FORM (CREATE / EDIT)
// ---------------------------------------------
function renderAdminPostForm({ post = {}, isEdit = false, error = null }) {
  const categories = ['Projects', 'Hardscaping', 'Lawn Care', 'Garden Design', 'Tree Care', 'Seasonal Guide'];

  let existingImages = [];
  try {
    existingImages = Array.isArray(post.images) ? post.images : JSON.parse(post.images || '[]');
  } catch (e) {
    existingImages = [];
  }
  if (existingImages.length === 0 && post.cover_image) {
    existingImages = [post.cover_image];
  }
  const currentCover = post.cover_image || existingImages[0] || '';

  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <a href="/admin/posts" class="text-xs text-secondary font-bold hover:underline inline-flex items-center gap-1 mb-1">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Posts</span>
          </a>
          <h1 class="text-2xl font-bold text-primary">${isEdit ? 'Edit Post' : 'Create New Project Post'}</h1>
        </div>
      </div>

      ${error ? `
        <div class="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2 border border-red-200">
          <span class="material-symbols-outlined text-[18px]">error</span>
          <span>${escapeHtml(error)}</span>
        </div>
      ` : ''}

      <form action="${isEdit ? `/admin/posts/edit/${post.id}` : '/admin/posts/new'}" 
            method="POST" 
            enctype="multipart/form-data" 
            class="space-y-6 bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container shadow-sm">

        <!-- Title -->
        <div>
          <label class="block text-xs font-bold text-primary mb-1.5" for="title">Title *</label>
          <input type="text" id="title" name="title" required value="${escapeHtml(post.title || '')}"
                 placeholder="e.g. Modern Bluestone Patio Installation in Anchorage"
                 class="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40 font-bold" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Slug -->
          <div>
            <label class="block text-xs font-bold text-primary mb-1.5" for="slug">URL Slug *</label>
            <input type="text" id="slug" name="slug" required value="${escapeHtml(post.slug || '')}"
                   placeholder="e.g. bluestone-patio-anchorage"
                   class="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
            <span class="text-[10px] text-on-surface-variant">Accessible at: /blog/your-slug</span>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-xs font-bold text-primary mb-1.5" for="category">Category</label>
            <select id="category" name="category" class="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40">
              ${categories.map(cat => `
                <option value="${cat}" ${post.category === cat ? 'selected' : ''}>${cat}</option>
              `).join('')}
            </select>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-xs font-bold text-primary mb-1.5" for="location">Location</label>
            <input type="text" id="location" name="location" value="${escapeHtml(post.location || 'Louisville, KY')}"
                   placeholder="e.g. Anchorage, KY"
                   class="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
          </div>
        </div>

        <!-- Project Images & Multi-Image Gallery -->
        <div class="space-y-5 p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-surface-container">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-container">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[24px] text-secondary">collections</span>
              <div>
                <h3 class="text-sm font-bold text-primary">Project Photos &amp; Multi-Image Gallery</h3>
                <p class="text-[11px] text-on-surface-variant">Upload 1, 2, 5, or more photos. They will automatically arrange adaptively on the public blog page.</p>
              </div>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container self-start sm:self-auto">
              ${existingImages.length} Saved Image(s)
            </span>
          </div>

          <!-- Existing Images Grid (When Editing) -->
          ${existingImages.length > 0 ? `
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-bold text-primary">Currently Attached Photos (${existingImages.length})</label>
                <span class="text-[11px] text-on-surface-variant">Pick which image is the main Cover</span>
              </div>
              <div id="existing-images-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                ${existingImages.map((img, idx) => {
                  const isCover = (img === currentCover) || (idx === 0 && !currentCover);
                  return `
                    <div class="relative group rounded-xl overflow-hidden border border-surface-container bg-surface-container-lowest shadow-sm flex flex-col p-1.5 existing-image-card">
                      <div class="h-28 w-full rounded-lg overflow-hidden relative bg-surface-container">
                        <img src="${escapeHtml(img)}" alt="Attached photo" class="w-full h-full object-cover" />
                        <button type="button" onclick="removeExistingImage(this)" title="Delete photo from project"
                                class="absolute top-1 right-1 w-7 h-7 rounded-full bg-red-600/90 text-white flex items-center justify-center opacity-85 group-hover:opacity-100 hover:bg-red-700 transition-all shadow-md">
                          <span class="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                      <input type="hidden" name="existing_images" value="${escapeHtml(img)}" />
                      <label class="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-primary cursor-pointer select-none px-1">
                        <input type="radio" name="selected_cover" value="${escapeHtml(img)}" ${isCover ? 'checked' : ''} class="text-secondary" />
                        <span class="${isCover ? 'text-secondary font-bold' : 'text-on-surface-variant'}">${isCover ? '⭐ Main Cover' : 'Set as Cover'}</span>
                      </label>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Drag & Drop Multiple Files Uploader -->
          <div class="relative border-2 border-dashed border-secondary/40 hover:border-secondary bg-surface-container-lowest hover:bg-surface-container/70 rounded-2xl p-6 text-center cursor-pointer transition-all">
            <input type="file" id="multi-images-input" name="images" multiple accept="image/*"
                   class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                   onchange="handleMultipleImagesPreview(event)" />
            <div class="flex flex-col items-center justify-center gap-2 pointer-events-none">
              <div class="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-inner">
                <span class="material-symbols-outlined text-[28px]">add_photo_alternate</span>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-bold text-primary">Click or drag &amp; drop multiple photos here</p>
                <p class="text-[11px] text-on-surface-variant mt-0.5">Select multiple files (JPG, PNG, WEBP) to upload them together</p>
              </div>
            </div>
          </div>

          <!-- Preview of Newly Selected Files -->
          <div id="new-images-preview-section" class="space-y-2 hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-secondary flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">check_circle</span>
                <span id="new-images-count">Newly Selected Photos (0)</span>
              </span>
              <button type="button" onclick="clearNewSelectedImages()" class="text-[11px] font-bold text-red-600 hover:underline">Clear selection</button>
            </div>
            <div id="new-images-preview-grid" class="grid grid-cols-2 sm:grid-cols-4 gap-3"></div>
          </div>

          <!-- Optional External Image URLs -->
          <div class="pt-3 border-t border-surface-container">
            <details class="text-xs">
              <summary class="font-bold text-primary cursor-pointer hover:text-secondary py-1 select-none">
                + Or paste external image URLs (Optional)
              </summary>
              <div class="mt-2 space-y-2">
                <textarea name="extra_image_urls" rows="2" placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."
                          class="w-full px-3.5 py-2.5 rounded-xl bg-surface text-on-surface text-xs font-mono border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40"></textarea>
                <p class="text-[10px] text-on-surface-variant">Paste image URLs (one per line or separated by commas).</p>
              </div>
            </details>
          </div>
        </div>

        <!-- Summary -->
        <div>
          <label class="block text-xs font-bold text-primary mb-1.5" for="summary">Short Summary / Excerpt</label>
          <textarea id="summary" name="summary" rows="2"
                    placeholder="Brief 1-2 sentence overview shown in the blog grid and Google search results."
                    class="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40 leading-relaxed">${escapeHtml(post.summary || '')}</textarea>
        </div>

        <!-- Content -->
        <div>
          <label class="block text-xs font-bold text-primary mb-1.5" for="content">Article / Case Study Content (HTML supported) *</label>
          <div class="mb-2 flex flex-wrap items-center gap-1.5 text-xs text-on-surface-variant">
            <span class="font-bold text-primary">Quick insert tags:</span>
            <button type="button" onclick="insertTag('h3')" class="px-2 py-0.5 rounded bg-surface border text-[11px] hover:bg-surface-container">&lt;h3&gt;</button>
            <button type="button" onclick="insertTag('p')" class="px-2 py-0.5 rounded bg-surface border text-[11px] hover:bg-surface-container">&lt;p&gt;</button>
            <button type="button" onclick="insertTag('ul')" class="px-2 py-0.5 rounded bg-surface border text-[11px] hover:bg-surface-container">&lt;ul&gt; &amp; &lt;li&gt;</button>
            <button type="button" onclick="insertTag('b')" class="px-2 py-0.5 rounded bg-surface border text-[11px] hover:bg-surface-container">&lt;strong&gt;</button>
          </div>
          <textarea id="content" name="content" rows="12" required
                    placeholder="Write your article or project walkthrough here..."
                    class="w-full px-4 py-3 rounded-xl bg-surface text-on-surface text-sm font-mono border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40 leading-relaxed">${escapeHtml(post.content || '')}</textarea>
        </div>

        <!-- Published Checkbox -->
        <div class="flex items-center gap-2">
          <input type="checkbox" id="published" name="published" value="1" ${post.published !== 0 ? 'checked' : ''} class="w-4 h-4 text-secondary rounded" />
          <label for="published" class="text-xs font-bold text-primary select-none cursor-pointer">Published immediately on website</label>
        </div>

        <!-- Submit Button -->
        <div class="pt-4 border-t border-surface-container flex flex-wrap items-center justify-end gap-3">
          <a href="/admin/posts" class="px-5 py-2.5 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors">Cancel</a>
          <button type="submit" class="w-full sm:w-auto justify-center px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-secondary transition-all shadow-md flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">save</span>
            <span>${isEdit ? 'Save Changes' : 'Publish Project'}</span>
          </button>
        </div>
      </form>
    </div>

    <script>
      // Auto-generate slug from title if empty
      const titleInput = document.getElementById('title');
      const slugInput = document.getElementById('slug');
      if (titleInput && slugInput && !slugInput.value) {
        titleInput.addEventListener('input', () => {
          slugInput.value = titleInput.value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\\s-]/g, '')
            .replace(/\\s+/g, '-');
        });
      }

      function insertTag(tag) {
        const textarea = document.getElementById('content');
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = textarea.value.substring(start, end);
        let replacement = '';
        if (tag === 'h3') replacement = '<h3>' + (selected || 'Heading Title') + '</h3>\\n';
        else if (tag === 'p') replacement = '<p>' + (selected || 'Paragraph text here...') + '</p>\\n';
        else if (tag === 'b') replacement = '<strong>' + (selected || 'Bold text') + '</strong>';
        else if (tag === 'ul') replacement = '<ul>\\n  <li>Item 1</li>\\n  <li>Item 2</li>\\n</ul>\\n';

        textarea.setRangeText(replacement, start, end, 'end');
        textarea.focus();
      }

      // Remove existing image card in edit mode
      function removeExistingImage(button) {
        const card = button.closest('.existing-image-card');
        if (card) {
          card.remove();
          const remainingRadios = document.querySelectorAll('input[name="selected_cover"]');
          const checked = document.querySelector('input[name="selected_cover"]:checked');
          if (!checked && remainingRadios.length > 0) {
            remainingRadios[0].checked = true;
          }
        }
      }

      // Live preview of multiple newly selected images
      function handleMultipleImagesPreview(event) {
        const files = event.target.files;
        const container = document.getElementById('new-images-preview-section');
        const grid = document.getElementById('new-images-preview-grid');
        const countLabel = document.getElementById('new-images-count');

        if (!files || files.length === 0) {
          if (container) container.classList.add('hidden');
          return;
        }

        if (container) container.classList.remove('hidden');
        if (countLabel) countLabel.textContent = 'Newly Selected Photos (' + files.length + ')';
        if (grid) grid.innerHTML = '';

        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = function(e) {
            const card = document.createElement('div');
            card.className = 'relative rounded-xl overflow-hidden border border-surface-container bg-surface-container-lowest p-1.5 flex flex-col shadow-sm';
            card.innerHTML = 
              '<div class=\"h-24 w-full rounded-lg overflow-hidden bg-surface-container\">' +
                '<img src=\"' + e.target.result + '\" alt=\"' + file.name + '\" class=\"w-full h-full object-cover\" />' +
              '</div>' +
              '<div class=\"mt-1 px-1\">' +
                '<p class=\"text-[10px] font-bold text-primary truncate\" title=\"' + file.name + '\">' + file.name + '</p>' +
                '<span class=\"text-[9px] text-on-surface-variant\">' + (file.size / 1024).toFixed(0) + ' KB</span>' +
              '</div>';
            grid.appendChild(card);
          };
          reader.readAsDataURL(file);
        });
      }

      function clearNewSelectedImages() {
        const input = document.getElementById('multi-images-input');
        if (input) input.value = '';
        const container = document.getElementById('new-images-preview-section');
        if (container) container.classList.add('hidden');
        const grid = document.getElementById('new-images-preview-grid');
        if (grid) grid.innerHTML = '';
      }
    </script>
  `;
}

// ---------------------------------------------
// 8. ADMIN LEADS INBOX
// ---------------------------------------------
function renderAdminLeads({ leads }) {
  const rows = leads.length === 0
    ? `<tr><td colspan="6" class="p-8 text-center text-xs text-on-surface-variant">No customer estimate requests received yet.</td></tr>`
    : leads.map(lead => `
      <tr class="border-b border-surface-container hover:bg-surface-container-low transition-colors text-xs">
        <td class="p-3.5">
          <p class="font-bold text-primary text-sm">${escapeHtml(lead.name)}</p>
          <span class="text-[11px] text-on-surface-variant">${formatDate(lead.created_at)}</span>
        </td>
        <td class="p-3.5 space-y-1">
          ${lead.phone ? `
            <a href="tel:${escapeHtml(lead.phone)}" class="text-secondary font-bold hover:underline flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">call</span>
              <span>${escapeHtml(lead.phone)}</span>
            </a>
          ` : '<span class="text-on-surface-variant">No phone</span>'}
          ${lead.email ? `
            <a href="mailto:${escapeHtml(lead.email)}" class="text-on-surface-variant hover:text-primary flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">mail</span>
              <span>${escapeHtml(lead.email)}</span>
            </a>
          ` : ''}
        </td>
        <td class="p-3.5 font-medium text-primary">${escapeHtml(lead.service || 'Free Estimate Request')}</td>
        <td class="p-3.5">
          <span class="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-surface-container">
            ${escapeHtml(lead.zip_code || '—')}
          </span>
        </td>
        <td class="p-3.5 max-w-xs text-on-surface-variant line-clamp-2">
          ${escapeHtml(lead.message || 'No additional notes provided.')}
        </td>
        <td class="p-3.5">
          <form action="/admin/leads/${lead.id}/status" method="POST" class="inline">
            <select name="status" onchange="this.form.submit()" class="text-xs font-bold rounded-lg px-2 py-1 bg-surface border border-surface-container">
              <option value="new" ${lead.status === 'new' ? 'selected' : ''}>🟡 New</option>
              <option value="contacted" ${lead.status === 'contacted' ? 'selected' : ''}>🔵 Contacted</option>
              <option value="scheduled" ${lead.status === 'scheduled' ? 'selected' : ''}>🟣 Scheduled</option>
              <option value="closed" ${lead.status === 'closed' ? 'selected' : ''}>🟢 Closed</option>
            </select>
          </form>
        </td>
      </tr>
    `).join('');

  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-primary">Customer Inquiries &amp; Leads</h1>
          <p class="text-xs sm:text-sm text-on-surface-variant mt-1">Review quote requests from website visitors in Louisville and surrounding counties.</p>
        </div>
      </div>

      <div class="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-surface-container-low text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th class="p-3.5">Client &amp; Date</th>
                <th class="p-3.5">Contact Info</th>
                <th class="p-3.5">Service</th>
                <th class="p-3.5">ZIP</th>
                <th class="p-3.5">Message / Notes</th>
                <th class="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ---------------------------------------------
// 9. ADMIN SITE SETTINGS (Hero & Phone Numbers)
// ---------------------------------------------
function renderAdminSettings({ settings, error }) {
  const currentHeroImg = settings.hero_image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlXfNmbD5_3CENgXQiK8syx9NB2Eo5Yg2x8pVOaHQOSN8lsvREwcJeI5NlC_1AhSzKuA49bqUFJFQ7x37pJIu9t-ERjp7AeHcazcl6HYW3-bsaXO-GJNwYsnQz4RWTEQX2qNRplhKpObOp-Anv9E-F7_yGR2Mmp1eeNkzJWGWaFn26tJNQh9HKPeFXG4qXyhQCCZR-5ADSyVBvtNVj1KjQfjqWOSGxJOmb1dZqQApWB0Sq0rlIEkmG';

  return `
    <div class="space-y-8 max-w-5xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold mb-2">
            <span class="material-symbols-outlined text-[16px]">tune</span>
            <span>Live Site Customization</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-primary">Hero Section &amp; Phone Settings</h1>
          <p class="text-xs sm:text-sm text-on-surface-variant mt-1">Changes made here update the homepage Hero, phone buttons, call links, footer, and inquiry modals in real time.</p>
        </div>
        <div class="flex items-center gap-3">
          <a href="/" target="_blank" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container text-primary text-xs font-bold hover:bg-surface-container-high transition-colors">
            <span class="material-symbols-outlined text-[16px]">visibility</span>
            <span>Preview Live Site</span>
          </a>
        </div>
      </div>

      ${error ? `
        <div class="p-4 rounded-xl bg-red-50 text-red-800 text-xs font-semibold flex items-center gap-2 border border-red-200 shadow-sm">
          <span class="material-symbols-outlined text-[20px]">error</span>
          <span>${escapeHtml(error)}</span>
        </div>
      ` : ''}

      <form action="/admin/settings" method="POST" enctype="multipart/form-data" class="space-y-8">
        
        <!-- CARD 1: GLOBAL PHONE NUMBER -->
        <div class="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm p-6 sm:p-8 space-y-6">
          <div class="flex items-center gap-3 pb-4 border-b border-surface-container">
            <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[22px]">phone_in_talk</span>
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-bold text-primary">Everywhere Phone Number</h2>
              <p class="text-xs text-on-surface-variant">Synchronizes across the navbar, footer, CTA banners, free estimate modal, and contact links.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Formatted Display Phone -->
            <div>
              <label class="block text-xs font-bold text-primary mb-1.5" for="phone">
                Display Phone Number (Visible text) <span class="text-error">*</span>
              </label>
              <div class="relative flex items-center">
                <span class="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[18px]">call</span>
                <input type="text" id="phone" name="phone" required
                       value="${escapeHtml(settings.phone || '(502) 667-9020')}"
                       placeholder="(502) 667-9020"
                       class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40 font-mono font-bold" />
              </div>
              <p class="text-[11px] text-on-surface-variant mt-1.5">Formatted as shown to visitors, e.g. <code>(502) 667-9020</code></p>
            </div>

            <!-- Raw Number for tel: Links -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-bold text-primary" for="phone_raw">
                  Dialer Number (Link <code>tel:</code>) <span class="text-error">*</span>
                </label>
                <button type="button" id="btn-sync-raw" class="text-[11px] font-bold text-secondary hover:underline flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">auto_fix_high</span>
                  <span>Auto-clean from above</span>
                </button>
              </div>
              <div class="relative flex items-center">
                <span class="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[18px]">dialpad</span>
                <input type="text" id="phone_raw" name="phone_raw" required
                       value="${escapeHtml(settings.phone_raw || '5026679020')}"
                       placeholder="5026679020"
                       class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40 font-mono font-bold" />
              </div>
              <p class="text-[11px] text-on-surface-variant mt-1.5">Numbers only (no dashes/spaces), used for mobile one-tap calling.</p>
            </div>
          </div>

          <!-- Phone Live Preview Box -->
          <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-wrap items-center justify-between gap-4">
            <div>
              <span class="text-xs font-bold text-primary block">Live Call Button Preview</span>
              <span class="text-[11px] text-on-surface-variant">Here is how callers will see your button on the site:</span>
            </div>
            <div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-on-secondary font-bold text-xs shadow-sm">
              <span class="material-symbols-outlined text-[16px]">call</span>
              <span id="preview-phone-text">Call: ${escapeHtml(settings.phone || '(502) 667-9020')}</span>
            </div>
          </div>
        </div>

        <!-- CARD 2: HERO SECTION TEXTS (BILINGUAL) -->
        <div class="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm p-6 sm:p-8 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[22px]">view_headline</span>
              </div>
              <div>
                <h2 class="text-base sm:text-lg font-bold text-primary">Hero Section Content (Bilingual)</h2>
                <p class="text-xs text-on-surface-variant">Set titles and messages for both English and Spanish visitors.</p>
              </div>
            </div>

            <!-- Tab Switcher -->
            <div class="flex items-center p-1 bg-surface-container rounded-xl w-fit">
              <button type="button" id="tab-en-btn" onclick="switchLangTab('en')" class="px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-on-primary transition-all flex items-center gap-1.5">
                <span>🇺🇸 English</span>
              </button>
              <button type="button" id="tab-es-btn" onclick="switchLangTab('es')" class="px-4 py-1.5 rounded-lg text-xs font-bold text-on-surface-variant hover:text-primary transition-all flex items-center gap-1.5">
                <span>🇲🇽 Español</span>
              </button>
            </div>
          </div>

          <!-- ENGLISH FIELDS CONTAINER -->
          <div id="lang-en-panel" class="space-y-6">
            <div class="flex items-center gap-2 text-xs font-bold text-secondary">
              <span class="material-symbols-outlined text-[16px]">flag</span>
              <span>English Hero Content</span>
            </div>

            <!-- Hero Badge EN -->
            <div>
              <label class="block text-xs font-bold text-primary mb-1.5" for="hero_badge_en">
                Eyebrow Badge (English)
              </label>
              <input type="text" id="hero_badge_en" name="hero_badge_en"
                     value="${escapeHtml(settings.hero_badge_en || '')}"
                     placeholder="About D&amp;G Mendez Landscaping."
                     class="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
              <p class="text-[11px] text-on-surface-variant mt-1">Small pill badge shown right above the main headline.</p>
            </div>

            <!-- Hero Title EN -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-bold text-primary" for="hero_title_en">
                  Main Headline (English)
                </label>
                <div class="flex items-center gap-2">
                  <button type="button" onclick="insertHeroTag('hero_title_en', 'break')" class="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-primary">
                    + Line Break
                  </button>
                  <button type="button" onclick="insertHeroTag('hero_title_en', 'highlight')" class="text-[11px] font-semibold px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container hover:opacity-90">
                    + Green Highlight
                  </button>
                </div>
              </div>
              <textarea id="hero_title_en" name="hero_title_en" rows="2"
                        class="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40 font-mono">${escapeHtml(settings.hero_title_en || '')}</textarea>
              <p class="text-[11px] text-on-surface-variant mt-1">Supports HTML styling (e.g. <code>&lt;span class="text-secondary font-medium"&gt;Green text&lt;/span&gt;</code>).</p>
            </div>

            <!-- Hero Description EN -->
            <div>
              <label class="block text-xs font-bold text-primary mb-1.5" for="hero_desc_en">
                Introduction Paragraph (English)
              </label>
              <textarea id="hero_desc_en" name="hero_desc_en" rows="3"
                        class="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40">${escapeHtml(settings.hero_desc_en || '')}</textarea>
            </div>

            <!-- Floating Card Badge & Title EN -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-surface-container">
              <div>
                <label class="block text-xs font-bold text-primary mb-1" for="hero_card_badge_en">Card Badge (Over Photo)</label>
                <input type="text" id="hero_card_badge_en" name="hero_card_badge_en"
                       value="${escapeHtml(settings.hero_card_badge_en || 'Louisville Ky.')}"
                       class="w-full px-3.5 py-2 rounded-xl bg-surface text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
              </div>
              <div>
                <label class="block text-xs font-bold text-primary mb-1" for="hero_card_title_en">Card Slogan (Over Photo)</label>
                <input type="text" id="hero_card_title_en" name="hero_card_title_en"
                       value="${escapeHtml(settings.hero_card_title_en || 'Projects with experience and confidence')}"
                       class="w-full px-3.5 py-2 rounded-xl bg-surface text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
              </div>
            </div>
          </div>

          <!-- SPANISH FIELDS CONTAINER -->
          <div id="lang-es-panel" class="space-y-6 hidden">
            <div class="flex items-center gap-2 text-xs font-bold text-secondary">
              <span class="material-symbols-outlined text-[16px]">flag</span>
              <span>Contenido del Hero en Español</span>
            </div>

            <!-- Hero Badge ES -->
            <div>
              <label class="block text-xs font-bold text-primary mb-1.5" for="hero_badge_es">
                Antetítulo / Insignia (Español)
              </label>
              <input type="text" id="hero_badge_es" name="hero_badge_es"
                     value="${escapeHtml(settings.hero_badge_es || '')}"
                     placeholder="Acerca de D&amp;G Mendez Landscaping."
                     class="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
            </div>

            <!-- Hero Title ES -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-bold text-primary" for="hero_title_es">
                  Título Principal (Español)
                </label>
                <div class="flex items-center gap-2">
                  <button type="button" onclick="insertHeroTag('hero_title_es', 'break')" class="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-primary">
                    + Salto de Línea
                  </button>
                  <button type="button" onclick="insertHeroTag('hero_title_es', 'highlight')" class="text-[11px] font-semibold px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container hover:opacity-90">
                    + Resaltar en Verde
                  </button>
                </div>
              </div>
              <textarea id="hero_title_es" name="hero_title_es" rows="2"
                        class="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40 font-mono">${escapeHtml(settings.hero_title_es || '')}</textarea>
            </div>

            <!-- Hero Description ES -->
            <div>
              <label class="block text-xs font-bold text-primary mb-1.5" for="hero_desc_es">
                Párrafo de Introducción (Español)
              </label>
              <textarea id="hero_desc_es" name="hero_desc_es" rows="3"
                        class="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40">${escapeHtml(settings.hero_desc_es || '')}</textarea>
            </div>

            <!-- Floating Card Badge & Title ES -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-surface-container">
              <div>
                <label class="block text-xs font-bold text-primary mb-1" for="hero_card_badge_es">Insignia sobre Foto (Español)</label>
                <input type="text" id="hero_card_badge_es" name="hero_card_badge_es"
                       value="${escapeHtml(settings.hero_card_badge_es || 'Louisville Ky.')}"
                       class="w-full px-3.5 py-2 rounded-xl bg-surface text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
              </div>
              <div>
                <label class="block text-xs font-bold text-primary mb-1" for="hero_card_title_es">Eslogan sobre Foto (Español)</label>
                <input type="text" id="hero_card_title_es" name="hero_card_title_es"
                       value="${escapeHtml(settings.hero_card_title_es || 'Proyectos con experiencia y confianza')}"
                       class="w-full px-3.5 py-2 rounded-xl bg-surface text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
              </div>
            </div>
          </div>
        </div>

        <!-- CARD 3: HERO PANORAMIC IMAGE -->
        <div class="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm p-6 sm:p-8 space-y-6">
          <div class="flex items-center gap-3 pb-4 border-b border-surface-container">
            <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[22px]">panorama</span>
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-bold text-primary">Hero Background Image</h2>
              <p class="text-xs text-on-surface-variant">The high-impact panoramic showcase photo displayed prominently at the top of the homepage.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <!-- Current Image Preview -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-primary">Current Preview</label>
              <div class="relative w-full h-44 rounded-xl overflow-hidden border border-surface-container shadow-inner bg-surface-container">
                <img id="hero-img-preview" src="${escapeHtml(currentHeroImg)}" 
                     alt="Hero Preview" 
                     class="w-full h-full object-cover" />
              </div>
            </div>

            <!-- Upload / URL Options -->
            <div class="lg:col-span-2 space-y-4">
              <!-- Upload File -->
              <div>
                <label class="block text-xs font-bold text-primary mb-1.5" for="hero_image_file">
                  Upload New Photo (from your device)
                </label>
                <input type="file" id="hero_image_file" name="hero_image_file" accept="image/*"
                       onchange="previewUploadedHero(event)"
                       class="block w-full text-xs text-on-surface-variant file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-on-primary hover:file:bg-secondary cursor-pointer border border-surface-container rounded-xl p-1 bg-surface" />
                <p class="text-[11px] text-on-surface-variant mt-1">Recommended: 1920x800 or larger landscape ratio (JPG, PNG, WEBP).</p>
              </div>

              <!-- Or Custom URL -->
              <div>
                <label class="block text-xs font-bold text-primary mb-1.5" for="hero_image_url">
                  Or External Image URL
                </label>
                <div class="relative flex items-center">
                  <span class="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[18px]">link</span>
                  <input type="url" id="hero_image_url" name="hero_image_url"
                         value="${escapeHtml(settings.hero_image || '')}"
                         placeholder="https://images.unsplash.com/photo-..."
                         oninput="previewHeroUrl(this.value)"
                         class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface text-on-surface text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ACTION BAR -->
        <div class="sticky bottom-4 bg-surface-container-lowest/95 backdrop-blur-md p-4 rounded-2xl border border-surface-container shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2 text-xs text-on-surface-variant">
            <span class="material-symbols-outlined text-[18px] text-secondary">info</span>
            <span>All changes take effect immediately on public pages.</span>
          </div>
          <button type="submit" class="w-full sm:w-auto justify-center px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-secondary transition-all shadow-md flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">save</span>
            <span>Save All Site Settings</span>
          </button>
        </div>

      </form>
    </div>

    <!-- Client-side tab & preview helpers -->
    <script>
      function switchLangTab(lang) {
        const enBtn = document.getElementById('tab-en-btn');
        const esBtn = document.getElementById('tab-es-btn');
        const enPanel = document.getElementById('lang-en-panel');
        const esPanel = document.getElementById('lang-es-panel');

        if (lang === 'en') {
          enPanel.classList.remove('hidden');
          esPanel.classList.add('hidden');
          enBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-on-primary transition-all flex items-center gap-1.5';
          esBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-bold text-on-surface-variant hover:text-primary transition-all flex items-center gap-1.5';
        } else {
          esPanel.classList.remove('hidden');
          enPanel.classList.add('hidden');
          esBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-on-primary transition-all flex items-center gap-1.5';
          enBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-bold text-on-surface-variant hover:text-primary transition-all flex items-center gap-1.5';
        }
      }

      function insertHeroTag(fieldId, type) {
        const textarea = document.getElementById(fieldId);
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = textarea.value.substring(start, end);
        let tag = '';
        if (type === 'break') {
          tag = ' <br class="hidden sm:inline"/> ';
        } else if (type === 'highlight') {
          tag = '<span class="text-secondary font-medium">' + (selected || 'Highlighted Text') + '</span>';
        }
        textarea.setRangeText(tag, start, end, 'end');
        textarea.focus();
      }

      // Sync raw digits
      const btnSyncRaw = document.getElementById('btn-sync-raw');
      if (btnSyncRaw) {
        btnSyncRaw.addEventListener('click', () => {
          const phoneVal = document.getElementById('phone').value;
          const clean = phoneVal.replace(/[^0-9]/g, '');
          document.getElementById('phone_raw').value = clean;
        });
      }

      // Live phone preview update
      const phoneInput = document.getElementById('phone');
      const previewPhoneText = document.getElementById('preview-phone-text');
      if (phoneInput && previewPhoneText) {
        phoneInput.addEventListener('input', (e) => {
          previewPhoneText.textContent = 'Call: ' + (e.target.value.trim() || '(502) 000-0000');
        });
      }

      // Live image preview
      function previewUploadedHero(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            document.getElementById('hero-img-preview').src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      }

      function previewHeroUrl(url) {
        if (url && url.trim().startsWith('http')) {
          document.getElementById('hero-img-preview').src = url.trim();
        }
      }
    </script>
  `;
}

module.exports = {
  renderBlogList,
  renderBlogPost,
  renderAdminLayout,
  renderAdminLogin,
  renderAdminDashboard,
  renderAdminPosts,
  renderAdminPostForm,
  renderAdminLeads,
  renderAdminSettings
};
