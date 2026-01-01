"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { time: "Then", productivity: 78 },
  { time: "", productivity: 123 },
  { time: "", productivity: 90 },
  { time: "", productivity: 165 },
  { time: "Now", productivity: 200 },
];

const chartConfig = {
  productivity: {
    label: "Productivity",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function HomeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Productivity</CardTitle>
        <CardDescription>After using SOC Tools</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="productivity"
              type="natural"
              stroke="var(--color-productivity)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing your productivity boost after using SOC Tools
        </div>
      </CardFooter>
    </Card>
  );
}
