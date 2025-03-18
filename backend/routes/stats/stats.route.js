import express from 'express';
import { getTopRatedPlayersHandler, getHighPotentialPlayersHandler, getBiggestRatingDifferencesHandler } from '../../controllers/stats/potential-ranking/potentialRanking.controller.js';
import { getMostValuablePlayersHandler, getHighestPaidPlayersHandler, getBestValueForMoneyPlayersHandler } from '../../controllers/stats/financial-ranking/financialRanking.controller..js';
import { getBestDefendersHandler, getBestForwardsHandler, getBestGoalkeepersHandler, getBestMidfieldersHandler } from '../../controllers/stats/position-ranking/positionRanking.controller.js';
import { getPlayersWithHighestSkillMovesHandler, getBestAttackingPlayersHandler, getBestDefensivePlayersHandler, getBestAllRoundPlayersHandler, getPlayersWithBestFitnessLevelHandler } from '../../controllers/stats/players-skills-comparison/playersSkillsComp.controller.js';
import { fetchSimilarPlayerHandler } from '../../controllers/stats/player-compariosn/playerComparison.controller.js';


const router = express.Router();

//Based on Potential Ranking

router.get('/top-rated-players', getTopRatedPlayersHandler);
router.get('/high-potential-players', getHighPotentialPlayersHandler);
router.get('/biggest-rating-differences', getBiggestRatingDifferencesHandler);


//based on financial ranking

router.get("/most-valuable-players", getMostValuablePlayersHandler);
router.get("/highest-paid-players", getHighestPaidPlayersHandler);
router.get("/best-value-for-money", getBestValueForMoneyPlayersHandler);


//based on position ranking

router.get("/best-forwards", getBestForwardsHandler);
router.get("/best-midfielders", getBestMidfieldersHandler);
router.get("/best-defenders", getBestDefendersHandler);
router.get("/best-goalkeepers", getBestGoalkeepersHandler);


//based on players skills 

router.get("/players-with-highest-skill-moves", getPlayersWithHighestSkillMovesHandler);
router.get("/best-players-by-attacking-attributes", getBestAttackingPlayersHandler);
router.get("/best-players-by-defensive-attributes", getBestDefensivePlayersHandler);
router.get("/best-all-round-players", getBestAllRoundPlayersHandler);
router.get("/players-with-best-fitness-level", getPlayersWithBestFitnessLevelHandler);



// comparison routes
router.get("/comparison/similar-player/:overall/:position", fetchSimilarPlayerHandler);


export default router;




