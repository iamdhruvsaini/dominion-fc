import express from 'express';
import { getTopRatedPlayersHandler, getHighPotentialPlayersHandler, getBiggestRatingDifferencesHandler } from '../../controllers/stats/potential-ranking/potentialRanking.controller.js';
import { getMostValuablePlayersHandler, getHighestPaidPlayersHandler, getBestValueForMoneyPlayersHandler } from '../../controllers/stats/financial-ranking/financialRanking.controller..js';
import { getBestDefenders, getBestForwards, getBestGoalkeepers, getBestMidfielders } from '../../controllers/stats/position-ranking/positionRanking.controller.js';
import { getBestAllRoundPlayers, getBestAttackingPlayers, getBestDefensivePlayers, getPlayersWithBestFitnessLevel, getPlayersWithHighestSkillMoves } from '../../controllers/stats/players-skills-comparison/playersSkillsComp.controller.js';
import { fetchSimilarPlayer } from '../../controllers/stats/player-compariosn/playerComparison.controller.js';
import { getBestDribbersHandler, getBestPassersHandler, getFastestPlayersHandler, getMostPhysicalPlayersHandler } from '../../controllers/stats/skill-based-ranking/skillBasedRanking.js';



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

router.get("/best-forwards", getBestForwards);
router.get("/best-midfielders", getBestMidfielders);
router.get("/best-defenders", getBestDefenders);
router.get("/best-goalkeepers", getBestGoalkeepers);


//based on specialized

router.get("/players-with-highest-skill-moves", getPlayersWithHighestSkillMoves);
router.get("/best-players-by-attacking-attributes", getBestAttackingPlayers);
router.get("/best-players-by-defensive-attributes", getBestDefensivePlayers);
router.get("/best-all-round-players", getBestAllRoundPlayers);
router.get("/players-with-best-fitness-level", getPlayersWithBestFitnessLevel);


//skill based ranking

router.get("/best-dribblers",getBestDribbersHandler);
router.get("/best-passers",getBestPassersHandler);
router.get("/fastest-players",getFastestPlayersHandler);
router.get("/most-physical-players",getMostPhysicalPlayersHandler);


// comparison routes
router.get("/comparison/similar-player/:overall/:position", fetchSimilarPlayer);


export default router;




