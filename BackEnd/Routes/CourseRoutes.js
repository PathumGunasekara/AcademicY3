const express = require("express");
const router = express.Router();
const {
    getAllCourses,
    addCourse,
    getById,
    updateCourse,
    deleteCourse
} = require("../Controllers/CourseControllers");

// Define Routes
router.get("/", getAllCourses);
router.post("/", addCourse);
router.get("/:id", getById); 
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
