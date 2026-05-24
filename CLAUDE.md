@AGENTS.md

# Bronze Metal — project context

B2B catalog site for Bronze Metal (São Paulo). Three locales: PT (default), EN, ES. Next.js 16 App Router, next-intl 4, Tailwind v4. No backend — the contact form opens `mailto:`.

## Hosting: GitHub Pages

The site is **statically exported** (`output: "export"` in `next.config.ts`). It does **not** run a Node server in production. Build produces `out/`, which is uploaded as a Pages artifact by `.github/workflows/deploy.yml` and served by GitHub Pages.

- Live URL (project page, temporary): `https://leonabdalla.github.io/site-bronze/`
- Repo Settings → Pages → Source = **GitHub Actions** (not "Deploy from a branch")
- Deploys on every push to `main`. Watch runs at `https://github.com/leonabdalla/site-bronze/actions`.

**Why GitHub Pages:** free, unlimited collaborators on public repos, no per-host lock-in.

### Project page subpath (temporary)

Because GitHub Pages serves project pages at `/<repo-name>/`, `next.config.ts` sets `basePath: "/site-bronze"` (controlled by `NEXT_PUBLIC_BASE_PATH`). All internal links and assets resolve to `/site-bronze/...`. **Remove the basePath on the day the custom domain goes live** (set `NEXT_PUBLIC_BASE_PATH=""` in the workflow env, or delete the env line entirely).

