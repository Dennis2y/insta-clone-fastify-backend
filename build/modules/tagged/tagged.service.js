"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggedService = taggedService;
const tagged_types_1 = require("./tagged.types");
const database_transactions_1 = require("../../core/database/database.transactions");
/**
 * Service layer:
 * - contains "business logic"
 * - talks to the database via transactions helpers
 * - validates data with Zod before returning it
 */
function taggedService(app) {
    return {
        getGrid() {
            // db is attached by the database plugin in server.ts
            const rows = (0, database_transactions_1.getTaggedGrid)(app.db);
            // runtime validation
            return tagged_types_1.taggedPostsSchema.parse(rows);
        },
    };
}
