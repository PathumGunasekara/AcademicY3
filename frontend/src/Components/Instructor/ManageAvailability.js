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
    <div className="container mt-4">
      <h2 className="mb-3">Manage Instructor Availability</h2>
      
      {/* Instructor Selection */}
      <select onChange={(e) => handleInstructorSelect(e.target.value)} className="form-select mb-3">
        <option value="">Select Instructor</option>
        {instructors.map((instructor) => (
          <option key={instructor._id} value={instructor._id}>
            {instructor.firstName} {instructor.lastName}
          </option>
        ))}
      </select>

      {/* Availability Form */}
      {selectedInstructor && (
        <div className="card p-3">
          <h4>Manage Availability for {selectedInstructor.firstName} {selectedInstructor.lastName}</h4>
          
          <div className="d-flex gap-2 my-3">
            <input type="text" placeholder="Day (e.g., Monday)" 
              className="form-control"
              value={newSlot.day}
              onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })} 
            />
            <input type="time" className="form-control" 
              value={newSlot.startTime}
              onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })} 
            />
            <input type="time" className="form-control" 
              value={newSlot.endTime}
              onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })} 
            />
            <button className="btn btn-primary" onClick={handleAddSlot}>Add</button>
          </div>

          {/* Availability List */}
          <ul className="list-group mb-3">
            {availability.map((slot, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                {slot.day}: {slot.startTime} - {slot.endTime}
                <button className="btn btn-danger btn-sm" onClick={() => handleRemoveSlot(index)}>Remove</button>
              </li>
            ))}
          </ul>

          <button className="btn btn-success" onClick={handleUpdateAvailability}>Update Availability</button>
        </div>
      )}
    </div>
  );
}

export default ManageAvailability;
