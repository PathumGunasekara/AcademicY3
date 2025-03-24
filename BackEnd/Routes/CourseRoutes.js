const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  addCourse,
  getById,
  updateCourse,
  deleteCourse,
} = require("../Controllers/CourseControllers");

// Define Routes
router.get("/", getAllCourses);
router.post("/", addCourse);
router.get("/:courseCode", getById);
router.put("/:courseCode", updateCourse);
router.delete("/:courseCode", deleteCourse);

module.exports = router;
