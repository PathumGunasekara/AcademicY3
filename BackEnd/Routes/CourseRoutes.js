const express = require("express");
const router = express.Router();

//Insert model
const User = require("../Model/CourseModel");

//Course Controller
const courseControllers = require("../Controllers/CourseControllers");

router.get("/", courseControllers.getAllCourses);
router.post("/", courseControllers.addCourses);
router.get("/:id", courseControllers.getById);
router.put("/:id", courseControllers.updateCourse);
router.delete("/:id", courseControllers.deleteCourse);

module.exports = router;