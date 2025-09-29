import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import slugify from 'slugify';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AGENT_GENERATION_PROMPT } from '@/lib/prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

async function callGemini(companyDescription: string): Promise<any> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const fullPrompt = `${AGENT_GENERATION_PROMPT}

INPUT: ${companyDescription}`;

  const result = await model.generateContent(fullPrompt);

  const response = await result.response;
  const text = response.text();

  // Attempt to parse the text as JSON. Gemini might sometimes include markdown or extra text.
  try {
    // Remove any markdown code block fences if present
    const jsonString = text.replace(/^```json\n|\n```$/g, '');
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON:", text);
    throw new Error("Gemini did not return a valid JSON format.");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { companyDescription } = await req.json();

    if (!companyDescription) {
      return NextResponse.json({ error: 'Company description is required' }, { status: 400 });
    }

    // Call Gemini
    const geminiResponse = await callGemini(companyDescription);

    // Generate a unique slug
    const baseSlug = slugify(companyDescription, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 0;

    // Check for slug uniqueness in Supabase
    while (true) {
      const { data, error } = await supabase
        .from('ai_generated_pages')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (error && error.code === 'PGRST116') { // No rows found
        break;
      } else if (data) { // Slug already exists
        counter++;
        slug = `${baseSlug}-${counter}`;
      } else if (error) { // Other error
        throw error;
      }
    }

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
