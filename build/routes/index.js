"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const posts_1 = __importDefault(require("./posts"));
const reels_1 = __importDefault(require("./reels"));
const tagged_1 = __importDefault(require("./tagged"));
const highlights_1 = __importDefault(require("./highlights"));
const search_1 = __importDefault(require("./search"));
const upload_1 = __importDefault(require("./upload"));
async function registerRoutes(app) {
    await app.register(posts_1.default, { prefix: "/api" });
    await app.register(reels_1.default, { prefix: "/api" });
    await app.register(tagged_1.default, { prefix: "/api" });
    await app.register(highlights_1.default, { prefix: "/api" });
    await app.register(search_1.default, { prefix: "/api" });
    await app.register(upload_1.default, { prefix: "/api" });
}
