"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightsService = highlightsService;
const highlights_types_1 = require("./highlights.types");
const database_transactions_1 = require("../../core/database/database.transactions");
/**
 * Service layer for highlights:
 * - getAll: list highlights
 * - getById: fetch one highlight by id
 * - validates with Zod
 */
function highlightsService(app) {
    return {
        getAll() {
            const rows = (0, database_transactions_1.getHighlights)(app.db);
            return highlights_types_1.highlightsSchema.parse(rows);
        },
        getById(id) {
            const row = (0, database_transactions_1.getHighlightById)(app.db, id);
            if (!row)
                return null;
            return highlights_types_1.highlightSchema.parse(row);
        },
    };
}
