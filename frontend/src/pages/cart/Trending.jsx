import BoxLoading from "@/components/BoxLoading";
import { useGetTrendingPlayersQuery } from "@/redux/features/position/playerPositionApi";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Trending = () => {
  const { data: trendingPlayer, isLoading } = useGetTrendingPlayersQuery();
  
  return (
    <div className="hidden xl:mt-8 xl:block">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
        Trending
      </h1>

      {isLoading ? (
        <BoxLoading />
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {trendingPlayer?.data.map((player, index) => (
            <SwiperSlide  key={index}>
              <div
                className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm mt-10"
                key={index}
              >
                <Link className="overflow-hidden rounded">
                  <img
                    className="mx-auto h-30 w-30 dark:hidden"
                    src={player.player_face_url}
                    alt="player image"
                  />
                </Link>
                <div>
                  <Link to={`/card/${player.player_id}`}>
                    <p className="text-lg font-semibold leading-tight text-blue-500 hover:underline text-center">{player.short_name}</p>
                    
                  </Link>
                  <p className="mt-2 text-base font-medium text-gray-500 text">
                    Position: {player.club_position}
                   
                  </p>
                  <p className="text-base font-medium text-gray-500 text">
               
                    Nationality : {player.nationality_name}
                  </p>
                </div>

                <p className="text-lg font-bold leading-tight text-red-600 text-center">
                  Value : $ {player.value_eur}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Trending;
