const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const MIME_TYPES = {
  "image/jpg": "webp",
  "image/jpeg": "webp",
  "image/png": "webp",
  "image/webp": "webp",
};

const storage = multer.memoryStorage();

module.exports = (req, res, next) => {
  multer({ storage: storage }).single("image")(req, res, (err) => {
    if (err) return next(err);
    if (!req.file) return next();

    const originalName = path.parse(req.file.originalname).name;
    const safeName = originalName.replace(/\s+/g, "_");
    const filename = `${safeName}_${Date.now()}.webp`;

    sharp(req.file.buffer)
      .resize(800, 500, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(__dirname, "..", "images", filename))
      .then(() => {
        req.file.filename = filename;
        next();
      })
      .catch((error) => next(error));
  });
};
