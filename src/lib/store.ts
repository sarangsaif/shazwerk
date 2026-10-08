import fs from "fs";
import path from "path";

/**
 * Tiny key/value + list store.
 *
 * Production (Vercel): Upstash Redis over its REST API. Add the "Upstash for Redis"
 * integration in Vercel → Storage; it injects KV_REST_API_URL / KV_REST_API_TOKEN
 * (or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN).
 *
 * Local development: a JSON file in ./data (or /tmp when the project dir is read-only).
 * The file fallback does NOT persist on Vercel serverless functions.
 */

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

export const storeBackend: "redis" | "file" = REDIS_URL && REDIS_TOKEN ? "redis" : "file";

type Cmd = (string | number)[];

async function redis<T = unknown>(cmd: Cmd): Promise<T> {
  const res = await fetch(REDIS_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  const data = await res.json();
  if (data.error) throw new Error(`Redis: ${data.error}`);
  return data.result as T;
}

async function redisPipeline(cmds: Cmd[]): Promise<unknown[]> {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
    cache: "no-store",
  });
  const data = (await res.json()) as { result?: unknown; error?: string }[];
  return data.map((d) => {
    if (d.error) throw new Error(`Redis: ${d.error}`);
    return d.result;
  });
}

// ---------- File fallback ----------

function storageDir(): string {
  const local = path.join(process.cwd(), "data");
  try {
    fs.mkdirSync(local, { recursive: true });
    fs.accessSync(local, fs.constants.W_OK);
    return local;
  } catch {
    const tmp = path.join("/tmp", "shazwerk-data");
    fs.mkdirSync(tmp, { recursive: true });
    return tmp;
  }
}

let fileCache: Record<string, unknown> | null = null;
const FILE = () => path.join(storageDir(), "store.json");

function fileRead(): Record<string, unknown> {
  if (fileCache) return fileCache;
  try {
    fileCache = JSON.parse(fs.readFileSync(FILE(), "utf-8"));
  } catch {
    fileCache = {};
  }
  return fileCache!;
}

function fileWrite() {
  try {
    fs.writeFileSync(FILE(), JSON.stringify(fileCache ?? {}), "utf-8");
  } catch (err) {
    console.error("store: file write failed", err);
  }
}

// ---------- Public API ----------

export async function getJSON<T>(key: string): Promise<T | null> {
  if (storeBackend === "redis") {
    const raw = await redis<string | null>(["GET", key]);
    return raw ? (JSON.parse(raw) as T) : null;
  }
  const v = fileRead()[key];
  return v === undefined ? null : (structuredClone(v) as T);
}

export async function setJSON(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
  if (storeBackend === "redis") {
    await redis(ttlSeconds ? ["SET", key, JSON.stringify(value), "EX", ttlSeconds] : ["SET", key, JSON.stringify(value)]);
    return;
  }
  fileRead()[key] = structuredClone(value);
  fileWrite();
}

/** Prepends an item to a capped list (newest first). */
export async function listPush(key: string, item: unknown, cap: number): Promise<void> {
  if (storeBackend === "redis") {
    await redisPipeline([
      ["LPUSH", key, JSON.stringify(item)],
      ["LTRIM", key, 0, cap - 1],
    ]);
    return;
  }
  const data = fileRead();
  const list = (data[key] as unknown[]) || [];
  list.unshift(item);
  data[key] = list.slice(0, cap);
  fileWrite();
}

/** Returns up to `count` newest items. */
export async function listRange<T>(key: string, count: number): Promise<T[]> {
  if (storeBackend === "redis") {
    // Page through in chunks to stay under REST response limits
    const out: T[] = [];
    const chunk = 1000;
    for (let start = 0; start < count; start += chunk) {
      const rows = await redis<string[]>(["LRANGE", key, start, Math.min(count, start + chunk) - 1]);
      for (const r of rows) {
        try {
          out.push(JSON.parse(r) as T);
        } catch {}
      }
      if (rows.length < chunk) break;
    }
    return out;
  }
  const list = (fileRead()[key] as T[]) || [];
  return structuredClone(list.slice(0, count));
}

export async function listReplace(key: string, items: unknown[]): Promise<void> {
  if (storeBackend === "redis") {
    const cmds: Cmd[] = [["DEL", key]];
    if (items.length) cmds.push(["RPUSH", key, ...items.map((i) => JSON.stringify(i))]);
    await redisPipeline(cmds);
    return;
  }
  fileRead()[key] = structuredClone(items);
  fileWrite();
}

export async function del(key: string): Promise<void> {
  if (storeBackend === "redis") {
    await redis(["DEL", key]);
    return;
  }
  delete fileRead()[key];
  fileWrite();
}
