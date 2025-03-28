import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exam, setExam] = useState(null);

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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/exams/${id}`)
      .then((res) => {
        setExam(res.data.exam);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching exam");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (exam) {
      setFormData({
        courseName: exam.courseName || "",
        courseCode: exam.courseCode || "",
        examType: exam.examType || "",
        date: exam.date ? exam.date.split("T")[0] : "",
        startTime: exam.startTime || "",
        duration: exam.duration || "",
        endTime: exam.endTime || "",
        location: exam.location || "",
      });
    }
  }, [exam]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Course Name Validation: Only letters and spaces (No Numbers Allowed)
    if (name === "courseName") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setError("Course name should contain only letters.");
        return;
      } else {
        setError(""); // Clear error if valid
      }
    }

    // Course Code Validation: Two uppercase letters followed by four digits (e.g., CS1234)
    if (name === "courseCode") {
      if (!/^[A-Z]{2}\d{4}$/.test(value)) {
        setError("Course code must start with two uppercase letters followed by four digits.");
        return;
      } else {
        setError(""); // Clear error if valid
      }
    }

    // Date Validation: Cannot select a past date
    if (name === "date") {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        setError("You cannot select a past date.");
        return;
      } else {
        setError(""); // Clear error if valid
      }
    }

    // Start Time Validation: Must be after the current time (if today)
    if (name === "startTime") {
      const selectedDate = new Date(formData.date);
      const currentDate = new Date();
      const selectedStartTime = new Date(`${selectedDate.toISOString().split("T")[0]}T${value}`);

      if (
        selectedDate.toISOString().split("T")[0] === currentDate.toISOString().split("T")[0] &&
        selectedStartTime <= currentDate
      ) {
        setError("Start time must be after the current time.");
        return;
      } else {
        setError(""); // Clear error if valid
      }
    }

    // End Time Validation: Must be after Start Time
    if (name === "endTime" && formData.startTime) {
      if (value <= formData.startTime) {
        setError("End time must be after start time.");
        return;
      } else {
        setError(""); // Clear error if valid
      }
    }

    // Start Time Validation: Must be before End Time
    if (name === "startTime" && formData.endTime) {
      if (value >= formData.endTime) {
        setError("Start time must be before end time.");
        return;
      } else {
        setError(""); // Clear error if valid
      }
    }

    // Update the form data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if an error exists
    if (error) {
      alert("Please fix the error before submitting.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/exams/${id}`, formData);
      if (response.status === 200) {
        alert("Exam updated successfully!");
        navigate("/exams");
      }
    } catch (err) {
      alert("Failed to update exam. Please try again.");
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  if (loading) return <div>Loading...</div>;
  if (error && !exam) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Update Exam</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
          {error.includes("Course name") && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div>
          <label>Course Code:</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
          />
          {error.includes("Course code") && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div>
          <label>Exam Type:</label>
          <input
            type="text"
            name="examType"
            value={formData.examType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getTodayDate()}
            required
          />
          {error.includes("past date") && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
          {error.includes("Start time") && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div>
          <label>Duration (in minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
          {error.includes("End time") && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Exam</button>
      </form>
    </div>
  );
};

export default UpdateExam;
