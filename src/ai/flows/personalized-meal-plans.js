'use server';

/**
 * @fileOverview AI-driven tool to suggest personalized meal plans based on user preferences, dietary restrictions, and fitness goals.
 *
 * - personalizedMealPlans - A function that handles the personalized meal plans process.
 * - PersonalizedMealPlansInput - The input type for the personalizedMealPlans function.
 * - PersonalizedMealPlansOutput - The return type for the personalizedMealPlans function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const PersonalizedMealPlansInputSchema = z.object({
  dietaryRestrictions: z
    .string()
    .describe('Any dietary restrictions the user has, such as allergies or intolerances.'),
  preferences: z
    .string()
    .describe('The user’s food preferences, such as favorite foods or types of cuisine.'),
  fitnessGoals: z
    .string()
    .describe('The user’s fitness goals, such as weight loss, muscle gain, or general health.'),
});

const PersonalizedMealPlansOutputSchema = z.object({
  mealPlan: z.string().describe('A personalized meal plan based on the user’s input.'),
});

export async function personalizedMealPlans(
  input
) {
  return personalizedMealPlansFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMealPlansPrompt',
  input: {schema: PersonalizedMealPlansInputSchema},
  output: {schema: PersonalizedMealPlansOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized meal plans based on user input.

  Dietary Restrictions: {{{dietaryRestrictions}}}
  Preferences: {{{preferences}}}
  Fitness Goals: {{{fitnessGoals}}}

  Based on the above information, create a meal plan that is tailored to the user's specific needs and goals.
  The meal plan should be detailed and include specific meals for breakfast, lunch, dinner, and snacks.
  Consider the user's dietary restrictions, preferences, and fitness goals when creating the meal plan.
  Make sure to write out the final plan as a text that will be returned to the user.`,
});

const personalizedMealPlansFlow = ai.defineFlow(
  {
    name: 'personalizedMealPlansFlow',
    inputSchema: PersonalizedMealPlansInputSchema,
    outputSchema: PersonalizedMealPlansOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);
