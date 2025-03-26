import React, { useState } from 'react';
import StudentNav from "../StudentNav/StudentNav";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddStudent() {
    const navigate = useNavigate();  // ✅ Corrected variable name from `history` to `navigate`
    const [inputs, setInputs] = useState({
        Name: "",
        Id: "",
        Course: "",
        DateOfBirth: "",
        Gender: "",
        Phone: "",
        Email: "",
        Address: "",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        
        try {
            await sendRequest();
            navigate('/StudentDetails');  // ✅ Correct navigation
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const sendRequest = async () => {
        return await axios.post("http://localhost:5000/students", {
            Name: inputs.Name,
            Id: inputs.Id,
            Course: inputs.Course,
            DateOfBirth: inputs.DateOfBirth,
            Gender: inputs.Gender,
            Phone: inputs.Phone,
            Email: inputs.Email,
            Address: inputs.Address,
        });
    };

    return (
        <div>
            <StudentNav />
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <br />
                <input type="text" name="Name" onChange={handleChange} value={inputs.Name} required />
                <br /><br />
                <label>Student ID</label>
                <br />
                <input type="text" name="Id" onChange={handleChange} value={inputs.Id} required />
                <br /><br />
                <label>Course</label>
                <br />
                <input type="text" name="Course" onChange={handleChange} value={inputs.Course} required />
                <br /><br />
                <label>Date of Birth</label>
                <br />
                <input type="text" name="DateOfBirth" onChange={handleChange} value={inputs.DateOfBirth} required />
                <br /><br />
                <label>Gender</label>
                <br />
                <input type="text" name="Gender" onChange={handleChange} value={inputs.Gender} required />
                <br /><br />
                <label>Phone Number</label>
                <br />
                <input type="text" name="Phone" onChange={handleChange} value={inputs.Phone} required />
                <br /><br />
                <label>Email Address</label>
                <br />
                <input type="email" name="Email" onChange={handleChange} value={inputs.Email} required />
                <br /><br />
                <label>Address</label>
                <br />
                <input type="text" name="Address" onChange={handleChange} value={inputs.Address} required />
                <br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddStudent;
