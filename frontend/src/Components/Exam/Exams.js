import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:5000/exams");
        if (response.status === 200) {
          setExams(response.data.Exams);
        } else {
          setError("Failed to fetch exams");
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
        setExams(exams.filter((exam) => exam._id !== id));
      } else {
        setError("Failed to delete exam");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Exams Report", 14, 15);

    // Define table columns
    const columns = [
      "Course Name",
      "Course Code",
      "Exam Type",
      "Date",
      "Start Time",
      "Duration (minutes)",
      "End Time",
      "Location",
    ];

    // Map exam data to table rows
    const rows = exams.map((exam) => [
      exam.courseName,
      exam.courseCode,
      exam.examType,
      new Date(exam.date).toLocaleDateString(),
      exam.startTime,
      exam.duration,
      exam.endTime,
      exam.location,
    ]);

    // Generate table
    autoTable(doc, {
      startY: 20, // Positioning below the title
      head: [columns],
      body: rows,
    });

    // Save the PDF
    doc.save("exams_report.pdf");
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", color: "red", padding: "20px" }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Exams List</h1>

      <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={generateReport}
          style={{
            padding: "10px 15px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Generate Report
        </button>
        <Link to="/addexam">
          <button
            style={{
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Add Exam
          </button>
        </Link>
      </div>

      {exams.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              {[
                "Course Name",
                "Course Code",
                "Exam Type",
                "Date",
                "Start Time",
                "Duration (minutes)",
                "End Time",
                "Location",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                    textAlign: "center",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam._id}>
                <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                  {exam.courseName}
                </td>
                <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                  {exam.courseCode}
                </td>
                <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                  {exam.examType}
                </td>
                <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                  {new Date(exam.date).toLocaleDateString()}
                </td>
                <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                  {exam.startTime}
                </td>
                <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                  {exam.duration}
                </td>
                <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                  {exam.endTime}
                </td>
                <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                  {exam.location}
                </td>
                <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                  <Link to={`/examdetails/${exam._id}`}>
                    <button
                      style={{
                        marginRight: "5px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(exam._id)}
                    style={{
                      padding: "5px 10px",
                      cursor: "pointer",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No exams found.</p>
      )}
    </div>
  );
};

export default Exams;
