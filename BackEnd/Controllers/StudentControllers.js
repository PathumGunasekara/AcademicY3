const Student = require("../Model/StudentModel");

//data display
const getAllStudents = async (req, res, next) => {

    let Students;

    //get all category
    try{
        students = await Student.find();
    }catch (err) {
        console.log(err);
    }

    //not found
    if(!students){
        return res.status(404).json({message:"student not found"});
    }

    //display all categories
    return res.status(200).json({ students });

};

//data insert
const addStudents = async (req, res, next) => {

    const {Name,Id,Course,DateOfBirth,Gender,Phone,Email,Address} = req.body;

    let students;

    try{
        students = new Student({Name,Id,Course,DateOfBirth,Gender,Phone,Email,Address});
        await students.save();
    }catch (err) {
        console.log(err);
    }

    //not insert category
    if(!students){
        return res.status(404).json({ message: "unable to add Students"});
    }
    return res.status(200).json({ students });

};

//Get by Id
const getById = async (req, res, next) => {

    const id = req.params.id;

    let student;


    try{
        student = await Student.findById(id);
    }catch (err) {
        console.log(err);
    }

        //not available category
        if(!student){
            return res.status(404).json({ message: "Category Not Found"});
        }
        return res.status(200).json({ student });
    

}

//Update user details
const updateStudent = async (req, res, next) => {

    const id = req.params.id;
    const {Name,Id,Course,DateOfBirth,Gender,Phone,Email,Address} = req.body;

    let students;

    try{
        students = await Student.findByIdAndUpdate(id,
            {Name: Name, Id: Id, Course :Course, DateOfBirth :DateOfBirth ,Gender :Gender ,Phone :Phone ,Email: Email,Address :Address});
            students = await students.save();
    }catch(err) {
        console.log(err);
    }

    if(!students){
        return res.status(404).json({ message: "Unable to Update Student Details"});
    }
    return res.status(200).json({ students });

};

//Delete category details
const deleteStudent = async (req, res, next) => {
    const id = req.params.id;

    let student;
    
    try{
        student = await Student.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }

    if(!student){
        return res.status(404).json({ message: "Unable to Delete Student Details"});
    }
    return res.status(200).json({ student });

};


exports.getAllStudents = getAllStudents;
exports.addStudents = addStudents;
exports.getById = getById;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;

