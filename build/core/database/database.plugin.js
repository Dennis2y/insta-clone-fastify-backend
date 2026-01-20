"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databasePlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const database_transactions_1 = require("./database.transactions");
async function databasePluginHelper(fastify) {
    const db = new better_sqlite3_1.default("./database.db");
    fastify.log.info("SQLite database connection established.");
    // ------------------------------------------------------------
    // Posts table (Day 1/2)
    // ------------------------------------------------------------
    db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
    // ------------------------------------------------------------
    // Reels table (so /reels/grid is NOT empty)
    // ------------------------------------------------------------
    db.exec(`
    CREATE TABLE IF NOT EXISTS reels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_url TEXT NOT NULL,
      cover_image_url TEXT NOT NULL,
      caption TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
    const reelsCount = db
        .prepare("SELECT COUNT(*) as count FROM reels")
        .get();
    if (reelsCount.count === 0) {
        const insertReel = db.prepare("INSERT INTO reels (video_url, cover_image_url, caption) VALUES (?, ?, ?)");
        insertReel.run("https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4", "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", "My first reel 🎬");
        insertReel.run("https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4", "https://images.unsplash.com/photo-1520975682031-a9ce4c7f5b77", "Another reel 🔥");
    }
    // ------------------------------------------------------------
    // Tagged posts table (Day 3)
    // ------------------------------------------------------------
    db.exec(`
    CREATE TABLE IF NOT EXISTS tagged_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      tagged_by TEXT NOT NULL
    );
  `);
    const taggedCount = db
        .prepare("SELECT COUNT(*) as count FROM tagged_posts")
        .get();
    if (taggedCount.count === 0) {
        const insertTagged = db.prepare("INSERT INTO tagged_posts (img_url, caption, tagged_by) VALUES (?, ?, ?)");
        insertTagged.run("https://images.unsplash.com/photo-1520975682031-a9ce4c7f5b77", "Tagged at the beach 🌊", "webeet_friend");
        insertTagged.run("https://images.unsplash.com/photo-1520975958225-1d68f9c67b08", "Tagged at a party 🎉", "another_user");
    }
    // ------------------------------------------------------------
    // Highlights table (Day 3)
    // ------------------------------------------------------------
    db.exec(`
    CREATE TABLE IF NOT EXISTS highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cover_image_url TEXT NOT NULL,
      title TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
    const highlightsCount = db
        .prepare("SELECT COUNT(*) as count FROM highlights")
        .get();
    if (highlightsCount.count === 0) {
        const insertHighlight = db.prepare("INSERT INTO highlights (cover_image_url, title) VALUES (?, ?)");
        insertHighlight.run("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", "Summer");
        insertHighlight.run("https://images.unsplash.com/photo-1495567720989-cebdbdd97913", "Family");
    }
    // Build all prepared statements (posts + any helpers you added)
    const transactions = (0, database_transactions_1.createTransactionHelpers)(db);
    // Attach db + transactions to Fastify instance
    fastify.decorate("db", db);
    fastify.decorate("transactions", transactions);
    // Close DB cleanly when server stops
    fastify.addHook("onClose", (instance, done) => {
        instance.db.close();
        instance.log.info("SQLite database connection closed.");
        done();
    });
}
/**
 * Export BOTH named + default:
 * - named export is convenient in tests/imports
 * - default export keeps compatibility with plugin registration style
 */
exports.databasePlugin = (0, fastify_plugin_1.default)(databasePluginHelper);
exports.default = exports.databasePlugin;
