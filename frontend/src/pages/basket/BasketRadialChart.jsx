"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";


export function BasketRadialChart({ option }) {
  if (!option) return null; // Ensure option is defined
  const maxPlayerCount=48000;

  const chartData = [
    {
      position_bucket: option.position_bucket,
      player_count: Number(option.player_count), // Convert string to number
      fill: "hsl(var(--chart-2))",
    },
  ];

  const percentage = (chartData[0].player_count / maxPlayerCount) * 360;


  const chartConfig = {
    player_count: {
      label: "Players",
    },
  };

  return (
    <div className="flex flex-col items-center">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] min-w-[200px] min-h-[200px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={percentage} // Full circle
            innerRadius={80}
            outerRadius={120}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-gray-200 last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="player_count" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].player_count.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Players
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      {/* Description and Link */}
    </div>
  );
}
