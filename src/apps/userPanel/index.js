const express = require("express");
const { UserPanelController } = require("./controller");
const { UserPanelSchema } = require("./schema");
const { validator } = require("../../middleware/validator");

const router = express.Router();

// Public routes - no authentication required
router.get("/posts", validator(UserPanelController.getAllPosts, UserPanelSchema.getAllSchema()));
router.get("/posts/:id", validator(UserPanelController.getPostById, UserPanelSchema.getByIdSchema()));

module.exports = router;
