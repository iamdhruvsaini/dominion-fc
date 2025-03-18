"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetPlayerPositionCountQuery } from "@/redux/features/dashboard/dashboardApi";
import BoxLoading from "@/components/BoxLoading";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

export function ChartComponent() {
  const {
    data: positions,
    isLoading,
    isError,
  } = useGetPlayerPositionCountQuery();

  if(isError){
    return <p>Start Server</p>
  }

  if (isLoading) {
    return (
      <Card className="min-h-[300px] flex justify-center items-center">
        <BoxLoading />
      </Card>
    );
  }

  const chartData = positions?.data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Position - Counts</CardTitle>
        <CardDescription>count of players at each position</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="position_bucket"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              scale="sqrt"
              domain={[1, 30000]}
              tick={false}
              axisLine={false}
              tickLine={false}
              hide={true}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="player_count" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          More than 43000 data points <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total players at each position in dataset
        </div>
      </CardFooter>
    </Card>
  );
}
