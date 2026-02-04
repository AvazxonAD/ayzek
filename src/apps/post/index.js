const express = require("express");
const { PostController } = require("./controller");
const { PostSchema } = require("./schema");
const { validator } = require("../../middleware/validator");
const { multiUpload } = require("../../middleware/multiUpload");
const { protect } = require("../../middleware/auth");

const router = express.Router();

// Routes including all language fields (for admin) - MUST be before /:id routes
router.get("/all", validator(PostController.getAll, PostSchema.getAllSchema()));
router.get("/all/:id", validator(PostController.getByIdAdmin, PostSchema.getByIdSchema()));

// Routes with language support (for frontend)
router.get("/posts", validator(PostController.get, PostSchema.getAllSchema()));
router.get("/posts/:id", protect, validator(PostController.getById, PostSchema.getByIdSchema()));
router.get("/", validator(PostController.get, PostSchema.getAllSchema()));
router.get("/:id", protect, validator(PostController.getById, PostSchema.getByIdSchema()));
router.get("/:file/:filename", validator(PostController.getFile, PostSchema.getFileSchema()));
router.post("/", multiUpload, validator(PostController.create, PostSchema.createSchema()));
router.patch("/:id", multiUpload, validator(PostController.update, PostSchema.updateSchema()));
router.delete("/:id", validator(PostController.delete, PostSchema.deleteSchema()));

module.exports = router;
