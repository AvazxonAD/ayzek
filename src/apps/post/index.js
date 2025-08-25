const express = require("express");
const { PostController } = require("./controller");
const { PostSchema } = require("./schema");
const { validator } = require("../../middleware/validator");
const { uploadImage } = require("../../middleware/upload");

const router = express.Router();

router.get("/", validator(PostController.getAll, PostSchema.getAllSchema()));
router.get("/:id", validator(PostController.getById, PostSchema.getByIdSchema()));
router.get("/image/:filename", validator(PostController.getImage, PostSchema.getImageSchema()));
router.post("/", uploadImage.single("image"), validator(PostController.create, PostSchema.createSchema()));
router.patch("/:id", uploadImage.single("image"), validator(PostController.update, PostSchema.updateSchema()));
router.delete("/:id", validator(PostController.delete, PostSchema.deleteSchema()));

module.exports = router;
