import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";

type ErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export async function POST(request: Request) {
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

  const result = contactSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json<ErrorResponse>(
      {
        message: "Validation failed.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // TODO: Integrate with an email service (SendGrid/Resend/etc.) if desired.

  return NextResponse.json({
    message: "Thanks for reaching out. We'll respond shortly.",
  });
}
