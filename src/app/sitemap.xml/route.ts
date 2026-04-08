import { NextResponse } from 'next/server';

const BASE_URL = 'https://vantia.ai';

export async function GET() {
  const urls: { loc: string; priority?: number; changefreq?: string }[] = [
    { loc: `${BASE_URL}/`, priority: 1.0, changefreq: 'weekly' },
    { loc: `${BASE_URL}/contacto`, priority: 0.8, changefreq: 'weekly' },
  ];

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


