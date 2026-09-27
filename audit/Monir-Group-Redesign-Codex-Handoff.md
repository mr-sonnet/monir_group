# Monir Group — website redesign and Codex build handoff

**Prepared:** 27 September 2026  
**Purpose:** A working brief for a **custom-coded website**, content and media migration from the current WordPress site, and private review. The current site is the source of observed company facts and the exclusive source of website photography, video, illustrations, product images and brand media. It is not proof that its claims, relationships, numbers, or third-party image licenses remain current. This document is an audit and build specification, not a completed performance or accessibility test.

## 1. Outcome and decisions already made

Build a credible, contemporary **custom-coded** corporate website for Monir Group in Bangladesh. Its strongest public story is a portfolio of feed ingredients, agricultural commodities, nutritional inputs, trading activity, a group of named concerns, leadership, and physical offices/warehouse. The main visitor action is **Request a Quote**. Supporting actions are **Browse Products**, **Call**, **Email**, and **Contact the Group**. Do not describe the whole catalog as “poultry products.” Do not call Monir Group Bangladesh's biggest importer/exporter without evidence.

The site must make product discovery and serious B2B inquiry easy. Design should feel established, practical, and industrial: confident typography, clear hierarchy, real operations where available, restrained motion, excellent mobile use. Avoid generic farm lifestyle imagery, fictional factories, invented metrics, and template filler. Use **only files already hosted on the current Monir Group website** as visual/media sources; design strong typographic sections when the existing asset set lacks a suitable image. It should accommodate verified details later without structural rework.

**Evidence boundaries:** “Established in 2005,” leadership names, 20+ years, 100+ employees, 300+ suppliers, 150+ clients, ten named concerns, offices, and warehouse are *currently published statements*. Reuse names/locations as provisional copy, but mark them for business owner confirmation before public launch. The percentages, growth claim, technology/compliance claims, customer logos, and supplier names should not migrate by default. Product specifications, origin, availability, capacity, and prices are unknown and must not be fabricated.

## 2. Existing-site audit and migration decisions

| Current URL / section | Decision | Reason and implementation |
|---|---|---|
| `/` hero/sliders | Rewrite + redesign | Repeated “Biggest Importer & Exporter … poultry item” obscures the portfolio. Replace with precise trading and supply proposition, category routes, and RFQ. |
| `/` About, mission, statistics | Keep facts conditionally + rewrite | Remove “Natural: Web Designer 97%,” “Wholesome: Web Designer 95%,” repeated generic copy. Show only verified 2005/metrics with provenance or hide the numeric row until approved. |
| `/` supplier and client logos/names | Hold for approval | Listed Bangladesh/India suppliers and client logos may imply live relationships or endorsement. Use a sourcing process section without names initially. |
| `/` news cards | Remove from launch navigation | Three thin 2024 product announcements with “Uncategorized” and author “fjfqs” do not merit a current-news section. Migrate meaningful facts into product pages after review. |
| `/about-2/` | Rewrite; ideally keep URL or redirect to `/about/` | Preserve establishment date and leadership identity. Remove duplicated mission/company overview, unsupported 40% annual growth and “state-of-the-art” assertion, poultry-only language. |
| `/sister-concerns/` | Keep URL + redesign | Ten names appear, with little explanation. Build a useful group overview and allow individual profiles to become fuller as facts arrive. |
| `/monir-poultry-feed-industries-limited/` | Rewrite in place | It indicates poultry, cattle, fish feed and mentions a quality-control division, but also has Lorem ipsum, fictional testimonials, external demo links, and unrelated organic-food template blocks. Use a conservative profile. |
| `/products/` | Keep URL + restructure | Current catalog has 54 named tiles without specs or inquiry paths. Add categories, search/filter, detail templates and product-aware RFQ. |
| `/contact/` | Keep URL + redesign | Current contact details repeat three times. Show one clear RFQ form, phone/email and separately labeled locations. |
| `/home-2/`, `/home-3/`, `/contact-2/`, `/contact-us/`, `/about-us/`, `/our-services/`, `/services/*`, `/shop-2/` | Audit inventory, then remove or redirect appropriately | Search exposes demo/legacy content, bogus contact details, shortcodes or unrelated organic products. Do not send every URL to the homepage blindly; redirect only where a genuinely equivalent page exists. Otherwise return 410 or 404 and remove internal links/sitemap entries. |
| WordPress navigation/footer | Rebuild | Remove public “LOGIN,” demo links, visitor counters, stale © 2023, doubled menus, default WordPress tagline. Preserve valid business contact and credit only after owner decision. |

