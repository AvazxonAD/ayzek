const express = require("express");
const { InfoController } = require("./controller");
const { InfoSchema } = require("./schema");
const { validator } = require("../../middleware/validator");

const router = express.Router();

// Get info with language support (for frontend)
router.get("/", validator(InfoController.get, InfoSchema.getSchema()));
// Get all info including all language fields (for admin)
router.get("/all", validator(InfoController.getAll, InfoSchema.getAllSchema()));
router.put("/:id", validator(InfoController.update, InfoSchema.updateSchema()));

module.exports = router;
