import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface InquiryItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_PATH = path.join(DATA_DIR, "inquiries.json");

async function readInquiries(): Promise<InquiryItem[]> {
  try {
    const raw = await fs.readFile(INQUIRIES_PATH, "utf8");
    return JSON.parse(raw) as InquiryItem[];
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<InquiryItem>;
    const name = body.name?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !phone || !message) {
      return NextResponse.json({ ok: false, message: "Name, phone, and message are required" }, { status: 400 });
    }

    const item: InquiryItem = {
      id: `inquiry-${Date.now()}`,
      name: name.slice(0, 80),
      phone: phone.slice(0, 30),
      email: email.slice(0, 120),
      message: message.slice(0, 1200),
      createdAt: new Date().toISOString(),
    };

    await fs.mkdir(DATA_DIR, { recursive: true });
    const existing = await readInquiries();
    existing.unshift(item);
    await fs.writeFile(INQUIRIES_PATH, JSON.stringify(existing, null, 2), "utf8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to submit inquiry" }, { status: 500 });
  }
}
