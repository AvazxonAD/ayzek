const { PostDB } = require("../post/db");
const ErrorResponse = require("../../middleware/errorResponse");

class UserPanelService {
  static async getAllPosts(page = 1, limit = 10) {
    // Only get active posts for user panel
    const result = await PostDB.findAll(page, limit);
    
    // Filter only active posts
    result.data = result.data.filter(post => post.is_active === true);
    
    // Add baseUrl to image paths using API endpoint
    const baseUrl = process.env.BASE_URL;
    result.data = result.data.map((post) => ({
      ...post,
      image: post.image ? `${baseUrl}/post/image/${post.image}` : null,
    }));

    // Recalculate pagination for filtered data
    const total = result.data.length;
    const totalPages = Math.ceil(total / limit);

    return {
      data: result.data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  static async getPostById(id) {
    const post = await PostDB.findById(id);
    if (!post) {
      throw new ErrorResponse("post.not_found", 404);
    }

    // Only return active posts for user panel
    if (!post.is_active) {
      throw new ErrorResponse("post.not_found", 404);
    }

    // Add baseUrl to image path using API endpoint
    const baseUrl = process.env.BASE_URL;
    post.image = post.image ? `${baseUrl}/post/image/${post.image}` : null;

    return post;
  }
}

module.exports = { UserPanelService };