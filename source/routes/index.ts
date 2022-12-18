import express from 'express';
import { getTemperaturesForNextDays, getSummary } from '../controller';

const router = express.Router();

router.get('/weather/summary', getSummary);
router.get('/weather/cities/:id', getTemperaturesForNextDays);

export = router;
