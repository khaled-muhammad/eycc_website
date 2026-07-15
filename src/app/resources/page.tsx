import { FadeUp } from "@/components/fade-up";

const prepLadder = [
  {
    title: "Getting Started with Terminal & CTF",
    desc: "Build confidence in the terminal, learn the CTF workflow, and understand how flags, hints, and writeups fit together.",
  },
  {
    title: "Linux Fundamentals",
    desc: "A beginner-friendly introduction to Linux systems, file structure, permissions, and essential command-line usage.",
    links: [
      { label: "YouTube Video", href: "https://youtu.be/OxL0B1F65W8?si=nyMl1QN7FL4XrfJB" },
      { label: "Commands Summary", href: "https://github.com/youse7abib/linux" },
    ],
  },
  {
    title: "Networking Basics",
    desc: "Learn IP addressing, DNS, protocols, and how data moves across networks.",
    links: [{ label: "Networking Guide", href: "https://github.com/youse7abib/linux/blob/main/Network" }],
  },
  {
    title: "What is CTF?",
    desc: "Get an introduction to Capture The Flag competitions, how they work, and how to start solving challenges with confidence.",
    links: [
      { label: "YouTube Video", href: "https://youtu.be/yfWrbMbMzDU?si=pxVOZDhWORczbHKq" },
      { label: "HTB Article", href: "https://www.hackthebox.com/blog/what-is-ctf#what_is_a_ctf_capture_the_flag_event" },
    ],
  },
];

const platforms = [
  { name: "TryHackMe", desc: "Friendly guided labs for first-time CTF players.", href: "https://tryhackme.com/" },
  { name: "Hack The Box", desc: "Hands-on labs and challenges across multiple skill levels.", href: "https://www.hackthebox.com/" },
];

const toolInitials: Record<string, string> = {
  "Burp Suite": "BS",
  "John the Ripper": "JtR",
  Hydra: "HY",
  "OSINT Framework": "OF",
  sherloq: "SQ",
  Radare2: "R2",
};

