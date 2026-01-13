'use server';

import {
  aiChatbotInitialPrompt,
} from '../../../ai/flows/ai-chatbot-initial-prompt';
import { z } from 'zod';

const formSchema = z.object({
  prompt: z.string().min(1),
});

export async function getChatbotResponse(input) {
  const parsed = formSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: 'Invalid input. Please enter a message.' };
  }

  try {
    const result = await aiChatbotInitialPrompt(parsed.data);
    return { success: true, data: result };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Failed to get response from AI. Please try again later.' };
  }
}
