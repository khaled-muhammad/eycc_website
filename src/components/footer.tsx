import Link from "next/link";
import { Linkedin, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/eycc-competition/",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/eycc.official/",
    icon: Instagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@eycc_ctf",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.31a8.16 8.16 0 0 0 4.77 1.52V6.41a4.85 4.85 0 0 1-1.84-.72Z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://discord.gg/ExqKZuTzj",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3a14.594 14.594 0 0 0-.617 1.243 18.27 18.27 0 0 0-5.487 0A14.59 14.59 0 0 0 9.836 3a19.79 19.79 0 0 0-3.76 1.369C2.643 9.045 1.748 13.58 2.157 18.057a19.94 19.94 0 0 0 6.073 3.06 14.685 14.685 0 0 0 1.272-2.07 12.92 12.92 0 0 1-2.005-.96c.169-.124.334-.252.493-.384a13.86 13.86 0 0 0 12.02 0c.16.132.325.26.493.384a12.94 12.94 0 0 1-2.007.96 14.685 14.685 0 0 0 1.272 2.07 19.94 19.94 0 0 0 6.075-3.06c.476-5.182-.838-9.674-3.526-13.688ZM9.346 15.515c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.333-.955 2.418-2.157 2.418Zm5.308 0c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.333-.946 2.418-2.157 2.418Z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/+PLMn0zCQBcplYWI0",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M21.94 4.51 18.86 19.49c-.23 1.05-.86 1.31-1.74.81l-4.8-3.54-2.32 2.23c-.26.26-.47.47-.97.47l.35-4.91 8.94-8.07c.39-.34-.08-.54-.6-.2L5.86 13.27 1.07 11.69c-.96-.3-.98-.96.2-1.42L20.42 3.2c.8-.3 1.5.18 1.52 1.31Z" />
      </svg>
    ),
  },
];

const footerLinks = {
  competition: [
    { href: "/", label: "Home" },
    { href: "/format", label: "Format" },
    { href: "/resources", label: "Resources" },
    { href: "/writeups", label: "Writeups" },
    { href: "/past-editions", label: "Past Editions" },
  ],
  programs: [{ href: "/#register", label: "Register" }],
};

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md">
                <img
                  src="/logo.webp"
                  alt="EYCC Logo"
                  width={36}
                  height={36}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <span className="font-mono text-lg font-bold tracking-tight">
                EY<span className="text-primary">CC</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The Egyptian Youth Cybersecurity Challenge empowers the next
              generation of Egyptian defenders and ethical hackers.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/40 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold text-foreground">
              Competition
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.competition.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold text-foreground">
              Programs
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            &copy; 2026 EYCC. Made for Egypt&apos;s young hackers.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Privacy &middot; Terms &middot; Code of Conduct
          </p>
        </div>
      </div>
    </footer>
  );
}
