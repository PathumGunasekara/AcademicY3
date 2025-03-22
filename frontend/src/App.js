
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterForm from "./Components/Register/RegisterForm";
import LoginForm from "./Components/Login/LoginForm";
import Home from "./Components/UserHomePage/Home";
import StudentHome from "./Components/Student/StudentHome/StudentHome";


function App() {


  return (
    <div >
      
      
      <React.Fragment>
        <Routes>
            
            
            <Route path="/StudentHome" element={<StudentHome/>}/>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<RegisterForm />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
