import type { APIRoute } from 'astro';
import { renderOgCard } from '../../lib/ogCard';

// Site-wide default share image for non-trip pages (home, visa, tips, about).
export const GET: APIRoute = async () => {
  const png = await renderOgCard({
    eyebrow: 'FREE · REUSABLE · ITINERARIES',
    title: 'wanderlust',
    body: 'Travel itineraries for the Indian passport. 40+ countries: what to book, what to eat, what to skip.',
    bandColor: '#b04e2e',
    wordmark: '@AAASHI.B',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
