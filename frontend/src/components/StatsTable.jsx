import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useGetRankingQuery } from "@/redux/features/stats/statsRankingApi";
import Loading from "./Loading";


const StatsTable = () => {
  const navigate = useNavigate();
  const [tableHeader, setTableHeader] = useState([]);
  const { link } = useParams();
  const { data: players, isLoading, isError } = useGetRankingQuery(link);

  
  useEffect(() => {
    if (players && players.data && Array.isArray(players.data) && players.data.length > 0) {
      // Filter out the bought property from headers
      const headers = Object.keys(players.data[0]).filter(header => header !== "bought" || header!=="player_id");
      setTableHeader(headers);
    }
  }, [players]);

  if (isLoading) {
    return <Loading />;
  }
  
  if (isError) {
    navigate("page-not-found", { replace: true });
    return null;
  }

  // Format the table title
  const formattedTitle = link.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <section className="py-6 sm:py-10 bg-gray-50">
      <div className="px-4 mx-auto max-w-[1300px] lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-lg rounded-xl">
          {/* Header */}
          <div className="flex flex-col px-4 sm:px-6 py-4 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">{formattedTitle}</h2>
  
            <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <button
                type="button"
                className="flex items-center justify-center px-3 sm:px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Export Data
              </button>
            </div>
          </div>
          
          {/* Table with horizontal scroll for small devices */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  {/* Skip the ID column (index 0) and the bought column */}
                  {tableHeader.slice(2).filter(heading => heading !== "bought").map((heading, index) => (
                    <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 font-medium" key={index}>
                      {heading.split("_").join(" ").toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {players.data.map((player, index) => (
                  <tr
                    className="hover:bg-gray-50 transition-colors duration-200"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="flex items-center px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900"
                    >
                      <img
                        src={player.player_face_url ? player.player_face_url : playerNan}
                        alt={player.short_name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover mr-2 sm:mr-3 border-2 border-gray-200 flex-shrink-0"
                      />
                      <Link to={`/card/${player.player_id}`} className="min-w-0">
                        <p className="font-semibold truncate">{player.short_name}</p>
                      </Link>
                    </th>

                    {/* Skip the ID, short_name, player_face_url, and bought properties */}
                    {Object.entries(player)
                      .filter(([key]) => !["player_id", "short_name", "player_face_url", "bought"].includes(key))
                      .map(([key, value], idx) => (
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap" key={idx}>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                            {value}
                          </span>
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table navigation section removed as requested */}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-screen-xl px-4 py-8 sm:py-12 mx-auto mt-6 sm:mt-8 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Platform Statistics</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mx-auto text-gray-900">
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-lg shadow-md">
            <dt className="mb-2 text-2xl sm:text-3xl md:text-4xl font-extrabold">4M+</dt>
            <dd className="font-medium text-gray-500">
              Datasets
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-lg shadow-md">
            <dt className="mb-2 text-2xl sm:text-3xl md:text-4xl font-extrabold">1K+</dt>
            <dd className="font-medium text-gray-500">
              Contributors
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-lg shadow-md">
            <dt className="mb-2 text-2xl sm:text-3xl md:text-4xl font-extrabold">4M+</dt>
            <dd className="font-medium text-gray-500">
              Organizations
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default StatsTable;