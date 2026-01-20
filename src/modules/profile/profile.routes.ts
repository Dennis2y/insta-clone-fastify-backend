import type { FastifyInstance } from "fastify";

function getDb(fastify: FastifyInstance): any {
  return (fastify as any).db || (fastify as any).sqlite || (fastify as any).database;
}

async function exec(db: any, sql: string) {
  if (db?.exec) return db.exec(sql);
  if (db?.prepare) return db.prepare(sql).run();
  return await new Promise<void>((resolve, reject) => {
    db.run(sql, [], (err: any) => (err ? reject(err) : resolve()));
  });
}

async function getOne(db: any, sql: string, params: any[] = []) {
  if (db?.prepare) return db.prepare(sql).get(...params);
  return await new Promise<any>((resolve, reject) => {
    db.get(sql, params, (err: any, row: any) => (err ? reject(err) : resolve(row)));
  });
}

async function run(db: any, sql: string, params: any[] = []) {
  if (db?.prepare) return db.prepare(sql).run(...params);
  return await new Promise<void>((resolve, reject) => {
    db.run(sql, params, (err: any) => (err ? reject(err) : resolve()));
  });
}

export default async function profileRoutes(fastify: FastifyInstance) {
  const db = getDb(fastify);
  if (db) {
    await exec(
      db,
      "CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY CHECK(id=1), username TEXT, avatar_url TEXT)"
    );
    await run(db, "INSERT OR IGNORE INTO profile (id, username, avatar_url) VALUES (1, 'webeet_user', '')");
  }

  fastify.get("/profile", async () => {
    const db2 = getDb(fastify);
    const row = db2 ? await getOne(db2, "SELECT id, username, avatar_url FROM profile WHERE id=1") : null;
    return { ok: true, profile: row || { id: 1, username: "webeet_user", avatar_url: "" } };
  });

  fastify.put("/profile", async (request) => {
    const body: any = request.body || {};
    const avatar_url = body.avatar_url ?? "";
    const username = body.username ?? "webeet_user";

    const db2 = getDb(fastify);
    if (!db2) return { ok: false, error: "db not available" };

    await run(db2, "UPDATE profile SET username=?, avatar_url=? WHERE id=1", [String(username), String(avatar_url)]);
    const row = await getOne(db2, "SELECT id, username, avatar_url FROM profile WHERE id=1");
    return { ok: true, profile: row };
  });
}
