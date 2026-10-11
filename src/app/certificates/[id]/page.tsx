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
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Name</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-foreground sm:text-5xl">{certificate.name}</h1>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Team</p>
          <p className="mt-2 text-2xl font-semibold leading-tight text-primary sm:text-3xl">{certificate.team}</p>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Achievement</p>
          <p className="mt-2 text-lg font-semibold leading-snug text-foreground sm:text-2xl">{certificate.achievement}</p>
          <CertificateViewer certificate={certificate} showPageLink={false} />
          <p className="mt-6 break-all font-mono text-xs text-muted-foreground">Certificate ID: {certificate.id}</p>
        </div>
      </div>
    </div>
  );
}
