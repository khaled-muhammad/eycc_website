# EYCC Website

Egyptian Youth Cybersecurity Challenge official website. Built with Next.js 15, React 19, Tailwind CSS 4, and shadcn/ui.

## Tech Stack

- **Framework** - Next.js 15 (App Router)
- **UI Library** - React 19
- **Styling** - Tailwind CSS 4 + tw-animate-css
- **Components** - shadcn/ui (Radix primitives)
- **Icons** - lucide-react
- **Language** - TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Output is in `.next/`. All routes are statically generated.

## Routes

- `/` - Homepage
- `/ambassador` - Ambassador program
- `/format` - Competition format and rules
- `/resources` - Learning resources and prep guides
- `/past-editions` - Previous event highlights, sponsors, prizes, and photos
- `/writeups` - CTF writeups

## Project Structure

```
src/
  app/          - App Router pages
  components/   - Shared components (header, footer, fade-up, count-up)
  lib/          - Utilities (cn)
public/
  photos/       - Event photo gallery (21 images)
  sponsers/     - Sponsor logo SVGs
```
