import type { FastifyInstance } from "fastify"
import { fileStorageService } from "../../common/file-storage.service"

type CreatePostServiceArgs = {
  caption: string;
  imageFile?: { buffer: Buffer; filename: string };
};

export const postsService = (fastify: FastifyInstance) => {
  return {
    create: async (data: CreatePostServiceArgs) => {
      fastify.log.info("Creating a new post")

      let img_url = "";

      // Save image if provided
      if (data.imageFile) {
        img_url = await fileStorageService.saveImage(
          data.imageFile.buffer,
          data.imageFile.filename
        );
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
