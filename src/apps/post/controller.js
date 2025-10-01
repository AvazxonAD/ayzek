const { PostService } = require("./service");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");

class PostController {
  static async get(req, res) {
    const { page = 1, limit = 10, id } = req.query;
    const result = await PostService.get(parseInt(page), parseInt(limit), id);
    return res.success(result, req.t("post.get_all_success"));
  }

  static async getById(req, res) {
    const { id } = req.params;
    const result = await PostService.getById(id);
    return res.success(result, req.t("post.get_success"));
  }

  static async create(req, res) {
    const postData = { ...req.body };

    const result = await PostService.create({ ...postData, image: req.files.image, video: req.files.video, gif: req.files.gif });
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

  static async getFile(req, res) {
    const { filename, file } = req.params;

    const imagePath = path.join(process.cwd(), "public", "uploads", file, filename);

    console.log(imagePath);
    if (!fs.existsSync(imagePath)) {
      return res.error(req.t("file_not_found"), 404);
    }

    const content_type = mime.lookup(filename);

    res.setHeader("Content-Type", content_type);

    return res.sendFile(imagePath);
  }
}

module.exports = { PostController };
