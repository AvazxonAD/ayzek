const { CategoryDB } = require("./db");
const { ErrorResponse } = require("../../middleware/errorResponse");

class CategoryService {
  // Get categories with language support (for frontend)
  static async getAllCategories(page = 1, limit = 10, lang = "uz") {
    const result = await CategoryDB.get(page, limit, lang);
    return result;
  }

  // Get all categories including all language fields (for admin)
  static async getAllCategoriesAdmin(page = 1, limit = 10) {
    const result = await CategoryDB.getAll(page, limit);
    return result;
  }

  // Get category by ID with language support (for frontend)
  static async getCategoryById(id, lang = "uz") {
    const category = await CategoryDB.getById(id, lang);
    if (!category) {
      throw new ErrorResponse("category.not_found", 404);
    }
    return category;
  }

  // Get category by ID including all language fields (for admin)
  static async getCategoryByIdAdmin(id) {
    const category = await CategoryDB.getByIdAll(id);
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
    const existingCategory = await CategoryDB.getByIdAll(id);
    if (!existingCategory) {
      throw new ErrorResponse("category.not_found", 404);
    }

    const category = await CategoryDB.update(id, data);
    return category;
  }

  static async deleteCategory(id) {
    const existingCategory = await CategoryDB.getByIdAll(id);
    if (!existingCategory) {
      throw new ErrorResponse("category.not_found", 404);
    }

    await CategoryDB.delete(id);
    return { message: "Category deleted successfully" };
  }
}

module.exports = { CategoryService };
