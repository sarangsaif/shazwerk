import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Admin auth. Credentials come only from environment variables:
 *   ADMIN_PASSWORD – the portal password (required in production)
 *   ADMIN_SECRET   – optional signing secret; derived from the password when unset
 * In local development "admin" works when ADMIN_PASSWORD is not set.
 */
const COOKIE_NAME = "shazwerk_admin_session";
const IS_PROD = process.env.NODE_ENV === "production";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (IS_PROD ? "" : "admin");
const ADMIN_SECRET =
  process.env.ADMIN_SECRET ||
  crypto.createHash("sha256").update(`shazwerk-session:${ADMIN_PASSWORD}`).digest("hex");

export function adminConfigured(): boolean {
  return ADMIN_PASSWORD.length > 0;
}

export function verifyPassword(password: string): boolean {
  if (!adminConfigured() || typeof password !== "string" || !password) return false;
  const a = crypto.createHash("sha256").update(password).digest();
  const b = crypto.createHash("sha256").update(ADMIN_PASSWORD).digest();
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const payload = {
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    nonce: crypto.randomBytes(16).toString("hex"),
  };
  const str = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", ADMIN_SECRET).update(str).digest("base64url");
  return `${str}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  if (!adminConfigured()) return false;
  try {
    const [payloadStr, signature] = token.split(".");
    if (!payloadStr || !signature) return false;
    const expected = crypto.createHmac("sha256", ADMIN_SECRET).update(payloadStr).digest("base64url");
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf-8"));
    return payload.role === "admin" && Date.now() < payload.exp;
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  return token ? verifySessionToken(token) : false;
}

export { COOKIE_NAME };
