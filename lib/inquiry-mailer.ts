import type { InquiryItem } from "@/lib/inquiries-store";

interface MailResult {
  sent: boolean;
  reason?: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildInquiryEmail(item: InquiryItem) {
  const safe = {
    type: escapeHtml(item.type),
    name: escapeHtml(item.name),
    phone: escapeHtml(item.phone),
    email: escapeHtml(item.email || "-"),
    message: escapeHtml(item.message),
    createdAt: escapeHtml(item.createdAt),
  };

  const subject = `[${item.type.toUpperCase()}] ${item.name} - ${item.phone}`;
  const text = [
    `Type: ${item.type}`,
    `Name: ${item.name}`,
    `Phone: ${item.phone}`,
    `Email: ${item.email || "-"}`,
    `Time: ${item.createdAt}`,
    "",
    "Message:",
    item.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a">
      <h2 style="margin:0 0 12px">New ${safe.type} submission</h2>
      <p style="margin:0 0 8px"><strong>Name:</strong> ${safe.name}</p>
      <p style="margin:0 0 8px"><strong>Phone:</strong> ${safe.phone}</p>
      <p style="margin:0 0 8px"><strong>Email:</strong> ${safe.email}</p>
      <p style="margin:0 0 8px"><strong>Time:</strong> ${safe.createdAt}</p>
      <p style="margin:12px 0 6px"><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;margin:0;background:#f8fafc;padding:10px;border-radius:8px;border:1px solid #e2e8f0">${safe.message}</pre>
    </div>
  `;

  return { subject, text, html };
}

export async function sendInquiryNotification(item: InquiryItem): Promise<MailResult> {
  const to = process.env.INQUIRY_NOTIFY_TO?.trim();
  if (!to) {
    return { sent: false, reason: "INQUIRY_NOTIFY_TO is not set" };
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.INQUIRY_FROM_EMAIL?.trim();
  if (!resendApiKey || !from) {
    return { sent: false, reason: "RESEND_API_KEY or INQUIRY_FROM_EMAIL is not set" };
  }

  const email = buildInquiryEmail(item);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: email.subject,
      text: email.text,
      html: email.html,
      reply_to: item.email || undefined,
    }),
  });

  if (!response.ok) {
    const payload = (await response.text()).slice(0, 240);
    return { sent: false, reason: `Email API failed (${response.status}): ${payload}` };
  }

  return { sent: true };
}
