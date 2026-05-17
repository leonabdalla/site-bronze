# Bronze Metal — Next.js site

Modern Next.js replica of bronzemetal.com.br — bilingual (PT-BR / EN),
App Router, Tailwind v4, and zero paid services on the v1 stack.

## Stack

- **Next.js 16** (App Router, RSC) + **React 19** + **TypeScript strict**
- **Tailwind CSS v4** with brand tokens in `src/app/globals.css`
- **next-intl** for PT-BR + EN routing and translations
- **react-hook-form** + **zod** for the contact form
- **embla-carousel-react** for the hero
- **@vercel/analytics** (free tier, cookieless)
- **lucide-react** icons
- Inter + JetBrains Mono via `next/font`

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run format       # prettier
```

## Project layout

```
src/
  app/
    [locale]/             # PT/EN segments
      page.tsx            # Home
      empresa/            # Company
      produtos/           # Products + [slug] family pages
      aplicacoes/         # Applications
      industrias/         # Industries
      catalogos/          # Email-gated catalog dialogs
      contato/            # Contact form
      privacidade/        # Privacy policy
      not-found.tsx
    sitemap.ts
    robots.ts
    globals.css
  components/
    layout/               # SiteHeader, SiteFooter, ContactBar, etc.
    marketing/            # HeroCarousel, ProductGrid, SpecsTable, ...
    forms/                # ContactForm
    ui/                   # Button, Container, Placeholder, ...
  data/                   # Typed source of truth (products, industries, ...)
  i18n/                   # next-intl routing, navigation, request config
  lib/                    # contact-schema, submit-contact (mailto: v1)
  middleware.ts           # next-intl locale middleware
messages/
  pt.json
  en.json
public/
  images/                 # Brand, product, industry assets
  catalogs/               # PDF downloads (when supplied)
scripts/
  download-assets.mjs     # One-shot asset mirror; edit ASSETS list to use
next.config.ts            # i18n plugin, security headers, 301 redirects
```

## Contact form (v1)

Submits via `mailto:` — opens the user's email client with the message
pre-filled and addressed to the company email. No backend required.
The catalog dialog uses the same transport with a catalog name in the
subject. To upgrade to transactional sending in v2, replace
`src/lib/submit-contact.ts` with a `fetch('/api/contact')` call and add
a Route Handler that uses Resend (see the project roadmap).

## Assets

Product, industry, and hero images render as CSS gradient placeholders
(`Placeholder` component) until real images arrive. To mirror real
assets:

1. Edit `scripts/download-assets.mjs`, add entries to the `ASSETS` array.
2. Run `npm run assets:fetch`.

Files land under `public/images/{brand,products,industries}/`. The data
files already reference those paths.

## Deployment (free tier)

### 1. Push this repo to a private GitHub repo (personal account)

```bash
gh auth login                                # one-time, browser flow
gh repo create site-bronze --private \
   --source=. --remote=origin --push
```

That yields `https://github.com/<you>/site-bronze` — private, you-only.

### 2. Import on Vercel

- vercel.com → Add New → Project → import `site-bronze`
- Framework auto-detected as Next.js
- Environment variables (optional in v1):
  - `NEXT_PUBLIC_SITE_URL` — your prod URL (used by sitemap/robots)
- Deploy → ships to `<project>.vercel.app`

### 3. Vercel Analytics

Enable Web Analytics in the Vercel dashboard. No code change needed —
`<Analytics />` is already in the locale layout.

### 4. Domain (later)

Vercel → Project → Settings → Domains → add a domain and set the
displayed DNS records at your registrar. Free on Hobby.

## What's deliberately not here yet (see roadmap)

- Transactional email backend (Resend) — wait until form volume warrants it
- Database for leads (Supabase Postgres) — wait until sales needs a lead inbox
- Headless CMS (Sanity / Payload) — wait until non-devs need to edit content
- Customer logos, downloadable PDFs, alloy spec comparison tool — wait for assets
- AI navigation assistant — much later

All scaffolded so each is a small, isolated migration when triggered.
