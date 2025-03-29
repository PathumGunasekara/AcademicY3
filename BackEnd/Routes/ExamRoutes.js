const express = require("express");
const router = express.Router();

const Exam = require("../Model/ExamModel");

const ExamController = require("../Controllers/ExamControllers");

router.get("/", ExamController.getAllExams);
router.post("/", ExamController.addExams);
router.get("/:id", ExamController.getById);
router.put("/:id", ExamController.updateExam);
router.delete("/:id", ExamController.deleteExam);

module.exports = router;
