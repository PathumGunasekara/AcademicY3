import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";

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
      <ul>
        {courses.map((course) => (
          <li key={course.courseCode} className="flex justify-between border p-2">
            <span>{course.courseName} - {course.instructorName}</span>
            <div className="flex space-x-2">
              <UpdateCourse course={course} refreshCourses={fetchCourses} />
              <DeleteCourse courseCode={course.courseCode} refreshCourses={fetchCourses} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCourse;
