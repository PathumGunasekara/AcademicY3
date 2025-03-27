import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Popup for delete confirmation
import "react-confirm-alert/src/react-confirm-alert.css"; // Importing styles for confirmAlert

function InstructorHome() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch instructors from the backend
    axios
      .get("http://localhost:5000/instructors")
      .then((response) => {
        setInstructors(response.data.instructors);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

  // Check if instructor is available based on current date and time
  const getAvailabilityStatus = (availability) => {
    if (!availability || availability.length === 0) {
      return "Not Available";
    }

    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString("en-us", { weekday: "long" });
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes(); // Convert to minutes

    for (let slot of availability) {
      if (slot.day === currentDay) {
        const [startHour, startMinute] = slot.startTime.split(":").map(Number);
        const [endHour, endMinute] = slot.endTime.split(":").map(Number);

        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;

        if (currentTime >= startTimeInMinutes && currentTime <= endTimeInMinutes) {
          return "Available";
        }
      }
    }
    return "Not Available";
  };

  // Delete instructor
  const deleteInstructor = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this instructor?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`http://localhost:5000/instructors/${id}`)
              .then(() => {
                setInstructors(instructors.filter((instructor) => instructor._id !== id));
                alert("Instructor deleted successfully");
              })
              .catch((error) => {
                console.error("Error deleting instructor:", error);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Instructor Management</h2>
      <div className="mb-3">
        <Link to="/addinstructor" className="btn btn-primary">Add New Instructor</Link>
        <Link to="/manage-availability" className="btn btn-secondary ml-3">Manage Instructor Availability</Link>
      </div>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Faculty</th>
            <th>Availability Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor._id}>
              <td>{instructor.firstName} {instructor.lastName}</td>
              <td>{instructor.email}</td>
              <td>{instructor.phone}</td>
              <td>{instructor.faculty}</td>
              <td>{getAvailabilityStatus(instructor.availability)}</td>
              <td>
                <Link to={`/updateinstructor/${instructor._id}`} className="btn btn-warning btn-sm mr-2">Update</Link>
                <button onClick={() => deleteInstructor(instructor._id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InstructorHome;
