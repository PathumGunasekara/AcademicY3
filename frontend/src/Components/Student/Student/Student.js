import React from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Student({ student, onDelete }) { // Accept an `onDelete` prop to update state
  const { _id, Name, Id, Course, DateOfBirth, Gender, Phone, Email, Address } = student;
  
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/students/${_id}`);
      onDelete(_id); // Update parent component state
      navigate("/StudentDetails"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      
      <br />
      
      <h1>Name: {Name}</h1>
      <h1>Student ID: {Id}</h1>
      <h1>Course: {Course}</h1>
      <h1>Date of Birth: {DateOfBirth}</h1>
      <h1>Gender: {Gender}</h1>
      <h1>Phone Number: {Phone}</h1>
      <h1>Email: {Email}</h1>
      <h1>Address: {Address}</h1>
      
      <Link to={`/StudentDetails/${_id}`}>Update</Link>
      <button onClick={deleteHandler}>Delete</button>
      
      <br /><br />
    </div>
  );
}

export default Student;
