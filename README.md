# SHAZWERK — Swiss Digital Products, Software & AI

Official web platform for **SHAZWERK** (`https://shazwerk.ch`).

> **Positioning:** Digital products, software and AI — engineered for real business.  
> **Market:** Switzerland / DACH (Zurich · Basel · Geneva)  
> **Design Philosophy:** Swiss modernist industrial design, architectural grid layouts, high information density, and zero fluff.

---

## Architectural Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with bespoke Swiss design tokens (`swiss-black`, `swiss-paper`, `swiss-red`, architectural hair lines)
- **Icons**: Custom SVG Swiss architectural symbols & Lucide Icons
- **Interactive Visual**: Bespoke 60fps HTML5 Canvas & SVG architectural topology blueprint
- **Database Layer**: Zero-cost dual-mode persistent engine (`src/lib/db.ts`) with immediate file persistence & `DATABASE_URL` adapter (PostgreSQL / Supabase / Neon)
- **Authentication**: Timing-safe HMAC-SHA256 session management (`src/lib/auth.ts`)
- **Telemetry**: First-party, zero-cookie, privacy-conscious analytics complying with the Swiss Federal Act on Data Protection (nDSG / FADP) and EU GDPR

---

## Website Structure

Swiss International Style meets award-level motion: 12-column grid, oversized Inter Tight display type with
Instrument Serif italics, Lenis smooth scroll, masked line reveals, blend-mode cursor, marquee bands and a
pinned horizontal process section. All motion respects `prefers-reduced-motion`; content is server-rendered
in German (de-CH) and only hidden for reveal animations once JavaScript is confirmed.

- `/` — Hero, services marquee, scroll-lit manifesto, project index with floating previews, expandable services, pinned process, FAQ
- `/work`, `/work/[slug]` — Project grid and statically generated case studies
- `/services`, `/about`, `/contact` — Services & engagement models, studio principles, inquiry form
- SEO landing pages (German, high intent): `/webagentur-zuerich`, `/webdesign-agentur-schweiz`, `/software-agentur-zuerich`, `/app-entwicklung-schweiz`, `/enterprise-ai-schweiz`
- `/privacy`, `/imprint`, `/admin`, `/admin/login`

Content lives in `src/lib/content.ts` (projects, services, process, FAQ) and `src/lib/landing.ts` (landing pages).
Bilingual inline copy uses `<T de="…" en="…" />`.

## SEO

- Per-page titles, descriptions, canonicals, Open Graph/Twitter images; `lang="de-CH"`
- JSON-LD: Organization, ProfessionalService (local business with geo, hours, areas served), WebSite,
  BreadcrumbList on every subpage, Service on landing pages, CreativeWork on case studies, FAQPage only
  where the FAQ is visible on the page
- `sitemap.xml` generated from content, `robots.txt`, RSS feed, `/logo.png` brand mark, web manifest
- Static prerendering for all public pages, no layout-shifting fonts (`next/font`), no image requests in hero

## Environment Variables

Configure these in your environment or Vercel dashboard:

```env
# Optional: Override default admin console passphrase
ADMIN_PASSWORD=your_secure_admin_passphrase

# Optional: Override HMAC signing secret for session tokens
ADMIN_SECRET=your_32_byte_random_signing_secret

# Optional: External Cloud Database (Supabase / Neon / PostgreSQL / Turso)
# If omitted, uses local zero-cost persistent JSON store automatically
DATABASE_URL=postgresql://user:pass@host:5432/shazwerk
```

---

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## Production Deployment to Vercel

1. Commit and push changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete production website for SHAZWERK"
   git push origin main
   ```
2. In Vercel:
   - Import repository `sarangsaif/shazwerk`.
   - Ensure Framework Preset is **Next.js**.
   - Set environment variable `ADMIN_PASSWORD` to your chosen admin passphrase.
   - Attach custom domain `shazwerk.ch` and verify DNS records (A record pointing to `76.76.21.21` or CNAME `cname.vercel-dns.com`).

---

## License & Intellectual Property

© 2026 SHAZWERK. All rights reserved. Registered in Switzerland.
