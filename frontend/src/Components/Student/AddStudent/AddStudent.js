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
        Phone: "",
        Email: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";

        // Name Validation
        if (name === "Name") {
            if (/^[a-zA-Z ]*$/.test(value)) {
                setInputs((prevState) => ({ ...prevState, [name]: value }));
                errorMessage = "";
            } else {
                errorMessage = "Name must contain only letters.";
            }
        }

        // Student ID Validation
        else if (name === "Id") {
            if (/^[A-Z]{0,2}[0-9]{0,8}$/.test(value)) {
                setInputs((prevState) => ({ ...prevState, [name]: value }));
                if (value.length === 10 && /^[A-Z]{2}[0-9]{8}$/.test(value)) {
                    errorMessage = "";
                } else {
                    errorMessage = "Student ID must start with two uppercase letters followed by 8 digits (e.g., IT22233776).";
                }
            } else {
                errorMessage = "Invalid characters in Student ID.";
            }
        }

        // Phone Validation
        else if (name === "Phone") {
            if (/^[0-9]{0,10}$/.test(value)) {
                setInputs((prevState) => ({ ...prevState, [name]: value }));
                if (value.length === 10) {
                    errorMessage = "";
                } else {
                    errorMessage = "Phone number must contain exactly 10 digits.";
                }
            } else {
                errorMessage = "Phone number must contain only digits.";
            }
        }

        // Email Validation
        else if (name === "Email") {
            setInputs((prevState) => ({ ...prevState, [name]: value }));
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMessage = "Please enter a valid email address.";
            }
        }

        else {
            setInputs((prevState) => ({ ...prevState, [name]: value }));
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if there are any validation errors before submitting
        const hasErrors = Object.values(errors).some(error => error !== "") || 
                          !inputs.Name || 
                          !inputs.Id || 
                          !inputs.Phone ||
                          !inputs.Email;
        
        if (hasErrors) {
            alert("Please fix all validation errors before submitting.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/students", inputs);
            navigate('/StudentDetails');
        } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response && error.response.status === 400) {
                alert("Student ID or Email already exists. Please use different values.");
            }
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div style={{ 
            fontFamily: 'Arial, sans-serif', 
            padding: '20px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
        }}>
            <StudentNav />
            <h1 style={{ 
                textAlign: 'center', 
                color: '#003366',
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>Add Student</h1>
            <form onSubmit={handleSubmit} style={{ 
                width: '60%', 
                margin: '0 auto', 
                padding: '30px', 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0, 51, 102, 0.1)',
                borderTop: '4px solid #FFD700'
            }}>
                <label style={{ 
                    fontWeight: 'bold', 
                    color: '#003366',
                    display: 'block',
                    marginBottom: '5px'
                }}>Name</label>
                <input 
                    type="text" 
                    name="Name" 
                    onChange={handleChange} 
                    value={inputs.Name} 
                    required 
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        margin: '8px 0', 
                        border: errors.Name ? '1px solid #cc0000' : '1px solid #ddd', 
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                        transition: 'border 0.3s'
                    }} 
                />
                <span style={{ color: "#cc0000", fontSize: '0.9em' }}>{errors.Name}</span>
                <br /><br />
                
                <label style={{ 
                    fontWeight: 'bold', 
                    color: '#003366',
                    display: 'block',
                    marginBottom: '5px'
                }}>Student ID</label>
                <input 
                    type="text" 
                    name="Id" 
                    onChange={handleChange} 
                    value={inputs.Id} 
                    required 
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        margin: '8px 0', 
                        border: errors.Id ? '1px solid #cc0000' : '1px solid #ddd', 
                        borderRadius: '4px',
                        boxSizing: 'border-box'
                    }} 
                />
                <span style={{ color: "#cc0000", fontSize: '0.9em' }}>{errors.Id}</span>
                <br /><br />
                
                <label style={{ 
                    fontWeight: 'bold', 
                    color: '#003366',
                    display: 'block',
                    marginBottom: '5px'
                }}>Faculty</label>
                <select 
                    name="Course" 
                    onChange={handleChange} 
                    value={inputs.Course} 
                    required 
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        margin: '8px 0', 
                        border: '1px solid #ddd', 
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                        backgroundColor: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <option value="">Select Faculty</option>
                    <option value="Computing">Faculty of Computing</option>
                    <option value="Engineering">Faculty of Engineering</option>
                    <option value="Science">Faculty of Science</option>
                    <option value="Business">Faculty of Business</option>
                </select>
                <br /><br />
                
                <label style={{ 
                    fontWeight: 'bold', 
                    color: '#003366',
                    display: 'block',
                    marginBottom: '5px'
                }}>Date of Birth</label>
                <input 
                    type="date" 
                    name="DateOfBirth" 
                    onChange={handleChange} 
                    value={inputs.DateOfBirth} 
                    max={getTodayDate()} 
                    required 
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        margin: '8px 0', 
                        border: '1px solid #ddd', 
                        borderRadius: '4px',
                        boxSizing: 'border-box'
                    }} 
                />
                <br /><br />
                
                <label style={{ 
                    fontWeight: 'bold', 
                    color: '#003366',
                    display: 'block',
                    marginBottom: '5px'
                }}>Gender</label>
                <select 
                    name="Gender" 
                    onChange={handleChange} 
                    value={inputs.Gender} 
                    required 
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        margin: '8px 0', 
                        border: '1px solid #ddd', 
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                        backgroundColor: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <br /><br />
                
                <label style={{ 
                    fontWeight: 'bold', 
                    color: '#003366',
                    display: 'block',
                    marginBottom: '5px'
                }}>Phone Number</label>
                <input 
                    type="text" 
                    name="Phone" 
                    onChange={handleChange} 
                    value={inputs.Phone} 
                    required 
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        margin: '8px 0', 
                        border: errors.Phone ? '1px solid #cc0000' : '1px solid #ddd', 
                        borderRadius: '4px',
                        boxSizing: 'border-box'
                    }} 
                />
                <span style={{ color: "#cc0000", fontSize: '0.9em' }}>{errors.Phone}</span>
                <br /><br />
                
                <label style={{ 
                    fontWeight: 'bold', 
                    color: '#003366',
                    display: 'block',
                    marginBottom: '5px'
                }}>Email Address</label>
                <input 
                    type="email" 
                    name="Email" 
                    onChange={handleChange} 
                    value={inputs.Email} 
                    required 
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        margin: '8px 0', 
                        border: errors.Email ? '1px solid #cc0000' : '1px solid #ddd', 
                        borderRadius: '4px',
                        boxSizing: 'border-box'
                    }} 
                />
                <span style={{ color: "#cc0000", fontSize: '0.9em' }}>{errors.Email}</span>
                <br /><br />
                
                <label style={{ 
                    fontWeight: 'bold', 
                    color: '#003366',
                    display: 'block',
                    marginBottom: '5px'
                }}>Address</label>
                <textarea 
                    name="Address" 
                    rows="4" 
                    onChange={handleChange} 
                    value={inputs.Address} 
                    required 
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        margin: '8px 0', 
                        border: '1px solid #ddd', 
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                        resize: 'vertical'
                    }} 
                />
                <br /><br />
                
                <button 
                    type="submit" 
                    style={{ 
                        backgroundColor: '#003366',
                        color: 'white', 
                        padding: '12px 24px', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontSize: '1em',
                        fontWeight: '600',
                        transition: 'background-color 0.3s',
                        ':hover': {
                            backgroundColor: '#004080'
                        }
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddStudent;