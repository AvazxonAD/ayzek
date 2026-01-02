const { SwearWordsService } = require("./service");

class SwearWordsController {
    static async get(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const result = await SwearWordsService.getAllSwearWords(parseInt(page), parseInt(limit));
        return res.success(result, req.t("swear_words.get_all_success"));
    }

    static async getById(req, res) {
        const { id } = req.params;
        const result = await SwearWordsService.getSwearWordById(id);
        return res.success(result, req.t("swear_words.get_success"));
    }

    static async create(req, res) {
        const result = await SwearWordsService.createSwearWord(req.body);
        return res.success(result, req.t("swear_words.create_success"));
    }

    static async update(req, res) {
        const { id } = req.params;
        const result = await SwearWordsService.updateSwearWord(id, req.body);
        return res.success(result, req.t("swear_words.update_success"));
    }

    static async delete(req, res) {
        const { id } = req.params;
        const result = await SwearWordsService.deleteSwearWord(id);
        return res.success(result, req.t("swear_words.delete_success"));
    }
}

module.exports = { SwearWordsController };
