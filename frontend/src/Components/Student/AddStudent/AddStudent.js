import React, { useState } from 'react';
import StudentNav from "../StudentNav/StudentNav";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddStudent() {
    const navigate = useNavigate();
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
    
    const [errors, setErrors] = useState({
        Name: "",
        Id: "",
        Phone: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";

        // Name Validation - only letters and spaces
        if (name === "Name") {
            if (/^[a-zA-Z ]*$/.test(value)) {
                setInputs(prevState => ({ ...prevState, [name]: value }));
                errorMessage = "";
            } else {
                errorMessage = "Name must contain only letters.";
            }
        }

        // Student ID Validation - first two uppercase letters, followed by 8 digits, total length 10
        else if (name === "Id") {
            // Allow typing but only valid characters
            if (/^[A-Z]{0,2}[0-9]{0,8}$/.test(value)) {
                setInputs(prevState => ({ ...prevState, [name]: value }));
                // Check if the format is fully valid and show the message
                if (value.length === 10 && /^[A-Z]{2}[0-9]{8}$/.test(value)) {
                    errorMessage = "";
                } else {
                    errorMessage = "Student ID must start with two uppercase letters followed by 8 digits, total of 10 characters (e.g., IT22233776).";
                }
            } else {
                errorMessage = "Invalid characters in Student ID.";
            }
        }

        // Phone Validation - only 10 digits, no letters or special characters
        else if (name === "Phone") {
            // Only allow numbers and ensure it's exactly 10 digits
            if (/^[0-9]{0,10}$/.test(value)) {
                setInputs(prevState => ({ ...prevState, [name]: value }));
                // Check if the length is 10 digits
                if (value.length === 10) {
                    errorMessage = "";
                } else {
                    errorMessage = "Phone number must contain exactly 10 digits.";
                }
            } else {
                errorMessage = "Phone number must contain only digits.";
            }
        } else {
            setInputs(prevState => ({ ...prevState, [name]: value }));
        }

        setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        
        try {
            await sendRequest();
            navigate('/StudentDetails');
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const sendRequest = async () => {
        return await axios.post("http://localhost:5000/students", inputs);
    };

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <StudentNav />
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <br />
                <input type="text" name="Name" onChange={handleChange} value={inputs.Name} required />
                <span style={{ color: "red" }}>{errors.Name}</span>
                <br /><br />
                <label>Student ID</label>
                <br />
                <input type="text" name="Id" onChange={handleChange} value={inputs.Id} required />
                <span style={{ color: "red" }}>{errors.Id}</span>
                <br /><br />
                <label>Faculty</label>
                <br />
                <select name="Course" onChange={handleChange} value={inputs.Course} required >
                <option value="">Select Faculty</option>
                <option value="Computing">Faculty of Computing</option>
                <option value="Engineering">Faculty of Engineering</option>
                <option value="Science">Faculty of Science</option>
                <option value="Business">Faculty of Business</option>
                </select>
                <br /><br />
                <label>Date of Birth</label>
                <br />
                <input 
                    type="date" 
                    name="DateOfBirth" 
                    onChange={handleChange} 
                    value={inputs.DateOfBirth} 
                    max={getTodayDate()} 
                    required 
                />
                <br /><br />
                <label>Gender</label>
                <br />
                <select name="Gender" onChange={handleChange} value={inputs.Gender} required >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                </select>
                <br /><br />
                <label>Phone Number</label>
                <br />
                <input type="text" name="Phone" onChange={handleChange} value={inputs.Phone} required />
                <span style={{ color: "red" }}>{errors.Phone}</span>
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