**Anything that requires a server is forbidden:**
- API routes (`app/api/**/route.ts`)
- Server actions (`"use server"`)
- `headers()` / `redirects()` / `rewrites()` in `next.config.ts` (they no-op silently in static export, and GitHub Pages ignores them anyway)
- `middleware.ts` (was deleted on purpose — don't re-add)
- `cookies()` / `headers()` from `next/headers`
- Dynamic routes without `generateStaticParams`
- `next/image` with the default loader (we set `images.unoptimized: true`)
- ISR / `revalidate`

If you need a server feature, that's a hosting-strategy decision — ask first.

## URL ↔ on-disk file mapping (read this before touching routes)

**This is the easiest thing to break.** next-intl's `pathnames` config produces localized URLs in HTML, but Next.js writes files using the PT-named route segments. GitHub Pages has no server-side rewrites, so we fix the file structure ourselves in a **post-build step** (`scripts/post-build.ts`), which runs automatically as part of `npm run build`.

What the post-build script does, in order:

1. **Rename localized dirs.** For each non-PT locale, walks `routing.pathnames` and renames `out/<locale>/<pt-slug>/` to `out/<locale>/<localized-slug>/` (e.g. `out/en/produtos/` → `out/en/products/`). Nested slug directories (`[slug]`, `[alloy]`) come along automatically.
2. **Strip the default-locale prefix.** Moves `out/pt/*` up to `out/*` so `/produtos/`, `/empresa/`, `/` resolve to real files.
3. **Emit `/pt/* → /*` canonical stubs.** Meta-refresh HTML stubs at the PT-prefixed paths point to the canonical unprefixed URL. Tagged `robots: noindex` and `rel=canonical`.
4. **Emit legacy 301 stubs.** Same mechanism for the Wix-era and old flat alloy URLs (see `scripts/legacy-redirects.ts`).

Source of truth for localized slugs: `src/i18n/routing.ts`. The post-build script imports from it directly — no duplicate mapping to maintain.

**Why meta-refresh stubs and not real 301s:** GitHub Pages cannot set HTTP status codes. Google treats `<meta http-equiv="refresh" content="0; url=...">` as 301-equivalent for indexing when combined with `<link rel="canonical">`. The address bar shows a brief flash of the old URL; acceptable for legacy URLs that get little traffic.

| What user sees in URL | File served from disk | How |
|---|---|---|
| `/produtos/` | `out/produtos/index.html` | post-build move from `out/pt/produtos/` |
| `/en/products/` | `out/en/products/index.html` | post-build rename from `out/en/produtos/` |
| `/es/productos/` | `out/es/productos/index.html` | post-build rename from `out/es/produtos/` |
| `/pt/produtos/` | meta-refresh → `/produtos/` | post-build stub |
| `/produtos-bronze-metal` | meta-refresh → `/produtos/` | legacy stub |

**Adding a new top-level route (e.g. `/eventos`):**
1. Create `src/app/[locale]/eventos/page.tsx`
2. Add to `src/i18n/routing.ts` `pathnames` map with all three locales — **this is the only place URL mapping lives now.** The post-build script picks it up automatically.
3. Add to `src/app/sitemap.ts` `staticPaths` for all three locales
4. Add translations to `messages/{pt,en,es}.json`

**Adding a legacy URL redirect:** add to `scripts/legacy-redirects.ts`. Format: `"/old-path": "/new-path/"`. Always include trailing slash on destination — we use `trailingSlash: true`.

## Custom response headers

GitHub Pages does not serve custom response headers, so HSTS / X-Frame-Options / Referrer-Policy / Permissions-Policy are not set at the server level. HTTPS is enforced by GitHub Pages itself. Acceptable for a static catalog with no auth or sensitive data. Re-add via a DNS-level proxy if needed when the custom domain comes online.

## Build / dev

- `npm run dev` — local dev server. Behaves like normal Next.js (middleware-less, so `/produtos` 404s locally; navigate via the language switcher or use `/pt/produtos`). To preview the *deployed* shape, run `npm run build` then `npx serve out -l 3000`.
- `npm run build` — runs `next build && tsx scripts/post-build.ts`, produces the final `out/`. **Must succeed locally before pushing** or the Actions deploy will fail too.
- `npm run typecheck` / `npm run lint` — verify before commit.
- **`.nvmrc` pins Node 22.18.0**, matched by the `setup-node` step in the workflow.

## Existing important files

- `src/i18n/routing.ts` — locales + pathnames map (single source of truth for URL structure)
- `src/i18n/request.ts` — message loading
- `src/data/{company,products,industries,catalogs,applications,alloyGallery}.ts` — content (PT canonical, with `{pt, en, es}` translation objects on fields that need them)
- `messages/{pt,en,es}.json` — UI strings via next-intl
- `src/app/robots.ts` — explicitly allows major search bots **and AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
- `src/app/sitemap.ts` — generates `sitemap.xml` at build, lists all locale variants
- `scripts/post-build.ts` — restructures `out/` for GitHub Pages (rename + stubs). See "URL ↔ on-disk file mapping" above.
- `scripts/legacy-redirects.ts` — legacy URL → new URL mapping, consumed by the post-build script
- `scripts/download-assets.mjs` — one-off mirror script that pulled images from the old Wix CDN into `public/images/`. Runtime no longer touches Wix.
- `.github/workflows/deploy.yml` — build + deploy to GitHub Pages on push to `main`

## Custom domain (planned, not yet done)

`bronzemetal.com.br` still points at the old Wix site. Plan: keep registration at Registro.br (it doesn't matter who hosts DNS as long as the A/AAAA records point at GitHub Pages), add the domain to the Pages project, switch DNS. Zero-downtime cutover via DNS TTL.

When the domain is live:
- In repo Settings → Pages, set the custom domain to `bronzemetal.com.br` (this creates a `CNAME` file on the deploy branch — we can also commit `public/CNAME` so the workflow includes it in every build)
- DNS at Registro.br: A records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- **Remove the `basePath`**: set `NEXT_PUBLIC_BASE_PATH: ""` in `.github/workflows/deploy.yml`'s build env (or delete the line), since the custom domain serves at the root
- Update `metadataBase` in `src/app/[locale]/layout.tsx`
- Update `BASE_URL` fallback in `src/app/robots.ts` and `src/app/sitemap.ts` (or set `NEXT_PUBLIC_SITE_URL` env var in the workflow)
- Resume the deferred SEO additions (canonical hreflang completeness, JSON-LD Organization, Open Graph defaults, `llms.txt`)

## Don'ts

- Don't add `"use server"` or API routes — see "Hosting" above.
- Don't put redirects in `next.config.ts` — put them in `scripts/legacy-redirects.ts`.
- Don't try to put response headers anywhere — GitHub Pages won't serve them.
- Don't re-add `src/middleware.ts`.
- Don't hardcode `metadataBase` to any host other than the current live URL — keep it in sync with where the site is actually served.
- Don't add `public/_redirects` or `public/_headers` — that's Cloudflare-specific syntax and GitHub Pages ignores it. Use `scripts/legacy-redirects.ts` for redirects; headers aren't available.
- Don't commit without running `npm run build` locally — the workflow uses `npm ci` which is stricter than dev.
- Don't add a new dependency that requires a Node runtime at request time (auth libraries, DB clients, etc.) without confirming the hosting model still works.
