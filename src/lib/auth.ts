import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "shazwerk_jwt_secret_ch_2026_production";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "shazwerk2026!admin";
const COOKIE_NAME = "shazwerk_admin_session";

export function verifyPassword(password: string): boolean {
  if (!password) return false;
  // Timing-safe buffer comparison
  const inputBuf = Buffer.from(password);
  const targetBuf = Buffer.from(ADMIN_PASSWORD);
  if (inputBuf.length !== targetBuf.length) return false;
  return crypto.timingSafeEqual(inputBuf, targetBuf);
}

export function createSessionToken(): string {
  const payload = {
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    nonce: crypto.randomBytes(16).toString("hex"),
  };
  const str = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", ADMIN_SECRET).update(str).digest("base64url");
  return `${str}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [payloadStr, signature] = parts;
    const expectedSig = crypto.createHmac("sha256", ADMIN_SECRET).update(payloadStr).digest("base64url");
    if (signature !== expectedSig) return false;

    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf-8"));
    if (Date.now() > payload.exp) return false;
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export { COOKIE_NAME };
