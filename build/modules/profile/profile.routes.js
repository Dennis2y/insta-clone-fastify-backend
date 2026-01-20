"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = profileRoutes;
function getDb(fastify) {
    return fastify.db || fastify.sqlite || fastify.database;
}
async function exec(db, sql) {
    if (db?.exec)
        return db.exec(sql);
    if (db?.prepare)
        return db.prepare(sql).run();
    return await new Promise((resolve, reject) => {
        db.run(sql, [], (err) => (err ? reject(err) : resolve()));
    });
}
async function getOne(db, sql, params = []) {
    if (db?.prepare)
        return db.prepare(sql).get(...params);
    return await new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
    });
}
async function run(db, sql, params = []) {
    if (db?.prepare)
        return db.prepare(sql).run(...params);
    return await new Promise((resolve, reject) => {
        db.run(sql, params, (err) => (err ? reject(err) : resolve()));
    });
}
async function profileRoutes(fastify) {
    const db = getDb(fastify);
    if (db) {
        await exec(db, "CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY CHECK(id=1), username TEXT, avatar_url TEXT)");
        await run(db, "INSERT OR IGNORE INTO profile (id, username, avatar_url) VALUES (1, 'webeet_user', '')");
    }
    fastify.get("/profile", async () => {
        const db2 = getDb(fastify);
        const row = db2 ? await getOne(db2, "SELECT id, username, avatar_url FROM profile WHERE id=1") : null;
        return { ok: true, profile: row || { id: 1, username: "webeet_user", avatar_url: "" } };
    });
    fastify.put("/profile", async (request) => {
        const body = request.body || {};
        const avatar_url = body.avatar_url ?? "";
        const username = body.username ?? "webeet_user";
        const db2 = getDb(fastify);
        if (!db2)
            return { ok: false, error: "db not available" };
        await run(db2, "UPDATE profile SET username=?, avatar_url=? WHERE id=1", [String(username), String(avatar_url)]);
        const row = await getOne(db2, "SELECT id, username, avatar_url FROM profile WHERE id=1");
        return { ok: true, profile: row };
    });
}
