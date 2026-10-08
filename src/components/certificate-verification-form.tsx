"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Certificate } from "@/lib/certificate-lookup";
import { CertificateViewer } from "@/components/certificate-viewer";

type VerificationState =
  | { status: "idle" | "loading" | "invalid" }
  | { status: "verified"; certificate: Certificate }
  | { status: "error"; message: string };

export function CertificateVerificationForm() {
  const [certificateId, setCertificateId] = useState("");
  const [state, setState] = useState<VerificationState>({ status: "idle" });
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => () => activeRequest.current?.abort(), []);

  async function verifyCertificate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    activeRequest.current?.abort();

    if (!certificateId.trim()) {
      setState({ status: "error", message: "Please enter a certificate ID." });
      return;
    }

    const controller = new AbortController();
    activeRequest.current = controller;
    setState({ status: "loading" });

    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certificateId: certificateId.trim() }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Verification request failed.");
      const result: { certificate: Certificate | null } = await response.json();
      if (controller.signal.aborted) return;

      setState(
        result.certificate
          ? { status: "verified", certificate: result.certificate }
          : { status: "invalid" },
      );
    } catch {
      if (controller.signal.aborted) return;
      setState({
        status: "error",
        message: "Unable to verify right now. Please try again.",
      });
    }
  }

  const hasError = state.status === "invalid" || state.status === "error";

  return (
    <>
    <div className="panel mx-auto mt-8 max-w-xl p-5 sm:p-8">
      <form onSubmit={verifyCertificate} noValidate>
        <label htmlFor="certificate-id" className="text-sm font-medium">
          Certificate ID
        </label>
        <input
          id="certificate-id"
          name="certificateId"
          type="text"
          value={certificateId}
          onChange={(event) => {
            activeRequest.current?.abort();
            setCertificateId(event.target.value);
            setState({ status: "idle" });
          }}
          placeholder="Enter certificate ID"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          required
          aria-invalid={hasError}
          aria-describedby={hasError ? "certificate-help certificate-result" : "certificate-help"}
          className="mt-3 h-12 w-full rounded-md border border-border bg-background px-4 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 aria-invalid:border-destructive"
        />
        <p id="certificate-help" className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Use the exact ID printed on your certificate.
        </p>
        <Button type="submit" disabled={state.status === "loading"} className="mt-6 h-11 w-full">
          {state.status === "loading" && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {state.status === "loading" ? "Verifying…" : "Verify Certificate"}
        </Button>
      </form>

      <div id="certificate-result" role="status" aria-live="polite" aria-atomic="true">
        {state.status === "loading" && <span className="sr-only">Verifying certificate.</span>}
        {state.status === "invalid" && (
          <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 p-4">
            <p className="flex items-center gap-2 font-medium text-destructive">
              <CircleX className="h-5 w-5 shrink-0" aria-hidden="true" />
              This ID is not valid.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              No certificate was found. Check the ID and try again.
            </p>
          </div>
        )}
        {state.status === "error" && (
          <p className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            {state.message}
          </p>
        )}
        {state.status === "verified" && (
          <div className="mt-6 rounded-md border border-primary/30 bg-primary/5 p-5">
            <h2 className="flex items-center gap-2 font-semibold text-primary">
              <CircleCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
              Certificate verified
            </h2>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              {[
                ["Name", state.certificate.name],
                ["Team", state.certificate.team],
                ["Achievement", state.certificate.achievement],
                ["Certificate ID", state.certificate.id],
              ].map(([label, value]) => (
                <div key={label} className={label === "Achievement" || label === "Certificate ID" ? "sm:col-span-2" : undefined}>
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="mt-1 break-words text-sm font-medium [overflow-wrap:anywhere]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
    {state.status === "verified" && <CertificateViewer key={state.certificate.id} certificate={state.certificate} />}
    </>
  );
}
