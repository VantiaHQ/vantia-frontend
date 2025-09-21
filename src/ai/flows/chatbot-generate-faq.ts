'use server';

/**
 * @fileOverview Flow for generating a set of FAQs for a chatbot based on a given prompt.
 *
 * - generateFaq - A function that generates FAQs.
 * - GenerateFaqInput - The input type for the generateFaq function.
 * - GenerateFaqOutput - The return type for the generateFaq function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFaqInputSchema = z.object({
  prompt: z
    .string()
    .describe(
      'A prompt that asks the LLM to generate the FAQs for the chatbot. Should include information about the company, its products, and its target audience.'
    ),
});
export type GenerateFaqInput = z.infer<typeof GenerateFaqInputSchema>;

const GenerateFaqOutputSchema = z.object({
  faq: z.string().describe('The generated FAQs for the chatbot.'),
});
export type GenerateFaqOutput = z.infer<typeof GenerateFaqOutputSchema>;

export async function generateFaq(input: GenerateFaqInput): Promise<GenerateFaqOutput> {
  return generateFaqFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFaqPrompt',
  input: {schema: GenerateFaqInputSchema},
  output: {schema: GenerateFaqOutputSchema},
  prompt: `You are an expert at generating FAQs for chatbots. Generate a set of FAQs based on the following prompt: {{{prompt}}}`,
});

const generateFaqFlow = ai.defineFlow(
  {
    name: 'generateFaqFlow',
    inputSchema: GenerateFaqInputSchema,
    outputSchema: GenerateFaqOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
