import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import slugify from 'slugify';
import { z } from 'zod';
import { generateAgentPageFlow } from '@/ai/flows/generate-agent-page';

const BodySchema = z.object({ companyDescription: z.string().min(5) });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const { companyDescription } = parsed.data;

    // Call structured Genkit flow
    const geminiResponse = await generateAgentPageFlow({ companyDescription });

    // Generate a unique slug
    const shortId = Math.random().toString(36).slice(2, 6);
    const baseSlug = slugify(companyDescription, { lower: true, strict: true });
    const slug = `${baseSlug}-${shortId}`;

    // Store the generated JSON in Supabase
    const { error: insertError } = await supabase
      .from('ai_generated_pages')
      .insert([{ slug, content: geminiResponse }]);

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ slug }, { status: 200 });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
