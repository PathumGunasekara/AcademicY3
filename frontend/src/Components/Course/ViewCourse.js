import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-xl font-semibold">Course Details</h2>
      <table
        border="1"
        width="100%"
        style={{ borderCollapse: "collapse", marginBottom: "20px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Instructor Name</th>
            <th>Credits</th>
            <th>Department</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.courseCode} style={{ textAlign: "center" }}>
              <td>{course.courseName}</td>
              <td>{course.courseCode}</td>
              <td>{course.instructorName}</td>
              <td>{course.credits}</td>
              <td>{course.department}</td>
              <td>{course.courseDescription}</td>
              <td>
                <button
                  onClick={() => navigate(`/updatecourse/${course.courseCode}`)}
                  style={{
                    marginRight: "10px",
                    backgroundColor: "blue",
                    color: "white",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => navigate(`/deletecourse/${course.courseCode}`)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Course Button */}
      <button
        onClick={() => navigate("/addcourse")}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          display: "block",
          margin: "auto",
        }}
      >
        Add New Course
      </button>
    </div>
  );
};

export default ViewCourse;
