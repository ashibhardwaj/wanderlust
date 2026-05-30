import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgCard } from '../../lib/ogCard';

export async function getStaticPaths() {
  const trips = await getCollection('trips', ({ data }) => data.status === 'published');
  return trips.map((t) => ({ params: { slug: t.id }, props: { data: t.data } }));
}

export const GET: APIRoute = async ({ props }) => {
  const d = (props as any).data;
  const excerpt: string = d.excerpt ?? '';
  const png = await renderOgCard({
    eyebrow: `${d.countries.join(' · ')} · ${d.days} DAYS`.toUpperCase(),
    title: d.title,
    body: excerpt.length > 150 ? `${excerpt.slice(0, 147)}…` : excerpt,
    bandColor: d.cover_color,
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
