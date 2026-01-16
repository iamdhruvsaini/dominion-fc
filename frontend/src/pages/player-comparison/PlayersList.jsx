import React, { useMemo, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useGetAllPlayersQuery } from "@/redux/features/position/playerPositionApi";
import BoxLoading from "@/components/BoxLoading";
import toast from "react-hot-toast";



const PlayersList = ({setSelectedPlayer}) => {
  const [pageCount, setPageCount] = useState(1);

  const [filters, setFilters] = useState({
    player: "",
  });

  // Fetch players with filters
  const { data: playerData, isLoading } = useGetAllPlayersQuery({
    page: pageCount,
    ...filters,
  });

  const players = useMemo(() => playerData?.data || [], [playerData]);

  const handlePaginationNext = () => {
    setPageCount(pageCount + 1);
  };

  const handlePaginationPrev = () => {
    if (pageCount <= 0) {
      setPageCount(0);
    } else {
      setPageCount(pageCount - 1);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleComparisonSelection=(player)=>{
    setSelectedPlayer(player);
    toast.success("Selected")
  }

  if (isLoading) {
    <BoxLoading />;
  }

  return (
    <section className="bg-white relative sm:rounded-lg">
        
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight p-2 text-gray-700">
        Select Player
      </h1>
      {/* table header */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <label htmlFor="player-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="player-search"
              name="player"
              value={filters.player}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search by player name"
              required=""
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      {/* main table  */}
      <div className="overflow-x-auto  overflow-scroll h-[40vh]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Player name
              </th>
              <th scope="col" className="px-4 py-3">
                Position
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr
                className="border-b dark:border-gray-700 hover:bg-gray-50"
                key={index}
                onClick={()=>handleComparisonSelection(player)}
              >
                <th
                  scope="row"
                  className="px-4 font-medium text-blue-600 whitespace-nowrap hover:underline flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={player.player_face_url || "https://ui-avatars.com/api/?name=Player&background=0D8ABC&color=fff&size=32"}
                    className="size-8 hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(player.short_name || "Player") + "&background=0D8ABC&color=fff&size=32"; }}
                  />
                  <p className="pt-3">{player.short_name}</p>
                </th>
                <td className="px-2 py-3">{player.club_position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* table footer  */}
      <nav
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
        aria-label="Table navigation"
      >
        <ul className="flex">
          <Pagination>
            <PaginationContent>
              <PaginationItem onClick={handlePaginationPrev} className="text-sm">
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem
                onClick={handlePaginationNext}
                className="cursor-pointer text-sm"
              >
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </ul>
      </nav>
    </section>
  );
};

export default PlayersList;
