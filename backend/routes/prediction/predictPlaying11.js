import express from 'express'
import { predict_best_teams } from "../../controllers/prediction/predict-best-team.js"

const router = express.Router()

router.post("/predict-11", predict_best_teams);

export default router;