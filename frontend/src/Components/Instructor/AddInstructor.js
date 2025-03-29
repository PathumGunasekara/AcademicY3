import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddInstructor() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    faculty: "Faculty of Computing",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/instructors", formData)
      .then(() => {
        alert("Instructor added successfully!");
        navigate("/InstructorHome"); // Redirect to the instructor list page
      })
      .catch((error) => {
        console.error("Error adding instructor:", error);
        alert("Failed to add instructor");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Instructor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Faculty</label>
          <select
            name="faculty"
            className="form-control"
            value={formData.faculty}
            onChange={handleChange}
            required
          >
            <option value="Faculty of Computing">Faculty of Computing</option>
            <option value="Faculty of Engineering">Faculty of Engineering</option>
            <option value="Faculty of Business">Faculty of Business</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">Add Instructor</button>
      </form>
    </div>
  );
}

export default AddInstructor;
