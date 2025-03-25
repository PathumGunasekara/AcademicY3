import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCourse from "./AddCourse";
import { FiSearch, FiX } from "react-icons/fi";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response.data.courses);
      setFilteredCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, courses]);

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

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Courses</h2>

        {/* Search Box */}
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, code or instructor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Add New Course */}
      <AddCourse refreshCourses={fetchCourses} />

      {/* Course Table */}
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
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr key={course.courseCode} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {editingCourse === course.courseCode ? (
                      <input
                        name="courseName"
                        value={updatedCourse.courseName}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      course.courseName
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {course.courseCode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingCourse === course.courseCode ? (
                      <input
                        name="instructorName"
                        value={updatedCourse.instructorName}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
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
                        className="border px-2 py-1 w-full"
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
                        className="border px-2 py-1 w-full"
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
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      course.courseDescription
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingCourse === course.courseCode ? (
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2 transition"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(course)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 transition"
                      >
                        Update
                      </button>
                    )}
                    {editingCourse !== course.courseCode && (
                      <button
                        onClick={() => handleDelete(course.courseCode)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="border border-gray-300 px-4 py-4 text-center text-gray-500"
                >
                  No courses found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCourse;
