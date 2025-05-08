import React from 'react';
import Nav from "../Nav/Nav";


function Exam({ exam }) {
  if (!exam) return <p>No exam details available.</p>;

  const {
    courseName,
    courseCode,
    examType,
    date,
    startTime,
    duration,
    endTime,
    location
  } = exam;

const history = useNavigate();



  return (
    <div>
      <Nav />
      <h2>Course Name: {courseName || 'N/A'}</h2>
      <h2>Course Code: {courseCode || 'N/A'}</h2>
      <h2>Exam Type: {examType || 'N/A'}</h2>
      <h2>Date: {date || 'N/A'}</h2>
      <h2>Start Time: {startTime || 'N/A'}</h2>
      <h2>Duration: {duration || 'N/A'}</h2>
      <h2>End Time: {endTime || 'N/A'}</h2>
      <h2>Location: {location || 'N/A'}</h2>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
}

export default Exam;
