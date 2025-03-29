import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  FiBook,
  FiUser,
  FiHash,
  FiHome,
  FiFileText,
  FiPlus,
} from "react-icons/fi";
import Nav from "../Nav/Nav";

const AddCourse = () => {
  const [course, setCourse] = useState({
    courseName: "",
    courseCode: "",
    instructorName: "",
    credits: "",
    department: "",
    courseDescription: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    if (
      name === "courseName" ||
      name === "instructorName" ||
      name === "department"
    ) {
      if (!/^[A-Za-z\s]+$/.test(value) && value !== "") {
        error = "Only letters and spaces allowed";
      }
    } else if (name === "courseCode") {
      if (!/^[A-Za-z0-9]+$/.test(value) && value !== "") {
        error = "Only letters and numbers allowed";
      }
    } else if (name === "credits") {
      if (!/^[0-9]$/.test(value) && value !== "") {
        error = "Single digit (0-9) required";
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!course.courseName.trim()) {
      newErrors.courseName = "Course name is required";
      isValid = false;
    }
    if (!course.courseCode.trim()) {
      newErrors.courseCode = "Course code is required";
      isValid = false;
    }

    Object.keys(course).forEach((key) => {
      const error = validateField(key, course[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      await Swal.fire({
        title: "Error",
        text: "Cannot add course without filling the required details correctly",
        icon: "error",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/courses",
        course
      );

      const result = await Swal.fire({
        title: "Success!",
        text: "Course has been added successfully",
        icon: "success",
        confirmButtonColor: "#4f46e5",
      });

      if (result.isConfirmed) {
        navigate("/courses"); // Redirect after successful addition
      }
    } catch (error) {
      console.error("Error adding course:", error);
      await Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to add course",
        icon: "error",
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <FiPlus className="mr-2 text-indigo-600" />
            Add New Course
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Course Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiBook className="mr-2 text-indigo-500" />
                  Course Name *
                </label>
                <input
                  name="courseName"
                  placeholder="e.g., Introduction to Computer Science"
                  onChange={handleChange}
                  value={course.courseName}
                  className={`w-full px-4 py-2 pl-10 border ${
                    errors.courseName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none`}
                />
                {errors.courseName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.courseName}
                  </p>
                )}
              </div>

              {/* Course Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiHash className="mr-2 text-indigo-500" />
                  Course Code *
                </label>
                <input
                  name="courseCode"
                  placeholder="e.g., CS101"
                  onChange={handleChange}
                  value={course.courseCode}
                  className={`w-full px-4 py-2 pl-10 border ${
                    errors.courseCode ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none`}
                />
                {errors.courseCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.courseCode}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Instructor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiUser className="mr-2 text-indigo-500" />
                  Instructor Name
                </label>
                <input
                  name="instructorName"
                  placeholder="e.g., Dr. Smith"
                  onChange={handleChange}
                  value={course.instructorName}
                  className={`w-full px-4 py-2 pl-10 border ${
                    errors.instructorName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none`}
                />
                {errors.instructorName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.instructorName}
                  </p>
                )}
              </div>

              {/* Credits */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credits
                </label>
                <input
                  name="credits"
                  placeholder="e.g., 3"
                  type="number"
                  onChange={handleChange}
                  value={course.credits}
                  className={`w-full px-4 py-2 border ${
                    errors.credits ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none`}
                  min="0"
                  max="9"
                />
                {errors.credits && (
                  <p className="mt-1 text-sm text-red-600">{errors.credits}</p>
                )}
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiHome className="mr-2 text-indigo-500" />
                Department
              </label>
              <input
                name="department"
                placeholder="e.g., Computer Science"
                onChange={handleChange}
                value={course.department}
                className={`w-full px-4 py-2 pl-10 border ${
                  errors.department ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none`}
              />
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiFileText className="mr-2 text-indigo-500" />
                Description
              </label>
              <textarea
                name="courseDescription"
                placeholder="Brief description about the course..."
                onChange={handleChange}
                value={course.courseDescription}
                rows="3"
                className={`w-full px-4 py-2 pl-10 border ${
                  errors.courseDescription
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none`}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full mt-4 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding...
                </>
              ) : (
                "Add Course"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
