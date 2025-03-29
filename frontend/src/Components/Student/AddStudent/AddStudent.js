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
        <div style={{ 
            fontFamily: 'Arial, sans-serif', 
            padding: '20px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
        }}>
            <StudentNav />
            <h1 style={{ 
                textAlign: 'center', 
                color: '#003366', // Dark blue
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
                borderTop: '4px solid #FFD700' // Gold accent
            }}>
                <label style={{ 
                    fontWeight: 'bold', 
                    color: '#003366', // Dark blue
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
                        border: '1px solid #ddd', 
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                        transition: 'border 0.3s',
                        ':focus': {
                            borderColor: '#FFD700', // Gold
                            outline: 'none'
                        }
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
                        border: '1px solid #ddd', 
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
                        border: '1px solid #ddd', 
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
                        backgroundColor: '#003366', // Dark blue
                        color: 'white', 
                        padding: '12px 24px', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontSize: '1em',
                        fontWeight: '600',
                        transition: 'background-color 0.3s',
                        ':hover': {
                            backgroundColor: '#004080' // Slightly lighter blue
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