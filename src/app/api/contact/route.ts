import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().min(1).max(160),
  email: z.string().email().max(160),
  budget: z.string().optional(),
  message: z.string().min(5).max(2000),
});

// Extremely basic in-memory limiter (best-effort). In real deploys, use Upstash/Redis.
const ipHits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQS = 5; // per window per IP

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
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }

    const { name, company, email, budget, message } = parsed.data;

    const { error } = await supabase
      .from('contact_submissions')
      .insert([{ name, company, email, budget, message }]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}