**Not established in this audit:** measured Core Web Vitals, exact accessibility defects, search traffic, all indexed URLs, backend/hosting state, form delivery, security posture, and actual asset ownership. Codex should measure/test these during implementation. No scores are claimed here.

## 3. Sitemap and build order

**Launch core (build these fully):**

1. `/` — Home: group proposition, activities, product families, group overview, infrastructure footprint, people, inquiry.
2. `/about/` — About: origin in 2005, what the group does today, leadership, values expressed as practical commitments, contact.
3. `/businesses/` or retain `/sister-concerns/` — Group companies: ten named concerns, concise available facts and inquiry path. Prefer retaining `/sister-concerns/` initially to reduce migration work.
4. `/monir-poultry-feed-industries-limited/` — A substantive profile using only evidenced business lines; no invented manufacturing capacity or certifications.
5. `/products/` — Filterable/searchable product catalog and category anchors/pages as useful.
6. `/products/[slug]/` — Reusable product template. Publish priority items first; do not create 54 near-empty indexed pages. Others stay navigable catalog entries with RFQ until information arrives.
7. `/contact/` — Contact and Request a Quote, with confirmation and delivery handling.
8. `/privacy-policy/` — Appropriate policy for submitted personal data, completed with actual service providers before launch.

**Content modules to create now but expand only with real evidence:** Operations and sourcing, quality approach, leadership, sectors served, individual company profiles. They can be sections of Home/About/Businesses rather than thin standalone pages. Add `/operations/`, `/quality/`, `/industries/`, `/news/` only if owner supplies enough verified content. Do not pad the navigation simply to look large. Footer may link to these sections and contact.

**Suggested navigation:** Home · About · Businesses · Products · Contact; prominent **Request a Quote** button. On mobile, the same actions must be easy to reach. Product categories belong in Products, not a giant ten-company header dropdown.

## 4. Homepage information architecture and ready draft copy

Use the following as editable working copy. It deliberately avoids unverifiable rankings, capacity and quality guarantees.

| Order | Section and draft copy | Action / proof |
|---|---|---|
| 1 | **Eyebrow:** MONIR GROUP · BANGLADESH. **H1:** Supplying the ingredients behind Bangladesh's essential industries. **Lead:** Monir Group brings together trading and feed-related businesses, with a product range spanning feed ingredients, grains, agricultural commodities, nutritional inputs and more. Explore the range or tell our team what your business needs. | Request a Quote / Explore Products. Select an appropriate image/video from the current site after audit; otherwise use strong type and an honest product treatment. |
| 2 | **What we work with.** “Find the materials you need across feed ingredients, feed additives and minerals, grains and flours, and pulses and other commodities.” | Four category cards; each links to filtered catalog. |
| 3 | **Built around commercial supply.** “We work with businesses seeking materials for feed production, agricultural trade and related supply needs. Share your product, quantity and delivery location to start a specific conversation.” | RFQ; do not promise live stock, delivery time or nationwide service. |
| 4 | **A group with complementary businesses.** “Explore the companies that make up Monir Group, including trading businesses and a feed industry concern.” | View Businesses; show ten names without invented roles. |
| 5 | **Presence in Bangladesh.** “The current site lists a head office and warehouse in Gazipur, a branch in Dinajpur and a corporate office in Jamalpur.” In production, remove this meta-language once addresses are confirmed and write “Our offices and warehouse” with address cards. | View Contact; real location images when obtained. |
| 6 | **Since 2005.** “Monir Group's current profile dates the business to 2005. Its portfolio now includes a broad range of products for business buyers.” Use the year badge only after confirmation. | More About Us. Optional approved facts row. |
| 7 | **Tell us what you need.** “Looking for a specific material or specification? Send us the product, required quantity and delivery location. Our team will follow up using your preferred contact details.” | Request a Quote form or link. |

**Hero variants if evidence supports them later:** replace generic supply language with a specific sourcing/warehouse advantage backed by documentation. Do not present any current-site stock or template media as footage of Monir Group facilities.

## 5. Page-level copy deck

### About

