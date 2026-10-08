import type { Certificate } from "./certificate-lookup";

export const certificateSize = { width: 1120, height: 792 };
export type CertificateFont = "serif" | "sans" | "bold";
export type MeasureText = (text: string, font: CertificateFont, size: number) => number;

export type CertificateElement =
  | { kind: "rect"; x: number; y: number; width: number; height: number; color: string }
  | { kind: "line"; x: number; y: number; toX: number; toY: number; color: string; width: number }
  | { kind: "circle"; x: number; y: number; radius: number; color: string; width: number }
  | { kind: "text"; x: number; y: number; text: string; font: CertificateFont; size: number; color: string };

export function wrapCertificateText(text: string, font: CertificateFont, size: number, width: number, measure: MeasureText): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.trim().split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (measure(candidate, font, size) <= width) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    line = "";
    // Long names/IDs without spaces must fit too, without dropping characters.
    for (const character of word) {
      if (line && measure(line + character, font, size) > width) {
        lines.push(line);
        line = "";
      }
      line += character;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function createCertificateDesign(certificate: Certificate, measure: MeasureText) {
  const elements: CertificateElement[] = [];
  const green = "#143D2D";
  const gold = "#A88B51";
  const muted = "#63695F";
  const text = (value: string, x: number, y: number, size: number, font: CertificateFont = "sans", color = green) =>
    elements.push({ kind: "text", text: value, x, y, size, font, color });
  const rect = (x: number, y: number, width: number, height: number, color: string) =>
    elements.push({ kind: "rect", x, y, width, height, color });
  const line = (x: number, y: number, toX: number, toY: number, color = gold, width = 1) =>
    elements.push({ kind: "line", x, y, toX, toY, color, width });
  const circle = (x: number, y: number, radius: number, color = gold, width = 1) =>
    elements.push({ kind: "circle", x, y, radius, color, width });
  const spacedText = (value: string, x: number, y: number, size: number, spacing: number, color = green) => {
    for (const character of value) {
      text(character, x, y, size, "bold", color);
      x += measure(character, "bold", size) + spacing;
    }
  };
  const fittedText = (value: string, x: number, baseline: number, font: CertificateFont, initialSize: number, maxLines: number, width: number) => {
    let size = initialSize;
    let lines = wrapCertificateText(value, font, size, width, measure);
    while (lines.length > maxLines && size > 12) {
      size -= 1;
      lines = wrapCertificateText(value, font, size, width, measure);
    }
    if (lines.length > maxLines) throw new Error("Certificate text exceeds its layout area.");
    lines.forEach((value, index) => text(value, x, baseline + index * size * 1.2, size, font));
  };

  rect(0, 0, 1120, 792, "#F7F4EB");
  rect(0, 0, 168, 792, green);
  rect(168, 0, 5, 792, gold);
  line(203, 35, 1085, 35, "#D8CEB8", 0.8);
  line(1085, 35, 1085, 757, "#D8CEB8", 0.8);
  line(203, 757, 1085, 757, "#D8CEB8", 0.8);
  text("EY", 39, 90, 34, "bold", "#F7F4EB");
  text("CC", 39 + measure("EY", "bold", 34), 90, 34, "bold", "#80CA94");
  spacedText("EGYPT", 42, 116, 9, 3, "#C7D6C8");

  // Circuit detail connects the cybersecurity identity with restrained ornament.
  line(42, 177, 84, 177, "#527564");
  line(84, 177, 84, 342, "#527564");
  circle(84, 348, 6, "#91AE99", 1.5);
  line(42, 200, 64, 222, "#527564");
  line(64, 222, 64, 300, "#527564");
  circle(64, 305, 4, "#91AE99");
  line(126, 200, 105, 222, "#527564");
  line(105, 222, 105, 278, "#527564");
  circle(105, 283, 4, "#91AE99");
  text("20", 34, 653, 77, "serif", "#D9C699");
  text("26", 34, 727, 77, "serif", "#D9C699");

  spacedText("EGYPTIAN YOUTH CYBERSECURITY CHALLENGE", 232, 83, 10, 1.7);
  text("Certificate", 232, 189, 68, "serif");
  text("of Achievement", 232, 247, 43, "serif");
  line(232, 271, 305, 271, gold, 2);

  circle(1005, 198, 35, gold, 1.1);
  circle(1005, 198, 29, "#D8CEB8", 0.8);
  line(991, 183, 1005, 177, green, 1.7);
  line(1005, 177, 1019, 183, green, 1.7);
  line(1019, 183, 1017, 203, green, 1.7);
  line(1017, 203, 1005, 215, green, 1.7);
  line(1005, 215, 993, 203, green, 1.7);
  line(993, 203, 991, 183, green, 1.7);
  line(997, 195, 1003, 201, green, 2);
  line(1003, 201, 1013, 189, green, 2);

  text("This certificate is presented to", 232, 314, 14, "sans", muted);
  fittedText(certificate.name, 232, 370, "serif", 41, 2, 816);
  text("TEAM", 232, 456, 10, "bold", muted);
  fittedText(certificate.team, 282, 456, "sans", 15, 1, 766);
  line(232, 478, 1048, 478, "#D8CEB8", 0.8);
  spacedText("ACHIEVEMENT", 232, 516, 10, 1.8, muted);
  fittedText(certificate.achievement, 232, 551, "sans", 20, 3, 786);

  line(232, 641, 1048, 641, "#D8CEB8", 0.8);
  text("EYCC", 232, 694, 29, "serif");
  spacedText("ORGANIZING TEAM", 232, 719, 9, 1.3, muted);
  text("CERTIFICATE ID", 695, 678, 9, "bold", muted);
  fittedText(certificate.id, 695, 700, "sans", 13, 1, 222);
  text("Scan to verify", 695, 720, 11, "sans", muted);
  text("Egyptian Youth Cybersecurity Challenge", 232, 748, 10, "sans", muted);
  return elements;
}
