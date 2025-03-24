import React, { useState } from "react";
import axios from "axios";

const UpdateCourse = ({ course, refreshCourses }) => {
  const [updatedCourse, setUpdatedCourse] = useState(course);

  const handleChange = (e) => {
    setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:5000/courses/${course.courseCode}`,
      updatedCourse
    );
    refreshCourses();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Update Course</h2>
      <input
        name="courseName"
        value={updatedCourse.courseName}
        onChange={handleChange}
      />
      <input name="courseCode" value={updatedCourse.courseCode} disabled />
      <input
        name="instructorName"
        value={updatedCourse.instructorName}
        onChange={handleChange}
      />
      <input
        name="credits"
        value={updatedCourse.credits}
        type="number"
        onChange={handleChange}
      />
      <input
        name="department"
        value={updatedCourse.department}
        onChange={handleChange}
      />
      <input
        name="courseDescription"
        value={updatedCourse.courseDescription}
        onChange={handleChange}
      />
      <button
        onClick={handleUpdate}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Update Course
      </button>
    </div>
  );
};

export default UpdateCourse;
