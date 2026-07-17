# Starter Setup Checklist

## Business

- [ ] Replace business name, tagline, and business type.
- [ ] Add an owner only when owner identity is approved.
- [ ] Set the primary location.
- [ ] Set phone and approved contact fields.
- [ ] Set the final production domain in `business.website`.
- [ ] Set the date-formatting locale.

## Proof Language And Routes

- [ ] Choose singular and plural proof terms: project/projects, job/jobs, work/work, property/properties, or another fit.
- [ ] Choose `Article` or `CreativeWork` proof schema.
- [ ] Set the homepage featured proof limit.
- [ ] Set every proof to `feed-only` or `detail-page`.
- [ ] Keep the public `/work/` default or choose another customer-facing route.
- [ ] Keep `/services/` or change `business.routes.services`.
- [ ] Keep `/locations/` or change `business.routes.locations`.
- [ ] Avoid changing live routes after launch without redirects.

## Services And Coverage

- [ ] Replace all demo services.
- [ ] Give every service a unique slug.
- [ ] Configure service areas with name, slug, and optional region.
- [ ] Confirm location pages are generated only for areas with matching proof.
- [ ] Make sure every proof references a valid service slug.

## Copy And Contact

- [ ] Replace the homepage, archive, proof, coverage, and contact headings under `business.copy`.
- [ ] Configure contact actions for phone, email, booking, inquiry, or external profiles.
- [ ] Mark one contact action as primary.
- [ ] Configure the single header message action.
- [ ] Set the hero specialties and trust text.
- [ ] Add ratings or availability only when explicitly approved.
- [ ] Keep schema phone and email fields synchronized with visible contact actions when applicable.

## Brand And Media

- [ ] Add a logo only when the exact logo is approved identity evidence.
- [ ] Otherwise add an approved source-account profile image when available.
- [ ] Leave both unset to use text initials; never create or infer a logo.
- [ ] Replace the portrait-safe hero image, service images, and proof media.
- [ ] Update primary, secondary, accent, and background colors.
- [ ] Write useful alt text for every proof image.
- [ ] Choose `portrait`, `landscape`, `gallery`, or `before-after` presentation.
- [ ] Assign explicit `before` and `after` roles when using comparisons.
- [ ] Prepare every video with `npm run media:video -- input output-base`.
- [ ] Confirm every video is WebM and has a poster image.

## Schema

- [ ] Choose schema types in `business.schema.types`.
- [ ] Use `Person` for an individual professional profile.
- [ ] Use `LocalBusiness` for a location-based service business.
- [ ] Use `ProfessionalService` for consulting and professional services.
- [ ] Combining `Person` with one business type is supported.
- [ ] Confirm the proof schema type matches the content.

## Content

- [ ] Remove all demo proof entries.
- [ ] Add a clear title, summary, body, date, approved service, and media for each proof.
- [ ] Add a location only when the specific job location is approved.
- [ ] Add evidence-backed proof tags and an optional supported trust signal.
- [ ] Mark the strongest recent entries as featured.
- [ ] Keep copy specific to the work. Avoid testimonials, company history, and generic marketing sections.
- [ ] Rewrite imported captions into business-owned project details.
- [ ] Confirm public copy never mentions Instagram, Facebook, Nextdoor, original captions, or imports.
- [ ] Populate `approvedClaims` from the approved evidence boundary.
- [ ] Confirm services and locations match the approved claim lists.
- [ ] Confirm protected claims are absent unless explicitly approved.

## Launch

- [ ] Run `npm install`.
- [ ] Run `npm run build`.
- [ ] Confirm the production domain is correct in canonical URLs.
- [ ] Confirm `/sitemap.xml` and `/robots.txt` are deployed.
- [ ] Test the phone and email links once.
- [ ] Deploy the generated `dist/` directory.
