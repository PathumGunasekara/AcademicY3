import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddExam = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    examType: "",
    date: "",
    startTime: "",
    duration: "",
    endTime: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for Course Name (only letters allowed)
    if (name === "courseName") {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        setError("Course name should only contain letters and spaces.");
        return;
      }
    }

    // Validation for Date (cannot be a past date)
    if (name === "date") {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison

      if (selectedDate < currentDate) {
        setError("You cannot select a past date.");
        return;
      }
    }

    // Validation for Start Time (if the date is today, start time must be after the current time)
    if (name === "startTime") {
      const selectedDate = new Date(formData.date);
      const currentDate = new Date();
      const selectedStartTime = new Date(
        `${selectedDate.toISOString().split("T")[0]}T${value}`
      );

      if (
        selectedDate.toISOString().split("T")[0] === currentDate.toISOString().split("T")[0] &&
        selectedStartTime <= currentDate
      ) {
        setError("Start time must be after the current time.");
        return;
      }
    }

    // Validation: End Time must be after Start Time
    if (name === "endTime" && formData.startTime) {
      if (value <= formData.startTime) {
        setError("End time must be after start time.");
        return;
      }
    }

    // Validation: Start Time must be before End Time
    if (name === "startTime" && formData.endTime) {
      if (value >= formData.endTime) {
        setError("Start time must be before end time.");
        return;
      }
    }

    // Clear any previous errors
    setError("");

    // Update the form data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there is any error before submitting
    if (error) {
      alert("Please fix the error before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/exams", formData);
      if (response.status === 200) {
        alert("Exam added successfully!");
        navigate("/exams");
      }
    } catch (err) {
      alert("Failed to add exam. Please try again.");
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{
        textAlign: "center",
        color: "#333",
        marginBottom: "20px"
      }}>Add Exam</h1>
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}>
          <label style={{
            fontWeight: "bold",
            color: "#555"
          }}>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
          {error.includes("Course name") && (
            <p style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}>{error}</p>
          )}
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}>
          <label style={{
            fontWeight: "bold",
            color: "#555"
          }}>Course Code:</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}>
          <label style={{
            fontWeight: "bold",
            color: "#555"
          }}>Exam Type:</label>
          <input
            type="text"
            name="examType"
            value={formData.examType}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}>
          <label style={{
            fontWeight: "bold",
            color: "#555"
          }}>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getTodayDate()}
            required
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
          {error.includes("past date") && (
            <p style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}>{error}</p>
          )}
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}>
          <label style={{
            fontWeight: "bold",
            color: "#555"
          }}>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
          {error && error.includes("Start time") && (
            <p style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}>{error}</p>
          )}
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}>
          <label style={{
            fontWeight: "bold",
            color: "#555"
          }}>Duration (in minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}>
          <label style={{
            fontWeight: "bold",
            color: "#555"
          }}>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
          {error && error.includes("End time") && (
            <p style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}>{error}</p>
          )}
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}>
          <label style={{
            fontWeight: "bold",
            color: "#555"
          }}>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
        </div>
        <button type="submit" style={{
          padding: "10px 15px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "10px",
          transition: "background-color 0.3s",
          ":hover": {
            backgroundColor: "#45a049"
          }
        }}>Add Exam</button>
      </form>
    </div>
  );
};

export default AddExam;