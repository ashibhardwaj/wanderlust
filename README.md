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
- `trip_date: "YYYY-MM"` — orders trips (most recent first), which also sets the stripe order when a country has multiple trips (see the map note below).
- `cover_color` must be clearly distinguishable from every other layer the map draws, so all states read at a glance: the page/map background, the muted unvisited-land fill, the "coming soon" placeholder shade, neighboring countries, and the other trips' colors. Avoid another near-identical warm tan (the current palette drifts that way and blends into the beige land). Low-contrast fills hurt accessibility, and matter doubly when two trips share a country (the map stripes them, which only reads if the colors differ).
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
  content.config.ts             Zod schema for trips
  content/trips/                MDX itineraries
  layouts/Layout.astro          Base HTML + header/footer
  components/TripCard.astro     Trips listing card
  pages/
    index.astro                 Home (world map of trips)
    trips/index.astro           Trips listing
    trips/[...slug].astro       Trip detail page
    about.astro                 About page
    visa.astro                  Visa notes for Indian passport (anchored sections)
  styles/global.css             Design tokens + .prose-trip styles
```

The home page renders an SVG world map at build time using `d3-geo`. Country
fills match the trip's `cover_color`. If two (or more) trips share a country,
it's filled with thin alternating diagonal stripes, one color per trip, each
stripe set linking to its trip; `STRIPE_ANGLE` (45 = diagonal, 0/90 =
horizontal/vertical) and `STRIPE_BANDS` in `index.astro` control the look. Pan
and zoom are handled client-side via `d3-zoom` + `d3-selection`. Single taps
still fire the country link to the trip detail.

The dataset is Natural Earth 110m with India's borders patched to include
Pakistan-administered Kashmir and Aksai Chin (from cB-Abhinav-Gautam's
World-Map-India-Complete), shipped as `src/data/world-india.topo.json`. India
draws per the boundaries claimed by India, which matters for an
Indian-passport audience.

Small countries the 110m dataset doesn't draw (Bahrain, Hong Kong, Macau,
Mauritius, Singapore, Vatican City) render as SVG pins at hand-coded
coordinates; see `pinDefinitions` in `src/pages/index.astro`. Each entry can
group multiple country names under one pin when they're too close to
distinguish at world-map scale (e.g. Hong Kong + Macau).

Countries listed in `src/data/placeholders.ts` (visited but not yet written
up) render in a muted `--color-placeholder` shade, with a "coming soon" hover
hint and no link. When you publish an itinerary that covers a placeholder
country, the trip's `cover_color` takes over automatically; you can leave the
placeholder list as-is or prune it later.

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

## Credits

World map TopoJSON is based on [cB-Abhinav-Gautam/World-Map-India-Complete](https://github.com/cB-Abhinav-Gautam/World-Map-India-Complete),
which extends the public-domain Natural Earth dataset to draw India with its
claimed boundaries (Pakistan-administered Kashmir and Aksai Chin merged into
India).
