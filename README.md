# Monir Group — custom Astro website

Separate owner-only review project. Does not read from WordPress at runtime or write to monirgroupbd.com.

## Run

Node 24 is supported. `npm ci`, then `npm run dev` (http://127.0.0.1:4321). `npm run check`, `npm run build`, `npm run preview`. Browser tests: `npx playwright install chromium`, then `npm test` while the local preview is running.

## Editing

- `src/data/company.ts`: approved contact details, locations and leadership, plus separately tracked unverified claims.
- `src/content/products/catalog.json`: all 55 products, source aliases, hidden optional fields, detail/index status.
- `src/content/businesses/companies.json`: ten concerns; only the evidenced feed concern has a profile.
- `src/data/categories.json`: working taxonomy.
- `src/styles/tokens.css`: color, type, spacing and layout tokens.
- `src/pages/`: editable page copy. `src/components/`: shared interface components.
- `src/lib/quote.ts`: validation and the single transport interface. No mail provider is configured.

All staging pages use noindex, a disallow robots file and an empty approved-page sitemap. Production indexing and structured data remain part of the later public-domain deployment. All assets used are local copies from the current website.

## Inquiry transport

The form validates requirements and prepares WhatsApp and email messages. WhatsApp uses +8801711966411; email uses mdmonirgroupbd@gmail.com. Visitors must press Send in the destination app. No automatic receipt or delivery is claimed. Form data stays in page memory until the visitor opens a destination app. The original monirenterprise999@gmail.com remains an additional contact.

Hostinger SMTP is deferred at the owner's request. Later, implement a server endpoint with validation, rate limiting and server-only SMTP secrets; return { "accepted": true } only after provider acceptance. Configure the endpoint, switch the form copy to direct submission, update the privacy notice, and test a delivered inquiry. Do not put SMTP credentials into static Astro client code.

The form includes a honeypot; client-side checks alone are not production spam protection. Tracking events (`monir:analytics`) are browser CustomEvents only; no analytics service receives them. Never send contact data to analytics.

## Media recovery and migration

`audit/asset-manifest.csv` and `audit/used-assets.json` preserve provenance. Raw media was downloaded to `public/media/monir-group` during inventory, then moved to `audit/media-originals` to keep excluded assets out of the deployment. The complete recovery archive (about 104 MiB), public HTML/API snapshots, original handoff and QA records are included in this private repository. Archive inclusion does not imply permission for public reuse. Descriptive filenames are retained; repeated thumbnail variants are not used in the new site. The small selected asset set is versioned under `public/media/monir-group`.

`audit/legacy-urls.csv` records URL-to-action decisions. `public/_redirects` supplies equivalent-page 301 rules; Astro also emits redirect fallbacks. Removed templates have no route and resolve to 404. Review host support before public migration. No old URL or sitemap is edited remotely.

Read `audit/open-facts.md` and `audit/qa.md` before any launch. A CMS is intentionally outside this build.

## Private review

https://monir-group-private-review.dr-loren-mic-5808.chatgpt.site

The full browser test suite also uses an installed Microsoft Edge browser. The existing WordPress site and monirgroupbd.com remain untouched. Inquiries use working WhatsApp/email handoff links; automatic SMTP delivery is not configured.


## Video and product imagery
The homepage uses the first video from the current WordPress slider, with pause/play, reduced-motion and poster fallback. All 55 products have matched, optimized local images. `audit/added-media.json` records each source URL. The latest QA suite contains 33 tests.

## Leadership messages
The About page uses messages from https://monirgroupbd.com/about-2/. Source text is archived in audit/leadership-source.json. The undated 40% growth sentence was omitted; the remaining message wording is preserved. Company details were approved on 29 September 2026.

Build-machine limitation: see the 29 September entry in audit/qa.md. The pinned Astro 7 native binding is blocked by Windows Application Control here; the local static archive uses the documented temporary compatible compiler.
