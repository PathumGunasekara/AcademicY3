const express = require("express");
const router = express.Router();

//insert Model
const Student = require("../Model/StudentModel");

//insert category Controller
const StudentController = require("../Controllers/StudentControllers");

router.get("/",StudentController.getAllStudents);
router.post("/",StudentController.addStudents);
router.get("/:id",StudentController.getById);
router.put("/:id",StudentController.updateStudent);
router.delete("/:id",StudentController.deleteStudent);

//export
module.exports = router;