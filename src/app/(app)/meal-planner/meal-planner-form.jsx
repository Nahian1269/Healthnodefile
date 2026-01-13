'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { getMealPlan } from './actions';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  dietaryRestrictions: z.string().min(2, 'Please enter any restrictions or "none".'),
  preferences: z.string().min(2, 'Please enter your food preferences.'),
  fitnessGoals: z.string().min(2, 'Please enter your fitness goals.'),
});

export default function MealPlannerForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietaryRestrictions: '',
      preferences: '',
      fitnessGoals: '',
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    setResult(null);
    setError(null);
    const response = await getMealPlan(values);
    if (response.success && response.data) {
      setResult(response.data.mealPlan);
    } else {
      setError(response.error || 'An unknown error occurred.');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Restrictions</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., vegetarian, gluten-free, none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I love chicken, broccoli, and quinoa. I dislike fish."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fitnessGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Goals</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., lose 10 lbs, build muscle, run a 5k" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  'Generate Meal Plan'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-headline">Your Personalized Meal Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-card-foreground">
              {result}
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="mt-8 border-destructive">
          <CardHeader>
            <CardTitle className="font-headline text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
