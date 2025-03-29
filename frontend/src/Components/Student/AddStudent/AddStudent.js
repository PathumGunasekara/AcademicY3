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