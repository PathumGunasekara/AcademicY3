import React, { useState } from "react";
import axios from "axios";

const AddCourse = ({ refreshCourses }) => {
  const [course, setCourse] = useState({
    courseName: "",
    courseCode: "",
    instructorName: "",
    credits: "",
    department: "",
    courseDescription: "",
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/courses", course);
    setCourse({
      courseName: "",
      courseCode: "",
      instructorName: "",
      credits: "",
      department: "",
      courseDescription: "",
    });
    refreshCourses();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Add New Course</h2>
      <input
        name="courseName"
        placeholder="Course Name"
        onChange={handleChange}
        value={course.courseName}
      />
      <input
        name="courseCode"
        placeholder="Course Code"
        onChange={handleChange}
        value={course.courseCode}
      />
      <input
        name="instructorName"
        placeholder="Instructor Name"
        onChange={handleChange}
        value={course.instructorName}
      />
      <input
        name="credits"
        placeholder="Credits"
        type="number"
        onChange={handleChange}
        value={course.credits}
      />
      <input
        name="department"
        placeholder="Department"
        onChange={handleChange}
        value={course.department}
      />
      <input
        name="courseDescription"
        placeholder="Description"
        onChange={handleChange}
        value={course.courseDescription}
      />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Add Course
      </button>
    </div>
  );
};

export default AddCourse;
