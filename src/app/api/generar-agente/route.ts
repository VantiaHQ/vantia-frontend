import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import slugify from 'slugify';
import { z } from 'zod';
import { generateAgentPageFlow } from '@/ai/flows/generate-agent-page';

const BodySchema = z.object({
  companyDescription: z.string().min(5),
  agentType: z.string().min(3),
});

// Simple in-memory IP rate limiting
const ipHits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = ipHits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    ipHits.set(ip, { count: 1, ts: now });
    return false;
  }
  if (rec.count >= MAX_REQS) return true;
  rec.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const { companyDescription, agentType } = parsed.data;

    const geminiResponse = await generateAgentPageFlow({ companyDescription, agentType });
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

      const code = (insertError as any)?.code || '';
      const msg = (insertError as any)?.message || '';
      const isUniqueViolation = code === '23505' || /duplicate key/i.test(msg) || /already exists/i.test(msg);
      if (!isUniqueViolation) {
        throw insertError;
      }

      attempts += 1;
      slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
    }

    return NextResponse.json({ error: 'Failed to generate a unique slug' }, { status: 500 });
  } catch (error: any) {
    console.error("[API /generar-agente] Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}