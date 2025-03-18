import React from "react";
import { IoArrowForwardSharp } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import { RiWindowsFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import StepsContent from "./StepsContent";
import Paidplans from "./Paidplans";
import Questions from "./Questions";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate=useNavigate();
  return (
    <>
      <div
        id="main"
        className="bg-gradient-to-b from-purple-50 via-orange-50 to-transparent"
      >
        <div className="xl:w-[1200px] xl:mx-auto px-4 pt-4">
          <div className="py-10">
            <button className="flex items-center bg-yellow-50 border border-yellow-400 w-fit px-4 py-1 rounded-lg sm:mx-auto group shadow-md hover:-translate-y-2 cursor-pointer duration-500" onClick={()=>navigate('/cart')}>
              <div className="h-2 w-2 mr-2 rounded-full bg-yellow-300 border border-yellow-600  "></div>
              <span className="text-yellow-600 font-medium">v0.1: </span>
              <span className="text-yellow-700 font-medium mr-2 pl-2">
                Find-in-best Team
              </span>
              <span className="fa-solid fa-arrow-right text-yellow-600 group-hover:translate-x-1 duration-500">
                <IoArrowForwardSharp />
              </span>
            </button>

            <div className=" hidden sm:flex gap-4 justify-center mt-6 text-gray-500 font-display">
              <div className="flex items-center gap-2">
                <IoStatsChart />
                <p>Look at Stats</p>
              </div>

              <div className="flex items-center gap-2 ">
                <IoPeople />
                <p>Teams Playing</p>
              </div>
              <div className="flex items-center gap-2">
                <RiWindowsFill />
                <p>Phone, Laptop</p>
              </div>
            </div>
            <h1 className="py-8 text-5xl text-gray-700 font-display font-semibold sm:text-center md:text-5xl lg:text-7xl lg:w-5/6 sm:mx-auto">
              Optimize Your Team with Precision ML
            </h1>
            <p className="text-md text-justify sm:text-center md:text-xl lg:w-4/6 lg:mx-auto font-normal text-gray-500">
              Use our web app and codebase to curate best playing team accross
              stadiums using our Machine Learning Model
            </p>

            <div className="sm:flex gap-12 pt-10 sm:justify-center justify-start">
              <div className="mb-3 sm:mb-0">
                <Button onClick={()=>navigate('/bucket')}>Choose Players</Button>
              </div>
              <div>
                <Button variant={"outline"} onClick={()=>navigate('/players')} >Player Stats</Button>
              </div>
            </div>
          </div>
          <StepsContent></StepsContent>
          <Paidplans></Paidplans>
          <Questions></Questions>
        </div>
      </div>
    </>
  );
};

export default Home;
