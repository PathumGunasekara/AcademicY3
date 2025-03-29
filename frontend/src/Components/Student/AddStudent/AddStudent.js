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

        if (name === "Name") {
            errorMessage = /^[a-zA-Z ]*$/.test(value) ? "" : "Name must contain only letters.";
        } else if (name === "Id") {
            errorMessage = /^[A-Z]{2}[0-9]{8}$/.test(value) ? "" : "Student ID must start with two uppercase letters followed by 8 digits.";
        } else if (name === "Phone") {
            errorMessage = /^[0-9]{10}$/.test(value) ? "" : "Phone number must contain exactly 10 digits.";
        }

        setInputs(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/students", inputs);
            navigate('/StudentDetails');
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <StudentNav />
            <h1 style={{ textAlign: 'center', color: '#003366' }}>Add Student</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto', background: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                {['Name', 'Id', 'Phone'].map(field => (
                    <div key={field} style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold' }}>{field}</label><br />
                        <input type="text" name={field} onChange={handleChange} value={inputs[field]} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        <span style={{ color: 'red', fontSize: '12px' }}>{errors[field]}</span>
                    </div>
                ))}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold' }}>Faculty</label><br />
                    <select name="Course" onChange={handleChange} value={inputs.Course} required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option value="">Select Faculty</option>
                        <option value="Computing">Faculty of Computing</option>
                        <option value="Engineering">Faculty of Engineering</option>
                        <option value="Science">Faculty of Science</option>
                        <option value="Business">Faculty of Business</option>
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold' }}>Date of Birth</label><br />
                    <input type="date" name="DateOfBirth" onChange={handleChange} value={inputs.DateOfBirth} max={getTodayDate()} required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold' }}>Gender</label><br />
                    <select name="Gender" onChange={handleChange} value={inputs.Gender} required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold' }}>Email Address</label><br />
                    <input type="email" name="Email" onChange={handleChange} value={inputs.Email} required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold' }}>Address</label><br />
                    <textarea name="Address" rows="4" onChange={handleChange} value={inputs.Address} required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#003366', color: 'white', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Submit</button>
            </form>
        </div>
    );
}

export default AddStudent;
