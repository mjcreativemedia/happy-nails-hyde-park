# Profile-First Service Business Starter Kit

## What Is This?

This is a reusable Astro starter for owner-operated service businesses that earn trust by showing real work.

It produces a fast static proof site with:

- A portrait-safe proof-first homepage
- A media-first proof feed
- Selective proof detail pages
- A service archive
- Individual service pages
- Evidence-backed location pages
- Persistent Call and Text actions when configured
- Explicit approved-claim validation
- SEO metadata and social sharing tags
- Configurable structured data
- A sitemap and robots file

The homepage intentionally stays focused:

1. Proof hero
2. Strongest proof
3. Services
4. Coverage
5. Call or text

The starter does not include testimonials, company history, a large About section, or generic marketing sections. Its core position is: show the work.

## Who Is It For?

Use this starter for an owner-operated business where completed work is the primary evidence of credibility.

Good fits include:

- Contractors and home service professionals
- Software developers and consultants
- Photographers and videographers
- Designers and creative studios
- Trainers and coaches with documented transformations
- Real estate, property, and renovation professionals

It is not currently designed for ecommerce, multi-location chains, large teams, customer accounts, appointment scheduling, or businesses that need a CMS-admin interface.

## Create A New Site

```sh
cp -R "Profile-First Framework" "New Business Site"
cd "New Business Site"
rm -rf .git node_modules dist .astro
npm install
npm run dev
```

Then:

1. Update `src/config/business.ts`.
2. Replace the demo entries in `src/data/proofs.ts`.
3. Supply optimized media and `src/data/media-manifest.json` from the Own Your
   Proof media pipeline. Raw JPEG, PNG, and MP4 files cannot ship.
4. Run `npm run build`.
5. Deploy the generated `dist/` directory.

Do not clone an existing customer implementation. Copy this starter so customer-specific routes, copy, media, and schema do not leak into the new site.

## Files You Customize

### `src/config/business.ts`

This is the main site configuration. It controls:

- Business identity and optional owner identity
- Tagline and business type
- Location, phone, email, and domain
- Locale used for dates
- Optional approved logo, optional approved profile photo, and portrait-safe hero image
- Brand colors
- Proof terminology and proof schema type
- Featured proof count
- Proof and service route names
- Location route name and structured service areas
- Person, LocalBusiness, and ProfessionalService schema
- Contact buttons and external inquiry links
- Header message action
- Hero specialties and trust text
- Optional approved rating and availability fields
- Approved claim categories, services, and locations
- Homepage and archive headings
- Services and service areas

### `src/data/proofs.ts`

This is the proof collection. Replace the demo entries with real work.

### Media

The starter consumes production AVIF/WebP image variants, WebM videos, and WebP
posters. `npm run build` runs `validate:media` and fails when derivatives are
missing, a file exceeds 400 KiB, or raw JPEG/PNG/MP4 assets are present.

### Identity Media

Identity follows an evidence hierarchy:

1. Approved business logo
2. Approved profile image, such as the business's source-account profile photo
3. Text initials derived from the approved business name

The starter never generates a logo or substitutes invented branding. Leave
`business.logo` and `business.profilePhoto` unset when image identity has not
been approved. Headers then render text initials, and schema omits logo and image
fields that are not supported.

Service images are rendered inside fixed crop frames. The frame owns dimensions,
overflow, and `object-fit`, so portrait source media cannot stretch service rows.

### `SETUP.md`

Use the checklist before launch.

Framework files under `src/pages/`, `src/components/`, `src/layouts/`, and `src/lib/` should not normally need changes for a new business.

## How Proofs Work

A proof is one documented example of completed work. Depending on the business, it can be called a job, project, gallery, transformation, property, case study, or another configured term.

```ts
{
  title: "Workspace Refresh",
  slug: "workspace-refresh",
  summary: "Short archive and metadata description.",
  body: "What was needed, what was done, and what changed.",
  date: "2026-05-18",
  service: "implementation",
  location: "Your City",
  media: [
    {
      type: "image",
      src: "/images/proof/workspace-refresh.jpg",
      alt: "Useful description of the completed work",
      role: "after"
    }
  ],
  featured: true,
  tags: ["Implementation", "Workspace"],
  trustSignal: "Completed workspace transformation",
  presentation: "landscape",
  routePolicy: "detail-page"
}
```

Every proof automatically creates:

- A media-first card for the homepage or proof feed
- An archive entry
- Related service content
- A related location page when its location matches a configured service area

