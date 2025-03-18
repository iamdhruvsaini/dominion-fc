import express from "express";
import { fetchAllPlayers, fetchDefenderPlayers, fetchForwardsPlayers, fetchGoalKeeperPlayers, fetchMidfieldersPlayers, fetchTrendingPlayers} from "../../controllers/player-position/playerPostion.controller.js";


const router=express();

router.get("/defenders",fetchDefenderPlayers);
router.get("/midfielders",fetchMidfieldersPlayers);
router.get("/forwards",fetchForwardsPlayers);
router.get("/goalkeepers",fetchGoalKeeperPlayers);
router.get("/trending",fetchTrendingPlayers);
router.get("/all-players",fetchAllPlayers);




export default router;


// const positions = [
//     'LW', 'ST', 'RW', // Forwards
//     'CDM', 'CAM', 'CM', // Midfielders
//     'RB', 'CB', 'LB', // Defenders
//     'GK' // Goalkeeper
//   ];
  