"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Download, LoaderCircle, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Certificate } from "@/lib/certificate-lookup";

export function CertificateViewer({ certificate, showPageLink = true }: { certificate: Certificate; showPageLink?: boolean }) {
  const [previewState, setPreviewState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const activeDownload = useRef<AbortController | null>(null);
  useEffect(() => () => activeDownload.current?.abort(), []);
  const endpoint = `/api/certificates/${encodeURIComponent(certificate.id)}`;

  async function downloadPdf() {
    if (downloading) return;
    const controller = new AbortController();
    activeDownload.current = controller;
    setDownloading(true);
    setDownloadError("");
    try {
      const response = await fetch(`${endpoint}?format=pdf&download=1`, { signal: controller.signal });
      if (!response.ok || !response.headers.get("Content-Type")?.includes("application/pdf")) throw new Error("Download failed");
      const blob = await response.blob();
      if (controller.signal.aborted) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `EYCC-certificate-${certificate.id.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Allow the browser to start the download before releasing its Blob URL.
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
    } catch {
      if (!controller.signal.aborted) setDownloadError("Unable to download your certificate. Please try again.");
    } finally {
      if (!controller.signal.aborted) setDownloading(false);
    }
  }

  return (
    <section aria-label="Certificate preview" className="mt-10">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="section-kicker">// your achievement, certified</p>
          <h2 className="mt-2 text-xl font-semibold">Your certificate</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {showPageLink && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/certificates/${encodeURIComponent(certificate.id)}`} target="_blank" rel="noopener noreferrer">
                View Certificate <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          )}
          <Button size="sm" onClick={downloadPdf} disabled={downloading}>
            {downloading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
            {downloading ? "Preparing PDF…" : "Download PDF"}
          </Button>
        </div>
      </div>
      {downloadError && <p role="alert" className="mb-4 text-sm text-destructive">{downloadError}</p>}

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <span className="text-xs text-muted-foreground">Landscape A4 · PDF</span>
          <button
            type="button"
            onClick={() => setZoomed(!zoomed)}
            aria-pressed={zoomed}
            className="inline-flex items-center gap-2 rounded px-2 py-1 text-xs text-foreground outline-none hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary"
          >
            {zoomed ? <ZoomOut className="h-4 w-4" aria-hidden="true" /> : <ZoomIn className="h-4 w-4" aria-hidden="true" />}
            {zoomed ? "Fit to screen" : "Zoom in"}
          </button>
        </div>
        <div className="overflow-x-auto" tabIndex={zoomed ? 0 : undefined} aria-label={zoomed ? "Zoomed certificate. Scroll horizontally to view." : undefined}>
          <div className={`relative bg-[#F7F4EB] ${zoomed ? "w-[1120px]" : "w-full"}`} style={{ aspectRatio: "1120 / 792" }}>
            {previewState !== "error" && (
              <img
                src={`${endpoint}?format=svg&attempt=${attempt}`}
                alt={`EYCC certificate for ${certificate.name}, team ${certificate.team}. Achievement: ${certificate.achievement}. Certificate ID: ${certificate.id}.`}
                width={1120}
                height={792}
                onLoad={() => setPreviewState("ready")}
                onError={() => setPreviewState("error")}
                className="block h-auto w-full"
              />
            )}
            {previewState === "loading" && (
              <div role="status" className="absolute inset-0 flex items-center justify-center gap-3 bg-[#F7F4EB] text-sm text-[#143D2D]">
                <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Generating your certificate…
              </div>
            )}
            {previewState === "error" && (
              <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-5 text-center text-sm text-[#143D2D]">
                <p>Unable to load the certificate preview.</p>
                <Button variant="outline" size="sm" className="border-[#143D2D] hover:bg-[#e7e8dc]" onClick={() => { setPreviewState("loading"); setAttempt(attempt + 1); }}>
                  <RotateCw className="h-4 w-4" aria-hidden="true" /> Try again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Download a print-ready PDF, or scan the QR code on the certificate to verify its details.
      </p>
    </section>
  );
}
