
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




function App() {


  return (
    <div >
      
      
      <React.Fragment>
        <Routes>
            
            <Route path ="/Home" element={<Home/>}/>
            <Route path="/StudentHome" element={<StudentHome/>}/>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<RegisterForm />} />
           
           <Route path="/AddStudent" element={<AddStudent/>}/>
            <Route path="/StudentDetails" element={<StudentDetails/>}/>
            <Route path="/StudentDetails/:id" element={<UpdateStudent/>}/>
            
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
