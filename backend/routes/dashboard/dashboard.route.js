import express from "express"
import { getPlayerDetailsByIDHandler, getPlayerPositionCountHandler, getRecentSoldPlayerHandler } from "../../controllers/dashboard/dashboard.controller.js";

const router = express.Router();

router.get('/player-position-count', getPlayerPositionCountHandler)
router.get('/recent-sold-player', getRecentSoldPlayerHandler);
router.get('/player-detail/:playerId', getPlayerDetailsByIDHandler);

export default router;



// get  => /player-position-count : returns the number of player in each bucket for our graph