**H1:** About Monir Group  
**Intro:** Monir Group is a Bangladesh-based group of businesses involved in trading and feed-related activity. The current company profile states that operations began in 2005. Today, the website presents a product range spanning maize, soybean products, fish meal, feed additives, grains, flours, rice and pulses.  
**Our approach:** “Business buyers need clarity about the material they are sourcing. Our product catalog is designed to make requirements easier to share, whether you are looking for a feed ingredient, an additive or a commodity.”  
**Leadership:** “Managing Director: Md. Robiul Hasan Monir. Chairman: Md. Monsur Ahmed.” These names/titles come from the current site; obtain current titles, approved portraits and short biographies before featuring as personal endorsements.  
**Timeline:** 2005 — establishment stated on current site; Present — group portfolio and locations as listed, subject to confirmation. Do not invent intervening events.  
**CTA:** Discuss a supply requirement.

### Businesses / Sister Concerns

**H1:** The businesses of Monir Group  
**Intro:** “Monir Group's current website lists the following businesses under its group. Explore the available company information or contact the group to discuss a specific requirement.”  
**Names as currently listed on main site:** M/S Monir Enterprise; Monir Poultry Feed Industries Limited; Monir Export Import Trading Ltd.; Mahi International; Sadman Green Agro; M.M Poultry Feed & Fish Feed; Muskan Trading Corporation; Mow Trading; Raiyan Global Trade Link; Nusrat Enterprise. Preserve legal styling only when confirmed. Different parts of the site disagree on “M/S,” suffixes, and whether Raiyan appears.  
**Cards:** name + only evidenced business focus. For nine concerns with no distinct description, use a neutral one-line “Listed as a Monir Group concern” or name only; do not infer each entity's registration, activity, or relationship. A clickable card must lead to a real profile, otherwise use plain text.

### Monir Poultry Feed Industries Limited

**H1:** Monir Poultry Feed Industries Limited  
**Intro:** “The current Monir Group website presents this concern in connection with poultry, cattle and fish feed. Contact the group to discuss its products and availability.”  
**Sections:** Product lines: poultry feed, cattle feed, fish feed (as listed); a brief “Quality information” panel explaining that specifications/documentation are available on request *only if owner confirms*; photo gallery from actual facility after permission; RFQ.  
**Hold:** quality management system, quality-control division, advanced technology, full regulatory compliance and all manufacturing claims until proof and current details are supplied.

### Products

**H1:** Products for feed production and commodity trade  
**Intro:** “Browse the product range currently listed by Monir Group. Product grade, origin, packaging and availability can vary. Tell us what you need and our team can discuss the relevant specifications.”  
**Search placeholder:** Search products. **Filter:** Category. **Card CTA:** Ask about this product. **Empty state:** “We couldn't find a match. Send us your requirement and we'll check with the team.”  
**Detail template:** H1; category; honest description of type/application only when documented; fields for grade/specification, origin, packaging, minimum quantity, availability, logistics, data sheet (hide empty fields completely); “Request a Quote for [product]” prefilled in RFQ; related products. Do not use e-commerce cart or published price without business confirmation.

### Contact / RFQ

**H1:** Contact Monir Group  
**Intro:** “Have a product inquiry or a question about the group? Share the details below or contact us directly.”  
**Form labels:** Inquiry type (Product quote / Group or company inquiry / Other); Product (searchable select or free text); Quantity and unit; Delivery location; Company name; Contact name; Phone; Email; Requirements or specification; optional preferred reply method; privacy consent. Only name, one contact method, inquiry type, and message/product should be required; quantity/location can be optional so valid leads are not blocked. Show success and failure states and protect from spam.  
**Confirmation:** “Thank you. We have received your inquiry. Our team will contact you using the details provided.” Never promise a response time before agreed.  
**Contact details on current site:** +880 1711-966411; secondary +880 1958-330351; monirenterprise999@gmail.com; mdmonirgroup@gmail.com. Default to the primary phone and primary email until current routing is confirmed. Do not expose the second email as general sales without approval.  
**Locations as published:** Head Office — Kader Complex, 2nd Floor, Ward 19, Holding 207, Block E, South Salna (Shimultoli Road), Gazipur City Corporation 1703. Branch Office — PTC Complex, 3rd Floor, Bangla Hili, Hakimpur, Dinajpur. Corporate Office — Monir Plaza, 1st & 2nd Floors, Sanandabari Bazar, Dewanganj, Jamalpur. Warehouse — Mollapara Jolarpar Road, Salna Bazar, Ward 19, Gazipur City, Gazipur 1703. Verify spelling, operational status and permission to show all addresses.

## 6. Product taxonomy and migration inventory

There are **54 labels** on `/products/` at the time of review. The following groups are a working taxonomy for site navigation, **not a declaration of grade or availability**. Preserve original terms as search aliases while correcting display spelling. Have the client validate ambiguous translations/brands before public launch.

