// =============================================
// MULTER IMAGE UPLOAD CONFIGURATION (In-Memory for Turso Cloud persistence)
// D&G Mendez Landscaping LLC - CMS
// =============================================

const path = require('path');
const multer = require('multer');

// Store in memory buffer so we can persist binary data into Turso Cloud Database
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  const mime = file.mimetype;
  if (allowed.test(ext) && (mime.startsWith('image/') || allowed.test(mime))) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, jpeg, png, webp, gif) are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

module.exports = upload;
