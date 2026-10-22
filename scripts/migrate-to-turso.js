// =============================================
// TURSO DATABASE MIGRATION SCRIPT
// Copies all data from local SQLite to Turso Cloud
// D&G Mendez Landscaping LLC
// =============================================

const path = require('path');
const fs = require('fs');
const { createClient } = require('@libsql/client');

async function migrate() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  if (!tursoUrl || !tursoToken) {
    console.error('❌ Error: Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN');
    console.log('\nUsage:');
    console.log('  TURSO_DATABASE_URL="libsql://your-db.turso.io" TURSO_AUTH_TOKEN="your-token" node scripts/migrate-to-turso.js\n');
    process.exit(1);
  }

  const localDbPath = path.join(__dirname, '..', 'data', 'database.sqlite');
  if (!fs.existsSync(localDbPath)) {
    console.error('❌ Error: Local database file not found at:', localDbPath);
    process.exit(1);
  }

  console.log('📦 Connecting to local SQLite database...');
  const localClient = createClient({ url: 'file:' + localDbPath });

  console.log('☁️ Connecting to Turso Cloud database (' + tursoUrl + ')...');
  const remoteClient = createClient({
    url: tursoUrl,
    authToken: tursoToken
  });

  // 1. Create tables on Turso
  console.log('🔨 Creating schema on Turso...');
  await remoteClient.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await remoteClient.execute(`
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

  await remoteClient.execute(`
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

  await remoteClient.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // 2. Migrate Settings
  console.log('⚙️ Migrating settings...');
  const settingsRes = await localClient.execute('SELECT key, value FROM settings');
  for (const row of settingsRes.rows) {
    await remoteClient.execute({
      sql: 'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
      args: [row.key, row.value]
    });
  }
  console.log(`   ✅ Migrated ${settingsRes.rows.length} settings.`);

  // 3. Migrate Users
  console.log('👤 Migrating admin users...');
  const usersRes = await localClient.execute('SELECT username, password_hash, name FROM users');
  for (const row of usersRes.rows) {
    await remoteClient.execute({
      sql: 'INSERT INTO users (username, password_hash, name) VALUES (?, ?, ?) ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash, name = excluded.name',
      args: [row.username, row.password_hash, row.name]
    });
  }
  console.log(`   ✅ Migrated ${usersRes.rows.length} admin user(s).`);

  // 4. Migrate Posts
  console.log('📖 Migrating blog posts...');
  const postsRes = await localClient.execute('SELECT title, slug, summary, content, cover_image, images, category, location, published, created_at, updated_at FROM posts');
  for (const row of postsRes.rows) {
    await remoteClient.execute({
      sql: `INSERT INTO posts (title, slug, summary, content, cover_image, images, category, location, published, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(slug) DO UPDATE SET 
              title = excluded.title,
              summary = excluded.summary,
              content = excluded.content,
              cover_image = excluded.cover_image,
              images = excluded.images,
              category = excluded.category,
              location = excluded.location,
              published = excluded.published,
              updated_at = excluded.updated_at`,
      args: [
        row.title,
        row.slug,
        row.summary,
        row.content,
        row.cover_image,
        row.images,
        row.category,
        row.location,
        row.published,
        row.created_at,
        row.updated_at
      ]
    });
  }
  console.log(`   ✅ Migrated ${postsRes.rows.length} blog post(s).`);

  // 5. Migrate Leads
  console.log('📬 Migrating customer leads...');
  const leadsRes = await localClient.execute('SELECT name, email, phone, service, zip_code, message, status, created_at FROM leads');
  for (const row of leadsRes.rows) {
    await remoteClient.execute({
      sql: 'INSERT INTO leads (name, email, phone, service, zip_code, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      args: [row.name, row.email, row.phone, row.service, row.zip_code, row.message, row.status, row.created_at]
    });
  }
  console.log(`   ✅ Migrated ${leadsRes.rows.length} lead(s).`);

  console.log('\n🎉 SUCCESS: All data has been successfully migrated to Turso Cloud!');
}

migrate().catch((err) => {
  console.error('\n❌ Migration failed:', err);
  process.exit(1);
});
