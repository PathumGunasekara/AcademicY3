import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./InstructorHome.css";

const InstructorHome = () => {
  const [instructors, setInstructors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/instructors");
      setInstructors(response.data.instructors);
    } catch (error) {
      console.error("Error fetching instructors", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/instructors/${id}`);
      fetchInstructors();
    } catch (error) {
      console.error("Error deleting instructor", error);
    }
  };

  // Function to check if the instructor is available at the current time
  const isAvailableNow = (availability) => {
    const now = new Date();
    const currentDay = now.toLocaleString("en-US", { weekday: "long" }); // Example: "Monday"
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes

    return availability.some((slot) => {
      const startTimeParts = slot.startTime.split(":").map(Number);
      const endTimeParts = slot.endTime.split(":").map(Number);

      const startMinutes = startTimeParts[0] * 60 + startTimeParts[1]; // Convert start time to minutes
      const endMinutes = endTimeParts[0] * 60 + endTimeParts[1]; // Convert end time to minutes

      return slot.day === currentDay && currentTime >= startMinutes && currentTime <= endMinutes;
    });
  };

  return (
    <div className="instructor-home">
      <h2>Instructor Management</h2>
      <button
        className="add-instructor-btn"
        onClick={() => navigate("/add-instructor")}
      >
        Add Instructor
      </button>
      <button
        className="availability-btn"
        onClick={() => navigate("/instructor-availability")}
      >
        Manage Availability
      </button>
      <table className="instructor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Image</th>
            <th>Current Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor._id}>
              <td>{instructor.name}</td>
              <td>{instructor.email}</td>
              <td>{instructor.phone}</td>
              <td>
                <img src={instructor.image} alt={instructor.name} width="50" />
              </td>
              <td>
                {isAvailableNow(instructor.availability) ? (
                  <span className="available">Available</span>
                ) : (
                  <span className="not-available">Not Available</span>
                )}
              </td>
              <td>
                <button onClick={() => navigate(`/view-instructor/${instructor._id}`)}>View</button>
                <button onClick={() => navigate(`/edit-instructor/${instructor._id}`)}>Edit</button>
                <button onClick={() => handleDelete(instructor._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorHome;
