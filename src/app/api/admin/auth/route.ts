import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_NAME,
  SESSION_TTL,
  clearFailedLogins,
  createSession,
  destroySession,
  loginBlocked,
  recordFailedLogin,
  verifyCredentials,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);
    if (await loginBlocked(ip)) {
      return NextResponse.json({ error: "Zu viele Fehlversuche. Bitte in 15 Minuten erneut versuchen." }, { status: 429 });
    }
    const { username, password } = await req.json();
    if (!verifyCredentials(username, password)) {
      await recordFailedLogin(ip);
      return NextResponse.json({ error: "Benutzername oder Passwort falsch." }, { status: 401 });
    }
    await clearFailedLogins(ip);
    const token = await createSession();
    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_TTL,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Anmeldung derzeit nicht möglich." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await destroySession(req.cookies.get(COOKIE_NAME)?.value).catch(() => {});
  const res = NextResponse.json({ success: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
