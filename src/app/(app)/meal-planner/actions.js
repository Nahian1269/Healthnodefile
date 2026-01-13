'use server';

import {
  personalizedMealPlans,
} from '../../../ai/flows/personalized-meal-plans';
import { z } from 'zod';

const formSchema = z.object({
  dietaryRestrictions: z.string().min(2),
  preferences: z.string().min(2),
  fitnessGoals: z.string().min(2),
});

export async function getMealPlan(input) {
  const parsed = formSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: 'Invalid input. Please fill out all fields.' };
  }

  try {
    const result = await personalizedMealPlans(parsed.data);
    return { success: true, data: result };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Failed to generate meal plan. Please try again later.' };
  }
}
