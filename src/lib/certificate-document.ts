import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";
import { PDFDocument, PDFName, PDFString, rgb } from "pdf-lib";
import type { Certificate } from "./certificate-lookup";
import { certificateSize, createCertificateDesign, type CertificateElement, type CertificateFont } from "./certificate-design.ts";

const fontFiles: Record<CertificateFont, string> = {
  serif: "LibreCaslonText.ttf",
  sans: "Lato-Regular.ttf",
  bold: "Lato-Bold.ttf",
};
let fontBytes: Promise<Record<CertificateFont, Buffer>> | undefined;
function loadFonts() {
  fontBytes ??= Promise.all(Object.entries(fontFiles).map(async ([key, file]) =>
    [key, await readFile(path.join(process.cwd(), "public", "fonts", file))] as const,
  )).then((entries) => Object.fromEntries(entries) as Record<CertificateFont, Buffer>);
  return fontBytes;
}

export function certificateVerificationUrl(id: string, origin: string) {
  return new URL(`/certificates/${encodeURIComponent(id)}`, origin).toString();
}

export function certificateRequestOrigin(headers: Pick<Headers, "get">, fallback: string) {
  const host = (headers.get("x-forwarded-host") ?? headers.get("host"))?.split(",")[0].trim();
  const protocol = headers.get("x-forwarded-proto")?.split(",")[0].trim() ?? new URL(fallback).protocol.replace(":", "");
  if (host && (protocol === "http" || protocol === "https")) {
    try {
      const origin = new URL(`${protocol}://${host}`);
      if (origin.host.toLowerCase() === host.toLowerCase() && !origin.username && !origin.password) return origin.origin;
    } catch { /* Use the parsed request URL for malformed proxy headers. */ }
  }
  return new URL(fallback).origin;
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character]!);
}

export async function generateCertificateDocument(certificate: Certificate, verificationUrl: string, format: "svg" | "pdf") {
  const bytes = await loadFonts();
  const document = await PDFDocument.create();
  document.registerFontkit(fontkit);
  const fonts = {
    serif: await document.embedFont(bytes.serif, { subset: true }),
    sans: await document.embedFont(bytes.sans, { subset: true }),
    bold: await document.embedFont(bytes.bold, { subset: true }),
  };
  const elements = createCertificateDesign(certificate, (value, font, size) => fonts[font].widthOfTextAtSize(value, size));
  const qr = QRCode.create(verificationUrl, { errorCorrectionLevel: "M" });
  const qrSize = 76;
  const cell = qrSize / (qr.modules.size + 8);
  const qrX = 958;
  const qrY = 663;
  elements.push({ kind: "rect", x: qrX, y: qrY, width: qrSize, height: qrSize, color: "#FFFFFF" });
  for (let row = 0; row < qr.modules.size; row++) {
    for (let column = 0; column < qr.modules.size; column++) {
      if (qr.modules.get(row, column)) elements.push({
        kind: "rect", x: qrX + (column + 4) * cell, y: qrY + (row + 4) * cell,
        width: cell, height: cell, color: "#143D2D",
      });
    }
  }

  if (format === "svg") {
    const definitions = Object.entries(bytes).map(([key, value]) =>
      `@font-face{font-family:Cert-${key};src:url(data:font/ttf;base64,${value.toString("base64")}) format('truetype');}`,
    ).join("");
    const draw = (element: CertificateElement) => {
      switch (element.kind) {
        case "rect": return `<rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" fill="${element.color}"/>`;
        case "line": return `<line x1="${element.x}" y1="${element.y}" x2="${element.toX}" y2="${element.toY}" stroke="${element.color}" stroke-width="${element.width}"/>`;
        case "circle": return `<circle cx="${element.x}" cy="${element.y}" r="${element.radius}" fill="none" stroke="${element.color}" stroke-width="${element.width}"/>`;
        case "text": return `<text x="${element.x}" y="${element.y}" font-family="Cert-${element.font}" font-size="${element.size}" fill="${element.color}">${escapeXml(element.text)}</text>`;
      }
    };
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="792" viewBox="0 0 1120 792" role="img" aria-labelledby="title description"><title id="title">EYCC Certificate of Achievement</title><desc id="description">${escapeXml(`${certificate.name}. Team: ${certificate.team}. ${certificate.achievement}. Certificate ID: ${certificate.id}.`)}</desc><defs><style>${definitions}</style></defs>${elements.map(draw).join("")}</svg>`;
  }

  // All drawing coordinates are shared with the preview; scale to landscape A4.
  const scale = 841.89 / certificateSize.width;
  const page = document.addPage([841.89, certificateSize.height * scale]);
  const y = (value: number) => (certificateSize.height - value) * scale;
  const color = (hex: string) => rgb(parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255);
  for (const element of elements) {
    switch (element.kind) {
      case "rect": page.drawRectangle({ x: element.x * scale, y: y(element.y + element.height), width: element.width * scale, height: element.height * scale, color: color(element.color) }); break;
      case "line": page.drawLine({ start: { x: element.x * scale, y: y(element.y) }, end: { x: element.toX * scale, y: y(element.toY) }, thickness: element.width * scale, color: color(element.color) }); break;
      case "circle": page.drawCircle({ x: element.x * scale, y: y(element.y), size: element.radius * scale, borderWidth: element.width * scale, borderColor: color(element.color) }); break;
      case "text": page.drawText(element.text, { x: element.x * scale, y: y(element.y), font: fonts[element.font], size: element.size * scale, color: color(element.color) }); break;
    }
  }
  const link = document.context.register(document.context.obj({
    Type: "Annot", Subtype: "Link", Rect: [qrX * scale, y(qrY + qrSize), (qrX + qrSize) * scale, y(qrY)],
    Border: [0, 0, 0], A: { Type: "Action", S: "URI", URI: PDFString.of(verificationUrl) },
  }));
  page.node.set(PDFName.of("Annots"), document.context.obj([link]));
  document.setTitle(`EYCC Certificate - ${certificate.name}`);
  document.setAuthor("Egyptian Youth Cybersecurity Challenge");
  document.setSubject(certificate.achievement);
  document.setCreator("EYCC Certificate Verification");
  return document.save();
}
