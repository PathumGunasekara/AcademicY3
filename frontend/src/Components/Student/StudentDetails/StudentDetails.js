import React, { useEffect, useState } from 'react';
import StudentNav from "../StudentNav/StudentNav";
import axios from "axios";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Student from '../Student/Student';

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

  useEffect(() => {
    fetchHandler().then((data) => setStudents(data.students));
  }, []);

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

    if (students.length > 0) {
      autoTable(doc, {
        startY: 51,
        head: [['ID', 'Name', 'Date of Birth', 'Gender', 'Phone', 'Email', 'Address', 'Course']],
        body: students.map(student => [
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
      <StudentNav />
      <h1>Student Details Display Page</h1>
      <button onClick={generateReport} style={{ marginBottom: '20px', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
        Download PDF Report
      </button>
      <div>
        {students && students.map((student, i) => (
          <div key={i}>
            <Student student={student} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDetails;
