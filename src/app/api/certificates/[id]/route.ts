import { NextRequest, NextResponse } from "next/server";
import records from "@/data/certificates.json";
import { findCertificate } from "@/lib/certificate-lookup";
import { certificateRequestOrigin, certificateVerificationUrl, generateCertificateDocument } from "@/lib/certificate-document";

export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certificate = findCertificate(records, id);
  if (!certificate) return NextResponse.json({ error: "This ID is not valid." }, { status: 404 });

  const format = request.nextUrl.searchParams.get("format") ?? "svg";
  if (format !== "pdf" && format !== "svg") return NextResponse.json({ error: "Unsupported certificate format." }, { status: 400 });

  const origin = process.env.CERTIFICATE_SITE_URL || certificateRequestOrigin(request.headers, request.nextUrl.origin);
  const verificationUrl = certificateVerificationUrl(certificate.id, origin);
  const file = await generateCertificateDocument(certificate, verificationUrl, format);
  const filename = `EYCC-certificate-${certificate.id.replace(/[^a-zA-Z0-9_-]/g, "_")}.${format}`;
  const disposition = request.nextUrl.searchParams.get("download") === "1" ? "attachment" : "inline";

  return new NextResponse(typeof file === "string" ? file : Buffer.from(file), {
    headers: {
      "Content-Type": format === "pdf" ? "application/pdf" : "image/svg+xml; charset=utf-8",
      "Content-Disposition": `${disposition}; filename="${filename}"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...(format === "svg" ? { "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; font-src data:; sandbox" } : {}),
    },
  });
}
