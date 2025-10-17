'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { AGENT_GENERATION_PROMPT } from '@/lib/prompts';

const AgentPageOutputSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    cta: z.array(z.string()),
  }),
  whatIsIt: z.object({
    title: z.string(),
    text: z.string(),
  }),
  benefits: z.object({
    title: z.string(),
    items: z.array(z.string()),
  }),
  howItWorks: z.object({
    title: z.string(),
    steps: z.array(z.string()),
  }),
  faq: z.object({
    title: z.string(),
    items: z.array(z.object({ q: z.string(), a: z.string() })),
  }),
  testimonials: z.object({
    title: z.string(),
    items: z.array(z.object({ text: z.string(), author: z.string() })),
  }),
  finalCTA: z.object({
    text: z.string(),
    buttons: z.array(z.string()).optional(),
    title: z.string().optional(),
  }),
  painPoints: z.array(z.string()),
  possibleAutomations: z.array(z.string()),
  modulesUsed: z.object({
    core: z.array(z.string()),
    extra: z.array(z.string()).optional(),
  }),
});

export type AgentPageOutput = z.infer<typeof AgentPageOutputSchema>;

const GenerateAgentInputSchema = z.object({
  companyDescription: z
    .string()
    .describe('Brief description of the company and automation goals.'),
});

export type GenerateAgentInput = z.infer<typeof GenerateAgentInputSchema>;

const generateAgentPrompt = ai.definePrompt({
  name: 'generateAgentPrompt',
  input: { schema: GenerateAgentInputSchema },
  output: { schema: AgentPageOutputSchema },
  // Provide strong, explicit instructions and include our authoring prompt
  prompt: `${AGENT_GENERATION_PROMPT}

INPUT: {{companyDescription}}
AGENT_ROLE: {{agentType}}

Rules:
- Output strictly valid JSON matching the required schema.
- Do not include markdown fences or any prose.
- Write all texts in Spanish, tailored to a CEO persona.
- Keep list items concise and of similar length for visual consistency.`,
});

export const generateAgentPageFlow = ai.defineFlow(
  {
    name: 'generateAgentPageFlow',
    inputSchema: GenerateAgentInputSchema,
    outputSchema: AgentPageOutputSchema,
  },
  async (input) => {
    const { output } = await generateAgentPrompt({ companyDescription: input.companyDescription });
    return output!;
  }
);


