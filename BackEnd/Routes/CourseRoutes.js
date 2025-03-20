const express = require("express");
const router = express.Router();
const CourseController = require("../Controllers/CourseControllers");

router.get("/", CourseController.getAllCourses);
router.post("/", CourseController.addCourse);
router.get("/:id", CourseController.getById);
router.put("/:id", CourseController.updateCourse);
router.delete("/:id", CourseController.deleteCourse);

module.exports = router;  // Export the router