import { NextResponse } from "next/server";
import records from "@/data/certificates.json";
import { findCertificate, type Certificate } from "@/lib/certificate-lookup";

const certificates: Certificate[] = records;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("certificateId" in body) ||
    typeof body.certificateId !== "string" ||
    !body.certificateId.trim()
  ) {
    return NextResponse.json(
      { error: "Please enter a certificate ID." },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { certificate: findCertificate(certificates, body.certificateId) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
