const { AccountService } = require("./service");

exports.Controller = class {
  static async register(req, res) {
    const result = await AccountService.register(req.body);

    return res.success(result, req.t("account.register"));
  }

  static async login(req, res) {
    const result = await AccountService.login(req.body);

    return res.success(result, req.t("account.register"));
  }
};
