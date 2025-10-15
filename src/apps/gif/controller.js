// controller.js
const { GifService } = require("./service");

exports.Controller = class {
  static async get(req, res) {
    const { data, meta } = await GifService.get(req.query);
    return res.success(data, req.t("system.get_success"), 200, meta);
  }

  static async getById(req, res) {
    const { file, content_type } = await GifService.getById(req.params);

    res.setHeader("Content-type", content_type);

    return res.send(file);
  }

  static async create(req, res) {
    const result = await GifService.create(req);
    return res.success(result, req.t("system.create_success"));
  }

  static async update(req, res) {
    const result = await GifService.update(req);
    return res.success(result, req.t("system.update_success"));
  }

  static async delete(req, res) {
    const result = await GifService.delete(req.params);
    return res.success(result, req.t("system.delete_success"));
  }
};
