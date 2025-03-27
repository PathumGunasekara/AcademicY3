const { Instructor } = require("../Model/InstructerModel");

// Get all instructors
const getAllInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find();
        if (!instructors || instructors.length === 0) {
            return res.status(404).json({ message: "No instructors found" });
        }
        return res.status(200).json({ instructors });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching instructors", error: err.message });
    }
};

// Add an instructor
const addInstructor = async (req, res) => {
    const { firstName, lastName, email, phone, faculty, availability } = req.body;

    try {
        const instructor = new Instructor({ firstName, lastName, email, phone, faculty, availability });
        await instructor.save();
        return res.status(201).json({ instructor });
    } catch (err) {
        return res.status(500).json({ message: "Error adding instructor", error: err.message });
    }
};

// Get instructor by ID
const getInstructorById = async (req, res) => {
    const { id } = req.params;

    try {
        const instructor = await Instructor.findById(id);
        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        return res.status(200).json({ instructor });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching instructor", error: err.message });
    }
};

// Update instructor details
const updateInstructor = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, faculty, availability } = req.body;

    try {
        const instructor = await Instructor.findByIdAndUpdate(
            id, 
            { firstName, lastName, email, phone, faculty, availability }, 
            { new: true }
        );

        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }

        return res.status(200).json({ instructor });
    } catch (err) {
        return res.status(500).json({ message: "Error updating instructor", error: err.message });
    }
};

// Delete instructor
const deleteInstructor = async (req, res) => {
    const { id } = req.params;

    try {
        const instructor = await Instructor.findByIdAndDelete(id);
        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        return res.status(200).json({ message: "Instructor removed successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting instructor", error: err.message });
    }
};

// Export functions
module.exports = {
    getAllInstructors,
    addInstructor,
    getInstructorById,
    updateInstructor,
    deleteInstructor
};
