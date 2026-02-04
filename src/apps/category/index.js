const express = require("express");
const { CategoryController } = require("./controller");
const { CategorySchema } = require("./schema");
const { validator } = require("../../middleware/validator");

const router = express.Router();

// Routes including all language fields (for admin) - MUST be before /:id routes
router.get("/all", validator(CategoryController.getAll, CategorySchema.getAllSchema()));
router.get("/all/:id", validator(CategoryController.getByIdAdmin, CategorySchema.getByIdSchema()));

// Routes with language support (for frontend)
router.get("/", validator(CategoryController.get, CategorySchema.getAllSchema()));
router.get("/:id", validator(CategoryController.getById, CategorySchema.getByIdSchema()));

router.post("/", validator(CategoryController.create, CategorySchema.createSchema()));
router.put("/:id", validator(CategoryController.update, CategorySchema.updateSchema()));
router.delete("/:id", validator(CategoryController.delete, CategorySchema.deleteSchema()));

module.exports = router;
