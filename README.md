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

Optional: `hero_image`, `budget_band`, `where_i_stayed`.

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
  styles/global.css          Design tokens + .prose-trip styles
```

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
