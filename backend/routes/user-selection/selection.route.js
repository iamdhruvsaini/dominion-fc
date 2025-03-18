import express from "express"
import { addPlayerToUserSelection, getUserSelectedPlayers, removePlayerFromUserSelection } from "../../controllers/user-selection/selection.controller.js";
const router=express.Router();

router.post('/player',addPlayerToUserSelection);
router.get('/selected-player/:userId',getUserSelectedPlayers)
router.delete('/selected-player/remove',removePlayerFromUserSelection);

export default router;