import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePredictBestPlaying11Mutation } from "@/redux/features/prediction/predictionApi";
import PredictionLoader from "@/components/PredictionLoader";
import TeamRender from "./TeamRender";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link} from "react-router-dom";

const positionMap = {
  forwards: ["LW", "ST", "RW"],
  midfielders: ["CDM", "CAM", "CM"],
  defenders: ["RB", "CB", "LB"],
  goalkeepers: ["GK"],
};

const Playing = () => {
  const { currentUser } = useAuth();

  const [predictBestPlaying11, { data: players, isLoading, error }] =
    usePredictBestPlaying11Mutation();

  useEffect(() => {
    if (currentUser?.uid) {
      predictBestPlaying11({ userId: currentUser.uid });
    }
  }, [currentUser?.uid]);

  if (isLoading) {
    return <PredictionLoader />;
  }

  return (
    <div className="xl:w-[1300px] mx-auto p-4">
      {players?.data?.data ? (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full"
        >
          {players?.data?.data.map((team, index) => (
            <SwiperSlide key={index}>
              <TeamRender team={team} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-5xl tracking-tight font-extrabold lg:text-6xl text-primary-600 dark:text-primary-500">
                Prediction Failed
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Something's missing.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, we aren't able to predict . You'll need to provide valid
                data{" "}
              </p>
              <Link to={"/cart"}>
                <div className="inline-flex bg-gray-200 hover:text-white hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">
                  Back to CartPage
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Playing;
