'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
  { day: 'Mon', workouts: 1, goal: 1 },
  { day: 'Tue', workouts: 2, goal: 1 },
  { day: 'Wed', workouts: 1, goal: 1 },
  { day: 'Thu', workouts: 0, goal: 1 },
  { day: 'Fri', workouts: 2, goal: 1 },
  { day: 'Sat', workouts: 1, goal: 1 },
  { day: 'Sun', workouts: 0, goal: 1 },
];

const chartConfig = {
  workouts: {
    label: 'Workouts',
    color: 'hsl(var(--primary))',
  },
  goal: {
    label: 'Goal',
    color: 'hsl(var(--secondary))',
  },
};

export default function DashboardChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar
          dataKey="workouts"
          fill="var(--color-workouts)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
