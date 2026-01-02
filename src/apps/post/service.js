const { PostDB } = require("./db");
const { CategoryService } = require("../category/service");
const { ErrorResponse } = require("../../middleware/errorResponse");
const { db } = require("../../config/db");
const { TagService } = require("../tag/service");

class PostService {
  static async get(page = 1, limit = 10, id, video, order_by, order_type) {
    const result = await PostDB.get(page, limit, id, video, order_by, order_type);

    const baseUrl = process.env.BASE_URL;
    result.data = result.data.map((post) => ({
      ...post,
      image: post.image ? `${baseUrl}/post/images/${post.image}` : null,
      video: post.video ? `${baseUrl}/post/videos/${post.video}` : null,
      gif: post.gif ? `${baseUrl}/post/gifs/${post.gif}` : null,
    }));

    return result;
  }

  static async getById(id, user) {
    const post = await PostDB.getById(id);
    if (!post) {
      throw new ErrorResponse("post.not_found", 404);
    }

    const baseUrl = process.env.BASE_URL;
    post.image = post.image ? `${baseUrl}/post/images/${post.image}` : null;
    post.video = post.video ? `${baseUrl}/post/videos/${post.video}` : null;
    post.gif = post.gif ? `${baseUrl}/post/gifs/${post.gif}` : null;


    if (user) {
      const check = await PostDB.getUserPost([user.id, post.id]);
      if (!check) {
        await PostDB.createUserPost([user.id, post.id]);
        const { see } = await PostDB.updateSeeCount([post.id]);
        post.see = see;
      }

    }

    return post;
  }

  static async create(data) {
    if (data.category_id) {
      await CategoryService.getCategoryById(data.category_id);
    }

    const post = await db.transaction(async (client) => {
      const result = await PostDB.create(
        [
          data.title,
          data.description,
          data.content,
          data.image ? data.image[0].filename : null,
          data.category_id,
          data.tags,
          data.fio,
          data.gif ? data.gif[0].filename : null,
          data.video ? data.video[0].filename : null,
        ],
        client
      );

      if (data.tags.length) {
        for (let tag of data.tags) {
          await TagService.getById(tag);

          await PostDB.createTags([result.id, tag], client);
        }
      }

      return result;
    });

    const baseUrl = process.env.BASE_URL;

    post.image = post.image ? `${baseUrl}/post/images/${post.image}` : null;
    post.video = post.video ? `${baseUrl}/post/videos/${post.video}` : null;
    post.gif = post.gif ? `${baseUrl}/post/gifs/${post.gif}` : null;

    return post;
  }

  static async updatePost(id, data) {
    const existingPost = await PostDB.getById(id);
    if (!existingPost) {
      throw new ErrorResponse("post.not_found", 404);
    }

    if (data.category_id) {
      await CategoryService.getCategoryById(data.category_id);
    }

    data.image = data.image ? data.image[0].filename : null;
    data.gif = data.gif ? data.gif[0].filename : null;
    data.video = data.video ? data.video[0].filename : null;

    const post = await PostDB.update(id, data);

    const baseUrl = process.env.BASE_URL;
    post.image = post.image ? `${baseUrl}/post/images/${post.image}` : null;
    post.video = post.video ? `${baseUrl}/post/videos/${post.video}` : null;
    post.gif = post.gif ? `${baseUrl}/post/gifs/${post.gif}` : null;

    return post;
  }

  static async deletePost(id) {
    const existingPost = await PostDB.getById(id);
    if (!existingPost) {
      throw new ErrorResponse("post.not_found", 404);
    }

    await PostDB.delete(id);
    return { message: "Post deleted successfully" };
  }
}

module.exports = { PostService };
