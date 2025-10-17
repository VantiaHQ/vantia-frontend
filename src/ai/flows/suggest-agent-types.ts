'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { AGENT_SUGGESTION_PROMPT } from '@/ai/prompts/agent-page-prompts';
import agentsDatabase from '@/lib/agentes-database.json';

const AgentSuggestionInputSchema = z.object({
  companyDescription: z
    .string()
    .describe('Brief description of the company and automation goals.'),
});

const AgentSuggestionOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('List of 3 to 5 suggested agent roles.'),
});

const suggestAgentTypesPrompt = ai.definePrompt({
  name: 'suggestAgentTypesPrompt',
  input: { schema: AgentSuggestionInputSchema },
  output: { schema: AgentSuggestionOutputSchema },
  prompt: `${AGENT_SUGGESTION_PROMPT}`,
});

export const suggestAgentTypesFlow = ai.defineFlow(
  {
    name: 'suggestAgentTypesFlow',
    inputSchema: AgentSuggestionInputSchema,
    outputSchema: AgentSuggestionOutputSchema,
  },
  async (input) => {
    const agentList = JSON.stringify(agentsDatabase, null, 2);
    const { output } = await suggestAgentTypesPrompt({ 
      companyDescription: input.companyDescription,
      agentList: agentList 
    });
    return output!;
  }
);