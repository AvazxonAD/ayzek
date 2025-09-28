const { CommentDB } = require("./db");
const ErrorResponse = require("../../middleware/errorResponse");

exports.CommentService = class {
  static now = new Date();

  static async create(data) {
    if (data.reply_id) {
      await this.getById({ id: data.reply_id });
    }

    const result = await CommentDB.create([data.comment, data.reply_id, data.account_id, data.post_id]);

    return result;
  }

  static async update(data) {
    await this.getById(data);

    if (data.reply_id) {
      await this.getById({ id: data.reply_id });
    }

    const result = await CommentDB.update([data.comment, data.reply_id, data.id]);

    return result;
  }

  static async getById(data) {
    const result = await CommentDB.getById([data.id]);

    if (!result) {
      throw new ErrorResponse("comment.not_found", 404);
    }

    return result;
  }

  static async get(data) {
    const result = await CommentDB.get([]);

    return result;
  }

  static async delete(data) {
    const result = await CommentDB.delete([data.id]);

    return result;
  }
};