Only proofs with `routePolicy: "detail-page"` create:

- An individual detail page
- Detail metadata and social sharing tags
- Article or CreativeWork schema with a canonical URL
- A sitemap entry

Use `routePolicy: "feed-only"` when the proof strengthens the visual feed but does not deserve its own search or customer destination.

Presentation options are:

- `portrait`: vertical evidence
- `landscape`: horizontal evidence
- `gallery`: portrait-first swipe gallery
- `before-after`: explicit side-by-side comparison

Before/after proof must assign `role: "before"` and `role: "after"` to the correct media. The build fails instead of inferring image order.

Proof cards show media, outcome-led titles, evidence-backed tags, optional location, and an optional trust signal. They do not show dates, excerpts, or “Read More” by default.

The `service` value must match a service slug in `business.services`. Proof slugs must be unique. Dates use `YYYY-MM-DD`.

Public proof copy must read as business-owned content. Build validation rejects references to Instagram, Facebook, Nextdoor, original captions, and imported-source language. Source captions are input material, not website copy. Rewrite them into a clear summary and project details.

Set `featured: true` to make an entry eligible for the homepage. `business.proof.featuredLimit` controls how many appear.

## Approved Claims

`business.approvedClaims` is the publication boundary for protected claims:

```ts
approvedClaims: {
  ownerIdentity: false,
  email: false,
  rating: false,
  availability: false,
  yearsInBusiness: false,
  guarantees: false,
  certifications: false,
  licensing: false,
  insurance: false,
  pricing: false,
  services: ["interior-detailing"],
  locations: ["Kansas City"]
}
```

The build rejects protected fields or copy unless the matching category is approved. It also rejects configured services, service areas, and proof locations outside the approved lists.

## How Services Work

Services are configured in `business.services`.

```ts
{
  slug: "portrait-photography",
  title: "Portrait Photography",
  description: "Individual and team portraits on location.",
  image: "/images/services/portraits.jpg"
}
```

Each service automatically creates:

- A service archive card
- An individual service page
- A list of proofs whose `service` value matches its slug
- Service schema
- A sitemap entry

Services are currently a flat list. Categories, nested services, pricing, and service-specific calls to action would require framework changes.

## Routes

Default routes:

```text
/
/work/
/work/[slug]/
/services/
/services/[slug]/
/locations/
/locations/[slug]/
```

The internal data model is still called `proof`, but the public default is `/work/`. Change `business.routes.proof`, `business.routes.services`, or `business.routes.locations` when another customer-facing term is more natural. Page files do not need to be renamed.

Changing routes after a site is live requires redirects at the hosting layer. The starter does not generate redirect rules.

## Location Pages

Service areas use structured configuration:

```ts
serviceAreas: [
  { name: "Matteson", slug: "matteson-il", region: "Illinois" },
  { name: "Tinley Park", slug: "tinley-park-il", region: "Illinois" }
]
```

A location page is generated only when at least one proof has an exact matching `location` value. For example, `location: "Matteson"` creates `/locations/matteson-il/` when Matteson is configured.

Location pages contain:

- A factual count of documented work
- The matching proof cards
- Location metadata and schema
- A contact action

Configured areas without matching proof remain visible as coverage labels but do not become links, routes, or sitemap entries. Do not create location pages for places where the business has no documented work.

## Video Pipeline

Website video entries must use compressed WebM and include a poster image. Prepare a source video with:

```sh
npm run media:video -- source.mp4 public/videos/project-name
```

This requires `ffmpeg` and creates:

```text
public/videos/project-name.webm
public/videos/project-name-poster.jpg
```

Add both files to the proof:

```ts
{
  type: "video",
  src: "/videos/project-name.webm",
  poster: "/videos/project-name-poster.jpg",
  alt: "Crew removing a damaged tree section"
}
```

Playback behavior is intentional:

- Homepage: only the first featured card's first video may autoplay muted and looped.
- Archive, service, related-work, and location cards: poster-first with tap-to-play controls.
- Detail pages: muted looping videos play while substantially visible and pause after leaving the viewport.
- Reduced-motion preferences disable viewport autoplay.

The starter validates prepared assets but does not bulk-import social exports. Extraction, caption rewriting, image compression, and selecting useful media remain an ingestion task performed before or while populating the site.

## Contact Actions

Contact buttons are configured independently from schema contact data:

```ts
contact: {
  headerActionLabel: "Text",
  headerActionHref: "sms:+15550102020",
  actions: [
    { label: "Call", href: "tel:+15550102020", primary: true },
    { label: "Text", href: "sms:+15550102020" }
  ]
}
```

