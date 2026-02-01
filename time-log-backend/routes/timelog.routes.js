import express from 'express';
import {
  createTimeLog,
  getAllTimeLogs,
  updateTimeLog,
  deleteTimeLog
} from '../controllers/timelog.controller.js';

const router = express.Router();

router.post('/', createTimeLog);
router.get('/', getAllTimeLogs);
router.put('/:id', updateTimeLog);
router.delete('/:id', deleteTimeLog);

export default router;
