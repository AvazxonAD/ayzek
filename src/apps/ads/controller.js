const { AdsService } = require("./service");

exports.Controller = class {
  static now = new Date();

  static async updateStatus(req, res) {
    const result = await AdsService.updateStatus({ ...req.params, ...req.body });
    return res.success(result, req.t("system.update_success"));
  }

  static async create(req, res) {
    const result = await AdsService.create({ ...req.body, file: req.file });

    return res.success(result, req.t("system.create_success"));
  }

  static async update(req, res) {
    const result = await AdsService.update({ ...req.params, ...req.body, file: req.file });

    return res.success(result, req.t("system.update_success"));
  }

  // Get ad by ID with language support (for frontend)
  static async getById(req, res) {
    const lang = req.headers["x-app-lang"] || "uz";
    const result = await AdsService.getById(req.params, lang);

    return res.success(result, req.t("system.get_success"));
  }

  // Get ad by ID including all language fields (for admin)
  static async getByIdAdmin(req, res) {
    const result = await AdsService.getByIdAdmin(req.params);

    return res.success(result, req.t("system.get_success"));
  }

  // Get ads with language support (for frontend)
  static async get(req, res) {
    const lang = req.headers["x-app-lang"] || "uz";
    const { data, meta } = await AdsService.get(req.query, lang);

    return res.success(data, req.t("system.get_success"), 200, meta);
  }

  // Get all ads including all language fields (for admin)
  static async getAll(req, res) {
    const { data, meta } = await AdsService.getAll(req.query);

    return res.success(data, req.t("system.get_success"), 200, meta);
  }

  static async delete(req, res) {
    const result = await AdsService.delete(req.params);

    return res.success(result, req.t("system.delete_success"));
  }

  static async getFile(req, res) {
    const { file, content_type } = await AdsService.getFile(req.params);
    res.setHeader("Content-type", content_type);
    return res.send(file);
  }
};
