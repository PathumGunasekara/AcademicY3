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

    // Validation for Course Name (no numbers allowed)
    if (name === "courseName" && /\d/.test(value)) {
      setError("Course name should not contain numbers.");
      return;
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

      if (selectedDate.toISOString().split("T")[0] === currentDate.toISOString().split("T")[0] && selectedStartTime <= currentDate) {
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
      const response = await axios.put(
        `http://localhost:5000/exams/${id}`,
        formData
      );
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
          {error.includes("Course name") && (
            <p style={{ color: "red" }}>{error}</p>
          )}
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
            min={getTodayDate()} // Disables past dates in the calendar
            required
          />
          {error.includes("past date") && (
            <p style={{ color: "red" }}>{error}</p>
          )}
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
          {error && error.includes("Start time") && (
            <p style={{ color: "red" }}>{error}</p>
          )}
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
          {error && error.includes("End time") && (
            <p style={{ color: "red" }}>{error}</p>
          )}
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
