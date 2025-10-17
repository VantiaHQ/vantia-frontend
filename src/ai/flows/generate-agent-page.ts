'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { AGENT_GENERATION_PROMPT } from '@/ai/prompts/agent-page-prompts';

// NOTE: This schema is duplicated in src/ai/schemas/agent-page-schema.ts
// It should be consolidated in a future refactor.
const AgentPageOutputSchema = z.object({
  hero: z.object({ title: z.string(), subtitle: z.string(), cta: z.array(z.string()) }),
  whatIsIt: z.object({ title: z.string(), text: z.string() }),
  benefits: z.object({ title: z.string(), items: z.array(z.string()) }),
  howItWorks: z.object({ title: z.string(), steps: z.array(z.string()) }),
  faq: z.object({ title: z.string(), items: z.array(z.object({ q: z.string(), a: z.string() })) }),
  testimonials: z.object({ title: z.string(), items: z.array(z.object({ text: z.string(), author: z.string() })) }),
  finalCTA: z.object({ text: z.string(), buttons: z.array(z.string()).optional(), title: z.string().optional() }),
  painPoints: z.array(z.string()),
  possibleAutomations: z.array(z.string()),
  modulesUsed: z.object({ core: z.array(z.string()), extra: z.array(z.string()).optional() }),
});

export type AgentPageOutput = z.infer<typeof AgentPageOutputSchema>;

const GenerateAgentFlowInputSchema = z.object({
  companyDescription: z.string().describe('Brief description of the company and automation goals.'),
  agentType: z.string().describe('The specific agent role selected by the user.'),
});

const GenerateAgentPromptInputSchema = GenerateAgentFlowInputSchema; // Prompt uses the same schema as the flow

export type GenerateAgentInput = z.infer<typeof GenerateAgentFlowInputSchema>;

const generateAgentPrompt = ai.definePrompt({
  name: 'generateAgentPrompt',
  input: { schema: GenerateAgentPromptInputSchema },
  output: { schema: AgentPageOutputSchema },
  prompt: `${AGENT_GENERATION_PROMPT}`,
});

export const generateAgentPageFlow = ai.defineFlow(
  {
    name: 'generateAgentPageFlow',
    inputSchema: GenerateAgentFlowInputSchema,
    outputSchema: AgentPageOutputSchema,
  },
  async (input) => {
    const { output } = await generateAgentPrompt({
      companyDescription: input.companyDescription,
      agentType: input.agentType,
    });
    return output!;
  }
);