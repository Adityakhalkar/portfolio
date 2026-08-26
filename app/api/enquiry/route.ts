import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const TO = "khalkaraditya8@gmail.com";
/* Resend needs a verified sending domain. Until adityakhalkar.me is verified
   in Resend, their shared onboarding address works for mail addressed to the
   account owner, which is exactly what this route does. */
const FROM = process.env.ENQUIRY_FROM || "Portfolio <onboarding@resend.dev>";

const FIELDS = [
  { key: "name", label: "Name", max: 120, required: true },
  { key: "email", label: "Email", max: 200, required: true },
  { key: "project", label: "What they're building", max: 4000, required: true },
  { key: "budget", label: "Budget", max: 120, required: false },
  { key: "timeline", label: "Timeline", max: 120, required: false },
  { key: "package", label: "Package", max: 120, required: false },
] as const;

/* Best-effort throttle. Serverless instances are not shared, so this stops the
   obvious hammering rather than a distributed flood. The honeypot does more. */
const seen = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (seen.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  seen.set(ip, hits);
  if (seen.size > 5000) seen.clear();
  return hits.length > MAX_PER_WINDOW;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    /* Honeypot: a real person never fills a hidden field. Answer 200 so a bot
       cannot tell it was caught. */
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many enquiries from this address. Email me directly." },
        { status: 429 }
      );
    }

    const values: Record<string, string> = {};
    for (const field of FIELDS) {
      const raw = body[field.key];
      const value = typeof raw === "string" ? raw.trim() : "";
      if (field.required && !value) {
        return NextResponse.json(
          { error: `${field.label} is required.` },
          { status: 400 }
        );
      }
      if (value.length > field.max) {
        return NextResponse.json(
          { error: `${field.label} is too long.` },
          { status: 400 }
        );
      }
      values[field.key] = value;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
      return NextResponse.json(
        { error: "That email address does not look right." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("[enquiry] RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Mail is not configured right now. Please email me directly." },
        { status: 503 }
      );
    }

    const rows = FIELDS.filter((f) => values[f.key]).map(
      (f) =>
        `<tr>
           <td style="padding:6px 16px 6px 0;color:#71717a;font:12px ui-monospace,monospace;vertical-align:top;white-space:nowrap">${escapeHtml(
             f.label
           )}</td>
           <td style="padding:6px 0;color:#18181b;font:14px ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(
             values[f.key]
           )}</td>
         </tr>`
    );

    const subject = values.package
      ? `Enquiry: ${values.package} from ${values.name}`
      : `Enquiry from ${values.name}`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: values.email,
        subject,
        text: FIELDS.filter((f) => values[f.key])
          .map((f) => `${f.label}: ${values[f.key]}`)
          .join("\n"),
        html: `<div style="font:14px ui-monospace,monospace;color:#18181b">
                 <table style="border-collapse:collapse">${rows.join("")}</table>
                 <p style="margin-top:24px;color:#a1a1aa;font-size:12px">
                   Sent from the Hire Me form on adityakhalkar.me. Reply goes straight to them.
                 </p>
               </div>`,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[enquiry] resend failed", response.status, detail);
      return NextResponse.json(
        { error: "Could not send that. Please email me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[enquiry] unexpected", error);
    return NextResponse.json(
      { error: "Something broke. Please email me directly." },
      { status: 500 }
    );
  }
}
