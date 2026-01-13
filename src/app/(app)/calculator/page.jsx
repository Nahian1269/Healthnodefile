import CalculatorClient from "./calculator-client";

export default function CalculatorPage() {
    return (
        <div className="p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl mb-2">
                    Health Calculators
                </h1>
                <p className="text-muted-foreground mb-8">
                    Estimate your Body Mass Index (BMI) and Basal Metabolic Rate (BMR).
                </p>
                <CalculatorClient />
            </div>
        </div>
    )
}
