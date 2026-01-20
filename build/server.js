"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const upload_1 = __importDefault(require("./routes/upload"));
const database_plugin_1 = __importDefault(require("./core/database/database.plugin"));
const posts_routes_1 = __importDefault(require("./modules/posts/posts.routes"));
const posts_create_routes_1 = __importDefault(require("./modules/posts/posts.create.routes"));
const profile_routes_1 = __importDefault(require("./modules/profile/profile.routes"));
const reels_routes_1 = __importDefault(require("./modules/reels/reels.routes"));
const tagged_routes_1 = __importDefault(require("./modules/tagged/tagged.routes"));
const highlights_routes_1 = __importDefault(require("./modules/highlights/highlights.routes"));
const search_routes_1 = __importDefault(require("./modules/search/search.routes"));
const fastify = (0, fastify_1.default)({ logger: true });
async function start() {
    /** ---------------- CORS ---------------- */
    await fastify.register(cors_1.default, {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    });
    /** ---------------- MULTIPART ---------------- */
    await fastify.register(multipart_1.default, {
        limits: {
            fileSize: 50 * 1024 * 1024,
            files: 1,
        },
    });
    const uploadsDir = path_1.default.join(process.cwd(), "public", "uploads");
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    /** ---------------- STATIC UPLOADS ---------------- */
    await fastify.register(static_1.default, {
        root: uploadsDir,
        prefix: "/uploads/",
        // optional, but helps if you later add any /uploads route
        decorateReply: false,
    });
    /** ---------------- BASIC ROUTES ---------------- */
    fastify.get("/", () => ({ hello: "world" }));
    fastify.get("/health", () => ({ ok: true }));
    /** ---------------- DATABASE ---------------- */
    await fastify.register(database_plugin_1.default);
    /** ---------------- FEATURE ROUTES ---------------- */
    await fastify.register(posts_routes_1.default, { prefix: "/api" });
    await fastify.register(posts_create_routes_1.default, { prefix: "/api" });
    await fastify.register(profile_routes_1.default, { prefix: "/api" });
    await fastify.register(reels_routes_1.default, { prefix: "/api" });
    await fastify.register(tagged_routes_1.default, { prefix: "/api" });
    await fastify.register(highlights_routes_1.default, { prefix: "/api" });
    await fastify.register(search_routes_1.default, { prefix: "/api" });
    await fastify.register(upload_1.default, { prefix: "/api" });
    await fastify.ready();
    console.log(fastify.printRoutes());
    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || "0.0.0.0";
    await fastify.listen({ port, host });
    console.log("🚀 Server is running at http://" + host + ":" + port);
}
start().catch((err) => {
    fastify.log.error(err);
    process.exit(1);
});
