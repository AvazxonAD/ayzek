// index.js
const express = require("express");
const { Controller } = require("./controller");
const { Schema } = require("./schema");
const { validator } = require("../../middleware/validator");
const { uploadGif } = require("../../middleware/upload");

const router = express.Router();

router.get("/", validator(Controller.get, Schema.get()));
router.get("/:id", validator(Controller.getById, Schema.getById()));
router.post("/", uploadGif.single("file"), validator(Controller.create));
router.put("/:id", uploadGif.single("file"), validator(Controller.update));
router.delete("/:id", validator(Controller.delete, Schema.delete()));

module.exports = router;
