"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionHelpers = void 0;
exports.getTaggedGrid = getTaggedGrid;
exports.getHighlights = getHighlights;
exports.getHighlightById = getHighlightById;
exports.getReelsGrid = getReelsGrid;
const createTransactionHelpers = (db) => {
    const statements = {
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare("INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"),
    };
    const posts = {
        getById: (id) => statements.getPostById.get(id),
        getAll: () => statements.getAllPosts.all(),
        create: (data) => statements.createPost.get(data),
    };
    return { posts };
};
exports.createTransactionHelpers = createTransactionHelpers;
/**
 * ============================================================
 * Day 3 - Tagged + Highlights transactions (DB helpers)
 * These helpers keep raw SQL out of the service layer.
 * ============================================================
 */
function getTaggedGrid(db) {
    // Returns latest tagged posts first
    return db.prepare("SELECT * FROM tagged_posts ORDER BY id DESC").all();
}
function getHighlights(db) {
    // Returns latest highlights first
    return db.prepare("SELECT * FROM highlights ORDER BY id DESC").all();
}
function getHighlightById(db, id) {
    // Returns a single highlight by id (or undefined if not found)
    return db.prepare("SELECT * FROM highlights WHERE id = ?").get(id);
}
/**
 * ============================================================
 * Day 3 - Reels transactions (DB helpers)
 * ============================================================
 */
function getReelsGrid(db) {
    // Latest reels first
    return db.prepare("SELECT * FROM reels ORDER BY id DESC").all();
}
