import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageAvailability() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [newSlot, setNewSlot] = useState({ day: "", startTime: "", endTime: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/instructors")
      .then((response) => {
        setInstructors(response.data.instructors);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

  // Select instructor & fetch availability
  const handleInstructorSelect = (id) => {
    const instructor = instructors.find((inst) => inst._id === id);
    setSelectedInstructor(instructor);
    setAvailability(instructor.availability || []);
  };

  // Add availability slot with validation
  const handleAddSlot = () => {
    if (!newSlot.day || !newSlot.startTime || !newSlot.endTime) {
      alert("Please fill all fields!");
      return;
    }
    if (newSlot.startTime >= newSlot.endTime) {
      alert("Start time must be before end time!");
      return;
    }
    setAvailability([...availability, newSlot]);
    setNewSlot({ day: "", startTime: "", endTime: "" });
  };

  // Remove a slot
  const handleRemoveSlot = (index) => {
    const updatedAvailability = availability.filter((_, i) => i !== index);
    setAvailability(updatedAvailability);
  };

  // Save updated availability
  const handleUpdateAvailability = () => {
    if (!selectedInstructor) return;
    axios.put(`http://localhost:5000/instructors/${selectedInstructor._id}`, {
      ...selectedInstructor,
      availability
    })
      .then(() => {
        alert("Availability updated successfully!");
        navigate("/InstructorHome");
      })
      .catch((error) => {
        console.error("Error updating availability:", error);
      });
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", backgroundColor: "#F1F1F1" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#003366" }}>Manage Instructor Availability</h2>
      
      {/* Instructor Selection */}
      <select
        onChange={(e) => handleInstructorSelect(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #003366",
          marginBottom: "30px",
          backgroundColor: "#E6F2FF",
        }}
      >
        <option value="">Select Instructor</option>
        {instructors.map((instructor) => (
          <option key={instructor._id} value={instructor._id}>
            {instructor.firstName} {instructor.lastName}
          </option>
        ))}
      </select>

      {/* Availability Form */}
      {selectedInstructor && (
        <div style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <h4 style={{ color: "#003366", marginBottom: "20px" }}>
            Manage Availability for {selectedInstructor.firstName} {selectedInstructor.lastName}
          </h4>
          
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Day (e.g., Monday)"
              className="form-control"
              value={newSlot.day}
              onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
              style={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #003366",
                flex: "1",
                backgroundColor: "#E6F2FF",
              }}
            />
            <input
              type="time"
              className="form-control"
              value={newSlot.startTime}
              onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
              style={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #003366",
                flex: "1",
                backgroundColor: "#E6F2FF",
              }}
            />
            <input
              type="time"
              className="form-control"
              value={newSlot.endTime}
              onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
              style={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #003366",
                flex: "1",
                backgroundColor: "#E6F2FF",
              }}
            />
            <button
              onClick={handleAddSlot}
              style={{
                padding: "12px 20px",
                backgroundColor: "#003366",
                color: "white",
                fontSize: "16px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>

          {/* Availability List */}
          <ul className="list-group mb-3" style={{ padding: "0" }}>
            {availability.map((slot, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between" style={{ backgroundColor: "#F9F9F9", padding: "12px", borderRadius: "5px", marginBottom: "10px" }}>
                <span style={{ color: "#003366", fontWeight: "500" }}>
                  {slot.day}: {slot.startTime} - {slot.endTime}
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveSlot(index)}
                  style={{
                    backgroundColor: "#D9534F",
                    borderColor: "#D43F3A",
                    color: "white",
                    fontSize: "14px",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleUpdateAvailability}
            style={{
              padding: "12px 20px",
              backgroundColor: "#28A745",
              color: "white",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
              display: "block",
              margin: "0 auto",
            }}
          >
            Update Availability
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageAvailability;
