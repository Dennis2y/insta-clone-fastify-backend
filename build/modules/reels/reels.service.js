"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelsService = reelsService;
const database_transactions_1 = require("../../core/database/database.transactions");
const reels_types_1 = require("./reels.types");
/**
 * Service layer:
 * - calls DB helpers
 * - validates output using Zod schemas
 */
function reelsService(app) {
    return {
        getGrid() {
            // db is attached by database plugin
            const rows = (0, database_transactions_1.getReelsGrid)(app.db);
            return reels_types_1.reelsSchema.parse(rows);
        },
    };
}
