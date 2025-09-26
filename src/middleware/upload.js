const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: "./public/uploads/images",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

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
exports.uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 10000000 }, // 10MB
  fileFilter: function (req, file, cb) {
    checkImageFileType(file, cb);
  },
});
