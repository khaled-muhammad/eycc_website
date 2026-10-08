import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument } from "pdf-lib";
import { certificateSize, createCertificateDesign } from "../src/lib/certificate-design.ts";
import { certificateRequestOrigin, certificateVerificationUrl, generateCertificateDocument } from "../src/lib/certificate-document.ts";

const records = JSON.parse(await readFile(new URL("../src/data/certificates.json", import.meta.url), "utf8"));
const pdf = await PDFDocument.create();
pdf.registerFontkit(fontkit);
const fonts = {};
for (const [font, file] of Object.entries({ serif: "LibreCaslonText.ttf", sans: "Lato-Regular.ttf", bold: "Lato-Bold.ttf" })) {
  fonts[font] = await pdf.embedFont(await readFile(new URL(`../public/fonts/${file}`, import.meta.url)), { subset: true });
}
const measure = (value, font, size) => fonts[font].widthOfTextAtSize(value, size);

test("all issued certificate text fits the page and its reserved content areas", () => {
  for (const record of records) {
    const design = createCertificateDesign(record, measure);
    for (const element of design.filter((element) => element.kind === "text")) {
      assert.ok(element.x >= 0 && element.y > 0 && element.y < certificateSize.height);
      assert.ok(element.x + measure(element.text, element.font, element.size) <= 1049, `Text overflow for ${record.id}: ${element.text}`);
      assert.ok(element.size >= 9);
    }
    const name = design.filter((element) => element.kind === "text" && element.y >= 370 && element.y < 449);
    assert.equal(name.map((element) => element.text).join(" "), record.name.trim().replace(/\s+/g, " "));
    const achievement = design.filter((element) => element.kind === "text" && element.y >= 551 && element.y < 641);
    assert.equal(achievement.map((element) => element.text).join(" "), record.achievement);
  }
});

test("PDF is a single landscape A4 page with recipient metadata and verification link", async () => {
  const record = records.find((record) => record.achievement.startsWith("Participation"));
  const url = certificateVerificationUrl(record.id, "https://eycc.example");
  const bytes = await generateCertificateDocument(record, url, "pdf");
  const output = await PDFDocument.load(bytes);
  assert.equal(output.getPageCount(), 1);
  assert.ok(Math.abs(output.getPage(0).getWidth() - 841.89) < 0.01);
  assert.ok(Math.abs(output.getPage(0).getHeight() - 595.33) < 0.1);
  assert.equal(output.getTitle(), `EYCC Certificate - ${record.name}`);
  assert.equal(output.getSubject(), record.achievement);
});

test("SVG escapes user-visible text and uses the full achievement", async () => {
  const record = { id: "TEST-001", name: "A & B <Example>", team: 'Team "One"', achievement: "Participation & qualification" };
  const svg = await generateCertificateDocument(record, "https://eycc.example/certificates/TEST-001", "svg");
  assert.ok(svg.includes("A &amp; B &lt;Example&gt;"));
  assert.ok(svg.includes("Team &quot;One&quot;"));
  assert.ok(svg.includes("Participation &amp; qualification"));
  assert.ok(svg.includes('viewBox="0 0 1120 792"'));
  assert.ok(svg.includes("data:font/ttf;base64,"));
});

test("verification URLs encode an ID without changing the destination origin", () => {
  assert.equal(certificateVerificationUrl("ID & 001", "https://eycc.example/"), "https://eycc.example/certificates/ID%20%26%20001");
});

test("QR links use the public request host on local servers and reverse proxies", () => {
  assert.equal(certificateRequestOrigin(new Headers({ host: "127.0.0.1:3001" }), "http://localhost:3001"), "http://127.0.0.1:3001");
  assert.equal(certificateRequestOrigin(new Headers({ host: "internal:3000", "x-forwarded-host": "certificates.example.com", "x-forwarded-proto": "https" }), "http://localhost:3000"), "https://certificates.example.com");
  assert.equal(certificateRequestOrigin(new Headers({ host: "bad host", "x-forwarded-proto": "javascript" }), "https://eycc.example"), "https://eycc.example");
});
