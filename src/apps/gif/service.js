// service.js
const { GifDB } = require("./db");
const { ErrorResponse } = require("../../middleware/errorResponse");
const { HelperFunctions } = require("../../helper/functions");
const path = require("node:path");
const fs = require("node:fs/promises");
const mime = require("mime-types");

exports.GifService = class {
  static async updateStatus(data) {
    const check = await GifDB.getById([data.id]);

    if (!check) throw new ErrorResponse("gif.not_found", 404);

    const result = await GifDB.updateStatus([data.status, data.id]);
    return result;
  }

  static async get(data) {
    const offset = (data.page - 1) * data.limit;
    const result = await GifDB.get([offset, data.limit], data);
    const meta = HelperFunctions.pagination({ ...data, count: result.count });
    return { data: result.data, meta };
  }

  static async getById(data) {
    const result = await GifDB.getById([data.id]);

    if (!result) throw new ErrorResponse("gif.not_found", 404);

    const file_path = path.join(__dirname, "../../../public/uploads/gifs", result.file);

    try {
      await fs.access(file_path);
    } catch (error) {
      throw new ErrorResponse("gif.file_not_found");
    }

    const file = await fs.readFile(file_path);

    const content_type = mime.lookup(result.file);

    return { file, content_type };
  }

  static async create(data) {
    if (!data.file) {
      throw new ErrorResponse("gif.file_not_found");
    }

    const result = await GifDB.create([data.file.filename]);
    return result;
  }

  static async update(data) {
    if (!data.file) {
      throw new ErrorResponse("gif.file_not_found");
    }

    const id = data.params.id;

    await GifDB.getById([id]);
    const result = await GifDB.update([id, data.file.filename]);

    return result;
  }

  static async delete(data) {
    await GifDB.getById([data.id]);
    const result = await GifDB.delete([data.id]);
    return result;
  }
};
