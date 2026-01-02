const { SwearWordsDB } = require("./db");
const { ErrorResponse } = require("../../middleware/errorResponse");

class SwearWordsService {
    static async getAllSwearWords(page = 1, limit = 10) {
        const result = await SwearWordsDB.get(page, limit);
        return result;
    }

    static async getSwearWordById(id) {
        const swearWord = await SwearWordsDB.getById(id);
        if (!swearWord) {
            throw new ErrorResponse("swear_word.not_found", 404);
        }
        return swearWord;
    }

    static async createSwearWord(data) {
        const swearWord = await SwearWordsDB.create(data);
        return swearWord;
    }

    static async updateSwearWord(id, data) {
        const existingSwearWord = await SwearWordsDB.getById(id);
        if (!existingSwearWord) {
            throw new ErrorResponse("swear_word.not_found", 404);
        }

        const swearWord = await SwearWordsDB.update(id, data);
        return swearWord;
    }

    static async deleteSwearWord(id) {
        const existingSwearWord = await SwearWordsDB.getById(id);
        if (!existingSwearWord) {
            throw new ErrorResponse("swear_word.not_found", 404);
        }

        await SwearWordsDB.delete(id);
        return { message: "Swear word deleted successfully" };
    }
}

module.exports = { SwearWordsService };
