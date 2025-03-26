import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ Fixed: Corrected import for useNavigate

function UpdateStudent() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate(); // ✅ Fixed: Use `navigate` instead of `history`
  const { id } = useParams(); // ✅ Fixed: Destructure `id`

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/students/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.student));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:5000/students/${id}`, {
      Name: inputs.Name,
      Id: inputs.Id,
      Course: inputs.Course,
      DateOfBirth: inputs.DateOfBirth,
      Gender: inputs.Gender,
      Phone: inputs.Phone,
      Email: inputs.Email,
      Address: inputs.Address,
    }).then((res) => res.data);
  };

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
      navigate('/StudentDetails'); // ✅ Fixed: Corrected navigation function
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1>Update Student</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <br />
        <input type="text" name="Name" onChange={handleChange} value={inputs.Name || ''} required />
        <br /><br />
        
        <label>Student ID</label>
        <br />
        <input type="text" name="Id" onChange={handleChange} value={inputs.Id || ''} required />
        <br /><br />
        
        <label>Course</label>
        <br />
        <input type="text" name="Course" onChange={handleChange} value={inputs.Course || ''} required />
        <br /><br />
        
        <label>Date of Birth</label>
        <br />
        <input type="text" name="DateOfBirth" onChange={handleChange} value={inputs.DateOfBirth || ''} required />
        <br /><br />
        
        <label>Gender</label>
        <br />
        <input type="text" name="Gender" onChange={handleChange} value={inputs.Gender || ''} required />
        <br /><br />
        
        <label>Phone Number</label>
        <br />
        <input type="text" name="Phone" onChange={handleChange} value={inputs.Phone || ''} required />
        <br /><br />
        
        <label>Email Address</label>
        <br />
        <input type="email" name="Email" onChange={handleChange} value={inputs.Email || ''} required />
        <br /><br />
        
        <label>Address</label>
        <br />
        <input type="text" name="Address" onChange={handleChange} value={inputs.Address || ''} required />
        <br /><br />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateStudent;
