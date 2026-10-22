// =============================================
// DATABASE INITIALIZATION & MODELS (Turso Cloud + Local SQLite)
// D&G Mendez Landscaping LLC - CMS
// =============================================

const fs = require('fs');
const path = require('path');
const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');

const isTurso = Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);

// Ensure local directory exists for local development fallback
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

let client;
if (isTurso) {
  console.log(`☁️  [TURSO] Connecting to Turso Cloud Database: ${process.env.TURSO_DATABASE_URL}`);
  client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
  });
} else {
  const dbPath = path.join(dataDir, 'database.sqlite');
  console.log(`💾 [SQLITE] Connecting to Local SQLite Database: ${dbPath}`);
  client = createClient({
    url: 'file:' + dbPath
  });
}

// ---------------------------------------------
// Schema Initialization & Default Seeding
// ---------------------------------------------
async function initDatabase() {
  // 1. Users Table (Admin authentication)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Posts Table (Blog / Case Studies / Projects)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      summary TEXT,
      content TEXT NOT NULL,
      cover_image TEXT,
      images TEXT DEFAULT '[]',
      category TEXT DEFAULT 'Projects',
      location TEXT DEFAULT 'Louisville, KY',
      published INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Leads Table (Estimates & Inquiries)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      service TEXT,
      zip_code TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Settings Table (Hero section, contact numbers, site configuration)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // 5. Media Table (Permanent image storage in Turso Cloud / SQLite)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS media (
      filename TEXT PRIMARY KEY,
      mime_type TEXT NOT NULL,
      data BLOB NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default settings if empty
  const defaultSettings = {
    phone: '(502) 677-9020',
    phone_raw: '5026779020',
    hero_badge_en: 'About D&G Mendez Landscaping LLC.',
    hero_badge_es: 'Acerca de D&G Mendez Landscaping LLC.',
    hero_title_en: 'Thoughtful Landscaping. <br class="hidden sm:inline"/><span class="text-secondary font-medium">Lasting Impressions.</span>',
    hero_title_es: 'Jardinería con Propósito. <br class="hidden sm:inline"/><span class="text-secondary font-medium">Impresiones Duraderas.</span>',
    hero_desc_en: 'Residential outdoor spaces crafted with horticultural integrity.',
    hero_desc_es: 'Espacios exteriores residenciales con integridad hortícola.',
    hero_card_badge_en: 'Louisville Ky.',
    hero_card_badge_es: 'Louisville Ky.',
    hero_card_title_en: 'Projects with experience and confidence',
    hero_card_title_es: 'Proyectos con experiencia y confianza',
    hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlXfNmbD5_3CENgXQiK8syx9NB2Eo5Yg2x8pVOaHQOSN8lsvREwcJeI5NlC_1AhSzKuA49bqUFJFQ7x37pJIu9t-ERjp7AeHcazcl6HYW3-bsaXO-GJNwYsnQz4RWTEQX2qNRplhKpObOp-Anv9E-F7_yGR2Mmp1eeNkzJWGWaFn26tJNQh9HKPeFXG4qXyhQCCZR-5ADSyVBvtNVj1KjQfjqWOSGxJOmb1dZqQApWB0Sq0rlIEkmG'
  };

  for (const [k, v] of Object.entries(defaultSettings)) {
    await client.execute({
      sql: 'INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)',
      args: [k, v]
    });
  }

  // Seed default admin user if none exists
  const existingUserRes = await client.execute('SELECT id FROM users LIMIT 1');
  if (existingUserRes.rows.length === 0) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'mendez2026!';
    const passwordHash = bcrypt.hashSync(defaultPassword, 10);
    await client.execute({
      sql: 'INSERT INTO users (username, password_hash, name) VALUES (?, ?, ?)',
      args: ['admin', passwordHash, 'Henry Mendez']
    });
    console.log('[DB] Seeded default admin account (admin / mendez2026!)');
  }

  // Seed sample posts if empty
  const existingPostRes = await client.execute('SELECT id FROM posts LIMIT 1');
  if (existingPostRes.rows.length === 0) {
    const samplePosts = [
      {
        title: 'Transforming an Anchorage Estate with Terraced Bluestone Hardscaping',
        slug: 'transforming-anchorage-estate-terrace-bluestone',
        summary: 'How our master masonry team leveled a 12-degree hillside slope into a multi-tiered outdoor living retreat using thermal bluestone and native Kentucky perennials.',
        category: 'Hardscaping',
        location: 'Anchorage, KY',
        cover_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmVlZCnM30MBDzA1xuyFwHKPiCkWg7idjlBFdfe1gt8A5kIxo-6FY2qOZU9vpVobHrBl8YDdrftikO95mcW7_SqC40jB1T0Dq80lscSwbsjj6kH1r4BQWhX8R10a8bSA0Rn44jy6XyQsMrRJrASh3gXP_Z2XJ3lwx6Yg1zDixgofpxzY5gqzfnK3PlDMzQNVzfLhYwWXWMD6qbiEuufqY_Jby7BOylM7r7_JyIjWVBjsv0WEXqir3D',
        content: `<h3>The Vision & Challenge</h3>\n<p>Nestled in historic Anchorage, Kentucky, this 2.5-acre property featured a steep posterior gradient that made outdoor entertaining nearly impossible and caused aggressive stormwater erosion during spring rains.</p>\n\n<h3>The Horticultural & Architectural Solution</h3>\n<p>Our principal landscape architects designed a three-tier retaining wall system using hand-chiseled thermal bluestone, engineered with aggregate compaction bases twice the municipal standard to withstand decades of freeze-thaw cycles.</p>`
      },
      {
        title: 'Precision Hillside Grading & Kentucky Bluegrass in Mockingbird Valley',
        slug: 'hillside-grading-kentucky-bluegrass-mockingbird-valley',
        summary: 'Subsoil aeration, organic compost amendments, and laser-guided grading to establish resilient Kentucky Bluegrass on a challenging valley slope.',
        category: 'Lawn Care',
        location: 'Mockingbird Valley, KY',
        cover_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ-LMPDvM-To05AXHIlFtTz_1YRs2AM7DPvGIKHLKm1C7By9CxqbrXOhxvnYvnk8fdmVUSM4sXEnny2W5BC1XWbsA1QqrEBWAc4JrEQAs4uFFWt5hXk6JTgIX0N2RkmqZjX_iZPVVhYIxHpmqUEvIe_lg8gkrQS3cwQGMiXvJbDZETzL58xW03yw-Eza_2bOEV9k36dnDt-BVCT3CjpTaaIGRB3CgKbpX4fGVK-UBF8B2hXB3WKDPd',
        content: `<h3>Microclimate & Soil Composition Audit</h3>\n<p>In Mockingbird Valley, clay-dense subsoil often impedes drainage and causes turf disease during humid summer stretches. Before installing sod, our soil science crew conducted comprehensive core aeration and incorporated 4 inches of organic hardwood loam.</p>`
      },
      {
        title: 'Seasonal Ground Stewardship: Spring Preparation Guide for Kentuckiana',
        slug: 'spring-landscape-preparation-kentuckiana',
        summary: 'Essential checklist for Jefferson and Oldham County homeowners: pre-emergent weed control, dormant pruning, and proper mulch application depths.',
        category: 'Seasonal Guide',
        location: 'Greater Louisville, KY',
        cover_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHtj9BHo0ArUOrMPQoG8TbKe40PmqcBYIqTp_e5UvYQ2K0FZEZ1hRU9xabgXO04-wwdW5VWVFG5Pu-G2is6-Umznt_HUhTvTsBJqgH28D84fIm8Ma3BFmITbHbJEYzYNJ2qx8QaV7Y9GjEsmwHgCt9ZQ4jn79wJdrv4ofqZ-aI7KXdYtUjb9Td48lzB0HuPW7oanClGPVSbApTNN3TpNGRn_Pqo-ki7jtAOtwVFWhuVhhYog2mGb0t',
        content: `<h3>1. Clean Winter Debris & Assess Frost Heave</h3>\n<p>Kentucky winters can dislodge root balls through recurrent freeze-thaw cycles. Walk your beds in early March to tamp down exposed perennials and remove fallen deadwood before new buds emerge.</p>`
      }
    ];

    for (const p of samplePosts) {
      await client.execute({
        sql: `INSERT INTO posts (title, slug, summary, content, cover_image, images, category, location)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [p.title, p.slug, p.summary, p.content, p.cover_image, JSON.stringify([p.cover_image]), p.category, p.location]
      });
    }
    console.log('[DB] Seeded 3 sample Kentuckiana projects & guides.');
  }
}

// ---------------------------------------------
// Settings Methods
// ---------------------------------------------
async function getSettings() {
  const res = await client.execute('SELECT key, value FROM settings');
  const settings = {};
  for (const row of res.rows) {
    settings[row.key] = row.value;
  }
  return settings;
}

async function updateSettings(newSettings) {
  for (const [key, val] of Object.entries(newSettings)) {
    if (val !== undefined && val !== null) {
      await client.execute({
        sql: 'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
        args: [key, String(val)]
      });
    }
  }
  checkpoint();
  return getSettings();
}

// ---------------------------------------------
// Posts Methods
// ---------------------------------------------
async function getAllPosts() {
  const res = await client.execute('SELECT * FROM posts ORDER BY created_at DESC');
  return res.rows.map(r => ({ ...r }));
}

async function getPublishedPosts({ category, search } = {}) {
  let sql = 'SELECT * FROM posts WHERE published = 1';
  const args = [];

  if (category && category !== 'All') {
    sql += ' AND category = ?';
    args.push(category);
  }

  if (search && search.trim()) {
    sql += ' AND (title LIKE ? OR summary LIKE ? OR content LIKE ? OR location LIKE ?)';
    const pattern = `%${search.trim()}%`;
    args.push(pattern, pattern, pattern, pattern);
  }

  sql += ' ORDER BY created_at DESC';
  const res = await client.execute({ sql, args });
  return res.rows.map(r => ({ ...r }));
}

async function getPostBySlug(slug) {
  const res = await client.execute({
    sql: 'SELECT * FROM posts WHERE slug = ?',
    args: [slug]
  });
  return res.rows[0] ? { ...res.rows[0] } : null;
}

async function getPostById(id) {
  const res = await client.execute({
    sql: 'SELECT * FROM posts WHERE id = ?',
    args: [id]
  });
  return res.rows[0] ? { ...res.rows[0] } : null;
}

async function createPost({ title, slug, summary, content, cover_image, images, category, location, published }) {
  const imagesJson = typeof images === 'string' ? images : JSON.stringify(images || []);
  const res = await client.execute({
    sql: `INSERT INTO posts (title, slug, summary, content, cover_image, images, category, location, published)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      title,
      slug,
      summary || null,
      content,
      cover_image || null,
      imagesJson,
      category || 'Projects',
      location || 'Louisville, KY',
      published ? 1 : 0
    ]
  });
  checkpoint();
  return Number(res.lastInsertRowid);
}

