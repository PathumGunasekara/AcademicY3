import React from "react";
import axios from "axios";

const DeleteCourse = ({ courseCode, refreshCourses }) => {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/courses/${courseCode}`);
    refreshCourses();
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        backgroundColor: "red",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      Delete Course
    </button>
  );
};

export default DeleteCourse;
