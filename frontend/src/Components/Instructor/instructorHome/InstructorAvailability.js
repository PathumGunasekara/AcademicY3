import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./InstructorAvailability.css";

const InstructorAvailability = () => {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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

  const handleAddAvailability = async () => {
    if (!selectedInstructor || !day || !startTime || !endTime) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/instructors/${selectedInstructor}/availability`, {
        day,
        startTime,
        endTime,
      });

      fetchInstructors();
      setDay("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Error adding availability", error);
    }
  };

  const handleDeleteAvailability = async (instructorId, index) => {
    try {
      await axios.delete(`http://localhost:5000/instructors/${instructorId}/availability/${index}`);
      fetchInstructors();
    } catch (error) {
      console.error("Error deleting availability slot", error);
    }
  };

  return (
    <div className="availability-container">
      <h2>Instructor Availability Management</h2>
      
      <div className="availability-form">
        <label>Select Instructor:</label>
        <select value={selectedInstructor} onChange={(e) => setSelectedInstructor(e.target.value)}>
          <option value="">Select an Instructor</option>
          {instructors.map((inst) => (
            <option key={inst._id} value={inst._id}>
              {inst.name}
            </option>
          ))}
        </select>

        <label>Day:</label>
        <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder="e.g. Monday" />

        <label>Start Time:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

        <label>End Time:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

        <button onClick={handleAddAvailability}>Add Availability</button>
      </div>

      <table className="availability-table">
        <thead>
          <tr>
            <th>Instructor</th>
            <th>Availability Slots</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor._id}>
              <td>{instructor.name}</td>
              <td>
                <ul>
                  {instructor.availability.length > 0 ? (
                    instructor.availability.map((slot, index) => (
                      <li key={index}>
                        {slot.day}: {slot.startTime} - {slot.endTime}
                        <button onClick={() => handleDeleteAvailability(instructor._id, index)}>Delete</button>
                      </li>
                    ))
                  ) : (
                    <li>No Availability</li>
                  )}
                </ul>
              </td>
              <td>
                <button onClick={() => navigate(`/edit-instructor/${instructor._id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="back-btn" onClick={() => navigate("/instructor-home")}>
        Back to Instructor Management
      </button>
    </div>
  );
};

export default InstructorAvailability;
