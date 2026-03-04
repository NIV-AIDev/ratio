import dns from "node:dns";
import { NextResponse } from "next/server";
import { contactPageSchema } from "@/lib/validation/contact-page";

export const runtime = "nodejs";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch {
  // Ignore when unavailable in specific runtimes.
}

type ErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

type AppsScriptResponse = {
  ok?: boolean;
  message?: string;
};

export async function POST(request: Request) {
  const isProduction = process.env.NODE_ENV === "production";
  let payload: unknown = null;

  try {
    payload = await request.json();
  } catch (error) {
    console.error("Contact API payload parse failed", error);
    return NextResponse.json<ErrorResponse>(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const result = contactPageSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json<ErrorResponse>(
      {
        message: "Validation failed.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
  const webhookSecret = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_SECRET;

  if (!appsScriptUrl) {
    console.error("Missing GOOGLE_APPS_SCRIPT_WEBHOOK_URL environment variable.");
    return NextResponse.json<ErrorResponse>(
      {
        message: "Contact service is temporarily unavailable. Please try again shortly.",
      },
      { status: 503 },
    );
  }

  const submission = result.data;
  const requestBody = {
    ...submission,
    source: "contact-page",
    submittedAt: new Date().toISOString(),
    ...(webhookSecret ? { webhookSecret } : {}),
  };

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (webhookSecret) {
      headers["x-webhook-secret"] = webhookSecret;
    }

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });

    const responseText = await response.text();
    let payload: AppsScriptResponse | null = null;

    if (responseText) {
      try {
        payload = JSON.parse(responseText) as AppsScriptResponse;
      } catch {
        payload = null;
      }
    }

    if (!response.ok || payload?.ok === false) {
      const responseSnippet = responseText.slice(0, 240).trim();
      const details =
        payload?.message ||
        responseSnippet ||
        `Apps Script returned HTTP ${response.status}.`;
      const message = `Apps Script request failed (${response.status}). ${details}`;
      throw new Error(message);
    }
  } catch (error) {
    const causeMessage =
      error instanceof Error &&
      error.cause &&
      typeof error.cause === "object" &&
      "message" in error.cause
        ? String(error.cause.message)
        : null;
    const details =
      error instanceof Error
        ? causeMessage
          ? `${error.message}: ${causeMessage}`
          : error.message
        : "Unknown upstream error.";
    console.error("Failed to send contact submission to Google Apps Script", details);
    return NextResponse.json<ErrorResponse>(
      {
        message: isProduction
          ? "We could not send your enquiry right now. Please try again in a moment."
          : details,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Thank you. Your enquiry has been received and our team will respond shortly.",
  });
}
