const express = require("express");
const router = express.Router();
 HEAD
const CourseController = require("../Controllers/CourseControllers");

router.get("/", CourseController.getAllCourses);
router.post("/", CourseController.addCourse);
router.get("/:id", CourseController.getById);
router.put("/:id", CourseController.updateCourse);
router.delete("/:id", CourseController.deleteCourse);

module.exports = router;  // Export the router


//Insert model
const User = require("../Model/CourseModel");

//Course Controller
const courseControllers = require("../Controllers/CourseControllers");

router.get("/", courseControllers.getAllCourses);
router.post("/", courseControllers.addCourses);
router.get("/:id", courseControllers.getById);
router.put("/:id", courseControllers.updateCourse);
router.delete("/:id", courseControllers.deleteCourse);

module.exports = router; Development
