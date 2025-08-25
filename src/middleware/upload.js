const multer = require("multer");
const path = require("path");

const excelStorage = multer.diskStorage({
  destination: "./public/uploads/excel",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const videoStorage = multer.diskStorage({
  destination: "./public/uploads/videos",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const mdbStorage = multer.diskStorage({
  destination: "./public/uploads/mdb",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const imageStorage = multer.diskStorage({
  destination: "./public/uploads/images",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

function checkExcelFileType(file, cb) {
  const filetypes = /xlsx|xls/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|application\/vnd\.ms-excel/.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Xato: Faqat excel fayllarini yuklash mumkin"));
  }
}

function checkVideoFileType(file, cb) {
  const filetypes = /mp4|avi|mkv|mov/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /video\/mp4|video\/x-msvideo|video\/x-matroska|video\/quicktime/.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Xato: Faqat video fayllarini yuklash mumkin"));
  }
}

function checkMDBFileType(file, cb) {
  const filetypes = /mdb|accdb/; // .mdb eski, .accdb yangi format
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /application\/octet-stream|application\/x-msaccess/.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Xato: Faqat .mdb yoki .accdb fayllarni yuklash mumkin"));
  }
}

function checkImageFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /image\/jpeg|image\/jpg|image\/png|image\/gif|image\/webp/.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Xato: Faqat rasm fayllarini yuklash mumkin (jpg, png, gif, webp)"));
  }
}

exports.uploadExcel = multer({
  storage: excelStorage,
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
    checkExcelFileType(file, cb);
  },
});

exports.uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 1073741824 },
  fileFilter: function (req, file, cb) {
    checkVideoFileType(file, cb);
  },
});

exports.uploadMdb = multer({
  storage: mdbStorage,
  limits: { fileSize: 734003200 },
  fileFilter: function (req, file, cb) {
    checkMDBFileType(file, cb);
  },
});

exports.uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 10000000 }, // 10MB
  fileFilter: function (req, file, cb) {
    checkImageFileType(file, cb);
  },
});