The hero uses a portrait-safe media panel. Configure its three short specialty labels and trust line under `business.hero`. Ratings and availability are optional and require explicit approval.

This supports phone, email, booking, inquiry forms, Instagram, or another external destination. Keep `phone` and `email` updated separately when they should appear in structured data.

When both `tel:` and `sms:` actions exist, the framework adds a persistent Call/Text bar. It is fixed at the bottom on mobile and floats without covering content on larger screens.

## Schema

Business schema options are:

- `Person`
- `LocalBusiness`
- `ProfessionalService`

Proof schema options are:

- `Article`
- `CreativeWork`

Typical combinations:

```ts
// Contractor
types: ["Person", "LocalBusiness"]

// Developer or consultant
types: ["Person", "ProfessionalService"]

// Photographer
types: ["Person", "ProfessionalService"]
```

This is intentionally a small supported set. Industry-specific schema such as `Plumber`, `Photograph`, `RealEstateAgent`, offers, opening hours, or postal addresses requires extending `src/lib/schema.ts`.

## Deployment

The project builds to static files:

```sh
npm run build
```

Upload `dist/` to any static host, including Cloudflare Pages, Netlify, Vercel, GitHub Pages, or conventional object storage/CDN hosting.

Typical build settings:

```text
Build command: npm run build
Output directory: dist
Node version: current LTS
```

Before deploying, set `business.website` to the final public origin, including `https://`. That value controls canonical URLs, sitemap URLs, social images, and schema identifiers.

The starter assumes deployment at the root of a domain. Deploying under a subdirectory requires additional Astro base-path configuration and URL testing.

No server runtime is required. Contact forms, uploads, authentication, search, and CMS editing require external services or additional implementation.

## Remaining Framework Assumptions

These are deliberate current boundaries:

- Optional owner/profile
- One business identity and one website domain
- One locale for date formatting
- Static generation at build time
- Content stored in TypeScript files
- Every proof has one date and one approved service; location may be omitted
- Every proof declares presentation and route policy
- Services use a flat list
- Video is supplied as prepared WebM plus a poster frame
- Proof pages use either Article or CreativeWork schema
- Location pages require exact proof-to-area matches
- No pagination, search, complex filtering, drafts, CMS, forms, redirects, or automatic social-import pipeline
- The layout and homepage section order are shared by every site

Those assumptions are framework decisions. Business names, terminology, copy, contact methods, colors, media, routes, schema selection, services, service areas, and proof entries are configuration.

## Conversion Audit

### Daniel To Mitchell

Nothing in the framework should break. The required changes are configuration and content:

- Change identity, domain, contact details, colors, and media.
- Change `Job/Jobs` to `Project/Projects`.
- Keep `/work/` or change it to another customer-facing term.
- Replace local service areas with remote or broader coverage.
- Replace LocalBusiness schema with ProfessionalService.
- Replace plumbing services and every proof entry.
- Replace phone-first copy and actions with the desired software inquiry flow.

Existing live Daniel URLs would need redirects if converted in place. A new Mitchell site copied from the starter does not inherit that problem.

### Mitchell To Photographer

The page system still works, but these choices must be configured:

- Change proof terminology to `Gallery/Galleries`, `Session/Sessions`, or `Work`.
- Use `CreativeWork` proof schema.
- Replace the contact action with an inquiry or booking link if phone is not primary.
- Replace services with portraits, weddings, events, commercial work, or the relevant categories.
- Replace proof media with photography and write accurate alt text.
- Decide whether proof `location` means venue, city, studio, or remote delivery.
- Update all generic work and service headings where the photographer's voice differs.

The current gallery is a simple responsive grid. Masonry layouts, image lightboxes, client galleries, downloads, protected albums, EXIF data, and advanced image optimization are outside the starter and would require framework work.

## Configuration Versus Framework Code

Keep these in configuration:

- Identity and contact information
- Domain and locale
- Proof terminology, route, schema type, and featured count
- Service route
- Location route and structured service areas
- Contact actions
- Display copy and calls to action
- Services and coverage
- Brand colors and media paths
- Business schema selection

Keep these in framework code:

- Static route generation
- Proof/service relationship logic
- SEO and schema serialization
- Sitemap generation
- Shared page structure
- Responsive card, gallery, and section layouts
- Content validation

Move something into framework code only when it changes behavior or structure across sites. Move it into configuration when it changes the identity, vocabulary, content, or presentation of one business.
