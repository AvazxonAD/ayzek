const { PostService } = require("./service");
const path = require("path");
const fs = require("fs");

class PostController {
  static async getAll(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const result = await PostService.getAllPosts(parseInt(page), parseInt(limit));
    return res.success(result, req.t("post.get_all_success"));
  }

  static async getById(req, res) {
    const { id } = req.params;
    const result = await PostService.getPostById(id);
    return res.success(result, req.t("post.get_success"));
  }

  static async create(req, res) {
    const postData = { ...req.body };

    // Add image filename if uploaded
    if (req.file) {
      postData.image = req.file.filename;
    }

    const result = await PostService.createPost(postData);
    return res.success(result, req.t("post.create_success"));
  }

  static async update(req, res) {
    const { id } = req.params;
    const postData = { ...req.body };

    // Add image filename if uploaded
    if (req.file) {
      postData.image = req.file.filename;
    }

    const result = await PostService.updatePost(id, postData);
    return res.success(result, req.t("post.update_success"));
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await PostService.deletePost(id);
    return res.success(result, req.t("post.delete_success"));
  }

  static async getImage(req, res) {
    const { filename } = req.params;

    try {
      const imagePath = path.join(process.cwd(), "public", "uploads", "images", filename);

      // Check if file exists
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({
          success: false,
          message: "Image not found",
        });
      }

      // Get file extension to set correct content type
      const ext = path.extname(filename).toLowerCase();
      let contentType = "image/jpeg"; // default

      switch (ext) {
        case ".png":
          contentType = "image/png";
          break;
        case ".gif":
          contentType = "image/gif";
          break;
        case ".webp":
          contentType = "image/webp";
          break;
        case ".jpg":
        case ".jpeg":
          contentType = "image/jpeg";
          break;
      }

      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=31536000"); // 1 year cache

      // Send file
      return res.sendFile(imagePath);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error serving image",
      });
    }
  }
}

module.exports = { PostController };
