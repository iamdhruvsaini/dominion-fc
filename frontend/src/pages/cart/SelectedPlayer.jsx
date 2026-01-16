import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/cart/cartSlice";
import { useRemoveSelectedPlayerMutation } from "@/redux/features/user-selection/userSelectionApi";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

// Define position buckets/categories
const positionMap = {
  forwards: ["LW", "ST", "RW"], // Forwards
  midfielders: ["CDM", "CAM", "CM"], // Midfielders
  defenders: ["RB", "CB", "LB"], // Defenders
  goalkeepers: ["GK"],
};

// Get bucket name for a position
const getPositionBucket = (position) => {
  for (const [bucket, positions] of Object.entries(positionMap)) {
    if (positions.includes(position)) {
      return bucket;
    }
  }
  return "unknown";
};

const rowsPerPage = 8;

const SelectedPlayer = ({ players }) => {
  const { currentUser } = useAuth();
  const [removeSelectedPlayer] = useRemoveSelectedPlayerMutation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(currentUser?.uid);
  const [activeFilter, setActiveFilter] = useState("all");

  // State for pagination
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter players based on search term and active filter
  const filteredPlayers = players?.filter((player) => {
    const matchesSearch = player.short_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const bucket = getPositionBucket(player.club_position);

    return matchesSearch && (activeFilter === "all" || bucket === activeFilter);
  });

  const displayedPlayers = filteredPlayers.slice(startIndex, endIndex);

  // Calculate counts for each bucket
  const bucketCounts = players?.reduce((counts, player) => {
    const bucket = getPositionBucket(player.club_position);
    counts[bucket] = (counts[bucket] || 0) + 1;
    return counts;
  }, {});

  const handleRemove = async (player) => {
    dispatch(removeFromCart(player));

    toast.success("Successfully Removed", {
      duration: 1000,
      position: "bottom-center",
    });
    const formData = {
      player_id: player.player_id,
      user_id: userId,
    };
    try {
      await removeSelectedPlayer(formData).unwrap();
    } catch (error) {
      console.log("Error in removal ", error);
    }
  };

  // Reset pagination when changing filters
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setStartIndex(0);
    setEndIndex(rowsPerPage);
  };

  return (
    <section className="bg-slate-50 p-4 rounded-xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Selected Players
      </h2>

      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="relative">
          <IoIosSearch className="absolute inline-block left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Players"
            className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setStartIndex(0);
              setEndIndex(rowsPerPage);
            }}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-3 py-1 rounded-md text-sm ${
              activeFilter === "all"
                ? "bg-gray-200 text-gray-800 font-medium"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            All ({players?.length || 0})
          </button>
          {Object.keys(positionMap).map((bucket) => (
            <button
              key={bucket}
              onClick={() => handleFilterChange(bucket)}
              className={`px-3 py-1 rounded-md text-sm ${
                activeFilter === bucket
                  ? "bg-gray-200 text-gray-800 font-medium"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="capitalize">{bucket}</span>
              <span className="ml-1">({bucketCounts?.[bucket] || 0})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Display Filtered Players */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {displayedPlayers.length > 0 ? (
          displayedPlayers.map((player, index) => {
            // Determine which bucket/category the player belongs to
            const bucket = getPositionBucket(player.club_position);

            return (
              <div
                className="rounded-md border bg-white border-gray-200 p-3"
                key={index}
              >
                <div className="md:flex md:items-center md:justify-between md:gap-3">
                  <div className="flex items-center gap-3">
                    <Link to={`/card/${player.player_id}`} className="shrink-0">
                      <img
                        className="h-14 w-14 object-cover rounded-md"
                        src={player.player_face_url || "https://ui-avatars.com/api/?name=Player&background=0D8ABC&color=fff&size=56"}
                        alt={player.short_name}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(player.short_name || "Player") + "&background=0D8ABC&color=fff&size=56"; }}
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/card/${player.player_id}`}
                        className="hover:underline"
                      >
                        <h3 className="text-base font-medium text-gray-800 truncate">
                          {player.short_name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">
                          {player.club_position}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                          {bucket}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-2 md:mt-0 text-sm text-red-600 hover:underline"
                    onClick={() => handleRemove(player)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 bg-white p-4 rounded-md border border-gray-200 text-center">
            <p className="text-gray-500">No players found.</p>
            {activeFilter !== "all" && (
              <button
                onClick={() => setActiveFilter("all")}
                className="mt-2 text-sm text-gray-600 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredPlayers.length > rowsPerPage && (
        <Pagination>
          <PaginationContent className="mt-4">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={
                  startIndex > 0 ? "" : "text-gray-300 cursor-not-allowed"
                }
                onClick={() => {
                  if (startIndex > 0) {
                    setStartIndex(startIndex - rowsPerPage);
                    setEndIndex(endIndex - rowsPerPage);
                  }
                }}
              />
            </PaginationItem>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {startIndex + 1}-{Math.min(endIndex, filteredPlayers.length)} of{" "}
                {filteredPlayers.length}
              </span>
            </div>
            <PaginationItem>
              <PaginationNext
                href="#"
                className={
                  endIndex < filteredPlayers.length
                    ? ""
                    : "text-gray-300 cursor-not-allowed"
                }
                onClick={() => {
                  if (endIndex < filteredPlayers.length) {
                    setStartIndex(startIndex + rowsPerPage);
                    setEndIndex(endIndex + rowsPerPage);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

export default SelectedPlayer;
