import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCourse from "./AddCourse"; // ✅ Import AddCourse component

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const response = await axios.get("http://localhost:5000/courses");
    setCourses(response.data.courses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">All Courses</h2>

      {/* ✅ Add Course Form */}
      <AddCourse refreshCourses={fetchCourses} />

      {/* ✅ Display Courses */}
      <ul>
        {courses.map((course) => (
          <li
            key={course.courseCode}
            className="flex justify-between border p-2"
          >
            <span>
              {course.courseName} - {course.instructorName}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCourse;
