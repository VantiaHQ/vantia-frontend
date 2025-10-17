import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { suggestAgentTypesFlow } from '@/ai/flows/suggest-agent-types';

const BodySchema = z.object({
  companyDescription: z.string().min(5),
});

// Simple in-memory IP rate limiting
const ipHits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 minute window
const MAX_REQS = 10; // Increased limit for this less expensive endpoint

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
    const { companyDescription } = parsed.data;

    const suggestionsResponse = await suggestAgentTypesFlow({ companyDescription });
    return NextResponse.json(suggestionsResponse, { status: 200 });

  } catch (error: any) {
    console.error("[API /sugerir-agentes] Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
