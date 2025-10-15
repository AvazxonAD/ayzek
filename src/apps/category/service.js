const { CategoryDB } = require("./db");
const { ErrorResponse } = require("../../middleware/errorResponse");

class CategoryService {
  static async getAllCategories(page = 1, limit = 10) {
    const result = await CategoryDB.get(page, limit);
    return result;
  }

  static async getCategoryById(id) {
    const category = await CategoryDB.getById(id);
    if (!category) {
      throw new ErrorResponse("category.not_found", 404);
    }
    return category;
  }

  static async createCategory(data) {
    const category = await CategoryDB.create(data);
    return category;
  }

  static async updateCategory(id, data) {
    const existingCategory = await CategoryDB.getById(id);
    if (!existingCategory) {
      throw new ErrorResponse("category.not_found", 404);
    }

    const category = await CategoryDB.update(id, data);
    return category;
  }

  static async deleteCategory(id) {
    const existingCategory = await CategoryDB.getById(id);
    if (!existingCategory) {
      throw new ErrorResponse("category.not_found", 404);
    }

    await CategoryDB.delete(id);
    return { message: "Category deleted successfully" };
  }
}

module.exports = { CategoryService };
