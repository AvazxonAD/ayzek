const express = require("express");
const { PostController } = require("./controller");
const { PostSchema } = require("./schema");
const { validator } = require("../../middleware/validator");
const { multiUpload } = require("../../middleware/multiUpload");

const router = express.Router();

router.get("/", validator(PostController.get, PostSchema.getAllSchema()));
router.get("/:id", validator(PostController.getById, PostSchema.getByIdSchema()));
router.get("/:file/:filename", validator(PostController.getFile, PostSchema.getFileSchema()));
router.post("/", multiUpload, validator(PostController.create, PostSchema.createSchema()));
router.patch("/:id", multiUpload, validator(PostController.update, PostSchema.updateSchema()));
router.delete("/:id", validator(PostController.delete, PostSchema.deleteSchema()));

module.exports = router;
