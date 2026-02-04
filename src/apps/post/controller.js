const { PostService } = require("./service");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const { VIDEO_TYPE } = require("../constants/data/data");
class PostController {
  // Get posts with language support (for frontend)
  static async get(req, res) {
    const { page = 1, limit = 10, id, video, order_by = "created_at", order_type = "ASC", next_token, category_id } = req.query;
    const lang = req.headers["x-app-lang"] || "uz";
    const result = await PostService.get(parseInt(page), parseInt(limit), id, video, order_by, order_type, next_token, category_id, lang);
    return res.success(result, req.t("post.get_all_success"));
  }

  // Get all posts including all language fields (for admin)
  static async getAll(req, res) {
    const { page = 1, limit = 10, id, video, order_by = "created_at", order_type = "ASC", next_token, category_id } = req.query;
    const result = await PostService.getAll(parseInt(page), parseInt(limit), id, video, order_by, order_type, next_token, category_id);
    return res.success(result, req.t("post.get_all_success"));
  }

  // Get post by ID with language support (for frontend)
  static async getById(req, res) {
    const { id } = req.params;
    const lang = req.headers["x-app-lang"] || "uz";
    const result = await PostService.getById(id, req.user, lang);
    return res.success(result, req.t("post.get_success"));
  }

  // Get post by ID including all language fields (for admin)
  static async getByIdAdmin(req, res) {
    const { id } = req.params;
    const result = await PostService.getByIdAdmin(id);
    return res.success(result, req.t("post.get_success"));
  }

  static async create(req, res) {
    const postData = { ...req.body };

    const result = await PostService.create({ ...postData, image: req.files.image, video: req.files.video, gif: req.files.gif });
    return res.success(result, req.t("post.create_success"));
  }

  static async update(req, res) {
    const { id } = req.params;
    const postData = { ...req.body, ...req.files };

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
    const content_type = mime.lookup(filename);
    const filePath = path.join(process.cwd(), "public", "uploads", file, filename);

    if (!fs.existsSync(filePath)) {
      return res.error(req.t("file_not_found"), 404);
    }

    const type = path.extname(filename).replace(".", "").toLowerCase();
    const check = VIDEO_TYPE.includes(type);
    if (check) {
      const stat = fs.statSync(filePath);

      const fileSize = stat.size;

      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;

        const fileStream = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "video/mp4",
        });

        fileStream.pipe(res);
      } else {
        const CHUNK_SIZE = 2 * 1024 * 1024;
        const start = 0;
        const end = Math.min(CHUNK_SIZE - 1, fileSize - 1);
        const chunkSize = end - start + 1;

        const fileStream = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "video/mp4",
        });

        fileStream.pipe(res);
      }

      return;
    }

    res.setHeader("Content-Type", content_type);

    return res.sendFile(filePath);
  }
}

module.exports = { PostController };
