const express = require("express");
const { BackgroundColorController } = require("./controller");
const { BackgroundColorSchema } = require("./schema");
const { validator } = require("../../middleware/validator");

const router = express.Router();

router.get("/", validator(BackgroundColorController.get, BackgroundColorSchema.getAllSchema()));
router.get("/:id", validator(BackgroundColorController.getById, BackgroundColorSchema.getByIdSchema()));
router.post("/", validator(BackgroundColorController.create, BackgroundColorSchema.createSchema()));
router.put("/:id", validator(BackgroundColorController.update, BackgroundColorSchema.updateSchema()));
router.put("/:id/active", validator(BackgroundColorController.updateActive, BackgroundColorSchema.updateActiveSchema()));
router.delete("/:id", validator(BackgroundColorController.delete, BackgroundColorSchema.deleteSchema()));

module.exports = router;