const categories = [
  {
    title: "Web Exploitation",
    desc: "Every time you log in, submit a form, or browse an online service, you're interacting with web applications. Weak input validation opens the door to injection, authentication bypass, and client-side flaws.",
    resources: [
      { label: "YouTube Playlist", href: "https://youtube.com/playlist?list=PLroS9tRyoUGpAJPAgygxEP9imIZpkxFMi&si=An6U_ttl2FsJcOmA" },
      { label: "PortSwigger Web Security Academy", href: "https://portswigger.net/web-security" },
    ],
    tools: [{ label: "Burp Suite", href: "https://portswigger.net/burp/communitydownload" }],
  },
  {
    title: "Cryptography",
    desc: "Break ciphers, decode hidden messages, and analyze encryption methods to understand how secure communication works and how it can be broken.",
    resources: [{ label: "Crypto Notes", href: "https://github.com/youse7abib/linux/blob/main/Cryptography/crypto.md" }],
    tools: [
      { label: "John the Ripper", href: "https://medium.com/@uliya2404ali/john-the-ripper-password-cracking-tool-b703415b4cfb" },
      { label: "Hydra", href: "https://medium.com/@techlatest.net/hydra-linux-tool-unveiling-the-power-of-password-cracking-and-security-testing-a8b9b8c21d20" },
    ],
  },
  {
    title: "OSINT",
    desc: "Collect and analyze data from public sources like websites, social media, and public records to uncover usernames, digital footprints, and hidden connections.",
    resources: [
      { label: "OSINT in 3 Hours", href: "https://youtu.be/vDwYryKIGzw?si=Zd_oR33UCX0Us7Dp" },
      { label: "OSINT Framework", href: "https://osintframework.com" },
    ],
    tools: [{ label: "OSINT Framework", href: "https://osintframework.com" }],
  },
  {
    title: "Forensics",
    desc: "Find hidden evidence inside files, images, memory dumps, or network traffic, then recover the story behind the artifact.",
    resources: [{ label: "CTF101 Forensics Overview", href: "https://ctf101.org/forensics/overview/" }],
    tools: [{ label: "sherloq", href: "https://github.com/GuidoBartoli/sherloq/" }],
  },
  {
    title: "Reverse Engineering",
    desc: "Analyze compiled programs or scripts to understand how they work, uncover hidden behavior, and discover how they can be manipulated or broken.",
    resources: [{ label: "Reverse Engineering Course", href: "https://github.com/0xZ0F/Z0FCourse_ReverseEngineering" }],
    tools: [{ label: "Radare2", href: "https://github.com/radareorg/radare2" }],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="relative border-b border-border/60 pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Resources</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Learning materials, tools, and practice paths for EYCC challengers.
          </p>
        </div>
      </section>

      <section className="section-frame border-b-0 pt-10">
        <div className="section-inner">
          <div className="panel relative grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative p-6 md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(4,186,36,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,oklch(0.81_0.15_78/0.08),transparent_30%)]" />
              <div className="relative">
                <span className="section-kicker">// curated learning guide</span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Prepare for EYCC with a focused path.
                </h2>
                <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  Start with terminal basics, move into Linux and networking, then practice on platforms that mirror real CTF conditions. Each challenge category below includes a direct route into the right material.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {platforms.map((p) => (
                    <a
                      key={p.name}
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group hover-lift rounded-xl border border-border/60 bg-background/45 p-4 hover:bg-card/70"
                    >
                      <p className="font-semibold group-hover:text-primary">{p.name}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative min-h-[300px] overflow-hidden border-t border-border/60 lg:min-h-full lg:border-l lg:border-t-0">
              <img
                alt="Green hacker on a laptop wallpaper used as a cybersecurity learning visual"
                src="/resources-hero.webp"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-frame border-b-0 py-14">
        <div className="section-inner">
          <h2 className="text-2xl font-semibold">Getting Started with Terminal &amp; CTF</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Use these four boxes as a prep ladder. They are ordered from first contact with the terminal to your first practice-ready CTF mindset.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {prepLadder.map((item, i) => (
              <FadeUp key={item.title}>
                <div className="panel hover-lift flex h-full flex-col p-5 hover:bg-card/70">
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  {item.links && (
                    <div className="mt-4 space-y-2">
                      {item.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-sm text-primary underline-offset-4 hover:underline"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame border-b-0 py-14">
        <div className="section-inner">
          <h2 className="text-2xl font-semibold">Practice platforms</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Use one of these platforms whenever you want a low-friction place to train the basics before the competition.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {platforms.map((p) => (
              <FadeUp key={p.name}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="panel hover-lift group block h-full p-5 hover:bg-card/70"
                >
                  <h3 className="text-lg font-semibold group-hover:text-primary">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame border-b-0 py-14">
        <div className="section-inner">
          <h2 className="text-2xl font-semibold">Categories of Challenges</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            This section gives you a quick tour of the main challenge tracks you will encounter in EYCC.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {categories.map((cat) => (
              <FadeUp key={cat.title}>
                <div className="panel hover-lift flex h-full flex-col p-5 hover:bg-card/70">
                  <div className="flex items-center justify-end gap-4">
                    <span className="rounded-md border border-border/60 bg-background/60 px-2 py-1 font-mono text-xs text-muted-foreground">
                      {cat.title}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold">{cat.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cat.desc}</p>
                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Learning resources
                    </p>
                    <ul className="mt-3 space-y-2">
                      {cat.resources.map((r) => (
                        <li key={r.label}>
                          <a
                            href={r.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-primary underline-offset-4 hover:underline"
                          >
                            {r.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Tools
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {cat.tools.map((t) => (
                        <a
                          key={t.label}
                          href={t.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/45 px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-card/70"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/30">
                            {toolInitials[t.label]}
                          </span>
                          <span>{t.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <div className="mt-8">
            <a
              href="/#register"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Ready to compete? Register now.
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
