const { PostDB } = require("./db");
const { CategoryService } = require("../category/service");
const ErrorResponse = require("../../middleware/errorResponse");

class PostService {
  static async getAllPosts(page = 1, limit = 10) {
    const result = await PostDB.findAll(page, limit);

    // Add baseUrl to image paths using API endpoint
    const baseUrl = process.env.BASE_URL;
    result.data = result.data.map((post) => ({
      ...post,
      image: post.image ? `${baseUrl}/post/image/${post.image}` : null,
    }));

    return result;
  }

  static async getPostById(id) {
    const post = await PostDB.findById(id);
    if (!post) {
      throw new ErrorResponse("post.not_found", 404);
    }

    // Add baseUrl to image path using API endpoint
    const baseUrl = process.env.BASE_URL;
    post.image = post.image ? `${baseUrl}/post/image/${post.image}` : null;

    return post;
  }

  static async createPost(data) {
    // Check if category exists if category_id is provided
    if (data.category_id) {
      await CategoryService.getCategoryById(data.category_id);
    }

    const post = await PostDB.create(data);

    // Add baseUrl to image path using API endpoint
    const baseUrl = process.env.BASE_URL;
    post.image = post.image ? `${baseUrl}/post/image/${post.image}` : null;

    return post;
  }

  static async updatePost(id, data) {
    const existingPost = await PostDB.findById(id);
    if (!existingPost) {
      throw new ErrorResponse("post.not_found", 404);
    }

    // Check if category exists if category_id is provided
    if (data.category_id) {
      await CategoryService.getCategoryById(data.category_id);
    }

    const post = await PostDB.update(id, data);

    // Add baseUrl to image path using API endpoint
    const baseUrl = process.env.BASE_URL;
    post.image = post.image ? `${baseUrl}/post/image/${post.image}` : null;

    return post;
  }

  static async deletePost(id) {
    const existingPost = await PostDB.findById(id);
    if (!existingPost) {
      throw new ErrorResponse("post.not_found", 404);
    }

    await PostDB.delete(id);
    return { message: "Post deleted successfully" };
  }
}

module.exports = { PostService };
