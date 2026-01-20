"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsService = void 0;
const file_storage_service_1 = require("../../common/file-storage.service");
const postsService = (fastify) => {
    return {
        create: async (data) => {
            fastify.log.info("Creating a new post");
            let img_url = "";
            // Save image if provided
            if (data.imageFile) {
                img_url = await file_storage_service_1.fileStorageService.saveImage(data.imageFile.buffer, data.imageFile.filename);
            }
            // Insert into DB (must match SQL fields exactly!)
            return fastify.transactions.posts.create({
                img_url,
                caption: data.caption,
            });
        },
        getAll: async () => {
            return fastify.transactions.posts.getAll();
        },
    };
};
exports.postsService = postsService;