async function updatePost(id, { title, slug, summary, content, cover_image, images, category, location, published }) {
  const imagesJson = typeof images === 'string' ? images : JSON.stringify(images || []);
  await client.execute({
    sql: `UPDATE posts SET title = ?, slug = ?, summary = ?, content = ?, cover_image = ?, images = ?, category = ?, location = ?, published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    args: [
      title,
      slug,
      summary || null,
      content,
      cover_image || null,
      imagesJson,
      category || 'Projects',
      location || 'Louisville, KY',
      published ? 1 : 0,
      id
    ]
  });
  checkpoint();
}

async function deletePost(id) {
  try {
    const post = await getPostById(id);
    if (post && post.images) {
      const imgs = JSON.parse(post.images || '[]');
      for (const img of imgs) {
        if (typeof img === 'string' && img.startsWith('/uploads/')) {
          const fn = img.replace('/uploads/', '');
          await deleteMedia(fn).catch(() => {});
        }
      }
    }
    if (post && post.cover_image && post.cover_image.startsWith('/uploads/')) {
      const fn = post.cover_image.replace('/uploads/', '');
      await deleteMedia(fn).catch(() => {});
    }
  } catch (e) {}
  await client.execute({ sql: 'DELETE FROM posts WHERE id = ?', args: [id] });
  checkpoint();
}

async function getCategories() {
  const res = await client.execute('SELECT DISTINCT category FROM posts WHERE published = 1');
  return ['All', ...res.rows.map(r => r.category).filter(Boolean)];
}

async function getRecentPosts(limit = 4) {
  const res = await client.execute({
    sql: 'SELECT id, title, slug, summary, cover_image, category, location, created_at FROM posts WHERE published = 1 ORDER BY created_at DESC LIMIT ?',
    args: [limit]
  });
  return res.rows.map(r => ({ ...r }));
}

// ---------------------------------------------
// Leads Methods
// ---------------------------------------------
async function getAllLeads() {
  const res = await client.execute('SELECT * FROM leads ORDER BY created_at DESC');
  return res.rows.map(r => ({ ...r }));
}

async function getRecentLeads(limit = 5) {
  const res = await client.execute({
    sql: 'SELECT * FROM leads ORDER BY created_at DESC LIMIT ?',
    args: [limit]
  });
  return res.rows.map(r => ({ ...r }));
}

async function createLead({ name, email, phone, service, zip_code, message }) {
  const res = await client.execute({
    sql: 'INSERT INTO leads (name, email, phone, service, zip_code, message) VALUES (?, ?, ?, ?, ?, ?)',
    args: [name, email || null, phone || null, service || null, zip_code || null, message || null]
  });
  checkpoint();
  return Number(res.lastInsertRowid);
}

async function updateLeadStatus(id, status) {
  await client.execute({
    sql: 'UPDATE leads SET status = ? WHERE id = ?',
    args: [status, id]
  });
  checkpoint();
}

async function getStats() {
  const postsRes = await client.execute('SELECT COUNT(*) as count FROM posts');
  const leadsRes = await client.execute('SELECT COUNT(*) as count FROM leads');
  const newLeadsRes = await client.execute("SELECT COUNT(*) as count FROM leads WHERE status = 'new'");

  return {
    totalPosts: Number(postsRes.rows[0]?.count || 0),
    totalLeads: Number(leadsRes.rows[0]?.count || 0),
    newLeads: Number(newLeadsRes.rows[0]?.count || 0)
  };
}

// ---------------------------------------------
// User Methods
// ---------------------------------------------
async function getUserByUsername(username) {
  const res = await client.execute({
    sql: 'SELECT * FROM users WHERE username = ?',
    args: [username]
  });
  return res.rows[0] ? { ...res.rows[0] } : null;
}

// ---------------------------------------------
// Media Storage Methods (Turso Cloud BLOB + Local Disk Cache)
// ---------------------------------------------
async function saveMedia(filename, mimeType, buffer) {
  // Convert Node.js Buffer to ArrayBuffer for Libsql client
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  await client.execute({
    sql: 'INSERT OR REPLACE INTO media (filename, mime_type, data) VALUES (?, ?, ?)',
    args: [filename, mimeType || 'image/jpeg', arrayBuffer]
  });
  checkpoint();
}

async function getMedia(filename) {
  const res = await client.execute({
    sql: 'SELECT filename, mime_type, data FROM media WHERE filename = ?',
    args: [filename]
  });
  if (res.rows.length === 0) return null;
  const row = res.rows[0];
  return {
    filename: row.filename,
    mimeType: row.mime_type,
    data: Buffer.from(row.data)
  };
}

async function deleteMedia(filename) {
  await client.execute({
    sql: 'DELETE FROM media WHERE filename = ?',
    args: [filename]
  });
  checkpoint();
  try {
    const localFile = path.join(uploadsDir, filename);
    if (fs.existsSync(localFile)) {
      fs.unlinkSync(localFile);
    }
  } catch (e) {}
}

async function saveUploadedFile(file) {
  if (!file || !file.buffer) return null;
  const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg';
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e5);
  const filename = `img-${uniqueSuffix}${ext}`;
  file.filename = filename;

  // 1. Save directly into Turso Cloud database as binary BLOB
  await saveMedia(filename, file.mimetype || 'image/jpeg', file.buffer);

  // 2. Also cache to local filesystem for high-speed serving during container lifetime
  try {
    const localPath = path.join(uploadsDir, filename);
    await fs.promises.writeFile(localPath, file.buffer);
  } catch (err) {
    console.warn('[UPLOAD] Local cache write bypassed:', err.message);
  }

  return `/uploads/${filename}`;
}

function checkpoint() {
  // On Turso, transactions commit immediately to cloud; for local file, checkpoint WAL
  if (!isTurso) {
    try {
      client.execute('PRAGMA wal_checkpoint(PASSIVE)');
    } catch (e) {}
  }
}

module.exports = {
  isTurso,
  client,
  initDatabase,
  getSettings,
  updateSettings,
  getAllPosts,
  getPublishedPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCategories,
  getRecentPosts,
  getAllLeads,
  getRecentLeads,
  createLead,
  updateLeadStatus,
  getStats,
  getUserByUsername,
  saveMedia,
  getMedia,
  deleteMedia,
  saveUploadedFile,
  checkpoint
};
