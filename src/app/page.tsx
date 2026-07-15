"use client";

import Link from "next/link";
import { FadeUp } from "@/components/fade-up";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CountUp } from "@/components/count-up";
import {
  ArrowRight,
  BrainCircuit,
  Award,
  Briefcase,
  Network,
  ShieldCheck,
  Rocket,
  Check,
  Globe,
  KeyRound,
  FileSearch,
  Binary,
  SearchCode,
} from "lucide-react";

const statsRows = [
  { label: "Edition", value: "Vol. 01 / 2026" },
  { label: "Format", value: "Online qualifiers \u2192 on-site finals" },
  { label: "Eligibility", value: "High school students" },
  { label: "Entry", value: "Free" },
];

const heroStats = [
  { label: "Expected players", end: 1000, suffix: "+" },
  { label: "Live challenges", end: 25, suffix: "+" },
  { label: "Skill categories", end: 5, suffix: "" },
  { label: "Qualifier window", end: 48, suffix: "h" },
];

const whyJoin = [
  {
    icon: BrainCircuit,
    title: "Learn by doing",
    desc: "Build practical skills in problem-solving, logic, and digital security through hands-on challenges.",
  },
  {
    icon: Award,
    title: "Win recognition",
    desc: "Earn certificates, prizes, and a spot on the national leaderboard to showcase your talent.",
  },
  {
    icon: Briefcase,
    title: "Boost your future",
    desc: "Cybersecurity skills stand out on university applications and open doors to scholarships and careers.",
  },
  {
    icon: Network,
    title: "Join a community",
    desc: "Connect with mentors and like-minded students who share your curiosity for technology.",
  },
  {
    icon: ShieldCheck,
    title: "Think like a defender",
    desc: "Understand how systems are attacked and protected, knowledge that matters in a connected world.",
  },
  {
    icon: Rocket,
    title: "Discover your path",
    desc: "Explore one of the fastest-growing fields in tech and find out if it is the career for you.",
  },
];

const benefits = [
  "Beginner-friendly challenges with guided hints",
  "Free learning resources and practice labs before the event",
  "A supportive community and mentors ready to help",
  "Step-by-step writeups so you learn from every challenge",
];

const timeline = [
  {
    phase: "Phase 01",
    title: "Registration",
    status: "Now - Open",
    desc: "Sign up for free, join our community, and get access to beginner prep materials right away.",
    align: "left",
  },
  {
    phase: "Phase 02",
    title: "Training & Warm-up",
    status: "Pre-event",
    desc: "Learn and practice hands-on labs to build a strong foundation across all challenge categories.",
    align: "right",
  },
  {
    phase: "Phase 03",
    title: "Qualifier Round",
    status: "Online \u2022 48 hours",
    desc: "Solve beginner-to-intermediate challenges to earn points. Top scorers advance to the finals.",
    align: "left",
  },
  {
    phase: "Phase 04",
    title: "Grand Finals",
    status: "Live event",
    desc: "The best competitors face tougher challenges live to crown Egypt\u2019s youth cybersecurity champions.",
    align: "right",
  },
];

const categories = [
  {
    icon: Globe,
    tag: "web",
    title: "Web Exploitation",
    desc: "Find and exploit flaws in websites, from hidden pages to broken logins.",
  },
  {
    icon: KeyRound,
    tag: "crypto",
    title: "Cryptography",
    desc: "Break codes and ciphers to reveal secret messages and hidden flags.",
  },
  {
    icon: FileSearch,
    tag: "forensics",
    title: "Forensics",
    desc: "Investigate files, images, and network captures to uncover digital evidence.",
  },
  {
    icon: Binary,
    tag: "rev",
    title: "Reverse Engineering",
    desc: "Take programs apart to understand how they work and find their secrets.",
  },
  {
    icon: SearchCode,
    tag: "osint",
    title: "OSINT",
    desc: "Use public sources and open intelligence methods to uncover hidden clues and connections.",
  },
];

