const express = require('express');
const router = express.Router();
const { createSession, getSessionsByInstructor } = require('../Controllers/sessionController');

router.post('/', createSession);
router.get('/', async (req, res) => {
    try {
      const sessions = await Session.find();
      res.status(200).json({ sessions });
    } catch (error) {
      console.error("Error fetching sessions:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });

module.exports = router;
