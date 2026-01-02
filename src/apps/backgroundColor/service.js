const { BackgroundColorDB } = require("./db");
const { ErrorResponse } = require("../../middleware/errorResponse");

class BackgroundColorService {
    static async getAll(page = 1, limit = 10) {
        const result = await BackgroundColorDB.get(page, limit);
        return result;
    }

    static async getById(id) {
        const result = await BackgroundColorDB.getById(id);
        if (!result) {
            throw new ErrorResponse("background_color.not_found", 404);
        }
        return result;
    }

    static async create(data) {
        const result = await BackgroundColorDB.create(data);
        return result;
    }

    static async update(id, data) {
        const existing = await BackgroundColorDB.getById(id);
        if (!existing) {
            throw new ErrorResponse("background_color.not_found", 404);
        }

        const result = await BackgroundColorDB.update(id, data);
        return result;
    }

    static async updateActive(id, active) {
        const existing = await BackgroundColorDB.getById(id);
        if (!existing) {
            throw new ErrorResponse("background_color.not_found", 404);
        }

        const result = await BackgroundColorDB.update(id, { active });
        return result;
    }

    static async delete(id) {
        const existing = await BackgroundColorDB.getById(id);
        if (!existing) {
            throw new ErrorResponse("background_color.not_found", 404);
        }

        await BackgroundColorDB.delete(id);
        return { message: "Background color deleted successfully" };
    }
}

module.exports = { BackgroundColorService };
