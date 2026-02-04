const express = require("express");
const { Controller } = require("./controller");
const { Schema } = require("./schema");
const { validator } = require("../../middleware/validator");
const { protect } = require("../../middleware/auth");
const { upload } = require("../../middleware/upload");

const router = express.Router();

// Routes including all language fields (for admin) - MUST be before /:id routes
router.get("/all", validator(Controller.getAll, Schema.get()));
router.get("/all/:id", validator(Controller.getByIdAdmin, Schema.getById()));

// Routes with language support (for frontend)
router.get("/", validator(Controller.get, Schema.get()));
router.get("/file/:file_name", validator(Controller.getFile, Schema.getFile()));
router.get("/:id", validator(Controller.getById, Schema.getById()));
router.post("/", protect, upload.single("file"), validator(Controller.create, Schema.create()));
router.put("/status/:id", validator(Controller.updateStatus, Schema.updateStatus()));
router.put("/:id", protect, upload.single("file"), validator(Controller.update, Schema.update()));
router.delete("/:id", protect, validator(Controller.delete, Schema.delete()));

module.exports = router;
