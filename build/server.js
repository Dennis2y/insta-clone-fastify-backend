"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const app = (0, fastify_1.default)({ logger: true });
app.register(cors_1.default, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});
/** ---------------- MULTIPART ---------------- */
app.register(multipart_1.default, {
    limits: { fileSize: 50 * 1024 * 1024, files: 1 },
});
/** ---------------- STATIC UPLOADS ---------------- */
app.register(static_1.default, {
    root: path_1.default.join(process.cwd(), "public", "uploads"),
    prefix: "/uploads/",
});
/** ---------------- BASIC ---------------- */
app.get("/", async () => ({ ok: true, service: "insta-clone-fastify-backend" }));
app.get("/health", async () => ({ ok: true }));
/** ---------------- API ROUTES ---------------- */
(0, routes_1.registerRoutes)(app);
const port = Number(process.env.PORT) || 3000;
app.listen({ port, host: "127.0.0.1" }).then(() => {
    console.log(`🚀 Backend running on http://127.0.0.1:${port}`);
}).catch((err) => {
    app.log.error(err);
    process.exit(1);
});
