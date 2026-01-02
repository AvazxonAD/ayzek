const express = require("express");

const AuthRoutes = require("./auth");
const categoryRoutes = require("./category");
const tagRoutes = require("./tag");
const postRoutes = require("./post");
const StorageRoutes = require("./storage");
const AccountRoutes = require("./account/index");
const CommentRoutes = require("./comment/index");
const GifRoutes = require("./gif/index");
const AdsRoutes = require("./ads/index");
const SwearWordsRoutes = require("./swearWords");
const BackgroundColorRoutes = require("./backgroundColor");

const router = express.Router();

// Auth routes
router.use("/auth", AuthRoutes);
router.use("/ads", AdsRoutes);
router.use("/gif", GifRoutes);
router.use("/category", categoryRoutes);
router.use("/teg", tagRoutes);
router.use("/post", postRoutes);
router.use("/public", postRoutes);
router.use("/storage", StorageRoutes);
router.use("/account", AccountRoutes);
router.use("/comment", CommentRoutes);
router.use("/swear-words", SwearWordsRoutes);
router.use("/background-color", BackgroundColorRoutes);

module.exports = router;
