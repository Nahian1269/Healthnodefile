'use server';

/**
 * @fileOverview Provides initial health and wellness advice and support from the AI chatbot based on a prompt.
 *
 * - aiChatbotInitialPrompt - A function that returns initial advice from the AI chatbot.
 * - AIChatbotInitialPromptInput - The input type for the aiChatbotInitialPrompt function.
 * - AIChatbotInitialPromptOutput - The return type for the aiChatbotInitialPrompt function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const AIChatbotInitialPromptInputSchema = z.object({
  prompt: z.string().describe('The prompt to use for the AI chatbot.'),
});

const AIChatbotInitialPromptOutputSchema = z.object({
  advice: z.string().describe('The advice from the AI chatbot.'),
});

export async function aiChatbotInitialPrompt(input) {
  return aiChatbotInitialPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotInitialPromptPrompt',
  input: {schema: AIChatbotInitialPromptInputSchema},
  output: {schema: AIChatbotInitialPromptOutputSchema},
  prompt: `You are a helpful AI chatbot that provides health and wellness advice and support to users based on their prompt.\n\nPrompt: {{{prompt}}}`,
});

const aiChatbotInitialPromptFlow = ai.defineFlow(
  {
    name: 'aiChatbotInitialPromptFlow',
    inputSchema: AIChatbotInitialPromptInputSchema,
    outputSchema: AIChatbotInitialPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);
