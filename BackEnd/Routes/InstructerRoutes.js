const express= require("express");
const router= express.Router();

//Insert model
const User = require("../Model/InstructerModel");

//Insert User Controller
const instructorController= require("../Controllers/InstructerControllers");

router.get("/",instructorController.getAllInstructors);
router.post("/",instructorController.addInstructor);
router.get("/:id",instructorController.getInstructorById);
router.put("/:id",instructorController.updateInstructor);
router.delete("/:id",instructorController.deleteInstructor);

//export
module.exports=router;

