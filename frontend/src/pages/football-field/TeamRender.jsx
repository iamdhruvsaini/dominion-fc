import formatPrice from "@/utils/formatPrice";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TeamRender = ({ team, index }) => {
  const [teamSummary, setTeamSummary] = useState({
    totalPlayer: 0,
    totalPrice: 0,
    positionCounts: {},
    playersByPosition: {
      defenders: [],
      midfielders: [],
      forwards: [],
      goalkeepers: [],
    },
  });

  // Process the team data when it changes
  useEffect(() => {
    if (team && team.players) {
      // Group players by their position
      const defenders = team.players.filter(
        (player) => player.position === "Defence"
      );
      const midfielders = team.players.filter(
        (player) => player.position === "Midfield"
      );
      const forwards = team.players.filter(
        (player) => player.position === "Forward"
      );
      const goalkeepers = team.players.filter(
        (player) => player.position === "Goal Keeper"
      );

      setTeamSummary({
        totalPlayer: team.players.length,
        totalPrice: team.total_price || 0,
        positionCounts: {
          goalkeepers: goalkeepers.length || 0,
          defenders: defenders.length || 0,
          midfielders: midfielders.length || 0,
          forwards: forwards.length || 0,
        },
        playersByPosition: {
          goalkeepers,
          defenders,
          midfielders,
          forwards,
        },
      });
    }
  }, [team]);

  const handlePlayerClick = (playerData) => {
    // Format price to display in millions with 1 decimal place
    const formattedPrice = (playerData.price / 1000000).toFixed(1) + "M";

    Swal.fire({
      title: "",
      html: `
        <div class="w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl overflow-hidden relative">
          <!-- Header: Player info with gradient background -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
            <div class="flex items-center">
              <!-- Player image -->
              <div class="mr-4 rounded-lg overflow-hidden" style="height: 80px; width: 80px;">
                <img src="${playerData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(playerData.name || 'Player')}&background=0D8ABC&color=fff&size=80`}" alt="${playerData.name}" class="h-full w-full object-cover" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(playerData.name || 'Player')}&background=0D8ABC&color=fff&size=80';" />
              </div>
              
              <!-- Player info with clean typography -->
              <div class="flex-1 overflow-hidden">
                <h2 class="text-lg font-bold text-gray-800 tracking-tight">${playerData.name}</h2>
                <div class="flex items-center mt-1 flex-wrap">
                  <span class="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium mr-2">ID: ${playerData.id}</span>
                  <span class="text-gray-500 text-sm font-medium">${playerData.age} yrs</span>
                </div>
                <div class="mt-1">
                  <span class="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">${playerData.position}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Stats grid with all player information -->
          <div class="p-4 flex flex-col gap-3">
            <!-- Price and Score in one row -->
            <div class="flex gap-3">
              <!-- Price -->
              <div class="bg-green-50 rounded-xl p-3 flex items-center flex-1">
                <div class="rounded-full bg-green-100 p-1 mr-2 flex-shrink-0">
                  <svg class="w-3 h-3 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500">Price</p>
                  <p class="text-lg font-bold text-green-700">€${formattedPrice}</p>
                </div>
              </div>
              
              <!-- Score -->
              <div class="bg-blue-50 rounded-xl p-3 flex items-center flex-1">
                <div class="rounded-full bg-blue-100 p-1 mr-2 flex-shrink-0">
                  <svg class="w-3 h-3 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500">Score</p>
                  <p class="text-lg font-bold text-blue-700">${playerData.score}</p>
                </div>
              </div>
            </div>
            
            <!-- Potential and Injury Risk in one row -->
            <div class="flex gap-3">
              <!-- Potential Rating -->
              <div class="bg-green-50 rounded-xl p-3 flex items-center flex-1">
                <div class="rounded-full bg-green-100 p-1 mr-2 flex-shrink-0">
                  <svg class="w-3 h-3 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 20H11V8L5.5 13.5L4.08 12.08L12 4.16L19.92 12.08L18.5 13.5L13 8V20Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500">Potential</p>
                  <p class="text-lg font-bold text-green-700">${playerData.potential}</p>
                </div>
              </div>
              
              <!-- Injury Risk -->
              <div class="bg-red-50 rounded-xl p-3 flex items-center flex-1">
                <div class="rounded-full bg-red-100 p-1 mr-2 flex-shrink-0">
                  <svg class="w-3 h-3 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500">Injury Risk</p>
                  <p class="text-lg font-bold text-red-700">${playerData.injury_risk}%</p>
                </div>
              </div>
            </div>
            
            <!-- Status -->
            <div class="flex justify-center items-center bg-gray-50 rounded-xl p-3 mt-2">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Player Active
              </span>
            </div>
          </div>
        </div>
      `,
      background: "transparent",
      showConfirmButton: false,
      showCloseButton: false,
      customClass: {
        container: "swal-player-container",
        popup: "swal-player-popup",
      },
      width: "auto",
      padding: 0,
      allowOutsideClick: true,
    });

    const style = document.createElement("style");
    style.innerHTML = `
      .swal-player-popup {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        border-radius: 16px !important;
        overflow: hidden !important;
        padding: 0 !important;
        box-shadow: rgba(17, 12, 46, 0.1) 0px 48px 100px 0px !important;
        max-width: 400px !important;
        width: 95% !important;
        margin: 0 auto !important;
      }
      
      /* Make sure text doesn't overflow */
      .truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      @media (max-width: 640px) {
        .swal-player-popup {
          max-width: 95% !important;
        }
      }
    `;
    document.head.appendChild(style);
  };
  return (
    <section className="w-full max-w-7xl mx-auto p-4">
      {/* Desktop/Tablet View */}
      <h1 className="text-center text-3xl font-bold mb-6 tracking-tight">
        Team Formation - {index + 1}
      </h1>
      <div className="hidden sm:block relative w-full aspect-[16/10] max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden border border-green-800">
        {/* Background field image */}
        <div className="absolute inset-0 w-full h-full object-cover bg-gray-500" />

        {/* Field overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>

        {/* Field markings SVG overlay */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect
            x="40"
            y="40"
            width="920"
            height="520"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            rx="8"
          />
          <circle
            cx="500"
            cy="300"
            r="80"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <line
            x1="500"
            y1="40"
            x2="500"
            y2="560"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <rect
            x="40"
            y="170"
            width="140"
            height="260"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <rect
            x="820"
            y="170"
            width="140"
            height="260"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <rect
            x="40"
            y="220"
            width="80"
            height="160"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <rect
            x="880"
            y="220"
            width="80"
            height="160"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <circle cx="500" cy="300" r="5" fill="rgba(255,255,255,0.6)" />
          <circle cx="160" cy="300" r="5" fill="rgba(255,255,255,0.6)" />
          <circle cx="840" cy="300" r="5" fill="rgba(255,255,255,0.6)" />
        </svg>

        {/* Players container with grid layout */}
        <div className="absolute inset-0 grid grid-cols-4 items-center z-10">
          {/* Goalkeepers */}
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Display first player as goalkeeper */}
            {teamSummary.playersByPosition.goalkeepers.map(
              (goalkeeper, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handlePlayerClick(goalkeeper)}
                >
                  {/* Player circular frame with fancy border */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                    <img
                      src={goalkeeper.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(goalkeeper.name || 'Player')}&background=0D8ABC&color=fff&size=96`}
                      alt={goalkeeper.name}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(goalkeeper.name || 'Player')}&background=0D8ABC&color=fff&size=96`; }}
                    />
                  </div>

                  {/* Player number badge */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold border border-white shadow-md">
                    1
                  </div>

                  {/* Player name tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded-full whitespace-nowrap transition-opacity duration-200">
                    {goalkeeper.name} ({goalkeeper.position})
                  </div>
                </div>
              )
            )}
          </div>

          {/* Defenders */}
          <div className="flex flex-col items-center justify-around gap-1 py-4 h-full">
            {/* Display players 1-4 as defenders */}
            {teamSummary.playersByPosition.defenders.map((defender, index) => (
              <div
                key={index}
                className="group relative cursor-pointer transition-transform hover:scale-105"
                onClick={() => handlePlayerClick(defender)}
              >
                {/* Player circular frame */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                  <img
                    src={defender.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(defender.name || 'Player')}&background=0D8ABC&color=fff&size=96`}
                    alt={defender.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(defender.name || 'Player')}&background=0D8ABC&color=fff&size=96`; }}
                  />
                </div>

                {/* Player number badge */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold border border-white shadow-md">
                  {index + 2}
                </div>

                {/* Player name tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded-full whitespace-nowrap transition-opacity duration-200">
                  {defender.name} ({defender.position})
                </div>
              </div>
            ))}
          </div>

          {/* Midfielders */}
          <div className="flex flex-col items-center justify-around gap-1 py-4 h-full">
            {/* Display players 5-7 as midfielders */}
            {teamSummary.playersByPosition.midfielders.map(
              (midfielder, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handlePlayerClick(midfielder)}
                >
                  {/* Player circular frame */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                    <img
                      src={midfielder.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(midfielder.name || 'Player')}&background=0D8ABC&color=fff&size=96`}
                      alt={midfielder.name}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(midfielder.name || 'Player')}&background=0D8ABC&color=fff&size=96`; }}
                    />
                  </div>

                  {/* Player number badge */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold border border-white shadow-md">
                    {index + 6}
                  </div>

                  {/* Player name tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded-full whitespace-nowrap transition-opacity duration-200">
                    {midfielder.name} ({midfielder.position})
                  </div>
                </div>
              )
            )}
          </div>

          {/* Forwards */}
          <div className="flex flex-col items-center justify-around gap-1 py-4 h-full mr-20">
            {/* Display players 8-10 as forwards */}
            {teamSummary.playersByPosition.forwards.map((forward, index) => (
              <div
                key={index}
                className="group relative cursor-pointer transition-transform hover:scale-105"
                onClick={() => handlePlayerClick(forward)}
              >
                {/* Player circular frame */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                  <img
                    src={forward.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(forward.name || 'Player')}&background=0D8ABC&color=fff&size=96`}
                    alt={forward.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(forward.name || 'Player')}&background=0D8ABC&color=fff&size=96`; }}
                  />
                </div>

                {/* Player number badge */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-yellow-600 flex items-center justify-center text-white text-sm font-bold border border-white shadow-md">
                  {index + 9}
                </div>

                {/* Player name tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded-full whitespace-nowrap transition-opacity duration-200">
                  {forward.name} ({forward.position})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formation indicator */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-1 rounded-full text-sm font-medium border border-white/30 flex gap-4">
          <li>4-3-3</li>
          <li>Total Cost = {teamSummary.totalPrice} Eur</li>
        </div>
      </div>

      {/* Mobile View - Enhanced Card-based Layout */}
      <div className="sm:hidden mt-2 space-y-4">
        {/* Formation card */}
        <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-xl p-4 text-center shadow-lg">
          <h2 className="text-white font-bold text-xl">Team Formation</h2>
          <div className="bg-white/20 text-white  font-bold rounded-full px-8 py-2 mt-2 inline-block">
            <li className="text-lg">4-3-3</li>
            <li>Total Cost = {teamSummary.totalPrice} Eur</li>
          </div>
        </div>

        {/* Position sections */}
        {[
          {
            title: "Goalkeepers",
            players: teamSummary.playersByPosition.goalkeepers || [],
            color: "red",
            colorClass: "bg-red-600",
          },
          {
            title: "Defenders",
            players: teamSummary.playersByPosition.defenders || [],
            color: "blue",
            colorClass: "bg-blue-600",
          },
          {
            title: "Midfielders",
            players: teamSummary.playersByPosition.midfielders || [],
            color: "green",
            colorClass: "bg-green-600",
          },
          {
            title: "Forwards",
            players: teamSummary.playersByPosition.forwards || [],
            color: "yellow",
            colorClass: "bg-yellow-600",
          },
        ].map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-gray-50 rounded-xl shadow-md overflow-hidden"
          >
            <div
              className={`${section.colorClass} text-white p-3 flex items-center justify-between`}
            >
              <h3 className="text-md font-bold">{section.title}</h3>
              <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded-full">
                {section.players.length} players
              </span>
            </div>
            <div className="flex flex-row overflow-x-auto gap-3 p-4">
              {section.players.map((player, playerIndex) => (
                <div
                  key={playerIndex}
                  className="flex-shrink-0 cursor-pointer flex flex-col items-center"
                  onClick={() => handlePlayerClick(player)}
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src={player.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name || 'Player')}&background=0D8ABC&color=fff&size=64`}
                      alt={player.name}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name || 'Player')}&background=0D8ABC&color=fff&size=64`; }}
                    />
                    <div
                      className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border border-white shadow-sm"
                      style={{
                        backgroundColor: `var(--${section.color}-600, ${section.colorClass})`,
                      }}
                    >
                      {section.title === "Goalkeepers"
                        ? 1
                        : section.title === "Defenders"
                        ? playerIndex + 2
                        : section.title === "Midfielders"
                        ? playerIndex + 6
                        : playerIndex + 9}
                    </div>
                  </div>
                  <p className="text-xs text-center mt-1 font-medium">
                    {player.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Squad Info Section - Only visible on larger devices */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          Squad Players
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {team && team.players ? (
            team.players.map((player, idx) => (
              <div
                key={idx}
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handlePlayerClick(player)}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                  <img
                    src={player.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name || 'Player')}&background=0D8ABC&color=fff&size=48`}
                    alt={player.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name || 'Player')}&background=0D8ABC&color=fff&size=48`; }}
                  />
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="font-medium text-gray-800 truncate">
                    {player.name}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span
                      className={`w-2 h-2 rounded-full mr-1 ${
                        player.position === "Defence"
                          ? "bg-blue-500"
                          : player.position === "Midfield"
                          ? "bg-green-500"
                          : player.position === "Forward"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span className="mr-2">{player.position}</span>
                    <span className="text-xs text-green-600 font-medium">
                      €{formatPrice(player.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No player data available</p>
          )}
        </div>

        {/* Team Summary Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500 font-medium">Total Players</p>
            <p className="text-xl font-bold text-blue-700">
              {teamSummary.totalPlayer}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500 font-medium">Total Budget</p>
            <p className="text-xl font-bold text-green-700">
              €{formatPrice(teamSummary.totalPrice)}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500 font-medium">Formation</p>
            <p className="text-xl font-bold text-purple-700">4-3-3</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500 font-medium">Avg. Price</p>
            <p className="text-xl font-bold text-yellow-700">
              €
              {teamSummary.totalPlayer > 0
                ? formatPrice(teamSummary.totalPrice / teamSummary.totalPlayer)
                : "0M"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamRender;
