import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import slugify from 'slugify';
import { z } from 'zod';
import { generateAgentPageFlow } from '@/ai/flows/generate-agent-page';
import { env } from '@/lib/env.server';
import { getClientIp, isRateLimited } from '@/lib/rateLimitIp';

const BodySchema = z.object({ companyDescription: z.string().min(5).max(2000) });

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip, 60_000, 5)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    if (!env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });
    }

    const body = await req.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const { companyDescription } = parsed.data;

    const geminiResponse = await generateAgentPageFlow({ companyDescription });
    const name = geminiResponse.hero.title;
    const modules = {
      core: geminiResponse.modulesUsed.core,
      extra: geminiResponse.modulesUsed.extra || [],
    };

    const baseSlug = slugify(companyDescription, { lower: true, strict: true });

    let slug: string = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
    let attempts = 0;
    const maxAttempts = 5;
    while (attempts < maxAttempts) {
      const { error: insertError } = await supabase
        .from('ai_generated_pages')
        .insert([{ slug, content: geminiResponse }]);

      if (!insertError) {
        return NextResponse.json({ slug, name, modules }, { status: 200 });
      }

      const code = (insertError as { code?: string })?.code || '';
      const msg = (insertError as { message?: string })?.message || '';
      const isUniqueViolation = code === '23505' || /duplicate key/i.test(msg) || /already exists/i.test(msg);
      if (!isUniqueViolation) {
        throw insertError;
      }

      attempts += 1;
      slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } catch (error: unknown) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
