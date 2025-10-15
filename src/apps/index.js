const express = require("express");

const AuthRoutes = require("./auth");
const categoryRoutes = require("./category");
const tagRoutes = require("./tag");
const postRoutes = require("./post");
const userPanelRoutes = require("./userPanel");
const StorageRoutes = require("./storage");
const AccountRoutes = require("./account/index");
const CommentRoutes = require("./comment/index");
const GifRoutes = require("./gif/");

const router = express.Router();

// Auth routes
router.use("/auth", AuthRoutes);
router.use("/gif", GifRoutes);
router.use("/category", categoryRoutes);
router.use("/teg", tagRoutes);
router.use("/post", postRoutes);
router.use("/public", userPanelRoutes);
router.use("/storage", StorageRoutes);
router.use("/account", AccountRoutes);
router.use("/comment", CommentRoutes);

module.exports = router;
