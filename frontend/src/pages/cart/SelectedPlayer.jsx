import React, {  useState } from "react";
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


const rowsPerPage = 8;

const SelectedPlayer = ({players}) => {
  
  const {currentUser} = useAuth();
  const [removeSelectedPlayer]=useRemoveSelectedPlayerMutation();
  const dispatch=useDispatch();
  const [userId, setUserId] = useState(currentUser?.uid);

  // State for pagination

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = players?.filter((player) =>
    player.short_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedPlayers = filteredPlayers.slice(startIndex, endIndex);


  const handleRemove=async(player)=>{
      dispatch(removeFromCart(player));

      toast.success("Successfully Removed",{
        duration: 1000,
        position: 'bottom-center',
      })
      const formData={
        player_id:player.player_id,
        user_id:userId,
      }
      try {
        await removeSelectedPlayer(formData).unwrap();
      } catch (error) {
        console.log("Error in removal ",error);
      }

  }


  return (
    <section className="bg-slate-50 p-4 rounded-xl">
     
      <div className="relative xl:w-[60%]  my-4">
        <IoIosSearch className="absolute inline-block left-2 inset-y-2" />
        <input
          type="text"
          placeholder="Search Players"
          className="w-full py-1 md:px-8 px-6 rounded-md border border-gray-300 outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setStartIndex(0); // Reset pagination when searching
            setEndIndex(rowsPerPage);
          }}
        />
      </div>

      {/* 🔹 Display Filtered Players */}
      <div className="grid grid-cols-2 gap-2">
        {displayedPlayers.length > 0 ? (
          displayedPlayers.map((player, index) => (
            <div
              className="rounded-lg border bg-white border-gray-300 p-4 shadow-sm"
              key={index}
            >
              <div className="md:flex md:items-center md:justify-between md:gap-4 md:space-y-0">
                <Link to={`/card/${player.player_id}`} className="shrink-0 md:order-1">
                  <img
                    className="h-20 w-20 dark:hidden hover:scale-105 duration-300"
                    src={player.player_face_url}
                    alt="Player"
                  />
                </Link>

                <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
                  <p className="text-lg font-bold text-gray-700">
                    {player.short_name}
                  </p>
                  <p className="text-base font-normal text-gray-900 hover:underline">
                    Position: {player.club_position}
                  </p>
                </div>
                <div className="flex items-center gap-4 order-3">
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                    onClick={()=>handleRemove(player)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No players found.</p>
        )}
      </div>

      {/* 🔹 Pagination */}
      {filteredPlayers.length > rowsPerPage && (
        <Pagination>
          <PaginationContent className="mt-10">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="text-md"
                onClick={() => {
                  if (startIndex > 0) {
                    setStartIndex(startIndex - rowsPerPage);
                    setEndIndex(endIndex - rowsPerPage);
                  }
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                className="text-md"
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
