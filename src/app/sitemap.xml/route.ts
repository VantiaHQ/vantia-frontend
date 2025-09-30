import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://vantia.ai';

export async function GET() {
  const urls: { loc: string; priority?: number; changefreq?: string }[] = [
    { loc: `${BASE_URL}/`, priority: 1.0, changefreq: 'weekly' },
    { loc: `${BASE_URL}/generar-agente`, priority: 0.8, changefreq: 'weekly' },
    { loc: `${BASE_URL}/calculadora-ahorro`, priority: 0.6, changefreq: 'monthly' },
  ];

  const { data } = await supabase
    .from('ai_generated_pages')
    .select('slug')
    .order('slug', { ascending: true });

  if (data) {
    for (const row of data) {
      urls.push({ loc: `${BASE_URL}/agente/${row.slug}`, priority: 0.5, changefreq: 'monthly' });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : ''}
    ${u.priority ? `<priority>${u.priority.toFixed(1)}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}


