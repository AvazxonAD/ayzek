const multer = require("multer");
const path = require("path");

// === FILE TYPE CHECK ===
function checkFileType(file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  // Image (jpg, jpeg, png, webp)
  if (/(.jpg|.jpeg|.png|.webp)$/.test(ext) && /^image\/(jpe?g|png|webp)$/.test(mime)) {
    return cb(null, true);
  }

  // GIF
  if (ext === ".gif" && mime === "image/gif") {
    return cb(null, true);
  }

  // Video (mp4, mov, avi, mkv, webm)
  if (
    /(.mp4|.mov|.avi|.mkv|.webm)$/.test(ext) &&
    /^(video\/mp4|video\/quicktime|video\/x-msvideo|video\/x-matroska|video\/webm)$/.test(mime)
  ) {
    return cb(null, true);
  }

  // Agar mos kelmasa
  return cb(new Error("Xato: Ruxsat etilmagan fayl turi"));
}

// === STORAGE ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith("image/") && file.mimetype !== "image/gif") {
      cb(null, "./public/uploads/images");
    } else if (file.mimetype === "image/gif") {
      cb(null, "./public/uploads/gifs");
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, "./public/uploads/videos");
    } else {
      cb(new Error("Xato: Noto‘g‘ri fayl turi"), false);
    }
  },
  filename: function (req, file, cb) {
    const prefix =
      file.mimetype.startsWith("image/") && file.mimetype !== "image/gif" ? "image" : file.mimetype === "image/gif" ? "gif" : "video";

    cb(null, `${prefix}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// === UPLOAD ===
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // max 100MB (umumiy limit)
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// === EXPORT ===
exports.multiUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "gif", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);
