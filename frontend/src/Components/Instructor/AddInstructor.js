import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddUpdateInstructor() {
  const { id } = useParams(); // Get instructor ID from URL (for updating)
  const navigate = useNavigate();

  const [instructor, setInstructor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    faculty: '',
  });

  useEffect(() => {
    if (id) {
      // Fetch instructor details if updating
      axios.get(`http://localhost:5000/instructors/${id}`)
        .then(response => {
          setInstructor(response.data);
        })
        .catch(error => console.error("Error fetching instructor details:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor({ ...instructor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Update instructor
      axios.put(`http://localhost:5000/instructors/${id}`, instructor)
        .then(() => {
          alert('Instructor updated successfully!');
          navigate('/instructors');
        })
        .catch(error => alert('Error updating instructor:', error));
    } else {
      // Add new instructor
      axios.post('http://localhost:5000/instructors', instructor)
        .then(() => {
          alert('Instructor added successfully!');
          navigate('/InstructorHome');
        })
        .catch(error => alert('Error adding instructor:', error));
    }
  };

  return (
    <div>
      <h2>{id ? "Update Instructor" : "Add New Instructor"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={instructor.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={instructor.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={instructor.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={instructor.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Faculty</label>
          <select
            className="form-control"
            name="faculty"
            value={instructor.faculty}
            onChange={handleChange}
            required
          >
            <option value="">Select Faculty</option>
            <option value="Faculty of Computing">Faculty of Computing</option>
            <option value="Faculty of Engineering">Faculty of Engineering</option>
            <option value="Faculty of Business">Faculty of Business</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {id ? "Update Instructor" : "Add Instructor"}
        </button>
      </form>
    </div>
  );
}

export default AddUpdateInstructor;
