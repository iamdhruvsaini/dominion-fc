import React from "react";
import league from "../assets/league.gif";

const FootballAd = () => {
  return (
    <section>
      <div className="mx-auto grid max-w-screen-xl rounded-lg p-4 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16 mt-4 space-y-6">
        <div className="lg:col-span-5">
          <img
            src={league}
            alt=""
            className="sm:w-[50%] lg:w-full rounded-xl mx-auto"
          />
        </div>
        <div className="mx-auto place-self-center lg:col-span-7">
          <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Optimize your squad today and <br />
            build the best football team now!
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Reserve your dream football squad today and get exclusive insights
            with advanced analytics. Optimize now to build your best team!
          </p>
        </div>
      </div>
    </section>
  );
};

export default FootballAd;
