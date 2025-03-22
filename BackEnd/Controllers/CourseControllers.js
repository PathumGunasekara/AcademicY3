const Course = require("../Model/CourseModel");

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses.length) {
            return res.status(404).json({ message: "No courses found" });
        }
        return res.status(200).json({ courses });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" }); 
    }
}; 

// Add a new course
const addCourse = async (req, res) => {
    const { courseName, courseCode, instructorName, credits } = req.body;

    try {
        const newCourse = new Course({ courseName, courseCode, instructorName, credits });
        await newCourse.save();
        return res.status(201).json({ course: newCourse });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add course" });
    }
};

// Get course by ID
const getById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ course });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update course details
const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ course: updatedCourse });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update course" });
    }
};

// Delete course
const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Unable to delete course" });
        }
        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Export controllers
module.exports = {
    getAllCourses,
    addCourse,
    getById,
    updateCourse,
    deleteCourse
};
