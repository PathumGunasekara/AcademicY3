import React, { useEffect, useState } from 'react';
import StudentNav from "../StudentNav/StudentNav";
import axios from "axios";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';
import Nav from "../../Nav/Nav";

const URL = "http://localhost:5000/students";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    return { students: [] };
  }
};

function StudentDetails() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHandler().then((data) => setStudents(data.students));
  }, []);

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      try {
        await axios.delete(`${URL}/${id}`);
        setStudents(students.filter(student => student._id !== id));
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const filteredStudents = students.filter(student => {
    const combined = `${student.Id} ${student.Name} ${student.DateOfBirth} ${student.Gender} ${student.Phone} ${student.Email} ${student.Address} ${student.Course}`.toLowerCase();
    return combined.includes(searchTerm.toLowerCase());
  });

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Student Details Report", 14, 22);
    doc.setFontSize(16);
    doc.text("University Of Hilltop", 14, 28);
    doc.setFontSize(12);
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    doc.text(`Date: ${currentDate}`, 14, 36);
    doc.text(`Time: ${currentTime}`, 14, 42);
    doc.line(14, 46, 200, 46);

    if (filteredStudents.length > 0) {
      autoTable(doc, {
        startY: 51,
        head: [['ID', 'Name', 'Date of Birth', 'Gender', 'Phone', 'Email', 'Address', 'Course']],
        body: filteredStudents.map(student => [
          student.Id,
          student.Name,
          student.DateOfBirth,
          student.Gender,
          student.Phone,
          student.Email,
          student.Address,
          student.Course,
        ]),
        headStyles: { fillColor: [41, 87, 141], textColor: [255, 255, 255] },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { left: 14, right: 14 },
        theme: 'grid',
      });
    } else {
      doc.text("No student details available.", 14, 56);
    }

    doc.text("Signature: _____________________", 14, doc.lastAutoTable?.finalY + 20 || 76);
    doc.save(`Student_Details_Report_${currentDate}.pdf`);
  };

  return (
    <div>
      <Nav />
      <StudentNav />
      <h4 style={{ textAlign: 'center', marginBottom: '20px', fontSize: "36px", fontWeight: 'bold', color: '#2c3e50' }}>
        Student Details
      </h4>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
      </div>
      <button onClick={generateReport} style={{ display: 'block', margin: '0 auto 20px', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
        Download PDF Report
      </button>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#29578D', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date of Birth</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Gender</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Phone</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Address</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Course</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.Id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.Name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.DateOfBirth}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.Gender}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.Phone}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.Email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.Address}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.Course}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <Link to={`/StudentDetails/${student._id}`} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: 'green', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Update</Link>
                  <button onClick={() => deleteHandler(student._id)} style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', padding: '10px' }}>No Student Records Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDetails;
