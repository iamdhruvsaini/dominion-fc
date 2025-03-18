import { DatePicker } from "@/components/DatePicker";
import React from "react";
import { DashboardCard } from "./DashboardCard";
import { ChartComponent } from "./BarChart";
import Promo from "./Promo";
import { PlayersSold } from "./PlayersSold";

const dashboardContent = [
  {
    title: "Player Comparison",
    description: "Compare player statistics, strengths, and weaknesses to make informed decisions.",
    link:'player-comparison'
  },
  {
    title: "Squad Optimization",
    description: "Optimize your squad using AI-driven insights to build the best possible team within budget constraints.",
    link:'squad-optimization'
  },
  {
    title: "Performance Analysis",
    description: "Analyze player performances based on real match data to refine your team selection.",
    link:'players'
  },
  {
    title: "Team Prediction",
    description: "Predict the best possible starting XI based on player ratings, positions, and team requirements.",
    link:'best-playing-11'
  },
];

const Dashboard = () => {
  
  return (
    <div className="xl:max-w-[1300px] px-4 mx-auto mt-10 flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Dashboard
        </h1>
        <DatePicker />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 items-stretch">
        {dashboardContent.map((card,index)=>(
          <DashboardCard card={card} key={index}/>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 ">
        <div className="w-full lg:w-[40%] min-h-[200px]">
          <ChartComponent />
        </div>
        <div className="w-full lg:w-[60%] border rounded-xl px-2 overflow-hidden min-h-[200px]">
          <PlayersSold />
        </div>
      </div>
      <Promo/>
    </div>
  );
};

export default Dashboard;
