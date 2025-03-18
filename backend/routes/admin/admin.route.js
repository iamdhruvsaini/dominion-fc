import express from "express"
import { addPlayerHandler, getAllAdminsHandler, getSoldPlayersHandler, getTrendingPlayersHandler, portalHomeStatsHandler, removePlayersHandler } from "../../controllers/admin/home/admin.home.controller.js";
import { authenticateAdmin } from "../../middlewares/authenticateAdmin.js";

const router = express();


router.get('/home-stats', portalHomeStatsHandler);
router.get('/trending-players', getTrendingPlayersHandler);
router.get('/recently-sold', getSoldPlayersHandler);
router.get('/employee-details', getAllAdminsHandler);
router.post('/remove-players', authenticateAdmin, removePlayersHandler);
router.put('/add-new-player', addPlayerHandler);

export default router;