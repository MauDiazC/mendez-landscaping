// =============================================
// DATABASE INITIALIZATION & MODELS
// D&G Mendez Landscaping LLC - CMS
// =============================================

const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'database.sqlite');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency and performance
db.pragma('journal_mode = WAL');

// Initialize Tables
function initDatabase() {
  // 1. Users Table (Admin authentication)
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Posts Table (Blog / Case Studies / Projects)
  db.exec(`
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

  // Migration: ensure `images` column exists if table was created previously
  const postCols = db.prepare("PRAGMA table_info(posts)").all();
  if (!postCols.some(c => c.name === 'images')) {
    db.exec("ALTER TABLE posts ADD COLUMN images TEXT DEFAULT '[]'");
  }

  // Populate images from cover_image for legacy posts if empty
  const postsWithoutImages = db.prepare("SELECT id, cover_image FROM posts WHERE images IS NULL OR images = '[]' OR images = ''").all();
  const updateImagesStmt = db.prepare("UPDATE posts SET images = ? WHERE id = ?");
  for (const p of postsWithoutImages) {
    if (p.cover_image) {
      updateImagesStmt.run(JSON.stringify([p.cover_image]), p.id);
    }
  }

  // 3. Leads Table (Estimates & Inquiries)
  db.exec(`
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
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // Seed default settings if empty
  const defaultSettings = {
    phone: '(502) 667-9020',
    phone_raw: '5026679020',
    hero_badge_en: 'About D&G Mendez Landscaping.',
    hero_badge_es: 'Acerca de D&G Mendez Landscaping.',
    hero_title_en: 'Thoughtful Landscaping. <br class="hidden sm:inline"/><span class="text-secondary font-medium">Lasting Impressions.</span>',
    hero_title_es: 'Jardinería con Propósito. <br class="hidden sm:inline"/><span class="text-secondary font-medium">Impresiones Duraderas.</span>',
    hero_desc_en: 'Founded on the belief that residential outdoor spaces should be enduring living extensions of the home, crafted with horticultural integrity, architectural precision, and respectful client partnerships. We bridge the gap between botanical science, soil vitality, and generational stonework.',
    hero_desc_es: 'Fundados en la convicción de que los espacios exteriores residenciales deben ser extensiones vivas y perdurables del hogar, elaboradas con integridad hortícola, precisión arquitectónica y relaciones de confianza con el cliente. Unimos la ciencia botánica, la vitalidad del suelo y el trabajo en piedra generacional.',
    hero_card_badge_en: 'Louisville Ky.',
    hero_card_badge_es: 'Louisville Ky.',
    hero_card_title_en: 'Projects with experience and confidence',
    hero_card_title_es: 'Proyectos con experiencia y confianza',
    hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlXfNmbD5_3CENgXQiK8syx9NB2Eo5Yg2x8pVOaHQOSN8lsvREwcJeI5NlC_1AhSzKuA49bqUFJFQ7x37pJIu9t-ERjp7AeHcazcl6HYW3-bsaXO-GJNwYsnQz4RWTEQX2qNRplhKpObOp-Anv9E-F7_yGR2Mmp1eeNkzJWGWaFn26tJNQh9HKPeFXG4qXyhQCCZR-5ADSyVBvtNVj1KjQfjqWOSGxJOmb1dZqQApWB0Sq0rlIEkmG'
  };

  const insertSettingStmt = db.prepare(`
    INSERT OR IGNORE INTO settings (key, value)
    VALUES (?, ?)
  `);

  for (const [k, v] of Object.entries(defaultSettings)) {
    insertSettingStmt.run(k, v);
  }

  // Seed default admin if none exists
  const existingUser = db.prepare('SELECT id FROM users LIMIT 1').get();
  if (!existingUser) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'mendez2026!';
    const passwordHash = bcrypt.hashSync(defaultPassword, 10);
    db.prepare(`
      INSERT INTO users (username, password_hash, name)
      VALUES (?, ?, ?)
    `).run('admin', passwordHash, 'Henry Mendez');
    console.log('[DB] Created default admin user: "admin" / password: "' + defaultPassword + '"');
  }

  // Seed sample blog posts if none exist
  const existingPost = db.prepare('SELECT id FROM posts LIMIT 1').get();
  if (!existingPost) {
    const samplePosts = [
      {
        title: 'Transforming an Anchorage Estate with Terraced Bluestone Hardscaping',
        slug: 'transforming-anchorage-estate-terrace-bluestone',
        summary: 'How our master masonry team leveled a 12-degree hillside slope into a multi-tiered outdoor living retreat using thermal bluestone and native Kentucky perennials.',
        category: 'Hardscaping',
        location: 'Anchorage, KY',
        cover_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmVlZCnM30MBDzA1xuyFwHKPiCkWg7idjlBFdfe1gt8A5kIxo-6FY2qOZU9vpVobHrBl8YDdrftikO95mcW7_SqC40jB1T0Dq80lscSwbsjj6kH1r4BQWhX8R10a8bSA0Rn44jy6XyQsMrRJrASh3gXP_Z2XJ3lwx6Yg1zDixgofpxzY5gqzfnK3PlDMzQNVzfLhYwWXWMD6qbiEuufqY_Jby7BOylM7r7_JyIjWVBjsv0WEXqir3D',
        content: `<h3>The Vision & Challenge</h3>
<p>Nestled in historic Anchorage, Kentucky, this 2.5-acre property featured a steep posterior gradient that made outdoor entertaining nearly impossible and caused aggressive stormwater erosion during spring rains.</p>

<h3>The Horticultural & Architectural Solution</h3>
<p>Our principal landscape architects designed a three-tier retaining wall system using hand-chiseled thermal bluestone, engineered with aggregate compaction bases twice the municipal standard to withstand decades of freeze-thaw cycles.</p>

<ul>
  <li><strong>Tier 1:</strong> Upper dining terrace with permeable bluestone joints and low-voltage recessed LED step lighting.</li>
  <li><strong>Tier 2:</strong> Botanical perennial border featuring shade-tolerant native ferns, creeping thyme, and specimen Japanese Maples.</li>
  <li><strong>Tier 3:</strong> Gentle slope transition leading to manicured Kentucky Bluegrass turf with sub-surface drainage pipes.</li>
</ul>

<h3>The Result</h3>
<p>A serene, multi-functional outdoor sanctuary that protects the home's foundation while adding significant architectural and aesthetic value to the estate.</p>`
      },
      {
        title: 'Precision Hillside Grading & Kentucky Bluegrass in Mockingbird Valley',
        slug: 'hillside-grading-kentucky-bluegrass-mockingbird-valley',
        summary: 'Subsoil aeration, organic compost amendments, and laser-guided grading to establish resilient Kentucky Bluegrass on a challenging valley slope.',
        category: 'Lawn Care',
        location: 'Mockingbird Valley, KY',
        cover_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ-LMPDvM-To05AXHIlFtTz_1YRs2AM7DPvGIKHLKm1C7By9CxqbrXOhxvnYvnk8fdmVUSM4sXEnny2W5BC1XWbsA1QqrEBWAc4JrEQAs4uFFWt5hXk6JTgIX0N2RkmqZjX_iZPVVhYIxHpmqUEvIe_lg8gkrQS3cwQGMiXvJbDZETzL58xW03yw-Eza_2bOEV9k36dnDt-BVCT3CjpTaaIGRB3CgKbpX4fGVK-UBF8B2hXB3WKDPd',
        content: `<h3>Microclimate & Soil Composition Audit</h3>
<p>In Mockingbird Valley, clay-dense subsoil often impedes drainage and causes turf disease during humid summer stretches. Before installing sod, our soil science crew conducted comprehensive core aeration and incorporated 4 inches of organic hardwood loam.</p>

<h3>Establishing Deep Root Systems</h3>
<p>We selected an elite blend of Kentucky Bluegrass optimized for the regional transition zone. By employing deep, infrequent watering cycles and zero-toxic-runoff organic mycorrhizal fertilizers, the lawn established roots reaching over 8 inches deep within 60 days.</p>

<p>Today, the property remains vibrantly green through both high summer heat and early winter frosts.</p>`
      },
      {
        title: 'Seasonal Ground Stewardship: Spring Preparation Guide for Kentuckiana',
        slug: 'spring-landscape-preparation-kentuckiana',
        summary: 'Essential checklist for Jefferson and Oldham County homeowners: pre-emergent weed control, dormant pruning, and proper mulch application depths.',
        category: 'Seasonal Guide',
        location: 'Greater Louisville, KY',
        cover_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHtj9BHo0ArUOrMPQoG8TbKe40PmqcBYIqTp_e5UvYQ2K0FZEZ1hRU9xabgXO04-wwdW5VWVFG5Pu-G2is6-Umznt_HUhTvTsBJqgH28D84fIm8Ma3BFmITbHbJEYzYNJ2qx8QaV7Y9GjEsmwHgCt9ZQ4jn79wJdrv4ofqZ-aI7KXdYtUjb9Td48lzB0HuPW7oanClGPVSbApTNN3TpNGRn_Pqo-ki7jtAOtwVFWhuVhhYog2mGb0t',
        content: `<h3>1. Clean Winter Debris & Assess Frost Heave</h3>
<p>Kentucky winters can dislodge root balls through recurrent freeze-thaw cycles. Walk your beds in early March to tamp down exposed perennials and remove fallen deadwood before new buds emerge.</p>

<h3>2. The Science of Mulching (Avoid the "Mulch Volcano")</h3>
<p>Never pile mulch against tree trunks. Maintain a 2 to 3-inch depth of double-shredded hardwood mulch, keeping a 3-inch perimeter around tree bark to prevent moisture rot and fungal infestations.</p>

<h3>3. Early Root Zone Fertilization</h3>
<p>Applying slow-release organic soil amendments before temperatures consistently break 65°F encourages strong root expansion before the intense summer sun demands maximum water uptake.</p>`
      }
    ];

    const insertStmt = db.prepare(`
      INSERT INTO posts (title, slug, summary, content, cover_image, category, location)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const post of samplePosts) {
      insertStmt.run(
        post.title,
        post.slug,
        post.summary,
        post.content,
        post.cover_image,
        post.category,
        post.location
      );
    }
    console.log('[DB] Seeded 3 sample Kentuckiana projects & guides.');
  }
}

initDatabase();

// Settings Helper Functions
function getSettings() {
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const settings = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return settings;
}

function updateSettings(newSettings) {
  const stmt = db.prepare(`
    INSERT INTO settings (key, value)
    VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);

  const transaction = db.transaction((items) => {
    for (const [key, val] of items) {
      if (val !== undefined && val !== null) {
        stmt.run(key, String(val));
      }
    }
  });

  transaction(Object.entries(newSettings));
  return getSettings();
}

db.getSettings = getSettings;
db.updateSettings = updateSettings;

module.exports = db;
