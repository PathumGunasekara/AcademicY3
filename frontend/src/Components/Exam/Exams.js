import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        alert("Exam deleted successfully");
        setExams(exams.filter((exam) => exam._id !== id));
      } else {
        setError("Failed to delete exam");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredExams = exams.filter(
    (exam) =>
      exam.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Exams Report", 14, 22);
    
    doc.setFontSize(16);
    doc.text("University Of Hilltop", 14, 28);

    doc.setFontSize(12);
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    doc.text(`Date: ${currentDate}`, 14, 36);
    doc.text(`Time: ${currentTime}`, 14, 42);

    doc.line(14, 46, 200, 46);

    if (filteredExams.length > 0) {
      autoTable(doc, {
        startY: 51,
        head: [['Course Name', 'Course Code', 'Exam Type', 'Date', 'Start Time', 'Duration', 'End Time', 'Location']],
        body: filteredExams.map(exam => [
          exam.courseName,
          exam.courseCode,
          exam.examType,
          new Date(exam.date).toLocaleDateString(),
          exam.startTime,
          exam.duration,
          exam.endTime,
          exam.location,
        ]),
        headStyles: { fillColor: [41, 87, 141], textColor: [255, 255, 255] },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { left: 14, right: 14 },
        theme: 'grid',
      });
    } else {
      doc.text("No exam details available.", 14, 56);
    }

    doc.text("Signature: _____________________", 14, doc.lastAutoTable?.finalY + 20 || 76);
    doc.save(`Exams_Report_${currentDate}.pdf`);
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", color: "red", padding: "20px" }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ 
        textAlign: "center", 
        fontSize: "32px", 
        fontWeight: "bold",
        marginBottom: "20px"
      }}>Exams List</h1>

      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search by course name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #000", // Changed to black border
              minWidth: "300px",
            }}
          />
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
        </div>
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

      {filteredExams.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            marginTop: "20px",
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
                    backgroundColor: "#002366",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredExams.map((exam) => (
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
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          {searchTerm ? "No matching exams found" : "No exams found"}
        </p>
      )}
    </div>
  );
};

export default Exams;
