const multer = require("multer");
const path = require("path");

//
// === IMAGE UPLOAD ===
//
const imageStorage = multer.diskStorage({
  destination: "./public/uploads/images",
  filename: function (req, file, cb) {
    cb(null, "image-" + Date.now() + path.extname(file.originalname));
  },
});

function checkImageFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /image\/jpeg|image\/jpg|image\/png|image\/webp/.test(file.mimetype);

  if (mimetype && extname) cb(null, true);
  else cb(new Error("Xato: Faqat rasm fayllarini yuklash mumkin (jpg, png, webp)"));
}

exports.uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: function (req, file, cb) {
    checkImageFileType(file, cb);
  },
});

//
// === GIF UPLOAD ===
//
const gifStorage = multer.diskStorage({
  destination: "./public/uploads/gifs",
  filename: function (req, file, cb) {
    cb(null, "gif-" + Date.now() + path.extname(file.originalname));
  },
});

function checkGifFileType(file, cb) {
  const extname = path.extname(file.originalname).toLowerCase() === ".gif";
  const mimetype = file.mimetype === "image/gif";

  if (mimetype && extname) cb(null, true);
  else cb(new Error("Xato: Faqat GIF faylini yuklash mumkin"));
}

exports.uploadGif = multer({
  storage: gifStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: function (req, file, cb) {
    checkGifFileType(file, cb);
  },
});

//
// === VIDEO UPLOAD ===
//
const videoStorage = multer.diskStorage({
  destination: "./public/uploads/videos",
  filename: function (req, file, cb) {
    cb(null, "video-" + Date.now() + path.extname(file.originalname));
  },
});

function checkVideoFileType(file, cb) {
  const filetypes = /mp4|mov|avi|mkv|webm/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /video\/mp4|video\/quicktime|video\/x-msvideo|video\/x-matroska|video\/webm/.test(file.mimetype);

  if (mimetype && extname) cb(null, true);
  else cb(new Error("Xato: Faqat video fayllarini yuklash mumkin (mp4, mov, avi, mkv, webm)"));
}

exports.uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 500MB
  fileFilter: function (req, file, cb) {
    checkVideoFileType(file, cb);
  },
});

//
// === ALL FILE ===
//
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "file-" + Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 500MB
});
