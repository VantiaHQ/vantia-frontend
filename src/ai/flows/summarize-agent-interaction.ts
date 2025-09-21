'use server';
/**
 * @fileOverview Summarizes agent interactions and tags them for quality assessment.
 *
 * - summarizeAgentInteraction - A function that summarizes an agent interaction.
 * - SummarizeAgentInteractionInput - The input type for the summarizeAgentInteraction function.
 * - SummarizeAgentInteractionOutput - The return type for the summarizeAgentInteraction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAgentInteractionInputSchema = z.object({
  interactionText: z
    .string()
    .describe('The complete text of the agent interaction to summarize.'),
});
export type SummarizeAgentInteractionInput = z.infer<
  typeof SummarizeAgentInteractionInputSchema
>;

const SummarizeAgentInteractionOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the agent interaction.'),
  tags: z
    .array(z.string())
    .describe(
      'Tags representing the quality of the interaction (e.g., Helpful, Polite, Efficient)'
    ),
});
export type SummarizeAgentInteractionOutput = z.infer<
  typeof SummarizeAgentInteractionOutputSchema
>;

export async function summarizeAgentInteraction(
  input: SummarizeAgentInteractionInput
): Promise<SummarizeAgentInteractionOutput> {
  return summarizeAgentInteractionFlow(input);
}

const summarizeAgentInteractionPrompt = ai.definePrompt({
  name: 'summarizeAgentInteractionPrompt',
  input: {schema: SummarizeAgentInteractionInputSchema},
  output: {schema: SummarizeAgentInteractionOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing agent interactions and tagging them for quality.

  Summarize the following interaction text:
  {{interactionText}}

  Provide a concise summary and a list of tags representing the quality of the interaction. Tags should reflect aspects like helpfulness, politeness, efficiency, and problem-solving skills.

  Ensure the summary is no more than 50 words.
  The tags should be selected from the following list: Helpful, Polite, Efficient, Knowledgeable, Empathetic, Proactive, Resolved, Unresolved, Slow, Confused.
  Return the summary and tags in JSON format.
  `,
});

const summarizeAgentInteractionFlow = ai.defineFlow(
  {
    name: 'summarizeAgentInteractionFlow',
    inputSchema: SummarizeAgentInteractionInputSchema,
    outputSchema: SummarizeAgentInteractionOutputSchema,
  },
  async input => {
    const {output} = await summarizeAgentInteractionPrompt(input);
    return output!;
  }
);
