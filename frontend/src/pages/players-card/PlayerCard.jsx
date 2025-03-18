import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerSkillBarChart } from "./PlayerSkillBarChart";
import { useGetPlayerDetailsByIDQuery } from "@/redux/features/dashboard/dashboardApi";
import Loading from "@/components/Loading";
import PlayerStatSwiper from "./PlayerStatSwiper";

const PlayerCard = () => {
  const { playerId } = useParams();

  // State for player details
  const [playerDetails, setPlayerDetails] = useState({});

  // State for skills
  const [playerSkills, setPlayerSkills] = useState({});

  // State for physical attributes
  const [playerPhysical, setPlayerPhysical] = useState({});

  const { data: player, isLoading } = useGetPlayerDetailsByIDQuery(playerId);

  useEffect(() => {
    if (player) {
      // Separate player details
      setPlayerDetails({
        player_id: player.player_id,
        short_name: player.short_name || "N/A",
        long_name: player.long_name || "N/A",
        league_name: player.league_name || "N/A",
        club_name: player.club_name || "N/A",
        overall: player.overall || 0,
        potential: player.potential || 0,
        age: player.age || 0,
        nationality_name: player.nationality_name || "N/A",
        player_face_url: player.player_face_url || "",
        club_position: player.club_position || "N/A",
        club_jersey_number: player.club_jersey_number || 0,
        trending: player.trending || "NO",
      });

      // Separate skills
      setPlayerSkills({
        shooting: player.shooting || 0,
        passing: player.passing || 0,
        dribbling: player.dribbling || 0,
        defending: player.defending || 0,
        physic: player.physic || 0,
        attacking: player.attacking_skills || 0,
        skill: player.skill_attributes || 0,
        movement: player.movement_skills || 0,
        power: player.power_attributes || 0,
        mentals: player.mental_attributes || 0,
        goalkeeping: player.goalkeeping_ability || 0,
      });

      // Separate physical attributes
      setPlayerPhysical({
        height_cm: player.height_cm || 0,
        weight_kg: player.weight_kg || 0,
        bmi: player.bmi || 0,
      });
    }
  }, [player]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="xl:w-[1300px] mx-auto px-4 mt-4 space-y-6 py-4 rounded-xl">
      <div className="sm:flex justify-between items-stretch sm:gap-4 space-y-4 sm:space-y-0">
        {/* Player Details Card */}
        <div className="bg-gray-50 flex flex-col lg:flex-row items-center rounded-xl shadow-md overflow-hidden sm:w-1/2 h-auto sm:h-[160px] dark:bg-gray-900 dark:bg-opacity-20">
          <div className="p-3 flex items-center justify-center h-full dark:bg-gray-800">
            <img
              src={playerDetails.player_face_url}
              alt={playerDetails.short_name}
              className="h-[120px] w-[120px] object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="p-4 flex-1 h-full flex flex-col justify-center">
            <div className="flex items-baseline mb-2 flex-wrap">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {playerDetails.short_name}
              </h2>
              <span className="ml-2 text-gray-500 text-sm">
                ({playerDetails.club_name})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-800 dark:text-gray-200">
              <div className="flex items-center gap-2">
                <span className="font-medium">League:</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {playerDetails.league_name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">Position:</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {playerDetails.club_position}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">Age:</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {playerDetails.age} years
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">Nationality:</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {playerDetails.nationality_name || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Swiper */}
        <PlayerStatSwiper
          playerPhysical={playerPhysical}
          playerDetails={playerDetails}
          playerSkills={playerSkills}
        />
      </div>

      {/* Pass skills and physical data to the chart */}
      <PlayerSkillBarChart
        playerSkills={playerSkills}
        playerDetails={playerDetails}
      />
    </section>
  );
};

export default PlayerCard;