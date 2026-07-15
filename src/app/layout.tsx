import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "EYCC - Egyptian Youth Cybersecurity Challenge",
  description:
    "The Egyptian Youth Cybersecurity Challenge is a national Capture The Flag competition for Egyptian high school students. No experience required, learn to hack, defend, and compete.",
  keywords:
    "EYCC,cybersecurity competition,CTF,Egypt,high school,capture the flag,students",
  icons: { icon: "/logo.webp", apple: "/logo.webp" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0c0b09" />
        <meta property="og:title" content="EYCC - Egyptian Youth Cybersecurity Challenge" />
        <meta
          property="og:description"
          content="The Egyptian Youth Cybersecurity Challenge is a national Capture The Flag competition for Egyptian high school students. No experience required, learn to hack, defend, and compete."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="EYCC - Egyptian Youth Cybersecurity Challenge" />
        <meta
          name="twitter:description"
          content="The Egyptian Youth Cybersecurity Challenge is a national Capture The Flag competition for Egyptian high school students. No experience required, learn to hack, defend, and compete."
        />
      </head>
      <body className="font-sans antialiased">
        <div className="min-h-[100dvh] bg-background">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
