import { NextResponse } from "next/server";
import { createSessionToken, getAdminCredentials, setAdminSessionCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const username = body.username?.trim() ?? "";
    const password = body.password?.trim() ?? "";
    const creds = getAdminCredentials();

    if (username !== creds.username || password !== creds.password) {
      return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
    }

    const token = createSessionToken(username);
    await setAdminSessionCookie(token);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }
}
