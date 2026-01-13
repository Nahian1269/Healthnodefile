import MealPlannerForm from './meal-planner-form';

export default function MealPlannerPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl mb-2">
          AI Meal Planner
        </h1>
        <p className="text-muted-foreground mb-8">
          Let our AI craft a personalized meal plan for you. Just fill out your details below.
        </p>
        <MealPlannerForm />
      </div>
    </div>
  );
}
