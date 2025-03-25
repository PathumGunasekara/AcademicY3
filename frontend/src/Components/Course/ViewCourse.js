import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCourse from "./AddCourse";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState({});

  // Fetch Courses
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

  // Enable Editing
  const handleEdit = (course) => {
    setEditingCourse(course.courseCode);
    setUpdatedCourse({ ...course });
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
  };

  // Save Updates to MongoDB
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/courses/${updatedCourse.courseCode}`,
        updatedCourse
      );
      setEditingCourse(null);
      fetchCourses(); // Refresh the table
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Delete Course
  const handleDelete = async (courseCode) => {
    try {
      await axios.delete(`http://localhost:5000/courses/${courseCode}`);
      fetchCourses(); // Refresh the table
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Courses</h2>

      {/* ✅ Add New Course */}
      <AddCourse refreshCourses={fetchCourses} />

      {/* ✅ Course Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Course Name</th>
              <th className="border border-gray-300 px-4 py-2">Course Code</th>
              <th className="border border-gray-300 px-4 py-2">Instructor</th>
              <th className="border border-gray-300 px-4 py-2">Credits</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>{" "}
              {/* ✅ New Column */}
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseCode} className="hover:bg-gray-100">
                {/* Editable Fields */}
                <td className="border border-gray-300 px-4 py-2">
                  {editingCourse === course.courseCode ? (
                    <input
                      name="courseName"
                      value={updatedCourse.courseName}
                      onChange={handleChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    course.courseName
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {course.courseCode} {/* Not editable */}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingCourse === course.courseCode ? (
                    <input
                      name="instructorName"
                      value={updatedCourse.instructorName}
                      onChange={handleChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    course.instructorName
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingCourse === course.courseCode ? (
                    <input
                      name="credits"
                      type="number"
                      value={updatedCourse.credits}
                      onChange={handleChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    course.credits
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingCourse === course.courseCode ? (
                    <input
                      name="department"
                      value={updatedCourse.department}
                      onChange={handleChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    course.department
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingCourse === course.courseCode ? (
                    <input
                      name="courseDescription"
                      value={updatedCourse.courseDescription}
                      onChange={handleChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    course.courseDescription
                  )}
                </td>

                {/* ✅ Action Column */}
                <td className="border border-gray-300 px-4 py-2">
                  {editingCourse === course.courseCode ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Update
                    </button>
                  )}
                  {editingCourse !== course.courseCode && (
                    <button
                      onClick={() => handleDelete(course.courseCode)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCourse;
