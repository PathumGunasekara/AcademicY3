import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateInstructor() {
  const [formData, setFormData] = useState(null); // Initialize as null to handle loading state
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/instructors/${id}`);
        const data = res.data;
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          faculty: data.faculty || "Faculty of Computing",
        });
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/instructors/${id}`, formData);
      navigate("/InstructorHome"); // Redirect to the instructors list after update
    } catch (error) {
      console.error("Error updating instructor:", error);
    }
  };

  if (!formData) {
    // Show a loading message while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Update Instructor</h2>
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

        <button type="submit" className="btn btn-primary mt-3">
          Update Instructor
        </button>
      </form>
    </div>
  );
}

export default UpdateInstructor;