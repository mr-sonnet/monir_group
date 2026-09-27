# Monir Group — custom Astro website

Separate owner-only review project. Does not read from WordPress at runtime or write to monirgroupbd.com.

## Run

Node 24 is supported. `npm ci`, then `npm run dev` (http://127.0.0.1:4321). `npm run check`, `npm run build`, `npm run preview`. Browser tests: `npx playwright install chromium firefox`, then `npm test` while the local preview is running.

## Editing

- `src/data/company.ts`: provisional contact, locations, leadership, claims and review statuses.
- `src/content/products/catalog.json`: all 55 products, source aliases, hidden optional fields, detail/index status.
- `src/content/businesses/companies.json`: ten concerns; only the evidenced feed concern has a profile.
- `src/data/categories.json`: working taxonomy.
- `src/styles/tokens.css`: color, type, spacing and layout tokens.
- `src/pages/`: editable page copy. `src/components/`: shared interface components.
- `src/lib/quote.ts`: validation and the single transport interface. No mail provider is configured.

All staging pages use noindex, a disallow robots file and an empty approved-page sitemap. No Organization/LocalBusiness JSON-LD is emitted because the business identity and addresses are not yet verified. All assets used are local copies from the current website.

## Inquiry transport

The form is explicitly marked demo. It validates and shows a review; it sends nothing and writes no personal data to local storage. A future HTTPS server endpoint must independently validate allowlisted fields, enforce lengths, rate-limit, verify consent, reject spam and send through a provider using server-only secrets. Return `{ "accepted": true }` only after confirmed provider acceptance. Set the endpoint in company configuration and update every demo notice/button/privacy statement only after a delivered inquiry has been tested. Do not put an email secret into static Astro client code.

The form includes a honeypot; client-side checks alone are not production spam protection. Tracking events (`monir:analytics`) are browser CustomEvents only; no analytics service receives them. Never send contact data to analytics.

## Media recovery and migration

`audit/asset-manifest.csv` and `audit/used-assets.json` preserve provenance. Raw media was downloaded to `public/media/monir-group` during inventory, then moved to `audit/media-originals` to keep excluded assets out of the deployment. The local recovery archive is about 104 MiB and deliberately ignored by Git along with raw HTML/API dumps; preserve this directory separately if moving the project. Descriptive filenames are retained; repeated thumbnail variants are not used in the new site. The small selected asset set is versioned under `public/media/monir-group`.

`audit/legacy-urls.csv` records URL-to-action decisions. `public/_redirects` supplies equivalent-page 301 rules; Astro also emits redirect fallbacks. Removed templates have no route and resolve to 404. Review host support before public migration. No old URL or sitemap is edited remotely.

Read `audit/open-facts.md` and `audit/qa.md` before any launch. A CMS is intentionally outside this build.