| Category | Current products, normalized display where clear |
|---|---|
| Feed grains, meals and by-products | Maize; Full-Fat Soybean; Soybean Meal (High Protein); Soybean Meal (Low Protein); DORB [expand acronym after confirmation]; Wheat Dust [check whether wheat bran/middlings]; Rapeseed; Fish Meal; Dry Fish Powder; Mora Chal [verify]; Maize Powder; Half-Broken Maize; Diamond Broken Rice [brand/type?]; Wheat Husk; Mixed Dry Fish; Poultry Meal; Poultry Meal Oil; Rice Polish; Mustard Oil Cake (Shorishar Khoil); Limestone Powder; Corn Powder [possible duplicate of maize powder]; Limestone 2–3 mm; Chickpea Bran (Cholar Vushi) [verify]; Diamond Cut Rice [brand/type?]; Chitagur [verify local term]. |
| Grains, rice, flour and general commodities | Wheat; Red Rice; Brown Rice; Basmati Rice; Atop Rice; Sugar; Molasses; Maida Flour; Atta Flour. |
| Feed additives and minerals | L-Threonine; L-Lysine; L-Meta Amino [identity unclear]; L-Valine; Methionine; Sulfet [identity unclear]; DDGS; Corn Gluten Meal; Dicalcium Phosphate (DCP); Monocalcium Phosphate (MCP); Sodium Bicarbonate. |
| Pulses and by-products | Chickpea; Mashkalai Lentil [verify species/display name]; Khesari Dal; Lentils; Mung Dal; Anchor Dal [brand/type?]; Chickpea Husk; Khesari Dal Bran; Anchor Dal Bran [brand/type?]; Masoor Dal Bran (Moshuri Daler Vushi) [verify]. |

**Taxonomy note:** Several products can fit multiple supply contexts; assign one primary category and searchable tags. Maize powder/corn powder and molasses/Chitagur may or may not be equivalent in this inventory: **do not silently merge**. “Sulfet” and “L-Meta Amino” are too ambiguous for a technical description. For ingredient pages, never invent percentages or nutrition claims.

**Priority detail pages:** Maize, Soybean Meal, Full-Fat Soybean, Fish Meal, Rice Polish, Wheat, DDGS, Corn Gluten Meal, DCP, MCP. Make the template and RFQ linkage now; index each detail page only when it has a useful unique description/specification or real information beyond the catalog card.

## 7. Codex execution instructions

1. Create a separate repository/project and private review environment. Preserve the live WordPress site until approved migration. Inventory all current public URLs and assets from WordPress/sitemap if access exists; keep a URL-to-action spreadsheet or JSON and test redirects. The old URL list above is a starting sample, not exhaustive.
2. Implement a custom-coded site following the execution sequence in Section 7A. Use the old WordPress installation as a read-only content/media source, not as the theme or page builder for the new site. Do not assume hosting or admin access exists; continue with public assets and local structured content where possible.
3. Build reusable design tokens and components: responsive navigation, hero, product cards/filter, company cards, proof/image sections, CTA band, footer, RFQ form and legal page. Use readable fonts, strong contrast, visible focus, semantic headings and reduced-motion behavior.
4. Use the draft copy in this document. Mark uncertain data in a **single editable content configuration** with an approval status. Hide empty optional fields and unsupported claims. No visible “Lorem ipsum,” fictional testimonial, placeholder metrics, demo-site links or internal TODOs in the private review.
5. Wire product-aware inquiry. Preserve selected product in URL/form state, show it clearly, validate inputs, provide success/error states and send to a tested recipient/CRM when configured. In a private prototype without mail credentials, clearly label form as demo and avoid giving a false success message.
6. Source every visual and media file from the existing monirgroupbd.com site or its WordPress media export. Audit identity and permission before public use. Some current images are generic theme or stock files; do not portray those as Monir Group facilities. Do not introduce Pexels, Envato, AI images, new stock or image hotlinks from unrelated sites. Optimize copies and provide sensible still/poster fallback where source video exists.
7. Implement title/meta/OG templates, canonical URLs, sitemap for approved pages, robots rules for private staging, structured Organization/LocalBusiness only with verified facts, accessible alt text, analytics events for RFQ/phone/email, and a 404 page. Plan redirects and remove legacy demo content from live sitemap/index on launch.
8. QA desktop/tablet/mobile, keyboard flow, form delivery, address/phone links, content/claim review, cross-browser smoke test, performance measurements, image licensing, privacy text, redirects and live contact after deployment. Share a **private review URL** and concise list of remaining approval items. No public-domain cutover without the user's explicit launch decision.

