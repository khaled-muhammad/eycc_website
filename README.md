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
- `/certificates/[id]` - View and download a verified certificate

## Certificate registry

Add issued certificates to `src/data/certificates.json`. The registry contains the 94 certificates supplied in `Book2.xlsx` plus the 9 additional records supplied in `Book3.xlsx`.

Each record has the following shape (example for documentation only):

```json
{
  "id": "REPLACE-WITH-ISSUED-ID",
  "name": "Participant name",
  "team": "Team name",
  "achievement": "Participation in the EYCC '26 Online Qualifications Round",
  "certificateUrl": "https://drive.google.com/uc?export=download&id=FILE_ID"
}
```

The file must contain a JSON array of these records. IDs must be unique strings and must exactly match the printed certificate, including letter case and leading zeroes. Keep IDs free of surrounding whitespace. `achievement` is the full certificate achievement text and can describe participation, qualification, or a placement; a rank is not required.

The server looks up the exact ID, ignoring surrounding whitespace in the submitted input, and returns only the matching record. An unknown ID displays `This ID is not valid.` Network/server failures display a retry message. Rebuild and redeploy after changing the registry.

Run lookup tests with `npm test` (Node.js 22.6+ with TypeScript stripping support) and run the production check with `npm run build`.

## Certificate preview and download

Valid IDs display the original issued PDF from the `certificateUrl` in the registry and provide a download button. If a remote source is temporarily unavailable, the server falls back to the generated landscape A4 certificate using the registered name, team, and Achievement. The generated SVG preview and PDF use embedded Libre Caslon Text and Lato fonts. Their SIL Open Font License files are included in `public/fonts`.

`GET /api/certificates/[id]?format=pdf` streams the original source PDF, while `format=pdf&download=1` marks it as a download. `format=svg` returns the generated fallback preview. Unknown IDs return 404; document content always comes from the server registry. Generated PDFs use selectable text and vector artwork, and their QR code links to the corresponding certificate page.

Set `CERTIFICATE_SITE_URL` to the site's public origin (for example, `https://example.com`) to keep QR links pointing to the production site across previews and custom hosting. If unset, the request origin is used. Fonts are bundled locally; document generation needs no external service.

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
