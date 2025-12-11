const { AdsDB } = require("./db");
const { ErrorResponse } = require("../../middleware/errorResponse");
const { HelperFunctions } = require("../../helper/functions");
const path = require("node:path");
const fs = require("node:fs/promises");
const mime = require("mime-types");

exports.AdsService = class {
  static async getFile(data) {
    const file_path = path.join(__dirname, "../../../public/uploads/", data.file_name);

    try {
      await fs.access(file_path);
    } catch (error) {
      throw new ErrorResponse("gif.file_not_found");
    }

    const file = await fs.readFile(file_path);

    const content_type = mime.lookup(data.file_name);

    return { file, content_type };
  }

  static async create(data) {
    if (!data.file) throw new ErrorResponse("file_not_found", 400);
    const result = await AdsDB.create([data.title, data.description, data.file.filename, data.type, data.status, data.cta_link, data.cta_text]);
    return result;
  }

  static async update(data) {
    const old_data = await this.getById(data);

    let file;
    if (data.file) {
      file = data.file.filename;
    } else {
      file = old_data.file;
    }

    const result = await AdsDB.update([data.title, data.description, file, data.type, data.status, data.cta_link, data.cta_text, data.id]);

    return result;
  }

  static async getById(data) {
    const result = await AdsDB.getById([data.id]);

    if (!result) {
      throw new ErrorResponse("ads.not_found", 404);
    }

    return result;
  }

  static async get(data) {
    const offset = (data.page - 1) * data.limit;
    const result = await AdsDB.get([offset, data.limit], data);
    const meta = HelperFunctions.pagination({ ...data, count: result.count });
    return { data: result.data, meta };
  }

  static async delete(data) {
    await this.getById(data);

    const result = await AdsDB.delete([data.id]);

    return result;
  }
};
