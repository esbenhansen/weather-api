import express from 'express';
import { getForecast, getSummary } from '../controller';
const router = express.Router();

router.get('/weather/summary', getSummary);
router.get('/weather/cities/:id', getForecast);

export = router;