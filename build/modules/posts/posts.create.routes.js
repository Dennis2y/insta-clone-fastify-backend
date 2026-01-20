"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postsCreateRoutes;
function getDb(fastify) {
    return fastify.db || fastify.sqlite || fastify.database;
}
async function runInsert(db, sql, params) {
    if (db?.prepare) {
        const info = db.prepare(sql).run(...params);
        return Number(info?.lastInsertRowid || info?.lastID || 0);
    }
    return await new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err)
                reject(err);
            else
                resolve(Number(this?.lastID || 0));
        });
    });
}
async function postsCreateRoutes(fastify) {
    fastify.post("/posts", async (request, reply) => {
        const body = request.body || {};
        const img_url = body.img_url ?? body.imageUrl ?? body.image ?? body.url;
        const caption = body.caption ?? "";
        if (!img_url || String(img_url).trim() === "") {
            return reply.code(400).send({ ok: false, error: "img_url required" });
        }
        const db = getDb(fastify);
        if (!db)
            return reply.code(500).send({ ok: false, error: "db not available" });
        const id = await runInsert(db, "INSERT INTO posts (img_url, caption) VALUES (?, ?)", [String(img_url), String(caption)]);
        return { ok: true, id, img_url: String(img_url), caption: String(caption) };
    });
}
