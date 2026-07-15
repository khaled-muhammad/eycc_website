import { FadeUp } from "@/components/fade-up";

const stats = [
  { value: "650", label: "Participants" },
  { value: "120+", label: "Schools Represented" },
  { value: "21", label: "Challenges" },
  { value: "18", label: "Governorates" },
];

const sponsors = [
  { name: "GitHub", href: "https://github.com", img: "/sponsers/GitHub_Invertocat_Black.svg" },
  { name: "Altered Security", href: "https://www.alteredsecurity.com", img: "/sponsers/Altered%20Security.svg" },
  { name: "LetsDefend", href: "https://letsdefend.io", img: "/sponsers/LetsDefend.svg" },
  { name: "Parrot CTF", href: "https://parrot-ctfs.com", img: "/sponsers/Parrot%20CTF.svg" },
];

const prizes = [
  {
    place: "First Place Team",
    items: [
      "3000 EGP",
      "Parrot-CTFs 1 month VIP Subscription for all team members",
      "LetsDefend 1 month VIP Subscription for all team members",
      "Two Certified Courses (CRTP & CARTP) from Altered Security",
      "Custom Hoodies for all team members",
    ],
  },
  {
    place: "Second Place Team",
    items: [
      "2500 EGP",
      "Parrot-CTFs 1 month VIP Subscription for all team members",
      "LetsDefend 1 month VIP Subscription for all team members",
    ],
  },
  {
    place: "Third Place Team",
    items: [
      "1500 EGP",
      "Parrot-CTFs 1 month VIP Subscription for all team members",
      "LetsDefend 1 month VIP Subscription for all team members",
    ],
  },
];

const photoFilenames = [
  "Copy%20of%20IMG_20250920_103528.jpg",
  "Copy%20of%20IMG_20250920_103539.jpg",
  "Copy%20of%20IMG_20250920_103629.jpg",
  "Copy%20of%20IMG_20250920_103642.jpg",
  "Copy%20of%20IMG_20250920_103729.jpg",
  "Copy%20of%20IMG_20250920_103806.jpg",
  "Copy%20of%20IMG_20250920_103830.jpg",
  "Copy%20of%20IMG_20250920_104449.jpg",
  "Copy%20of%20IMG_20250920_104516_1.jpg",
  "Copy%20of%20IMG_20250920_104633.jpg",
  "Copy%20of%20IMG_20250920_153231.jpg",
  "Copy%20of%20IMG_20250920_153234.jpg",
  "Copy%20of%20IMG_20250920_153237.jpg",
  "Copy%20of%20IMG_20250920_154318.jpg",
  "Copy%20of%20IMG_20250920_162508.jpg",
  "Copy%20of%20IMG_20250920_162607.jpg",
  "Copy%20of%20IMG_20250920_162706.jpg",
  "Copy%20of%20IMG_20250920_163536.jpg",
  "Copy%20of%20IMG_20250920_163739.jpg",
  "Copy%20of%20IMG_20250920_164922.jpg",
  "Copy%20of%20IMG_20250920_164939.jpg",
];

export default function PastEditionsPage() {
  return (
    <>
      <section className="relative border-b border-border/60 pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Past Editions
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Highlights from previous EYCC events.
          </p>
        </div>
      </section>

      <section className="relative border-t border-border/60 py-6 md:py-8">
        <div className="section-inner">
          <h2 className="text-2xl font-semibold">EYCC 2025</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.15}>
                <div className="panel p-5 text-center">
                  <p className="font-mono text-2xl font-bold text-foreground">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-border/60 py-6 md:py-8">
        <div className="section-inner">
          <h2 className="text-2xl font-semibold">Sponsors</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {sponsors.map((s, i) => (
              <FadeUp key={s.name} delay={i * 0.15}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="panel hover-lift flex items-center gap-4 p-4 hover:bg-card/70"
                >
                  <img
                    alt={s.name}
                    src={s.img}
                    className="h-14 w-14 object-contain"
                    width={64}
                    height={64}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {s.name}
                  </span>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-border/60 py-6 md:py-8">
        <div className="section-inner">
          <h2 className="text-2xl font-semibold">Prizes</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {prizes.map((prize, i) => (
              <FadeUp key={prize.place} delay={i * 0.15}>
                <div className="panel hover-lift flex h-full flex-col p-5 hover:bg-card/70">
                  <h3 className="text-lg font-semibold">{prize.place}</h3>
                  <ul className="mt-4 space-y-2">
                    {prize.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-border/60 py-6 md:py-8">
        <div className="section-inner">
          <h2 className="text-2xl font-semibold">Photos</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {photoFilenames.map((filename, i) => (
              <FadeUp key={filename} delay={(i % 4) * 0.15}>
                <div className="panel hover-lift overflow-hidden">
                  <img
                    alt={`EYCC 2025 photo ${i + 1}`}
                    src={`/photos/${filename}`}
                    className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
                    width={800}
                    height={600}
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