const faqs = [
  {
    q: "Who can participate in EYCC?",
    a: "EYCC is open to students currently enrolled in high school (secondary school) in Egypt.",
  },
  {
    q: "Is prior cybersecurity experience required?",
    a: "No. The competition is beginner-friendly and includes prep resources to help first-time participants start confidently.",
  },
  {
    q: "How much does it cost to join?",
    a: "Participation is completely free. There are no registration or participation fees.",
  },
  {
    q: "Do I need to join as a team?",
    a: "No. You can participate solo. Team collaboration guidance is shared before the event when applicable.",
  },
  {
    q: "How does ambassador referral tracking work?",
    a: "Each ambassador gets a unique referral code. A referral is counted when the referred student completes competition registration with that code.",
  },
  {
    q: "How can I verify a certificate?",
    a: "Use the Certificate Verification page and enter either the certificate ID or verification code. The page returns validity and certificate details.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-x-0 -top-16 h-56 bg-[radial-gradient(circle_at_top,rgba(4,186,36,0.32),transparent_70%)]" aria-hidden="true" />
        <div className="section-inner px-4 pb-8 pt-24 md:pt-24">
          {/* Badge panel */}
          <FadeUp>
            <div className="panel flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 text-muted-foreground">
              <span className="section-kicker">EYCC</span>
              <span className="label">Egyptian Youth Cybersecurity Challenge</span>
              <span className="label ml-auto rounded-full border border-border/60 bg-background/50 px-2.5 py-1 font-mono text-primary">
                Registration open
              </span>
            </div>
          </FadeUp>

          {/* Heading */}
          <FadeUp>
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center py-12 lg:py-16">
              <div className="w-full max-w-4xl">
                <h1 className="text-pretty text-[2.75rem] font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-[4.5rem]">
                  <span className="mb-6 block text-primary">
                    Capture The Flag.
                  </span>
                  <span className="text-foreground">
                    Build the skills that defend Egypt.
                  </span>
                </h1>
                <p className="mx-auto mt-8 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  The Egyptian Youth Cybersecurity Challenge is a national
                  Capture The Flag (CTF) competition created to introduce high
                  school students to the world of Cybersecurity. Participants
                  solve puzzle-like challenges that mirror real-world security
                  problems, from cracking passwords to finding vulnerabilities
                  in web apps.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
                  <a
                    href="/#register"
                    data-slot="button"
                    className="glow-primary group inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 [&_svg]:size-4"
                  >
                    Register for free
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="/#about"
                    className="label rounded-full border border-border/60 bg-card/40 px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    What is a CTF?
                  </a>
                </div>
              </div>

              {/* Event Dossier */}
              <div className="mt-16 w-full max-w-2xl">
                <div className="panel overflow-hidden border-b border-border">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />
                  <div className="flex items-center justify-between border-b border-border px-5 py-3">
                    <span className="section-kicker text-muted-foreground">
                      Event dossier
                    </span>
                    <span className="section-kicker">01</span>
                  </div>
                  <dl className="divide-y divide-border text-left">
                    {statsRows.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-baseline justify-between gap-4 px-5 py-3.5"
                      >
                        <dt className="label text-muted-foreground">
                          {s.label}
                        </dt>
                        <dd className="text-right font-mono text-sm text-foreground">
                          {s.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Hero stats grid */}
          <FadeUp y={0}>
            <dl className="grid grid-cols-2 border-t border-border md:grid-cols-4">
              {heroStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`bg-card/30 px-1 py-6 ${
                    i > 0 ? "border-l border-border" : ""
                  } ${i >= 2 ? "border-t border-border md:border-t-0" : ""}`}
                >
                  <dd className="text-center font-mono text-3xl font-bold tracking-tight text-foreground tabular-nums">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </dd>
                  <dt className="label mt-1 text-center text-muted-foreground">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-frame">
        <div className="section-inner">
          <FadeUp>
            <div className="mx-auto max-w-3xl text-center">
              <span className="section-kicker">// about the competition</span>
              <h2 className="section-title">What is EYCC?</h2>
            </div>
          </FadeUp>
          <div className="mx-auto mt-10 max-w-4xl space-y-6">
            <FadeUp>
              <p className="section-copy mt-0">
                The Egyptian Youth Cybersecurity Challenge is a national Capture
                The Flag (CTF) competition created to introduce high school
                students to the world of Cybersecurity. Participants solve
                puzzle-like challenges that mirror real-world security problems,
                from cracking passwords to finding vulnerabilities in web apps.
              </p>
            </FadeUp>
            <FadeUp>
              <p className="section-copy mt-0">
                It&apos;s more than a competition. EYCC is a launchpad: a
                community of young Egyptian ethical hackers and defenders, and a
                place to discover a passion and build skills that universities
                and employers value.
              </p>
            </FadeUp>
            <FadeUp>
              <div className="grid gap-4 pt-2 sm:grid-cols-3">
                <div className="panel p-4">
                  <p className="font-mono text-sm font-semibold text-primary">
                    Online
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Compete from anywhere in Egypt
                  </p>
                </div>
                <div className="panel p-4">
                  <p className="font-mono text-sm font-semibold text-primary">
                    Free
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Zero cost to participate
                  </p>
                </div>
                <div className="panel p-4">
                  <p className="font-mono text-sm font-semibold text-primary">
                    Team or solo
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Play your way
                  </p>
            </div>
          </div>
        </FadeUp>
        </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="section-frame">
        <div className="section-inner">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-kicker">// why join</span>
              <h2 className="section-title">Why participate in EYCC?</h2>
              <p className="section-copy">
                Whether you are a curious cybersecurity beginner or a budding
                hacker, EYCC gives you the skills, the network, and recognition
                to level up.
              </p>
            </div>
          </FadeUp>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyJoin.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.15}>
                <div className="panel hover-lift group h-full p-6 hover:bg-card/70">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30 transition-colors group-hover:bg-primary/20">
                    <item.icon className="h-5 w-5 text-primary" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* No experience CTA */}
      <section className="section-frame">
        <div className="section-inner">
          <FadeUp>
            <div className="panel relative overflow-hidden border-primary/30 p-8 md:p-12">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-primary/12 to-transparent"
                aria-hidden
              />
              <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <span className="section-kicker">
                    // no experience? no problem
                  </span>
                  <h2 className="section-title">
                    Never written a line of code? You belong here.
                  </h2>
                  <p className="section-copy">
                    EYCC is designed for complete beginners. You do not need to
                    be a programmer or a hacker, just bring your curiosity. We
                    will provide you with the resources you need to capture your
                    first flag.
                  </p>
                  <a
                    href="/resources"
                    data-slot="button"
                    className="mt-8 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    Start your journey
                  </a>
                </div>
                <ul className="space-y-4">
                  {benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/40 p-4"
                    >
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/90">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Timeline */}
      <section id="format" className="section-frame">
        <div className="section-inner">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-kicker">// how it works</span>
              <h2 className="section-title">Competition timeline</h2>
              <p className="section-copy">
                Four phases take you from sign-up to the finals. Here is the
                journey.
              </p>
            </div>
          </FadeUp>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div
              className="absolute left-1/2 top-4 h-[calc(100%-2rem)] w-px -translate-x-1/2 bg-border"
              aria-hidden
            />
            <ol className="space-y-8">
              {timeline.map((item, i) => (
                <FadeUp key={item.title} delay={i % 2 === 0 ? 0 : 0.2}>
                  <li className="relative grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-14">
                    <span
                      className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary ring-4 ring-background"
                      aria-hidden
                    >
                      <span className="h-2 w-2 rounded-full bg-background" />
                    </span>

                    <div
                      className={
                        item.align === "left"
                          ? "md:pr-12"
                          : "md:order-2 md:pl-12"
                      }
                    >
                      <div className="panel p-6 text-center md:text-left">
                        <p className="font-mono text-xs text-primary">
                          {item.phase}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold">
                          {item.title}
                        </h3>
                        <p className="mt-1 font-mono text-sm text-accent">
                          {item.status}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div
                      className={
                        item.align === "left"
                          ? "hidden md:block"
                          : "hidden md:block md:order-1"
                      }
                      aria-hidden
                    />
                  </li>
                </FadeUp>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Challenge Categories */}
      <section id="categories" className="section-frame">
        <div className="section-inner">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-kicker">// the challenges</span>
              <h2 className="section-title">Challenge categories</h2>
              <p className="section-copy">
                Every CTF flag falls into one of these tracks. Pick your
                favorite, or master them all.
              </p>
            </div>
          </FadeUp>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <FadeUp key={cat.title} delay={i * 0.12}>
                <div className="panel group relative h-full overflow-hidden p-6 transition-colors hover:border-primary/40">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
                      <cat.icon className="h-5 w-5 text-primary" />
                    </span>
                    <span className="rounded-md border border-border/60 bg-background/60 px-2 py-1 font-mono text-xs text-muted-foreground">
                      {cat.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{cat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {cat.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-frame">
        <div className="mx-auto max-w-3xl px-4">
          <FadeUp>
            <div className="text-center">
              <span className="section-kicker">// questions</span>
              <h2 className="section-title">
                Frequently asked questions
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="panel mt-12 px-5 py-2 md:px-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Registration CTA */}
      <section id="register" className="section-frame">
        <div className="absolute left-1/2 top-1/3 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl px-4">
          <FadeUp>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Registration is closed
              </span>
              <h2 className="section-title mt-5">
                The form has been closed
              </h2>
              <p className="section-copy">The form has been closed</p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
