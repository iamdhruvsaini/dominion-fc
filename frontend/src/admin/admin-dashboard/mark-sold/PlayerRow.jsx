import React, { useEffect, useState } from "react";

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

const PlayerRow = ({ player, markSoldPlayer }) => {
  // Manage wage input state
  const [wageInput, setWageInput] = useState(player.wage_eur || 0);
  const [toogle, setToogle] = useState(player.bought === 1 ? true : false);

  // Ensure wageInput updates when player data changes
  useEffect(() => {
    if (player.wage !== undefined) {
      setWageInput(player.wage_eur);
    }
  }, [player.wage_eur]);

  const handleRemoveClick = () => {
    setToogle(!toogle);
    if (player.player_id && wageInput !== undefined) {
      markSoldPlayer(player.player_id, wageInput);
    } else {
      console.error("Invalid player ID or wage input");
    }
  };
  const isSold = toogle === true;

  return (
    <tr className="border-b">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-blue-600 whitespace-nowrap hover:underline flex items-center gap-2 cursor-pointer"
      >
        <img
          src={player.player_face_url}
          alt={player.short_name}
          className="w-8 h-8 rounded-full"
        />
        <span>{player.short_name}</span>
      </th>
      <td className="px-4 py-3">{player.nationality_name}</td>
      <td className="px-4 py-3">{player.age}</td>
      <td className="px-4 py-3">{player.overall}</td>
      <td className="px-4 py-3">{player.player_id}</td>
      <td className="px-4 py-3 flex items-center justify-center">
        <AlertDialog>
          <AlertDialogTrigger
            className={`${
              isSold ? "bg-green-500" : "bg-blue-500"
            } font-medium text-xs text-white p-2 rounded-lg w-20`}
          >
            {isSold ? "Revert" : "Mark Sold"}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to mark this player as{" "}
                {isSold ? "unsold" : "sold"}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isSold
                  ? "It will mark the player as unsold."
                  : "Enter the wage amount to update along with marking the player as sold."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className={`px-4 py-2 ${isSold ? "hidden" : "block"}`}>
              <label
                htmlFor={`wage-input-${player.player_id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Wage
              </label>
              <input
                type="number"
                id={`wage-input-${player.player_id}`}
                value={wageInput}
                onChange={(e) => setWageInput(e.target.value)}
                className="mt-1 p-2 block w-full rounded-md border-none outline-none bg-gray-100 shadow-sm sm:text-sm"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleRemoveClick(player)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  );
};

export default PlayerRow;
