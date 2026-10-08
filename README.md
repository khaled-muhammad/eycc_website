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

Output is in `.next/`. Pages are statically generated; certificate verification uses a server API and requires a Next.js server (`npm start`) or compatible hosting.

## Routes

- `/` - Homepage
- `/ambassador` - Ambassador program
- `/format` - Competition format and rules
- `/resources` - Learning resources and prep guides
- `/past-editions` - Previous event highlights, sponsors, prizes, and photos
- `/writeups` - CTF writeups
- `/certificate-verification` - Verify a certificate by its ID

## Certificate registry

Add issued certificates to `src/data/certificates.json`. The registry is intentionally empty until the real IDs and results are supplied. Do not add example certificates to this file.

Each record has the following shape (example for documentation only):

```json
{
  "id": "REPLACE-WITH-ISSUED-ID",
  "name": "Participant name",
  "team": "Team name",
  "individualRank": 1,
  "teamRank": 2
}
```

The file must contain a JSON array of these records. IDs must be unique strings and must exactly match the printed certificate, including letter case and leading zeroes. Keep IDs free of surrounding whitespace. Ranks can be numbers or text such as `"Joint 2nd"` or `"N/A"`.

The server looks up the exact ID, ignoring surrounding whitespace in the submitted input, and returns only the matching record. An unknown ID displays `This ID is not valid.` Network/server failures display a retry message. Rebuild and redeploy after changing the registry.

Run lookup tests with `npm test` (Node.js 22.6+ with TypeScript stripping support) and run the production check with `npm run build`.

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
