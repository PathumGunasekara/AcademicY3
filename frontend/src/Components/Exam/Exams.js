
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exams');
        if (response.status === 200) {
          setExams(response.data.Exams);
        } else {
          setError('Failed to fetch exams');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/exams/${id}`);
      if (response.status === 200) {
        // Remove the deleted exam from the state
        setExams(exams.filter(exam => exam._id !== id));
      } else {
        setError('Failed to delete exam');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Exams List</h1>

      {/*Add Exam button */}
      <Link to="/addexam">
        <button>Add Exam</button>
      </Link>


      {exams.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Exam Type</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>Duration (minutes)</th>
              <th>End Time</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam._id}>
                <td>{exam.courseName}</td>
                <td>{exam.courseCode}</td>
                <td>{exam.examType}</td>
                <td>{new Date(exam.date).toLocaleDateString()}</td>
                <td>{exam.startTime}</td>
                <td>{exam.duration}</td>
                <td>{exam.endTime}</td>
                <td>{exam.location}</td>
                <td>
                  <Link to={`/examdetails/${exam._id}`}>
                    <button>Edit</button>
                  </Link>
                  <div>
                    <button onClick={() => handleDelete(exam._id)}>Delete</button>  
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No exams found.</p>
      )}
    </div>
  );
};

export default Exams; 


