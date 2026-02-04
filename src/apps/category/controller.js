const { CategoryService } = require("./service");

class CategoryController {
  // Get categories with language support (for frontend)
  static async get(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const lang = req.headers["x-app-lang"] || "uz";
    const result = await CategoryService.getAllCategories(parseInt(page), parseInt(limit), lang);
    return res.success(result, req.t("category.get_all_success"));
  }

  // Get all categories including all language fields (for admin)
  static async getAll(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const result = await CategoryService.getAllCategoriesAdmin(parseInt(page), parseInt(limit));
    return res.success(result, req.t("category.get_all_success"));
  }

  // Get category by ID with language support (for frontend)
  static async getById(req, res) {
    const { id } = req.params;
    const lang = req.headers["x-app-lang"] || "uz";
    const result = await CategoryService.getCategoryById(id, lang);
    return res.success(result, req.t("category.get_success"));
  }

  // Get category by ID including all language fields (for admin)
  static async getByIdAdmin(req, res) {
    const { id } = req.params;
    const result = await CategoryService.getCategoryByIdAdmin(id);
    return res.success(result, req.t("category.get_success"));
  }

  static async create(req, res) {
    const result = await CategoryService.createCategory(req.body);
    return res.success(result, req.t("category.create_success"));
  }

  static async update(req, res) {
    const { id } = req.params;
    const result = await CategoryService.updateCategory(id, req.body);
    return res.success(result, req.t("category.update_success"));
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await CategoryService.deleteCategory(id);
    return res.success(result, req.t("category.delete_success"));
  }
}

module.exports = { CategoryController };
