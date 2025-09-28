const express = require("express");
const { Controller } = require("./controller");
const { Schema } = require("./schema");
const { validator } = require("../../middleware/validator");

const router = express.Router();

router.post("/register", validator(Controller.register, Schema.register()));
router.post("/login", validator(Controller.login, Schema.login()));

module.exports = router;
