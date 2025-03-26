
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterForm from "./Components/Register/RegisterForm";
import LoginForm from "./Components/Login/LoginForm";
import Home from "./Components/UserHomePage/Home";
import StudentHome from "./Components/Student/StudentHome/StudentHome";
 

import AddStudent from './Components/Student/AddStudent/AddStudent';
import StudentDetails from './Components/Student/StudentDetails/StudentDetails';
import UpdateStudent from './Components/Student/UpdateStudent/UpdateStudent';




import Exams from './Components/Exam/Exams';
import AddExam from './Components/Exam/AddExam';
import UpdateExam from './Components/Exam/UpdateExam';


function App() {


  return (
    <div >
      
      
      <React.Fragment>
        <Routes>
            
            <Route path ="/Home" element={<Home/>}/>
            <Route path="/StudentHome" element={<StudentHome/>}/>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<RegisterForm />} />
 Pathum
           
           <Route path="/AddStudent" element={<AddStudent/>}/>
            <Route path="/StudentDetails" element={<StudentDetails/>}/>
            <Route path="/StudentDetails/:id" element={<UpdateStudent/>}/>
            

            <Route path="/exams" element={<Exams />} />
            <Route path="/addexam" element={<AddExam />} />
            <Route path="/examdetails/:id" element={<UpdateExam />} />
 Development
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
