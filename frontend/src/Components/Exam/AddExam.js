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

  // List of course codes for the dropdown
  const courseCodes = [
    "IT1010", "IT1030", "IT2020", "IT2030", 
    "IT3010", "IT3020", "IT4010", "IT4020",
    "BM1010", "BM2010", "BM3010", "BM4010"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Validation for Course Name (only letters allowed)
    if (name === "courseName") {
      if (processedValue && !/^[A-Za-z\s]+$/.test(processedValue)) {
        setError("Course name should only contain letters and spaces.");
        return;
      }
    }

    // Validation for Date (cannot be a past date)
    if (name === "date") {
      const selectedDate = new Date(processedValue);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

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
        `${selectedDate.toISOString().split("T")[0]}T${processedValue}`
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
      const startTimeInMinutes = new Date(`${formData.date}T${formData.startTime}`).getTime();
      const endTimeInMinutes = new Date(`${formData.date}T${processedValue}`).getTime();
      const durationInMinutes = parseInt(formData.duration) * 60000;

      if (endTimeInMinutes - startTimeInMinutes < durationInMinutes) {
        setError("End time must be at least the duration after the start time.");
        return;
      }
    }

    // Validation: Start Time must be before End Time
    if (name === "startTime" && formData.endTime) {
      if (processedValue >= formData.endTime) {
        setError("Start time must be before end time.");
        return;
      }
    }

    // Clear any previous errors if current field is valid
    setError("");

    // Update the form data
    setFormData({
      ...formData,
      [name]: processedValue,
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
        marginBottom: "20px",
        fontSize: "36px" 
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
          <select
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
          >
            <option value="">Select a course code</option>
            {courseCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
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
          }}>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
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
        }}>
          Add Exam
        </button>
      </form>
    </div>
  );
};

export default AddExam;