import Session from "../Model/SessionModel.js";

// Add a new session
export const createSession = async (req, res) => {
  try {
    const {
      instructorId,
      moduleName,
      moduleCode,
      startTime,
      endTime,
      location,
      description
    } = req.body;

    const newSession = new Session({
      instructorId,
      moduleName,
      moduleCode,
      startTime,
      endTime,
      location,
      description
    });

    const savedSession = await newSession.save();
    res.status(201).json({ message: "Session created successfully", session: savedSession });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all sessions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all sessions for an instructor
export const getSessionsByInstructor = async (req, res) => {
  try {
    const sessions = await Session.find({ instructorId: req.params.id });
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};