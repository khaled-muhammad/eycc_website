import { FadeUp } from "@/components/fade-up";

const round1Details = [
  "The round will run for 48 continuous hours, during which participants can solve challenges at their own pace.",
  "Each challenge has a point value based on its difficulty.",
  "Points are awarded only when the correct flag is submitted.",
  "The leaderboard updates in real-time as teams submit flags.",
  "In case of a tie in total points, the team with the earlier submission time ranks higher.",
];

const teamRules = [
  "Teams must consist of 2 to 5 members.",
  "Solo participants will be grouped into random teams, but they can confirm that or reject and participate individually.",
  "All team members must register individually using the registration link in the website.",
  "Each one will receive a mail later to finalize your team setup.",
];

const compRules = [
  "Flag Sharing between teams will lead to disqualification of both teams.",
  "Bruteforcing the flags is Prohibited.",
  "Attacking or sabotaging the platform, other teams, or infrastructure will also lead to disqualification.",
  "Use of search engines, documentation, public tools, and research is allowed during the competition.",
];

export default function FormatPage() {
  return (
    <>
      <section className="relative border-b border-border/60 pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Competition Format
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Everything you need to know about the EYCC structure and rules.
          </p>
        </div>
      </section>

      <section className="relative border-t border-border/60 py-12 md:py-16">
        <div className="section-inner">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeUp>
              <div className="panel h-full p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Round 1 – Online Qualification Round
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  A Capture The Flag (CTF) round where participants will solve 15 cybersecurity challenges across different categories.
                </p>
                <ul className="mt-6 space-y-3">
                  {round1Details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="panel h-full p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Round 2 – On-site Final Round
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Top-performing teams from the online qualification round will be invited to compete in the on-site final round. More details about the date, location, and format of this round will be announced soon.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="relative border-t border-border/60 bg-muted/30 py-12 md:py-16">
        <div className="section-inner">
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeUp>
              <div className="panel h-full p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground">Team Rules</h2>
                <ul className="mt-6 space-y-4">
                  {teamRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm leading-relaxed text-muted-foreground">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs text-primary">
                        {i + 1}
                      </div>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="panel h-full p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground">Competition Rules</h2>
                <ul className="mt-6 space-y-4">
                  {compRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm leading-relaxed text-muted-foreground">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs text-primary">
                        {i + 1}
                      </div>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
