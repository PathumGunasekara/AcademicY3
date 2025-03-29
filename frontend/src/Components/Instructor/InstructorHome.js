import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Popup for delete confirmation
import "react-confirm-alert/src/react-confirm-alert.css"; // Importing styles for confirmAlert
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function InstructorHome() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch instructors from the backend
    axios
      .get("http://localhost:5000/instructors")
      .then((response) => {
        setInstructors(response.data.instructors);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

  // Check if instructor is available based on current date and time
  const getAvailabilityStatus = (availability) => {
    if (!availability || availability.length === 0) {
      return "Not Available";
    }

    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString("en-us", { weekday: "long" });
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes(); // Convert to minutes

    for (let slot of availability) {
      if (slot.day === currentDay) {
        const [startHour, startMinute] = slot.startTime.split(":").map(Number);
        const [endHour, endMinute] = slot.endTime.split(":").map(Number);

        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;

        if (currentTime >= startTimeInMinutes && currentTime <= endTimeInMinutes) {
          return "Available";
        }
      }
    }
    return "Not Available";
  };

  // Delete instructor
  const deleteInstructor = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this instructor?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`http://localhost:5000/instructors/${id}`)
              .then(() => {
                setInstructors(instructors.filter((instructor) => instructor._id !== id));
                alert("Instructor deleted successfully");
              })
              .catch((error) => {
                console.error("Error deleting instructor:", error);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  // Generate PDF report without ID
  const generateReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Instructor Details Report", 14, 22);

    doc.setFontSize(16);
    doc.text("University Of Hilltop", 14, 28);

    doc.setFontSize(12);
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    doc.text(`Date: ${currentDate}`, 14, 36);
    doc.text(`Time: ${currentTime}`, 14, 42);

    doc.line(14, 46, 200, 46);

    if (instructors.length > 0) {
      autoTable(doc, {
        startY: 51,
        head: [["Name", "Email", "Phone", "Faculty", "Availability"]], // Removed ID from headers
        body: instructors.map((instructor) => [
          `${instructor.firstName} ${instructor.lastName}`, // Name
          instructor.email, // Email
          instructor.phone, // Phone
          instructor.faculty, // Faculty
          getAvailabilityStatus(instructor.availability), // Availability Status
        ]),
        headStyles: { fillColor: [41, 87, 141], textColor: [255, 255, 255] },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { left: 14, right: 14 },
        theme: "grid",
      });
    } else {
      doc.text("No instructor details available.", 14, 56);
    }

    doc.text("Signature: _____________________", 14, doc.lastAutoTable?.finalY + 20 || 76);
    doc.save(`Instructor_Details_Report_${currentDate}.pdf`);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", marginTop: "30px", backgroundColor: "#f4f7fb", padding: "30px", borderRadius: "8px" }}>
      <h2 style={{ color: "#004080", marginBottom: "25px", fontSize: "28px", textAlign: "center" }}>Instructor Management</h2>
      <div style={{ marginBottom: "25px", textAlign: "center" }}>
        <Link
          to="/addinstructor"
          style={{
            padding: "12px 25px",
            backgroundColor: "#0052cc",
            color: "white",
            borderRadius: "8px",
            fontSize: "16px",
            textDecoration: "none",
            marginRight: "15px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0044cc")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0052cc")}
        >
          Add New Instructor
        </Link>
        <Link
          to="/manage-availability"
          style={{
            padding: "12px 25px",
            backgroundColor: "#0066cc",
            color: "white",
            borderRadius: "8px",
            fontSize: "16px",
            textDecoration: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0057b8")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0066cc")}
        >
          Manage Availability
        </Link>
        <button
          onClick={generateReport}
          style={{
            padding: "12px 25px",
            backgroundColor: "#17a2b8",
            color: "white",
            borderRadius: "8px",
            fontSize: "16px",
            marginTop: "10px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            marginLeft: "15px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#138496")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#17a2b8")}
        >
          Download Report
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#ffffff", borderRadius: "8px", overflow: "hidden" }}>
        <thead>
          <tr style={{ backgroundColor: "#004080", color: "white" }}>
            <th style={{ padding: "15px", textAlign: "left", fontSize: "16px" }}>Name</th>
            <th style={{ padding: "15px", textAlign: "left", fontSize: "16px" }}>Email</th>
            <th style={{ padding: "15px", textAlign: "left", fontSize: "16px" }}>Phone</th>
            <th style={{ padding: "15px", textAlign: "left", fontSize: "16px" }}>Faculty</th>
            <th style={{ padding: "15px", textAlign: "left", fontSize: "16px" }}>Availability Status</th>
            <th style={{ padding: "15px", textAlign: "left", fontSize: "16px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor._id} style={{ borderBottom: "1px solid #eee", backgroundColor: "#fafafa" }}>
              <td style={{ padding: "15px", fontSize: "15px" }}>{instructor.firstName} {instructor.lastName}</td>
              <td style={{ padding: "15px", fontSize: "15px" }}>{instructor.email}</td>
              <td style={{ padding: "15px", fontSize: "15px" }}>{instructor.phone}</td>
              <td style={{ padding: "15px", fontSize: "15px" }}>{instructor.faculty}</td>
              <td style={{ padding: "15px", fontSize: "15px" }}>{getAvailabilityStatus(instructor.availability)}</td>
              <td style={{ padding: "15px" }}>
                <Link
                  to={`/updateinstructor/${instructor._id}`}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#28a745",
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "14px",
                    textDecoration: "none",
                    marginRight: "10px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
                >
                  Update
                </Link>
                <button
                  onClick={() => deleteInstructor(instructor._id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "14px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InstructorHome;
