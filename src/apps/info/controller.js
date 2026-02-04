const { InfoService } = require("./service");

class InfoController {
  // Get info with language support (for frontend)
  static async get(req, res) {
    const lang = req.headers["x-app-lang"] || "uz";
    const result = await InfoService.getInfo(lang);
    return res.success(result, req.t("info.get_success"));
  }

  // Get all info including all language fields (for admin)
  static async getAll(req, res) {
    const result = await InfoService.getInfoAll();
    return res.success(result, req.t("info.get_success"));
  }

  static async update(req, res) {
    const { id } = req.params;
    const result = await InfoService.updateInfo(id, req.body);
    return res.success(result, req.t("info.update_success"));
  }
}

module.exports = { InfoController };
