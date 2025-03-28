import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiX, FiPlus, FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Navigate to Add Course page
  const navigateToAddCourse = () => {
    navigate("/addcourse");
  };

  // Generate PDF
  const generatePDF = () => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Register the autoTable plugin
    autoTable(doc, {
      startY: 40,
      head: [
        [
          "Course Name",
          "Code",
          "Instructor",
          "Credits",
          "Department",
          "Description",
        ],
      ],
      body: filteredCourses.map((course) => [
        course.courseName,
        course.courseCode,
        course.instructorName,
        course.credits,
        course.department,
        course.courseDescription,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [79, 70, 229], // indigo-600
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251], // gray-50
      },
      styles: {
        cellPadding: 3,
        fontSize: 10,
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
        4: { cellWidth: "auto" },
        5: { cellWidth: "wrap" },
      },
      margin: { top: 40 },
    });

    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text("Course Details Report", 15, 20);

    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 30);

    // Save the PDF
    doc.save(`course-report-${new Date().toISOString().slice(0, 10)}.pdf`);

    Swal.fire(
      "Success!",
      "PDF report has been generated and downloaded.",
      "success"
    );
  };

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
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to update this course!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        await axios.put(
          `http://localhost:5000/courses/${updatedCourse.courseCode}`,
          updatedCourse
        );

        await Swal.fire(
          "Updated!",
          "The course has been updated successfully.",
          "success"
        );

        setEditingCourse(null);
        fetchCourses(); // Refresh the table
      }
    } catch (error) {
      console.error("Error updating course:", error);
      Swal.fire("Error!", "There was an error updating the course.", "error");
    }
  };

  // Delete Course
  const handleDelete = async (courseCode) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/courses/${courseCode}`);

        await Swal.fire("Deleted!", "The course has been deleted.", "success");

        fetchCourses(); // Refresh the table
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      Swal.fire("Error!", "There was an error deleting the course.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-5xl font-bold text-center mb-8 w-full">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-800 text-transparent bg-clip-text">
              All Courses
            </span>
          </h1>

          <div className="w-full flex justify-between items-center">
            <div className="w-64"></div> {/* Empty div for balance */}
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
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
          >
            <FiDownload />
            Generate PDF
          </button>
          <button
            onClick={navigateToAddCourse}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
          >
            <FiPlus />
            Add New Course
          </button>
        </div>

        {/* Course Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Course Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Course Code
                </th>
                <th className="border border-gray-300 px-4 py-2">Instructor</th>
                <th className="border border-gray-300 px-4 py-2">Credits</th>
                <th className="border border-gray-300 px-4 py-2">Department</th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
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
    </div>
  );
};

export default ViewCourse;
