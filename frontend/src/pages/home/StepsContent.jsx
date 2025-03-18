import React from "react";
import stepBox from "../../assets/Images/steps-box.png";

const StepsContent = () => {
  return (
    <div className="sm:px-10 xl:px-0 mt-12 flex flex-col gap-10">
      <h2 className="text-5xl font-bold text-gray-800 text-center mb-4">How It Works</h2>
      <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">Our powerful platform helps you build the ultimate football squad through data-driven insights and AI optimization</p>

      <div className="lg:w-[94%] w-full mx-auto rounded-2xl p-[2px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="rounded-t-2xl flex flex-col md:flex-row bg-white overflow-hidden">
          <div className="lg:w-[60%] flex flex-col gap-8 p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="w-fit bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-full font-semibold shadow-md">
                Dominion FC
              </span>
              <span className="bg-yellow-100 py-1 px-4 border border-yellow-300 rounded-full text-yellow-700 text-sm font-medium">
                Premium
              </span>
            </div>

            <h3 className="text-gray-800 text-3xl font-bold leading-tight">
              Squad Optimization & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Stats Visualization</span>
            </h3>

            <p className="text-base font-medium text-gray-600 leading-relaxed">
              Select players from position-specific buckets and let our advanced AI model optimize your squad formation. Make data-driven decisions based on comprehensive player analytics and compatibility metrics.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              <ul className="flex flex-col font-medium text-gray-700 text-sm gap-4">
                <li className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span className="font-medium">
                    Over 40,000+ Football Players
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span className="font-medium">
                    Position-Based Selection
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span className="font-medium">
                    Detailed Player Cards
                  </span>
                </li>
              </ul>

              <ul className="flex flex-col font-medium text-gray-700 text-sm gap-4">
                <li className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span className="font-medium">
                    Side-by-Side Comparison
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span className="font-medium">
                    Performance Metrics
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span className="font-medium">
                    Interactive Visualizations
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-[40%] rounded-b-none rounded-r-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent z-10"></div>
            <img
              src={stepBox}
              alt="Football squad optimization preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-white w-full rounded-b-2xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Box 1 */}
          <div className="p-6 bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <div className="mb-4 text-blue-600 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-users-viewfinder text-xl"></i>
            </div>
            <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
              Select & Compare
            </h5>
            <p className="mb-auto text-gray-700 leading-relaxed">
              Choose from position-specific buckets and compare players side by side with advanced filtering by stats, form, and value to find your perfect lineup.
            </p>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-sm"
              >
                Explore Players
                <svg
                  className="rtl:rotate-180 w-4 h-4 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>

          {/* Box 2 */}
          <div className="p-6 bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <div className="mb-4 text-purple-600 bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-robot text-xl"></i>
            </div>
            <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
              Optimize Your Squad
            </h5>
            <p className="mb-auto text-gray-700 leading-relaxed">
              Add selected players to your cart and let our AI model generate the best possible starting XI based on chemistry, form, and strategic formation compatibility.
            </p>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-sm"
              >
                Try Optimizer
                <svg
                  className="rtl:rotate-180 w-4 h-4 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>

          {/* Box 3 */}
          <div className="p-6 bg-gradient-to-br from-white to-pink-50 border border-pink-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <div className="mb-4 text-pink-600 bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-chart-line text-xl"></i>
            </div>
            <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
              Advanced Insights
            </h5>
            <p className="mb-auto text-gray-700 leading-relaxed">
              Get intelligent suggestions for budget constraints and receive personalized player recommendations when optimizing your squad for maximum performance.
            </p>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-pink-600 to-pink-800 rounded-lg hover:from-pink-700 hover:to-pink-900 transition-all duration-300 shadow-sm"
              >
                View Insights
                <svg
                  className="rtl:rotate-180 w-4 h-4 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsContent;