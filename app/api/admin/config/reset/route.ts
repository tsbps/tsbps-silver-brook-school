import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { resetSiteConfigToDefault } from "@/lib/site-config";

export async function POST() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = await resetSiteConfigToDefault();
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, config });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Rollback failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
