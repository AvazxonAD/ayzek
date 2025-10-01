const { UserPanelService } = require("./service");

class UserPanelController {
  static async get(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const result = await UserPanelService.get(parseInt(page), parseInt(limit));
    return res.success(result, req.t("userPanel.get_all_success"));
  }

  static async getById(req, res) {
    const { id } = req.params;
    const result = await UserPanelService.getById(id);
    return res.success(result, req.t("userPanel.get_success"));
  }
}

module.exports = { UserPanelController };
