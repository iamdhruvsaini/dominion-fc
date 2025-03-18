"use client"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function PlayerComparisonChart({ playerSkills}) {
  // Format playerSkills into chartData
  const chartData = Object.keys(playerSkills).map((skill) => ({
    skill: skill.replace("_", " ").toUpperCase(), // Format key names to display nicely
    value: playerSkills[skill],
  }));

  const chartConfig = {
    value: {
      label: "Skill Value",
      color: "hsl(var(--chart-color-desktop))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="skill"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={10}
                className="fill-foreground"
                fontSize={10}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
