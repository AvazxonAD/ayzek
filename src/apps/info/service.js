const { InfoDB } = require("./db");
const { ErrorResponse } = require("../../middleware/errorResponse");

class InfoService {
  // Get info with language support (for frontend)
  static async getInfo(lang = "uz") {
    const info = await InfoDB.get(lang);
    if (!info) {
      throw new ErrorResponse("info.not_found", 404);
    }
    return info;
  }

  // Get all info including all language fields (for admin)
  static async getInfoAll() {
    const info = await InfoDB.getAll();
    if (!info) {
      throw new ErrorResponse("info.not_found", 404);
    }
    return info;
  }

  static async updateInfo(id, data) {
    const existingInfo = await InfoDB.getAll();
    if (!existingInfo) {
      throw new ErrorResponse("info.not_found", 404);
    }

    const info = await InfoDB.update(id, data);
    return info;
  }
}

module.exports = { InfoService };
