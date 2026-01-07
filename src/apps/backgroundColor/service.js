const { BackgroundColorDB } = require("./db");
const { ErrorResponse } = require("../../middleware/errorResponse");
const fs = require("fs/promises");
const path = require("path");
const mime = require("mime-types");

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

    static async getFile(id) {
        const result = await BackgroundColorDB.getById(id);
        if (!result) {
            throw new ErrorResponse("background_color.not_found", 404);
        }

        const filePath = path.join(__dirname, `../../../public/uploads/images/${result.file}`);

        try {
            await fs.access(filePath, fs.constants.R_OK);
        } catch (error) {
            throw new ErrorResponse("background_color.file_not_found", 404);
        }

        const file = await fs.readFile(filePath);
        const contentType = mime.lookup(result.file);

        return { file, contentType, filePath };
    }

    static async create(file, data) {
        if (!file) {
            throw new ErrorResponse("background_color.file_required", 400);
        }
        const result = await BackgroundColorDB.create({ ...data, file: file.filename });
        return result;
    }

    static async update(id, file, data) {
        const existing = await BackgroundColorDB.getById(id);
        if (!existing) {
            throw new ErrorResponse("background_color.not_found", 404);
        }

        const updateData = { ...data };
        if (file) {
            updateData.file = file.filename;
            // Delete old file
            if (existing.file) {
                const oldFilePath = path.join(__dirname, `../../../public/uploads/images/${existing.file}`);
                try {
                    await fs.unlink(oldFilePath);
                } catch (error) {
                    // Ignore if file doesn't exist
                }
            }
        }

        const result = await BackgroundColorDB.update(id, updateData);
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

        // Delete file from disk
        if (existing.file) {
            const filePath = path.join(__dirname, `../../../public/uploads/images/${existing.file}`);
            try {
                await fs.unlink(filePath);
            } catch (error) {
                // Ignore if file doesn't exist
            }
        }

        await BackgroundColorDB.delete(id);
        return { message: "Background color deleted successfully" };
    }
}

module.exports = { BackgroundColorService };
