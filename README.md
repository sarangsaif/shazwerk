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

- `/` — Homepage (Zurich live clock, Blueprint Hero, Process 01–06, Core Services Matrix, What We Build, Selected Work, Why SHAZWERK, Process Timeline 01–07, Final Minimalist CTA)
- `/services` — Comprehensive technical breakdown of all 6 capabilities and engagement models (Fixed-Scope, Dedicated Squad, Fractional CTO)
- `/work` — Curated catalog of architectural studies and internal concept products
- `/about` — Studio ethos, Swiss business context, international engineering delivery, and foundational principles
- `/contact` — High-end inquiry briefing form with real-time validation, CHF budget tiers, and spam protection
- `/privacy` — Comprehensive privacy policy compliant with Swiss nDSG & EU GDPR
- `/imprint` — Statutory Swiss Impressum with structured corporate placeholders
- `/admin` — Private triage console for reviewing inquiries, changing status, and inspecting privacy-preserving telemetry
- `/admin/login` — Authenticated access portal

---

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
