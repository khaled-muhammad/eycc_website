import { Clock } from "lucide-react";

export default function WriteupsPage() {
  return (
    <div className="section-frame">
      <div className="section-inner">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">// writeups</span>
          <h1 className="section-title mt-3">Writeups</h1>
          <p className="section-copy mx-auto">
            Official and community solutions - coming soon.
          </p>

          <div className="panel mt-12 p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">
              Coming Soon
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Writeups are on the way. We&apos;re curating official solutions
              and community writeups. Check back after the competition to
              explore challenge walkthroughs, techniques, and tooling
              breakdowns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
