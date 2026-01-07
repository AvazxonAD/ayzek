const { BackgroundColorService } = require("./service");

class BackgroundColorController {
    static async get(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const result = await BackgroundColorService.getAll(parseInt(page), parseInt(limit));
        return res.success(result, req.t("background_color.get_all_success"));
    }

    static async getById(req, res) {
        const { id } = req.params;
        const result = await BackgroundColorService.getById(id);
        return res.success(result, req.t("background_color.get_success"));
    }

    static async getFile(req, res) {
        const { id } = req.params;
        const { file, contentType } = await BackgroundColorService.getFile(id);
        res.setHeader("Content-Type", contentType);
        return res.send(file);
    }

    static async create(req, res) {
        const result = await BackgroundColorService.create(req.file, req.body);
        return res.success(result, req.t("background_color.create_success"));
    }

    static async update(req, res) {
        const { id } = req.params;
        const result = await BackgroundColorService.update(id, req.file, req.body);
        return res.success(result, req.t("background_color.update_success"));
    }

    static async updateActive(req, res) {
        const { id } = req.params;
        const { active } = req.body;
        const result = await BackgroundColorService.updateActive(id, active);
        return res.success(result, req.t("background_color.update_active_success"));
    }

    static async delete(req, res) {
        const { id } = req.params;
        const result = await BackgroundColorService.delete(id);
        return res.success(result, req.t("background_color.delete_success"));
    }
}

module.exports = { BackgroundColorController };
