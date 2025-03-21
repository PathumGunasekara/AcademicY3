const express = require("express");
const router = express.Router();

//Insert model
const User = require("../Model/CourseModel");

const CourseController = require("../Controllers/CourseController");

router.get("/", CourseController.getAllCourses);
router.post("/", CourseController.addCourses);
router.get("/:id", CourseController.getById);
router.put("/:id", CourseController.updateCourse);
router.delete("/:id", CourseController.deleteCourse);

module.exports = router;
