
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterForm from "./Components/Register/RegisterForm";
import LoginForm from "./Components/Login/LoginForm";
import Home from "./Components/UserHomePage/Home";
import StudentHome from "./Components/Student/StudentHome/StudentHome";
 
import AddCourse from "./Components/Course/AddCourse";
import UpdateCourse from "./Components/Course/UpdateCourse";
import DeleteCourse from "./Components/Course/DeleteCourse";
import ViewCourse from "./Components/Course/ViewCourse";

import AddStudent from './Components/Student/AddStudent/AddStudent';
import StudentDetails from './Components/Student/StudentDetails/StudentDetails';
import UpdateStudent from './Components/Student/UpdateStudent/UpdateStudent';




import Exams from './Components/Exam/Exams';
import AddExam from './Components/Exam/AddExam';
import UpdateExam from './Components/Exam/UpdateExam';




import InstructorHome from './Components/Instructor/InstructorHome';
import ManageAvailability from './Components/Instructor/ManageAvailability';
import AddInstructor from './Components/Instructor/AddInstructor';
import UpdateInstructor from './Components/Instructor/UpdateInstructor';




function App() {


  return (
    <div >
      
      
      <React.Fragment>
        <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/StudentHome" element={<StudentHome/>}/>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
 Pathum
           
           <Route path="/AddStudent" element={<AddStudent/>}/>
            <Route path="/StudentDetails" element={<StudentDetails/>}/>
            <Route path="/StudentDetails/:id" element={<UpdateStudent/>}/>
            

            <Route path="/exams" element={<Exams />} />
            <Route path="/addexam" element={<AddExam />} />
            <Route path="/examdetails/:id" element={<UpdateExam />} />



            <Route path="/InstructorHome" element={<InstructorHome />} /> 
            <Route path="/manage-availability" element={<ManageAvailability />} /> 
            <Route path="/addinstructor" element={<AddInstructor />} />
            <Route path="/updateinstructor/:id" element={<UpdateInstructor />} />


 
            <Route path="/" element={<Home/>}/>
            <Route path="/instructors" element={<InstructorHome />} />
            <Route path="/instructor-availability" element={<ManageAvailability />} />

            <Route path="/courses" element={<ViewCourse />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/updatecourse/:courseCode" element={<UpdateCourse />} />
            <Route path="/deletecourse/:courseCode" element={<DeleteCourse />} />

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
