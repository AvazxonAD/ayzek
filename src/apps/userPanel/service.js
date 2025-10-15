const { PostDB } = require("../post/db");
const { ErrorResponse } = require("../../middleware/errorResponse");

class UserPanelService {
  static async get(page = 1, limit = 10) {
    // Only get active posts for user panel
    const result = await PostDB.get(page, limit);

    // Filter only active posts
    result.data = result.data.filter((post) => post.is_active === true);

    // Add baseUrl to image paths using API endpoint
    const baseUrl = process.env.BASE_URL;
    result.data = result.data.map((post) => ({
      ...post,
      image: post.image ? `${baseUrl}/post/images/${post.image}` : null,
      video: post.video ? `${baseUrl}/post/videos/${post.video}` : null,
      gif: post.gif ? `${baseUrl}/post/gifs/${post.gif}` : null,
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
        hasPrev: page > 1,
      },
    };
  }

  static async getById(id) {
    const post = await PostDB.getById(id);
    if (!post) {
      throw new ErrorResponse("post.not_found", 404);
    }

    // Only return active posts for user panel
    if (!post.is_active) {
      throw new ErrorResponse("post.not_found", 404);
    }

    // Add baseUrl to image path using API endpoint
    const baseUrl = process.env.BASE_URL;
    post.image = post.image ? `${baseUrl}/post/images/${post.image}` : null;
    post.video = post.video ? `${baseUrl}/post/videos/${post.video}` : null;
    post.gif = post.gif ? `${baseUrl}/post/gifs/${post.gif}` : null;

    return post;
  }
}

module.exports = { UserPanelService };
