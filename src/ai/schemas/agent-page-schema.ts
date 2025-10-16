import { z } from 'genkit';

export const AgentPageOutputSchema = z.object({
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
