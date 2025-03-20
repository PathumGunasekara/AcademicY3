
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Components/UserHomePage/Home";



function App() {


  return (
    <div >
      
      <Home/>
      <React.Fragment>
        <Routes>
            
            <Route path="/" element={<Home/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
