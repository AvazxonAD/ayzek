const express = require("express");
const { BackgroundColorController } = require("./controller");
const { BackgroundColorSchema } = require("./schema");
const { validator } = require("../../middleware/validator");
const { uploadImage } = require("../../middleware/upload");

const router = express.Router();

router.get("/", validator(BackgroundColorController.get, BackgroundColorSchema.getAllSchema()));
router.get("/current", validator(BackgroundColorController.getCurrentImage));
router.get("/:id", validator(BackgroundColorController.getById, BackgroundColorSchema.getByIdSchema()));
router.get("/:id/file", validator(BackgroundColorController.getFile, BackgroundColorSchema.getByIdSchema()));
router.post("/", uploadImage.single("file"), validator(BackgroundColorController.create, BackgroundColorSchema.createSchema()));
router.put("/:id", uploadImage.single("file"), validator(BackgroundColorController.update, BackgroundColorSchema.updateSchema()));
router.put("/:id/active", validator(BackgroundColorController.updateActive, BackgroundColorSchema.updateActiveSchema()));
router.delete("/:id", validator(BackgroundColorController.delete, BackgroundColorSchema.deleteSchema()));

module.exports = router;
