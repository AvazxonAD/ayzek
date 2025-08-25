const { UserPanelService } = require("./service");

class UserPanelController {
  static async getAllPosts(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const result = await UserPanelService.getAllPosts(parseInt(page), parseInt(limit));
    return res.success(result, req.t("userPanel.get_all_success"));
  }

  static async getPostById(req, res) {
    const { id } = req.params;
    const result = await UserPanelService.getPostById(id);
    return res.success(result, req.t("userPanel.get_success"));
  }
}

module.exports = { UserPanelController };