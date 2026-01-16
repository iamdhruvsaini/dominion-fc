import React, { useMemo, useState } from "react";
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useGetAllPlayersQuery } from "@/redux/features/position/playerPositionApi";
import {  useRemovePlayersMutation } from "@/redux/features/admin/adminApi";

const RemovePlayers = () => {
  const [pageCount, setPageCount] = useState(1);
  const [filters, setFilters] = useState({
    player: "",
    country: "",
    age: "",
  });
  const [RemovePlayer]=useRemovePlayersMutation();
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

  const handleResetFilter = (e) => {
    e.preventDefault();
    setFilters({ player: "", country: "", age: "" });
  };

  const handleRemovePlayer = async(id) => {
    try {
      await RemovePlayer({player_id:id}).unwrap();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <section className="bg-gray-50 mx-auto p-4 w-full">
        <div className="mx-auto">
          <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight p-2 text-gray-700">
              Remove Player
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
                          {/* Player Name Input */}
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

                          {/* Country Input */}
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

                          {/* Age Dropdown (Fixed) */}
                          <div className="flex flex-col gap-2">
                            <label
                              className="font-bold self-start"
                              htmlFor="age"
                            >
                              Age
                            </label>
                            <select
                              id="age"
                              name="age"
                              className="bg-gray-100 border-none outline-none p-2 rounded-md"
                              onChange={handleFilterChange}
                              value={filters.age}
                              autoComplete="off"
                            >
                              <option value="">Select Age</option>
                              <option value="20">Above 20</option>
                              <option value="25">Above 25</option>
                              <option value="30">Above 30</option>
                              <option value="35">Above 35</option>
                            </select>
                          </div>

                          {/* Submit Button */}
                          <button className="bg-blue-600 p-2 text-white font-semibold text-md rounded-md mt-4">
                            Reset Filters
                          </button>
                        </div>
                      </form>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            {/* main table  */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    <th scope="col" className="px-4 py-3 flex justify-center">
                      <span className="">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr className="border-b dark:border-gray-700" key={index}>
                      <th
                        scope="row"
                        className="px-4 font-medium text-blue-600 whitespace-nowrap hover:underline flex items-center gap-2 cursor-pointer"
                      >
                        <img src={player.player_face_url || "https://ui-avatars.com/api/?name=Player&background=0D8ABC&color=fff&size=32"} className="size-8" onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(player.short_name || "Player") + "&background=0D8ABC&color=fff&size=32"; }} />
                        <p className="pt-3">{player.short_name}</p>
                      </th>
                      <td className="px-4 py-3">{player.nationality_name}</td>
                      <td className="px-4 py-3">{player.age}</td>
                      <td className="px-4 py-3">{player.overall}</td>
                      <td className="px-4 py-3">{player.player_id}</td>
                      <td className="px-4 py-3 flex items-center justify-center gap-1">
                        <AlertDialog>
                          <AlertDialogTrigger className="bg-red-500 font-medium text-sm text-white p-2 rounded-lg">Remove</AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action will remove the player
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={()=>handleRemovePlayer(player.player_id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* table footer  */}
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <div className="text-sm font-normal text-gray-500 flex gap-4">
                <ul className="flex items-center gap-2">
                  <li className="size-3 rounded-full bg-red-500"></li>
                  <li className="font-semibold">Unsold</li>
                </ul>
                <ul className="flex items-center gap-2">
                  <li className="size-3 rounded-full bg-green-500"></li>
                  <li className="font-semibold">Sold</li>
                </ul>
              </div>
              <ul className="inline-flex items-stretch -space-x-px">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem onClick={handlePaginationPrev}>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem
                      onClick={handlePaginationNext}
                      className="cursor-pointer"
                    >
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default RemovePlayers;
