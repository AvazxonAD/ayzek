const { PostDB } = require("./db");
const { CategoryService } = require("../category/service");
const ErrorResponse = require("../../middleware/errorResponse");

class PostService {
  static async getAllPosts(page = 1, limit = 10) {
    const result = await PostDB.findAll(page, limit);

    const baseUrl = process.env.BASE_URL;
    result.data = result.data.map((post) => ({
      ...post,
      image: post.image ? `${baseUrl}/post/images/${post.image}` : null,
    }));

    return result;
  }

  static async getPostById(id) {
    const post = await PostDB.findById(id);
    if (!post) {
      throw new ErrorResponse("post.not_found", 404);
    }

    const baseUrl = process.env.BASE_URL;
    post.image = post.image ? `${baseUrl}/post/images/${post.image}` : null;

    const { see } = await PostDB.updateSeeCount([post.id]);
    post.see = see;

    return post;
  }

  static async create(data) {
    if (data.category_id) {
      await CategoryService.getCategoryById(data.category_id);
    }

    const post = await PostDB.create(data);

    const baseUrl = process.env.BASE_URL;

    post.image = post.image ? `${baseUrl}/post/images/${post.image}` : null;
    post.video = post.video ? `${baseUrl}/post/videos/${post.video}` : null;
    post.gif = post.gif ? `${baseUrl}/post/gifs/${post.gif}` : null;

    return post;
  }

  static async updatePost(id, data) {
    const existingPost = await PostDB.findById(id);
    if (!existingPost) {
      throw new ErrorResponse("post.not_found", 404);
    }

    if (data.category_id) {
      await CategoryService.getCategoryById(data.category_id);
    }

    const post = await PostDB.update(id, data);

    const baseUrl = process.env.BASE_URL;
    post.image = post.image ? `${baseUrl}/post/images/${post.image}` : null;

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
