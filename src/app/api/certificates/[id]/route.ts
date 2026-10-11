import { NextRequest, NextResponse } from "next/server";
import records from "@/data/certificates.json";
import { findCertificate } from "@/lib/certificate-lookup";
import { certificateRequestOrigin, certificateVerificationUrl, generateCertificateDocument } from "@/lib/certificate-document";

export const runtime = "nodejs";

function isTrustedCertificateUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (url.hostname === "drive.google.com" || url.hostname.endsWith(".googleusercontent.com"));
  } catch {
    return false;
  }
}

async function fetchOriginalCertificate(url: string) {
  if (!isTrustedCertificateUrl(url)) return null;
  const response = await fetch(url, { redirect: "follow", headers: { Accept: "application/pdf" }, cache: "no-store" });
  if (!response.ok) return null;
  const bytes = Buffer.from(await response.arrayBuffer());
  // Drive may label a direct download as application/octet-stream, so verify the file signature.
  if (bytes.length < 5 || bytes.subarray(0, 5).toString("ascii") !== "%PDF-") return null;
  return bytes;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certificate = findCertificate(records, id);
  if (!certificate) return NextResponse.json({ error: "This ID is not valid." }, { status: 404 });

  const format = request.nextUrl.searchParams.get("format") ?? "svg";
  if (format !== "pdf" && format !== "svg") return NextResponse.json({ error: "Unsupported certificate format." }, { status: 400 });

  if (format === "pdf" && certificate.certificateUrl) {
    try {
      const original = await fetchOriginalCertificate(certificate.certificateUrl);
      if (original) {
        const filename = `EYCC-certificate-${certificate.id.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
        const disposition = request.nextUrl.searchParams.get("download") === "1" ? "attachment" : "inline";
        return new NextResponse(original, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `${disposition}; filename="${filename}"`,
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
            "X-Content-Type-Options": "nosniff",
          },
        });
      }
    } catch {
      // Fall through to the generated copy if the remote Drive file is temporarily unavailable.
    }
  }

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
