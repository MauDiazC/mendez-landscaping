// =============================================
// AUTHENTICATION HELPER & MIDDLEWARE
// D&G Mendez Landscaping LLC - CMS
// =============================================

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('./db');

const SESSION_SECRET = process.env.SESSION_SECRET || 'dg-mendez-secure-secret-key-2026';
const COOKIE_NAME = 'dg_admin_session';

// Create a secure token signature
function signToken(userId, username) {
  const payload = `${userId}:${username}:${Date.now()}`;
  const hmac = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${hmac}`).toString('base64');
}

// Verify session token
function verifyToken(token) {
  try {
    if (!token) return null;
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length !== 4) return null;
    const [userId, username, timestamp, hmac] = parts;

    // Check expiration (7 days)
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > 7 * 24 * 60 * 60 * 1000) return null;

    const payload = `${userId}:${username}:${timestamp}`;
    const expectedHmac = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');

    if (crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac))) {
      return { id: parseInt(userId, 10), username };
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Authentication middleware
function requireAuth(req, res, next) {
  const token = req.cookies ? req.cookies[COOKIE_NAME] : null;
  const user = verifyToken(token);

  if (!user) {
    if (req.xhr || req.headers.accept?.includes('json')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.redirect('/admin/login');
  }

  req.user = user;
  res.locals.user = user;
  next();
}

// Authenticate user with username and password
function authenticateUser(username, password) {
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) return null;

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) return null;

  return { id: user.id, username: user.username, name: user.name };
}

module.exports = {
  COOKIE_NAME,
  signToken,
  verifyToken,
  requireAuth,
  authenticateUser
};
