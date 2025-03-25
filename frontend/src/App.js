import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import RegisterForm from "./Components/Register/RegisterForm";
import LoginForm from "./Components/Login/LoginForm";
import Home from "./Components/UserHomePage/Home";
import StudentHome from "./Components/Student/StudentHome";
import Exams from './Components/Exam/Exams';
import AddExam from './Components/Exam/AddExam';
import UpdateExam from './Components/Exam/UpdateExam';
import AddCourse from "./Components/Course/AddCourse";
import UpdateCourse from "./Components/Course/UpdateCourse";
import DeleteCourse from "./Components/Course/DeleteCourse";
import ViewCourse from "./Components/Course/ViewCourse";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/StudentHome" element={<StudentHome />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<RegisterForm />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/addexam" element={<AddExam />} />
          <Route path="/examdetails/:id" element={<UpdateExam />} />
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
