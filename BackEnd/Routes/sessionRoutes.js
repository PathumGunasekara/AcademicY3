import express from 'express';
import { createSession, getSessionsByInstructor, getAllSessions } from '../Controllers/sessionController.js';

const router = express.Router();

// Create a new session
router.post('/', createSession);

// Get all sessions
router.get('/', getAllSessions);

// Get sessions by instructor ID
router.get('/:id', getSessionsByInstructor);

export default router;