@AGENTS.md

# Bronze Metal — project context

B2B catalog site for Bronze Metal (São Paulo). Three locales: PT (default), EN, ES. Next.js 16 App Router, next-intl 4, Tailwind v4. No backend — the contact form opens `mailto:`.

## Hosting: Cloudflare Workers (Static Assets)

The site is **statically exported** (`output: "export"` in `next.config.ts`). It does **not** run a Node server in production. Build produces `out/`, which is deployed as static assets via Cloudflare Workers (the newer unified deployment model, not classic Pages).

- Config: `wrangler.jsonc` at the repo root (`assets.directory: "./out"`).
- Deploy command in Cloudflare's build settings: `npx wrangler deploy`.
- Build command: `npm run build`.

**Why static export:** lets us host on Cloudflare free tier with unlimited collaborators (the reason we left Vercel).

**Anything that requires a server is forbidden:**
- API routes (`app/api/**/route.ts`)
- Server actions (`"use server"`)
- `headers()` / `redirects()` / `rewrites()` in `next.config.ts` (they no-op silently)
- `middleware.ts` (was deleted on purpose — don't re-add)
- `cookies()` / `headers()` from `next/headers`
- Dynamic routes without `generateStaticParams`
- `next/image` with the default loader (we set `images.unoptimized: true`)
- ISR / `revalidate`

If you need a server feature, that's a hosting-strategy decision — ask first.

## URL ↔ on-disk file mapping (read this before touching routes)

**This is the easiest thing to break.** next-intl's `pathnames` config produces localized URLs in HTML, but Next.js writes files using the PT-named route segments. The mismatch is reconciled by `public/_redirects` rewrite rules.

| What user sees in URL | File served from disk | How |
|---|---|---|
| `/produtos/` | `out/pt/produtos/index.html` | `_redirects` rewrite |
| `/en/products/` | `out/en/produtos/index.html` | `_redirects` rewrite |
| `/es/productos/` | `out/es/produtos/index.html` | `_redirects` rewrite |
| `/en/produtos/` | (canonical 301 → `/produtos/`) | `_redirects` |
| `/pt/produtos/` | (canonical 301 → `/produtos/`) | `_redirects` |

**Adding a new top-level route (e.g. `/eventos`):**
1. Create `src/app/[locale]/eventos/page.tsx`
2. Add to `src/i18n/routing.ts` `pathnames` map with all three locales
3. Add to `src/app/sitemap.ts` `staticPaths` for all three locales
4. Add to `public/_redirects`:
   - `/eventos /pt/eventos/ 200` + `/eventos/ /pt/eventos/ 200`
   - `/eventos/* /pt/eventos/:splat 200` if it has children
   - One rewrite per non-PT-matching localized URL (e.g. `/en/events /en/eventos/ 200`)
5. Add translations to `messages/{pt,en,es}.json`

**Adding a legacy URL redirect:** add to `public/_redirects` (not `next.config.ts`). Format: `/old-path /new-path/ 301`. Always include trailing slash on destination — we use `trailingSlash: true`.

## Cloudflare-side config files

These replace what Vercel handled natively. They live in `public/` so they ship as-is to `out/`.

- **`public/_headers`** — security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy). Modify here, not in `next.config.ts`.
- **`public/_redirects`** — three sections, in order: canonical `/pt/*` strip, legacy 301s, locale rewrites (200). Order matters — first match wins.

Cloudflare _redirects syntax: `<source> <destination> <status>`. Status `200` = rewrite (URL bar unchanged), `301` = permanent redirect. `*` captures into `:splat`.

## Build / dev

- `npm run dev` — local dev server, behaves like normal Next.js (middleware-less, so `/produtos` will 404 locally; navigate via the language switcher or use `/pt/produtos` directly). To preview the *production* routing, run `npm run build` and serve `out/` with `npx serve out`.
- `npm run build` — produces `out/`. Must succeed locally before pushing or Cloudflare will fail too.
- `npm run typecheck` / `npm run lint` — verify before commit.
- **`.nvmrc` pins Node 22.18** so Cloudflare's build uses npm 11 (matches local resolver — earlier mismatch caused `npm ci` failures).

## Existing important files

- `src/i18n/routing.ts` — locales + pathnames map (single source of truth for URL structure)
- `src/i18n/request.ts` — message loading
- `src/data/{company,products,industries,catalogs,applications,alloyGallery}.ts` — content (PT canonical, with `{pt, en, es}` translation objects on fields that need them)
- `messages/{pt,en,es}.json` — UI strings via next-intl
- `src/app/robots.ts` — explicitly allows major search bots **and AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
- `src/app/sitemap.ts` — generates `sitemap.xml` at build, lists all locale variants
- `scripts/download-assets.mjs` — one-off mirror script that pulled images from the old Wix CDN into `public/images/`. Runtime no longer touches Wix.

## Custom domain (planned, not yet done)

`bronzemetal.com.br` still points at the old Wix site. Plan: keep registration at Registro.br (Cloudflare Registrar doesn't handle `.com.br`), switch nameservers to Cloudflare, add domain to the Pages project. Zero-downtime cutover via DNS.

When the domain is live:
- Update `metadataBase` in `src/app/[locale]/layout.tsx`
- Update `BASE_URL` fallback in `src/app/robots.ts` and `src/app/sitemap.ts` (or set `NEXT_PUBLIC_SITE_URL` env var in Cloudflare)
- Resume the deferred SEO additions (canonical hreflang completeness, JSON-LD Organization, Open Graph defaults, `llms.txt`)

## Don'ts

- Don't add `"use server"` or API routes — see "Hosting" above.
- Don't put redirects in `next.config.ts` — put them in `public/_redirects`.
- Don't put response headers in `next.config.ts` — put them in `public/_headers`.
- Don't re-add `src/middleware.ts`.
- Don't write to `metadataBase: new URL("https://site-bronze.vercel.app")` — we left Vercel.
- Don't commit without running `npm run build` locally — Cloudflare's build env is stricter than dev.
- Don't add a new dependency that requires a Node runtime at request time (auth libraries, DB clients, etc.) without confirming the hosting model still works.
