'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';

export default function CalculatorClient() {
  const [units, setUnits] = useState('metric');
  
  // State for BMI
  const [weightBmi, setWeightBmi] = useState('');
  const [heightBmi, setHeightBmi] = useState('');
  const [heightInches, setHeightInches] = useState('');

  // State for BMR
  const [weightBmr, setWeightBmr] = useState('');
  const [heightBmr, setHeightBmr] = useState('');
  const [heightInchesBmr, setHeightInchesBmr] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');

  const bmi = useMemo(() => {
    const w = parseFloat(weightBmi);
    const h = parseFloat(heightBmi);
    const hIn = parseFloat(heightInches);

    if (units === 'metric' && w > 0 && h > 0) {
      return (w / Math.pow(h / 100, 2)).toFixed(1);
    }
    if (units === 'imperial' && w > 0 && h > 0) {
      const totalHeightInches = h * 12 + (hIn || 0);
      if (totalHeightInches > 0) {
        return ((w / Math.pow(totalHeightInches, 2)) * 703).toFixed(1);
      }
    }
    return '0.0';
  }, [weightBmi, heightBmi, heightInches, units]);
  
  const bmr = useMemo(() => {
    const w = parseFloat(weightBmr);
    const h = parseFloat(heightBmr);
    const hIn = parseFloat(heightInchesBmr);
    const a = parseInt(age);

    if (w > 0 && a > 0) {
      let weightInKg;
      let heightInCm;

      if (units === 'metric' && h > 0) {
        weightInKg = w;
        heightInCm = h;
      } else if (units === 'imperial' && h > 0) {
        weightInKg = w * 0.453592;
        const totalHeightInches = h * 12 + (hIn || 0);
        if (totalHeightInches <= 0) return '0';
        heightInCm = totalHeightInches * 2.54;
      } else {
        return '0';
      }

      if (gender === 'male') {
        return (10 * weightInKg + 6.25 * heightInCm - 5 * a + 5).toFixed(0);
      } else {
        return (10 * weightInKg + 6.25 * heightInCm - 5 * a - 161).toFixed(0);
      }
    }
    return '0';
  }, [weightBmr, heightBmr, heightInchesBmr, age, gender, units]);

  const getBmiCategory = (bmiValue) => {
    if (bmiValue < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmiValue < 25) return { category: 'Healthy Weight', color: 'text-green-500' };
    if (bmiValue < 30) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obese', color: 'text-red-500' };
  };

  const bmiInfo = getBmiCategory(parseFloat(bmi));

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <Label>Units</Label>
          <RadioGroup defaultValue="metric" onValueChange={(v) => setUnits(v)} className="mt-2 flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="metric" id="metric" />
              <Label htmlFor="metric">Metric (kg, cm)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="imperial" id="imperial" />
              <Label htmlFor="imperial">Imperial (lbs, ft, in)</Label>
            </div>
          </RadioGroup>
        </div>

        <Tabs defaultValue="bmi">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bmi">BMI Calculator</TabsTrigger>
            <TabsTrigger value="bmr">BMR Calculator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bmi" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="weight-bmi">Weight ({units === 'metric' ? 'kg' : 'lbs'})</Label>
                  <Input id="weight-bmi" type="number" value={weightBmi} onChange={(e) => setWeightBmi(e.target.value)} />
                </div>
                {units === 'metric' ? (
                  <div>
                    <Label htmlFor="height-bmi">Height (cm)</Label>
                    <Input id="height-bmi" type="number" value={heightBmi} onChange={(e) => setHeightBmi(e.target.value)} />
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div>
                      <Label htmlFor="height-ft-bmi">Height (ft)</Label>
                      <Input id="height-ft-bmi" type="number" value={heightBmi} onChange={(e) => setHeightBmi(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="height-in-bmi"> (in)</Label>
                      <Input id="height-in-bmi" type="number" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
              <Card className="flex flex-col items-center justify-center bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-center text-muted-foreground font-normal">Your BMI</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-5xl font-bold text-primary">{bmi}</p>
                  <p className={`mt-2 font-semibold ${bmiInfo.color}`}>{bmiInfo.category}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bmr" className="mt-6">
             <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="weight-bmr">Weight ({units === 'metric' ? 'kg' : 'lbs'})</Label>
                  <Input id="weight-bmr" type="number" value={weightBmr} onChange={(e) => setWeightBmr(e.target.value)} />
                </div>
                 {units === 'metric' ? (
                  <div>
                    <Label htmlFor="height-bmr">Height (cm)</Label>
                    <Input id="height-bmr" type="number" value={heightBmr} onChange={(e) => setHeightBmr(e.target.value)} />
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div>
                      <Label htmlFor="height-ft-bmr">Height (ft)</Label>
                      <Input id="height-ft-bmr" type="number" value={heightBmr} onChange={(e) => setHeightBmr(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="height-in-bmr"> (in)</Label>
                      <Input id="height-in-bmr" type="number" value={heightInchesBmr} onChange={(e) => setHeightInchesBmr(e.target.value)} />
                    </div>
                  </div>
                )}
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={(v) => setGender(v)}>
                    <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Card className="flex flex-col items-center justify-center bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-center text-muted-foreground font-normal">Your BMR</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-5xl font-bold text-primary">{bmr}</p>
                  <p className="mt-2 text-muted-foreground">calories / day</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
