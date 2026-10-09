import crypto from "crypto";
import { cookies } from "next/headers";
import { del, getJSON, setJSON } from "./store";

/**
 * Admin auth.
 *
 * Credentials: ADMIN_USERNAME / ADMIN_PASSWORD environment variables when set; otherwise the
 * built-in account below. The repository is public, so the built-in password is stored only as a
 * salted scrypt hash.
 *
 * Sessions are signed with a secret that is not in the repository (see below).
 */
const COOKIE_NAME = "shazwerk_admin_session";
const SESSION_TTL = 7 * 24 * 60 * 60;

const DEFAULT_USERNAME = "sarang.hira";
const DEFAULT_PASSWORD_HASH =
  "3f99a02772c54f0fe466e2fe138580be:88d66298e4c3277a658eb1c91487551e29a98dd25a95d37bcdcef3981cc5b6d6";
const SCRYPT = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

function safeEqual(a: string, b: string) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function verifyCredentials(username: string, password: string): boolean {
  if (typeof username !== "string" || typeof password !== "string" || !username || !password) return false;
  const expectedUser = process.env.ADMIN_USERNAME || DEFAULT_USERNAME;
  const userOk = safeEqual(username.trim().toLowerCase(), expectedUser.toLowerCase());

  let passOk: boolean;
  if (process.env.ADMIN_PASSWORD) {
    passOk = safeEqual(password, process.env.ADMIN_PASSWORD);
  } else {
    const [saltHex, hashHex] = DEFAULT_PASSWORD_HASH.split(":");
    const actual = crypto.scryptSync(password, Buffer.from(saltHex, "hex"), 32, SCRYPT);
    passOk = crypto.timingSafeEqual(actual, Buffer.from(hashHex, "hex"));
  }
  return userOk && passOk;
}

/**
 * Sessions are HMAC-signed tokens, so every serverless function can verify them without shared
 * storage. The key is ADMIN_SECRET when set, otherwise a random key generated at build time
 * (see next.config.js) – a new deploy therefore signs everyone out.
 */
const SESSION_SECRET = process.env.ADMIN_SECRET || process.env.BUILD_SESSION_SECRET || crypto.randomBytes(32).toString("hex");

function sign(data: string) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(data).digest("base64url");
}

export async function createSession(): Promise<string> {
  const payload = Buffer.from(
    JSON.stringify({ u: process.env.ADMIN_USERNAME || DEFAULT_USERNAME, exp: Date.now() + SESSION_TTL * 1000, n: crypto.randomBytes(8).toString("hex") })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export async function destroySession(_token?: string) {
  // Stateless tokens: logging out removes the cookie.
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    return Date.now() < data.exp;
  } catch {
    return false;
  }
}

// ---------- Brute-force protection: max 8 failed logins per IP per 15 minutes ----------

const attemptKey = (ip: string) => `sw:login-fail:${crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32)}`;

export async function loginBlocked(ip: string): Promise<boolean> {
  const rec = await getJSON<{ n: number; until: number }>(attemptKey(ip)).catch(() => null);
  return !!rec && rec.n >= 8 && Date.now() < rec.until;
}

export async function recordFailedLogin(ip: string) {
  const rec = (await getJSON<{ n: number; until: number }>(attemptKey(ip)).catch(() => null)) || { n: 0, until: 0 };
  const fresh = Date.now() > rec.until;
  await setJSON(attemptKey(ip), { n: fresh ? 1 : rec.n + 1, until: fresh ? Date.now() + 15 * 60000 : rec.until }, 15 * 60);
}

export async function clearFailedLogins(ip: string) {
  await del(attemptKey(ip)).catch(() => {});
}

export { COOKIE_NAME, SESSION_TTL };
