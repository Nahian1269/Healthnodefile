import ExerciseList from "./exercise-list";

export default function ExercisesPage() {
    return (
        <div className="p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                 <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl mb-2">
                    Freehand Exercise Library
                </h1>
                <p className="text-muted-foreground mb-8">
                    Browse and search for exercises you can do anywhere, anytime.
                </p>
                <ExerciseList />
            </div>
        </div>
    );
}
