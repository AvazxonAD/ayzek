const { CommentService } = require("./service");

exports.Controller = class {
  static now = new Date();

  static async create(req, res) {
    const result = await CommentService.create({ ...req.body, account_id: req.user.id });

    return res.success(result, req.t("system.create_success"));
  }

  static async update(req, res) {
    const result = await CommentService.update({ ...req.params, ...req.body });

    return res.success(result, req.t("system.update_success"));
  }

  static async getById(req, res) {
    const result = await CommentService.getById(req.params);

    return res.success(result, req.t("system.get_success"));
  }

  static async get(req, res) {
    const result = await CommentService.get(req.query);

    return res.success(result, req.t("system.get_success"));
  }

  static async delete(req, res) {
    const result = await CommentService.delete(req.params);

    return res.success(result, req.t("system.delete_success"));
  }
};
