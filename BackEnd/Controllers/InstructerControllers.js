const { Instructor } = require("../Model/InstructerModel");

// Get all instructors
const getAllInstructors = async (req, res, next) => {
    let instructors;
    try {
        instructors = await Instructor.find();
    } catch (err) {
        return res.status(500).json({ message: "Error fetching instructors", error: err });
    }

    if (!instructors || instructors.length === 0) {
        return res.status(404).json({ message: "No instructors found" });
    }

    return res.status(200).json({ instructors });
};

// Add an instructor
const addInstructor = async (req, res, next) => {
    const { name, email, phone, image, availability } = req.body;

    let instructor;
    try {
        instructor = new Instructor({ name, email, phone, image, availability });
        await instructor.save();
    } catch (err) {
        return res.status(500).json({ message: "Error adding instructor", error: err });
    }

    return res.status(201).json({ instructor });
};

// Get instructor by ID
const getInstructorById = async (req, res, next) => {
    const id = req.params.id;

    let instructor;
    try {
        instructor = await Instructor.findById(id);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching instructor", error: err });
    }

    if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
    }

    return res.status(200).json({ instructor });
};

// Update instructor details
const updateInstructor = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, phone, image, availability } = req.body;

    let instructor;
    try {
        instructor = await Instructor.findByIdAndUpdate(id, { name, email, phone, image, availability }, { new: true });
    } catch (err) {
        return res.status(500).json({ message: "Error updating instructor", error: err });
    }

    if (!instructor) {
        return res.status(404).json({ message: "Unable to update instructor" });
    }

    return res.status(200).json({ instructor });
};

// Delete instructor
const deleteInstructor = async (req, res, next) => {
    const id = req.params.id;

    let instructor;
    try {
        instructor = await Instructor.findByIdAndDelete(id);
    } catch (err) {
        return res.status(500).json({ message: "Error deleting instructor", error: err });
    }

    if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
    }

    return res.status(200).json({ message: "Instructor removed successfully" });
};

// Export functions
exports.getAllInstructors = getAllInstructors;
exports.addInstructor = addInstructor;
exports.getInstructorById = getInstructorById;
exports.updateInstructor = updateInstructor;
exports.deleteInstructor = deleteInstructor;
