import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { CertificateVerificationForm } from "@/components/certificate-verification-form";

export const metadata: Metadata = {
  title: "Certificate Verification | EYCC",
  description: "Verify an EYCC certificate using its certificate ID.",
};

export default function CertificateVerificationPage() {
  return (
    <section className="section-frame flex min-h-[80dvh] items-center pt-32">
      <div className="section-inner w-full">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
              <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
            <span className="section-kicker">// verify your achievement</span>
            <h1 className="section-title">Certificate Verification</h1>
            <p className="section-copy">
              Enter the ID on your EYCC certificate to verify its details.
            </p>
          </div>
          <CertificateVerificationForm />
        </div>
      </div>
    </section>
  );
}
