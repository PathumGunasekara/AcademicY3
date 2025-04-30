const Exam = require("../Model/ExamModel");

const getAllExams = async (req, res, next) => {

    let Exams;

    //get all exams
    try{
        Exams = await Exam.find();
    }
    catch(err){
        console.error(err);
    }
    //not found
    if(!Exams){
        return res.status(404).json({message:"Exams not found"});
    }

    //display all exams
    return res.status(200).json({Exams});

};

//data insert
const addExams = async (req, res, next) => {

    const {courseName, courseCode, examType, date, startTime, duration, endTime, location} = req.body;
     
    let exams;  

    try{
        exams = new Exam({courseName, courseCode, examType, date, startTime, duration, endTime, location});
        await exams.save();
    }catch (err) {
        console.log(err); 
        return res.status(500).json({ message: "Internal Server Error" });
    }

    //not insert exams
    if (!exams){
        return res.status(404).json({message:"unable to add exams"});

    }
    return res.status(201).json({ exams });
};

//get by id
const getById = async (req, res, next) => {

    const id = req.params.id; 

    let exam; 

    try{
        exam = await Exam.findById(id);
    }catch(err) { 
        console.log(err);
    }
    
    //not available exams
    if (!exam){
        return res.status(404).json({message:"exam not found"});

    }
    return res.status(200).json({ exam }); 
};
 
//update user details 
const updateExam = async (req, res, next) => {

    const id = req.params.id; 
    const {courseName, courseCode, examType, date, startTime, duration, endTime, location} = req.body;

    let exams; 

    try{
        exams = await Exam.findByIdAndUpdate (id,
            {courseName:courseName, courseCode:courseCode, examType:examType, date:date, startTime:startTime, duration:duration, endTime:endTime, location:location });
            exams = await exams.save();
    }catch(err){
        console.log(err);

    }
    if (!exams){
        return res.status(404).json({message:"exam not found"});

    }
    return res.status(200).json({ exams });
};

//delete exam

const deleteExam = async (req, res, next) => {

    const id = req.params.id;
    const {courseName, courseCode, examType, date, startTime, duration, endTime, location} = req.body;

    let exams;

    try{
        exams = await Exam.findByIdAndDelete (id)
            
    }catch(err){
        console.log(err);

    }
    if (!exams){
        return res.status(404).json({message:"unable to delete exam details"});
  
    } 
    return res.status(200).json({ exams });
};

 

exports.getAllExams = getAllExams;
exports.addExams = addExams;
exports.getById = getById; 
exports.updateExam = updateExam;
exports.deleteExam = deleteExam;