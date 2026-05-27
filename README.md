# wanderlust

Travel itineraries by Ashi. Static site built with Astro, deployed to GitHub Pages.

## Stack

- Astro 6 + Content Collections
- Tailwind CSS 4
- MDX for itinerary content
- Fraunces (display) + Inter (body) + JetBrains Mono (metadata)

## Local dev

```sh
npm install
npm run dev      # localhost:4321/wanderlust
npm run build    # outputs to ./dist
npm run preview  # serve the built output
```

## Adding a new trip

Drop a new MDX file in `src/content/trips/`. Filename becomes the URL slug (`paris.mdx` → `/trips/paris`).

Frontmatter schema is enforced via Zod in `src/content.config.ts`. Required fields:

```yaml
---
title: "Trip name"
days: 12
countries: ["France"]
best_season: "Spring"
vibes: ["culture", "food"]
status: "draft"        # set to "published" when ready
cover_color: "#d88b6b" # hex
excerpt: "Optional one-liner for the home card."
---
```

Optional fields:

- `hero_image`, `budget_band`, `where_i_stayed`
- `trip_date: "YYYY-MM"` — used by the map page to pick the winning color when two trips share a country (most recent wins).
- `visa_refs: ["schengen", ...]` — anchor IDs on `/visa`. Renders a "Visa notes" link at the end of the itinerary, after `where_i_stayed`. Trip body stays passport-agnostic; the Indian-passport visa notes live on `/visa`. Add a new section to `src/pages/visa.astro` with a matching `id` (e.g. `<h2 id="schengen">`) before referencing it here.

SIM and data info lives directly in the MDX body as a `### SIM and data` section alongside `### Book these before anything else` and `### Vegetarian food + drink`. No frontmatter field; just write the section.

Country names should match the world-atlas TopoJSON canonical form so the map page can fill them. Spain, Portugal, France, Italy, Japan work as-is. For common mismatches (UK, Czech Republic, Türkiye), see the alias map in `src/pages/map.astro`.

Body is plain MDX. The styling expects:

- `## Day N, Title` for day headers
- `### Section` for sub-blocks within a day
- `*italics*` for booking-ahead callouts (renders as accent-colored mono)
- `**bold**` for inline labels like *What I did*

## Project layout

```
src/
  content.config.ts          Zod schema for trips
  content/trips/             MDX itineraries
  layouts/Layout.astro       Base HTML + header/footer
  components/TripCard.astro  Home page card
  pages/
    index.astro              Home (lists published trips)
    trips/[...slug].astro    Trip detail page
    about.astro              About page
    map.astro                World map of all trips
    visa.astro               Visa notes for Indian passport (anchored sections)
  styles/global.css          Design tokens + .prose-trip styles
```

The map page renders a static SVG at build time using `d3-geo` + `world-atlas`
TopoJSON. No client JS. Countries appearing in any trip get filled with that
trip's `cover_color`. If two trips share a country, the one with the most
recent `trip_date` wins the fill; both trips show in the SVG `<title>` (browser
hover tooltip), and the country links to the most-recent trip.

## Design tokens

Edit `src/styles/global.css` `@theme` block to change colors or fonts. The accent
color is a single CSS variable. Swap `--color-accent` to change the warm
terracotta to olive (`#7a8a5c`) or anything else.

## Deploy

`.github/workflows/deploy.yml` runs `npm run build` on push to `main` and
deploys `dist/` to GitHub Pages. Enable Pages in repo settings (Source: GitHub
Actions) after the first push.

Site lives at `https://<user>.github.io/wanderlust/`. If you change the repo
name or use a custom domain, update `site` and `base` in `astro.config.mjs`.
