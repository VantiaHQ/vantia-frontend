import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { notifyN8nStrict } from '@/lib/n8nWebhook';
import { getClientIp, isRateLimited } from '@/lib/rateLimitIp';

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().min(1).max(160),
  email: z.string().email().max(160),
  budget: z.string().max(80).optional(),
  product: z.string().max(80).optional(),
  message: z.string().min(5).max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip, 60_000, 5)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { name, company, email, budget, product, message } = parsed.data;

    await notifyN8nStrict({
      source: 'contact_form',
      name,
      company,
      email,
      budget: budget ?? null,
      product: product ?? null,
      message,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
