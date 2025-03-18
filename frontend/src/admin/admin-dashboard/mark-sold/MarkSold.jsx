import React, { useEffect, useMemo, useState } from "react";
import { Filter } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useGetAllPlayersQuery } from "@/redux/features/position/playerPositionApi";

import PlayerRow from "./PlayerRow";
import { getSocket } from "@/utils/socket";

const socket = getSocket();
const MarkSold = () => {
  // Local state for real‑time updates (keyed by player_id)
  const [socketUpdates, setSocketUpdates] = useState({});

  const [pageCount, setPageCount] = useState(1);
  const [filters, setFilters] = useState({
    player: "",
    country: "",
    age: "",
  });

  // Fetch overall players using RTK Query.
  const {
    data: playerData,
    isLoading,
    refetch,
  } = useGetAllPlayersQuery({
    page: pageCount,
    ...filters,
  });

  // Listen for real‑time updates via Socket.io.

  useEffect(() => {
    socket.on("playerUpdated", (data) => {
      // Expected data: { playerId, updatedRecord: { bought, wage_eur, ... } }
      setSocketUpdates((prev) => ({
        ...prev,
        [data.playerId]: data.updatedRecord,
      }));
    });

    // Clean up socket listener when component unmounts
    return () => {
      socket.off("playerUpdated");
    };
  }, []);

  // Extract fetched players or default to an empty array.
  const players = useMemo(() => playerData?.data || [], [playerData]);

  // Merge fetched players with any real‑time updates.
  const mergedPlayers = useMemo(() => {
    return players.map((player) => {
      const update = socketUpdates[player.player_id];
      if (
        update &&
        (update.bought !== player.bought || update.wage_eur !== player.wage_eur)
      ) {
    
        return { ...player, bought: update.bought, wage_eur: update.wage_eur };
      }
      return player;
    });
  }, [players, socketUpdates]);

  // Pagination handlers.
  const handlePaginationNext = () => setPageCount((prev) => prev + 1);
  const handlePaginationPrev = () =>
    setPageCount((prev) => Math.max(prev - 1, 1));

  // Filter change handler.
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Reset filters handler.
  const handleResetFilter = (e) => {
    e.preventDefault();
    setFilters({ player: "", country: "", age: "" });
  };

  // Function to mark a player sold/unsold.
  const markSoldPlayer = (playerId, wageInput) => {
    const player = mergedPlayers.find((p) => p.player_id === playerId);
    if (!player) return;

    const newStatus = player.bought === 1 ? 0 : 1;
    socket.emit("updateSoldStatus", {
      playerId,
      sold: newStatus,
      wage: wageInput,
    });
  };

  if (isLoading) {
    return <div>Loading players...</div>;
  }

  return (
    <section className="bg-gray-50 w-full mx-auto">
      <div className="mx-auto">
        <div className="bg-white relative shadow-md sm:rounded-lg">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight p-2 text-gray-700">
            Mark Sold
          </h1>
          {/* Table header and filters */}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                  placeholder="Search by player name"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Sheet>
                <SheetTrigger className="font-semibold border px-2 py-1 rounded-md flex gap-2 items-center">
                  <Filter className="size-5" />
                  <span>Filter</span>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader className="flex flex-col gap-6">
                    <SheetTitle>Apply Filters On Players</SheetTitle>
                    <form onSubmit={handleResetFilter}>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="player"
                            className="font-bold self-start"
                          >
                            Player
                          </label>
                          <input
                            type="text"
                            id="player"
                            name="player"
                            placeholder="Enter Player Name"
                            className="bg-gray-100 border-none outline-none p-2 rounded-md"
                            value={filters.player}
                            onChange={handleFilterChange}
                            autoComplete="off"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="country"
                            className="font-bold self-start"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Enter Country"
                            className="bg-gray-100 border-none outline-none p-2 rounded-md"
                            value={filters.country}
                            onChange={handleFilterChange}
                            autoComplete="off"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="age" className="font-bold self-start">
                            Age
                          </label>
                          <select
                            id="age"
                            name="age"
                            className="bg-gray-100 border-none outline-none p-2 rounded-md"
                            value={filters.age}
                            onChange={handleFilterChange}
                            autoComplete="off"
                          >
                            <option value="">Select Age</option>
                            <option value="20">Above 20</option>
                            <option value="25">Above 25</option>
                            <option value="30">Above 30</option>
                            <option value="35">Above 35</option>
                          </select>
                        </div>
                        <button className="bg-blue-600 p-2 text-white font-semibold rounded-md mt-4">
                          Reset Filters
                        </button>
                      </div>
                    </form>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          {/* Main table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Player name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Nationality
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Age
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Overall Score
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Player ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mergedPlayers.map((player) => (
                  <PlayerRow
                    key={player.player_id}
                    player={player}
                    markSoldPlayer={markSoldPlayer}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {/* Table footer with pagination */}
          <nav
            className="flex flex-col md:flex-row justify-between items-center p-4"
            aria-label="Table navigation"
          >
            <div className="text-sm text-gray-500 flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span>Unsold</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>Sold</span>
              </div>
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem onClick={handlePaginationPrev}>
                  <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem onClick={handlePaginationNext}>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MarkSold;
