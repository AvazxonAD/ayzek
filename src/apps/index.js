const express = require("express");
const AuthRoutes = require("./auth");
const categoryRoutes = require("./category");
const tagRoutes = require("./tag");
const postRoutes = require("./post");
const userPanelRoutes = require("./userPanel");

const router = express.Router();

// Auth routes
router.use("/auth", AuthRoutes);
router.use("/category", categoryRoutes);
router.use("/teg", tagRoutes);
router.use("/post", postRoutes);
router.use("/public", userPanelRoutes);

module.exports = router;
