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

    if (name === "courseName" && /\d/.test(value)) {
      setError("Course name should not contain numbers.");
      return;
    }

    if (name === "date") {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if (selectedDate < currentDate) {
        setError("You cannot select a past date.");
        return;
      }
    }

    setError("");
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
