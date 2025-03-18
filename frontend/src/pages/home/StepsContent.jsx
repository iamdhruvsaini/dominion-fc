import React from "react";
import stepBox from "../../assets/Images/steps-box.png";
const StepsContent = () => {
  return (
    <div className="sm:px-10 xl:px-0 mt-12 flex flex-col gap-10">
      <p className="text-4xl font-bold text-gray-700">How It Works</p>
      <div className="lg:w-[94%] w-full mx-auto rounded-2xl p-[2px] bg-gradient-to-r from-blue-200 via-pink-200 to-yellow-200 hover:bg-gradient-to-r hover:from-blue-300 hover:via-pink-300 hover:to-yellow-300">
        <div className="rounded-t-2xl flex flex-col md:flex-row bg-white">
          <div className="lg:w-[60%] flex flex-col  gap-6 p-6 sm:p-10">
            <p className="w-fit bg-yellow-100 py-1 px-4 border border-yellow-300 rounded-md font-medium">
              Steps
            </p>
            <p className="text-gray-600 text-2xl font-medium">
              Utilize straight from our web app
            </p>
            <p className="text-base font-medium text-gray-500">
              select the players from different bucket and our model will
              predict best of all increasing your chance of winning
            </p>
            <div className="flex pt-6 gap-10">
              <ul className="flex flex-col font-medium text-gray-600 text-sm gap-2">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check"></i>{" "}
                  <span className="underline underline-offset-[5px]">
                    Over 2000+ Players
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check"></i>{" "}
                  <span className="underline underline-offset-[5px]">
                    Buckets Based on Position
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check"></i>{" "}
                  <span className="underline underline-offset-[5px]">
                    Cards of Players
                  </span>
                </li>
              </ul>

              <ul className="flex flex-col font-medium text-gray-600 text-sm gap-2">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check"></i>{" "}
                  <span className="underline underline-offset-[5px]">
                    Select Multiple
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check"></i>{" "}
                  <span className="underline underline-offset-[5px]">
                    Price and Stats
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check"></i>{" "}
                  <span className="underline underline-offset-[5px]">
                    Visualization of Stats
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-[40%] rounded-2xl">
            <img
              src={stepBox}
              alt=""
              className="w-full h-full object-cover rounded-2xl hidden lg:block"
            />
          </div>
        </div>
        <div className="bg-white w-full rounded-b-2xl mx-auto p-2 flex flex-col lg:flex-row gap-4 justify-between">
          {/* Box 1 */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Role-Based Selection
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Compare player stats to evaluate individual and team performance.
              Make informed decisions based on key performance metrics.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>

          {/* Box 2 */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Role-Based Selection
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Easily categorize players to maintain a well-structured formation.
              Ensure your team has the right balance for optimal gameplay.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>

          {/* Box 3 */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               Performance Insights
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Track live data, performance trends, and in-game analytics. Adjust
              strategies using up-to-date insights for better results.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsContent;
