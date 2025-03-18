import { Activity, Layers, UserRoundPlus, X } from "lucide-react";
import React, { useState } from "react";
import PlayersList from "./PlayersList";

import { PlayerComparisonChart } from "./PlayerComparisonChart";

const PlayerComparison = () => {
  const [trigger, setTrigger] = useState(false);
  const [selectPlayer, setSelectedPlayer] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleRemoveSelectedPlayer = (player) => {
    setSelectedPlayers((prev) => prev.filter((p) => p !== player));
    if (player === selectPlayer) {
      setSelectedPlayer(null);
    }
  };

  const handleTrigger = () => {
    setTrigger((prev) => !prev);
  };

  const handleSelectPlayer = (player) => {
    setSelectedPlayers((prev) => [...prev, player]);
    setSelectedPlayer(player);
    setTrigger(false);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with animated underline */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 relative inline-block">
            Player Comparison
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Compare players based on their skills to enhance your team's
            performance.
          </p>
        </div>

        <div className="mt-10">
          {/* Selected Players Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {selectedPlayers.map((player, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                  player.bought === 1
                    ? "bg-gradient-to-br from-red-50 to-red-100"
                    : "bg-gradient-to-br from-white to-gray-50"
                }`}
              >
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={() => handleRemoveSelectedPlayer(player)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors duration-200"
                  >
                    <X size={16} className="text-gray-700" />
                  </button>
                </div>

                <div className="p-6">
                  {/* Player Badge - Position and Jersey */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-blue-600 text-white font-bold rounded-full text-sm">
                      {player.club_position}
                    </span>
                    {player.bought === 1 && (
                      <span className="px-3 py-1 bg-red-500 text-white font-bold rounded-full text-sm">
                        Transferred
                      </span>
                    )}
                  </div>

                  {/* Player Image with Gradient Overlay */}
                  <div className="relative mx-auto w-32 h-32 mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full"></div>
                    <img
                      src={player.player_face_url}
                      alt={player.short_name}
                      className="w-full h-full object-cover rounded-full border-4 border-white shadow-inner"
                    />
                  </div>

                  {/* Player Name */}
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    {player.short_name}
                  </h3>
                  {/* Player Stats */}
                  <div className="flex justify-center space-x-6 mb-6 mt-4">
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-gray-700 font-medium">
                        {player.age} yrs
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Layers className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-gray-700 font-medium">
                        {player.club_position}
                      </span>
                    </div>
                  </div>

                  {/* Skill Chart */}
                  <div className="mt-4">
                    <PlayerComparisonChart
                      playerSkills={{
                        pace: player.pace,
                        shooting: player.shooting,
                        passing: player.passing,
                        dribbling: player.dribbling,
                        defending: player.defending,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add Player Card */}
            {selectedPlayers.length < 3 && (
              <div className="flex flex-col justify-center items-center rounded-xl bg-white shadow-md p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl gap-4">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                  Add Player
                </h3>
                <p className="text-gray-600 text-center mb-6 text-lg">
                  Select a player to compare stats with other players
                </p>
                <button onClick={handleTrigger} className="group relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-full opacity-0 scale-50 group-hover:opacity-10 group-hover:scale-100 transition-all duration-300"></div>
                  <UserRoundPlus className="size-44 text-blue-600 transition-all duration-300 group-hover:scale-110" />
                </button>
              </div>
            )}
          </div>

          {/* Empty state for when no players are selected */}
          {selectedPlayers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 italic">
                Select up to three players to compare their attributes
              </p>
            </div>
          )}

          {/* Player Selection Popup */}
          {trigger && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm">
              <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-2xl p-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Select a Player
                  </h3>
                  <button
                    onClick={handleTrigger}
                    className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <PlayersList setSelectedPlayer={handleSelectPlayer} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlayerComparison;
