import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const trips = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/trips' }),
  schema: z.object({
    title: z.string(),
    days: z.number().int().positive(),
    countries: z.array(z.string()).min(1),
    best_season: z.string(),
    vibes: z.array(z.string()).default([]),
    status: z.enum(['draft', 'published']).default('draft'),
    excerpt: z.string().optional(),
    cover_color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    hero_image: z.string().optional(),
    where_i_stayed: z
      .array(z.object({ city: z.string(), name: z.string(), notes: z.string().optional() }))
      .default([]),
    budget_band: z.string().optional(),
  }),
});

export const collections = { trips };
