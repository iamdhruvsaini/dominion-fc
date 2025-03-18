import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const PlayerStatSwiper = ({ playerPhysical, playerDetails}) => {
  // Helper function to determine which stats to show
  const getRelevantStats = () => {
    // Default stats that are always shown
    const stats = [
      { name: "Overall", value: playerDetails.overall, max: 100 },
      { name: "Potential", value: playerDetails.potential, max: 100 },
    ];
    
    // Physical stats
    stats.push(
      { name: "Height", value: playerPhysical.height_cm, unit: "cm", max: 220 },
      { name: "Weight", value: playerPhysical.weight_kg, unit: "kg", max: 100 }
    );
    
    return stats;
  };

  const stats = getRelevantStats();

  return (
    <div className="sm:w-1/2 h-auto sm:h-[160px]">
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className="statSwiper h-full"
      >
        {stats.map((stat, index) => (
          <SwiperSlide key={index}>
            <div className="h-full bg-white dark:bg-gray-900 shadow-md rounded-lg p-3 flex flex-col justify-between border border-gray-100 dark:border-gray-800">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {stat.name}
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">
                    {stat.value}{stat.unit ? ` ${stat.unit}` : ''}
                  </span>
                  {!stat.unit && (
                    <span className="text-gray-500 dark:text-gray-400 text-xs self-end">
                      / {stat.max}
                    </span>
                  )}
                </div>
                
                {!stat.unit && (
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-black dark:bg-gray-300" 
                      style={{ width: `${(stat.value / stat.max) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PlayerStatSwiper;