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
  const {
    courseName,
    courseCode,
    instructorName,
    credits,
    department,
    courseDescription,
  } = req.body;

  try {
    // Check if courseCode already exists
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res
        .status(400)
        .json({ message: "Course with this code already exists" });
    }

    const newCourse = new Course({
      courseName,
      courseCode,
      instructorName,
      credits,
      department,
      courseDescription,
    });

    await newCourse.save();
    return res.status(201).json({ course: newCourse });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to add course" });
  }
};

// Get course by Course Code
const getById = async (req, res) => {
  try {
    const course = await Course.findOne({ courseCode: req.params.courseCode });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ course });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update course by Course Code
const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { courseCode: req.params.courseCode },
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

// Delete course by Course Code
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findOneAndDelete({
      courseCode: req.params.courseCode,
    });

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
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
  deleteCourse,
};