### 7A. Exact custom-code build sequence for Codex

**Recommended implementation:** Astro + TypeScript for the website, CSS with a small, documented token system, and Astro content collections or local structured data for products and group companies. Astro is suited to content-driven pages and can generate product routes from structured data. Add a server adapter and an Astro Action or server endpoint for the quote form when the chosen host and email provider are known. Keep form transport behind one interface so the layout and validation can be built now, then attach production delivery later. This is a recommendation, not an assumption that the current host can run Astro. Confirm hosting capability before selecting deployment; a static Astro build plus a separate serverless form handler is an acceptable variant. No WordPress theme, Elementor, or live WordPress dependency in the new frontend. If the user later needs nontechnical editing, add a CMS as a separate scoped decision; structured files are adequate for the first private build.

**Phase 0 — inspect and establish baseline.** Check whether a repo, staging host and WordPress admin/media access are provided. Record current URL map, page headings, existing image placements, favicon/logo, visible videos, redirects and metadata. Save screenshots at desktop/mobile if browser access works. Do not edit production WordPress. Create `audit/legacy-urls.csv`, `audit/asset-manifest.csv`, and `audit/open-facts.md` in the new project.

**Phase 1 — recover and classify all existing-site media.** Start with the WordPress Media REST API `https://monirgroupbd.com/wp-json/wp/v2/media?per_page=100&page=1`, paginate until exhausted if public access works; collect `id`, `source_url`, `media_type`, `mime_type`, caption, alt text and available sizes. Also parse all relevant page HTML for `img`, `picture/source`, `video`, `poster`, CSS background URLs, SVGs and linked PDFs, including lazy-load attributes and `srcset`. Compare against the WordPress media inventory. If API is unavailable or incomplete, use page HTML plus a WordPress uploads export when admin access exists. Download originals to `public/media/monir-group/` with preserved descriptive filenames (avoid duplicate thumbnail variants), and log original URL, local path, dimensions, page placement, type, and reuse decision in `audit/asset-manifest.csv`. Avoid external hotlinks in the finished site. Do not claim to have captured every private or unlinked media item without a WordPress export.

