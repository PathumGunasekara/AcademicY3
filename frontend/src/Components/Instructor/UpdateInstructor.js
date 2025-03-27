import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateInstructor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [instructor, setInstructor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    faculty: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Instructor ID not found");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/instructors/${id}`)
      .then((response) => {
        console.log("Fetched Data:", response.data); // Debugging output
        if (response.data) {
          setInstructor({
            firstName: response.data.firstName || "",
            lastName: response.data.lastName || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
            faculty: response.data.faculty || "",
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching instructor details:", error);
        setError("Failed to load instructor details.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/instructors/${id}`, instructor)
      .then(() => {
        alert("Instructor updated successfully!");
        navigate("/InstructorHome");
      })
      .catch((error) => {
        alert("Error updating instructor: " + error.message);
      });
  };

  if (loading) {
    return <p>Loading instructor details...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Update Instructor</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
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
          <div className="col-md-6">
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
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
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
          <div className="col-md-6">
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
        </div>

        <div className="mt-3">
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

        <button type="submit" className="btn btn-success mt-3">
          Update Instructor
        </button>
      </form>
    </div>
  );
}

export default UpdateInstructor;
