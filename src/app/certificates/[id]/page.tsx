import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CircleCheck } from "lucide-react";
import records from "@/data/certificates.json";
import { findCertificate } from "@/lib/certificate-lookup";
import { CertificateViewer } from "@/components/certificate-viewer";

export const metadata: Metadata = {
  title: "Certificate of Achievement | EYCC",
  description: "View, verify, and download an EYCC certificate of achievement.",
  robots: { index: false, follow: false },
};

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certificate = findCertificate(records, id);
  if (!certificate) notFound();

  return (
    <div className="section-frame">
      <div className="section-inner">
        <div className="mx-auto max-w-5xl">
          <Link href="/certificate-verification" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Verify another certificate
          </Link>
          <div className="mt-8 flex items-center gap-2 text-sm text-primary">
            <CircleCheck className="h-5 w-5" aria-hidden="true" /> Verified EYCC certificate
          </div>
          <h1 className="section-title mt-3">{certificate.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Team: {certificate.team}</p>
          <p className="mt-2 text-sm text-muted-foreground">Achievement: {certificate.achievement}</p>
          <CertificateViewer certificate={certificate} showPageLink={false} />
          <p className="mt-6 break-all font-mono text-xs text-muted-foreground">Certificate ID: {certificate.id}</p>
        </div>
      </div>
    </div>
  );
}