**Two confirmed examples to seed the manifest:** an [existing Monir Enterprise mark](https://monirgroupbd.com/wp-content/uploads/2021/10/monir-enterprise-e1682655219164.webp) linked from the concerns page and an [existing maize product image](https://monirgroupbd.com/wp-content/uploads/2023/08/pngwing.com-jhjj1.png.webp) linked from Products. The latter appears generic; inspect before using it as primary brand media. These are examples, not a complete asset inventory. The public media API could not be fetched through the research tool during preparation, so Codex must check it directly in its build environment and use the fallback described above.

Classify each asset **A** authentic group/product/facility/leader/brand; **B** generic stock or theme image currently used on the site; **C** questionable, low-resolution, duplicate, decorative filler or externally hosted. Use A where it fits. B may be used only as generic category decoration if appropriate and usage rights can be established; otherwise use typography and CSS. Exclude C from the public design. The instruction to take media from the current site means the current site is the **sole asset source**, not that every low-quality template image must appear in the new design. If a video is absent from the source, do not fabricate a cinematic video section. Record missing hero-quality or operational footage as an enhancement for later.

**Phase 2 — scaffold.** Initialize an Astro TypeScript project, version control, formatting and build scripts. Create `src/styles/tokens.css`, global layout, `src/components/`, `src/pages/`, `src/content/products/`, `src/content/businesses/`, `src/data/company.ts`, and `public/media/monir-group/`. Use current stable releases supported by the selected runtime; pin dependencies in the lockfile. Put the entire original-to-local asset mapping under version control or store a documented media archive if the repo size makes binary assets impractical. Ensure private review is excluded from indexing.

**Phase 3 — data and copy.** Enter this document's copy into page/data files. Model each product with `name`, `slug`, `category`, `aliases`, `image`, `summary`, `details`, `status`, `specifications`, `origin`, `packaging`, and `indexable`. Empty details remain hidden. Seed all 54 catalog entries and the ten named group concerns. Reconcile ambiguous terms without silently combining products. Keep all provisional business claims in `src/data/company.ts` with review status. Build actual pages only from meaningful content.

**Phase 4 — design system then pages.** Establish visual direction from current-site logo/colors and the usable asset set; do not inherit the old theme's composition. Implement shared header/footer, typography, grid, cards, buttons, forms and mobile navigation. Build Home first, then About, Businesses, subsidiary, Products, detail template, Contact, privacy and 404. Check responsive layouts after each page. The site should still look deliberate if the media audit yields mostly product photos and logos.

**Phase 5 — inquiry flow.** Implement product-aware RFQ state, accessible field labels, validation, anti-spam and clear success/failure. Locally and in private preview, use a safe mock handler clearly labeled as a demo if delivery credentials are absent; do not silently discard inquiries. With hosting and a recipient confirmed, connect a server-side mail/provider integration, keep credentials in environment variables, and test an actual delivered inquiry including selected product and reply details.

**Phase 6 — migration and review.** Generate titles/meta/canonicals, sitemap and robots behavior. Compare old URLs to new equivalents one by one; implement redirects at the eventual host, with 404/410 for abandoned templates as appropriate. Run build/type checks, link check, image and accessibility checks, manual responsive review and form tests. Deploy to a private review URL, provide a short QA log and unresolved-facts list, and wait for the user's decision before production cutover.

**How the owner can edit later:** Products and companies live in small structured content files; ordinary copy and verified contact/metrics live in centralized data/page files. A content change goes through version control and a redeploy. If frequent staff edits without code are required, scope a CMS before launch rather than retaining WordPress by accident.

### Design and content acceptance criteria

- Within one screen, a buyer understands the group has a broad supply catalog and sees Products and Request a Quote.
- A buyer can find maize, fish meal, soybean meal and DCP via catalog search or category navigation and carry the selected item into the inquiry form.
- The ten current group names are represented accurately without fictional company descriptions.
- No unsupported superlatives, numbers, certification claims or fake facilities are stated as facts.
- Real company details are centrally editable; missing facts can be added without redesigning sections.
- No public demo pages, Lorem ipsum, wrong WordPress tagline, raw shortcodes, template testimonials or broken demo-domain links remain after migration.
- Each old valuable URL resolves to a suitable new page; obsolete templates are removed and indexed pages are handled intentionally.

## 8. Short owner fact-check queue — does not block design/build

| Priority | Needed before public launch | Safe build behavior while unanswered |
|---|---|---|
| High | Confirm official legal/group name, whether 2005 applies to whole group or Monir Enterprise, and final list/legal styling of ten concerns. | Use “Monir Group”; store year and names as provisional, avoid legal assertions. |
| High | Confirm active phone/email, RFQ recipient, and status/spelling of four listed locations. | Build form with configurable recipient; display current primary contact provisionally in private review. |
| High | Confirm product list/current availability, ambiguous labels (DORB, Mora Chal, Diamond, Chitagur, L-Meta Amino, Sulfet, Anchor, etc.), and priority product specs. | Show catalog names with flagged fields hidden; no technical claims or 54 thin pages. |
| High | Confirm reuse permission for current-site logo, staff/facility media, third-party stock/theme imagery and client/supplier logos. | Inventory and download current-site assets; use credible first-party assets in private review, keep questionable assets hidden, and build text/CSS-led sections where media is unsuitable. |
| Medium | Approve exact leader names/titles/headshots and a short authentic company story. | Use names/titles in private draft; keep personal statements off published pages until approved. |
| Medium | Substantiate 100+ employees, 300+ suppliers, 150+ clients, quality systems, export activity and markets. | Hide numeric trust strip and specific operational claims until approved. |
| Medium | Define actual business response process: sales contact, inquiry routing, product list maintenance and privacy/cookie needs. | Implement configurable fields and review-stage form; enable live routing after testing. |

## 9. Source record and limits

Primary source reviewed: [Monir Group homepage](https://monirgroupbd.com/), [About](https://monirgroupbd.com/about-2/), [Sister Concerns](https://monirgroupbd.com/sister-concerns/), [Products](https://monirgroupbd.com/products/), [Contact](https://monirgroupbd.com/contact/), [Monir Poultry Feed Industries Limited](https://monirgroupbd.com/monir-poultry-feed-industries-limited/), and visible indexed examples [Home 3](https://monirgroupbd.com/home-3/), [Contact II](https://monirgroupbd.com/contact-2/), [old Contact Us](https://monirgroupbd.com/contact-us/), [old About](https://monirgroupbd.com/about-us/). Accessed via public search and page text on 27 September 2026. No authenticated site admin, GA4/Search Console, company documents, or independent business registry was used. Some search snapshots differ in age; verify fresh live HTML and actual URL inventory during implementation. Recommendations and new copy are proposed editorial decisions, not existing company statements.
