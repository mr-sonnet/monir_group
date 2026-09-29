# QA — 27 September 2026

## Completed

- Custom Astro 7.3.5 / TypeScript 6.0.3 static build; pinned package lock. Astro check: zero errors, warnings or hints. Dependency installation audit: zero known vulnerabilities reported.
- 55 live catalog labels reconciled with the source; ten group names; ten noindex priority product pages; seven core pages and a branded 404. Seven equivalent legacy URL redirects are configured; other audited demo URLs return 404 in the new project.
- **24 Playwright tests passed** on the local production build: Chromium desktop, Microsoft Edge desktop and Chromium mobile emulation (390 × 844). Tablet width 820 px and enlarged root text checks passed.
- Search by product name, source spelling and DCP alias; category URL persistence; empty state; clearing filters; product-aware quote URLs.
- Inquiry validation: contact name, one contact method, product or message, consent, email formatting, phone formatting, preferred reply consistency. Optional quantity/location do not block valid inquiries.
- Demo completion explicitly says **not sent**; summary preserves selected product/contact; offline error retains entries; honeypot rejects; untrusted text is inserted using textContent.
- Keyboard skip link, visible focus, mobile menu/Escape, one H1, no horizontal overflow, lazy image loading, no client exceptions in checked core pages.
- Axe WCAG A/AA automation: no reported violations on Home, Products and Contact in all three browser profiles. This is not a full accessibility certification.
- **540 generated internal link/asset references checked, zero broken.** Build includes four selected local visual assets totaling 107,912 bytes; no external media hotlinks. Excluded stock and theme assets are archived outside public output.
- Final desktop/mobile screenshots inspected. Existing-site desktop/mobile baseline screenshots captured read-only. The low-contrast hero outline button was corrected; the development toolbar is disabled.

## Performance observations

Single unthrottled Chromium runs on localhost, static production preview: desktop LCP 84 ms, mobile-emulated LCP 68 ms, observed CLS 0 for both. These are local diagnostic measurements, not real-user Core Web Vitals or a deployed performance score. No INP claim. Build JavaScript totals approximately 5 KB raw / 2.1 KB gzip; CSS approximately 14.4 KB raw / 3.9 KB gzip. See `build-verification.json` for exact values and conditions.

## Limits and pre-launch requirements

- Firefox downloaded but could not launch (`spawn UNKNOWN`); Edge was used for the additional browser run. Both successful desktop browsers use Chromium; Safari/WebKit and a real mobile device were not tested.
- Form transport is **demo only**. No recipient/provider credentials exist; no real email/CRM delivery has been tested. No personal data is sent or stored by the demo. Production requires server-side validation, rate limiting, spam protection and confirmed delivery.
- Hosting logs/access are provider-managed. Privacy language is review-stage and must be finalized with actual production providers and retention decisions.
- Business identities, addresses, leadership, product nomenclature and media permissions need owner confirmation (`open-facts.md`). Third-party product artwork, stock/facility-like images, partner logos, invented metrics and claims are hidden.
- All new pages are noindex; robots disallows crawling; sitemap has no approved public URLs. Private access is handled by the owner-only Sites deployment, rather than robots alone.
- WordPress, current domain, DNS, production redirects and the existing sitemap were not modified. Private deployment status is verified separately by the Sites service.

## Media update requested by owner

The homepage now uses the exact first current-site slider video, downloaded locally (3,096,981 bytes), with its existing poster. It autoplays muted and loops, includes an accessible pause/play button, and keeps the poster without automatic video download for reduced-motion/data-saving preferences. It is decorative source-site footage, not claimed to show group facilities.

All 55 catalog products now display their corresponding current-site images, optimized as local WebP copies; priority detail pages and related-product cards use the same mapping. Source URLs and reuse instruction are recorded in `audit/added-media.json`. This supersedes earlier notes saying product images/video were hidden.

33 browser tests pass across Chromium, Edge and mobile emulation, including video play/pause/resume, reduced-motion behavior, every product image, detail-image matching, catalog search and quote-flow regressions. Desktop/mobile screenshots were reviewed. Original WordPress remains unchanged.

## 2026-09-29 — visual redesign

Rebuilt the header, utility bar, video hero, product-family cards, company-logo gallery, featured products, sourcing section, leadership, locations, CTA and footer using the original green/gold identity. Inner pages share the revised typography, image-backed introductions and form treatment. Added original-site logos for all ten concerns; provenance is in design-refresh-media.json.

Validation: 30 functional/media/responsive tests passed across Chromium, Edge and mobile. Three accessibility/navigation tests passed after removing decorative low-contrast location numbers. Visible-image checks exclude intentionally hidden responsive decoration; the separate catalog suite still checks all 55 product images. No broken internal references among 774 checks. Desktop/mobile home and contact screenshots inspected.

Build environment limitation: Windows Application Control blocks the installed Astro 7 Rolldown native binding. The WebAssembly fallback also fails on this machine. For this static review archive, source was compiled and checked using a temporary local Astro 5.18.2 / @astrojs/check 0.9.6 / TypeScript 5.9.3 toolchain. The repository package.json and lockfile retain the original Astro 7.3.5 dependencies; no dependency downgrade is committed. The older local compiler is not deployed as a server or dependency. A clean build with the pinned Astro 7 toolchain remains to be verified in a compatible environment. Do not use the temporary older compiler for production server deployment; npm reports advisories for that toolchain.

The review remains owner-private and noindex, and the inquiry form remains an explicit non-sending demo. The live WordPress site and domain were not modified.
