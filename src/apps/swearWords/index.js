const express = require("express");
const { SwearWordsController } = require("./controller");
const { SwearWordsSchema } = require("./schema");
const { validator } = require("../../middleware/validator");

const router = express.Router();

router.get("/", validator(SwearWordsController.get, SwearWordsSchema.getAllSchema()));
router.get("/:id", validator(SwearWordsController.getById, SwearWordsSchema.getByIdSchema()));
router.post("/", validator(SwearWordsController.create, SwearWordsSchema.createSchema()));
router.put("/:id", validator(SwearWordsController.update, SwearWordsSchema.updateSchema()));
router.delete("/:id", validator(SwearWordsController.delete, SwearWordsSchema.deleteSchema()));

module.exports = router;
