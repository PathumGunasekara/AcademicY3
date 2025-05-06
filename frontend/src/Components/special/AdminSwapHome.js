import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminSwapHome() {
  const [availableInstructors, setAvailableInstructors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/instructors")
      .then((response) => {
        const instructors = response.data.instructors;
        const available = instructors.filter((instructor) =>
          isInstructorAvailable(instructor.availability)
        );
        setAvailableInstructors(available);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

  const isInstructorAvailable = (availability) => {
    if (!availability || availability.length === 0) return false;

    const now = new Date();
    const currentDay = now.toLocaleString("en-us", { weekday: "long" });
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return availability.some((slot) => {
      if (slot.day !== currentDay) return false;

      const [startHour, startMinute] = slot.startTime.split(":").map(Number);
      const [endHour, endMinute] = slot.endTime.split(":").map(Number);

      const start = startHour * 60 + startMinute;
      const end = endHour * 60 + endMinute;

      return currentMinutes >= start && currentMinutes <= end;
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Available Instructors</h1>
        <p style={styles.subheading}>Showing instructors available right now</p>

        {availableInstructors.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Faculty</th>
                <th style={styles.th}>Email</th>
              </tr>
            </thead>
            <tbody>
              {availableInstructors.map((inst) => (
                <tr key={inst._id}>
                  <td style={styles.td}>{inst.firstName} {inst.lastName}</td>
                  <td style={styles.td}>{inst.faculty}</td>
                  <td style={styles.td}>{inst.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ marginTop: "20px", color: "#888" }}>No instructors are currently available.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#e6f0ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 51, 102, 0.2)",
    textAlign: "center",
    width: "100%",
    maxWidth: "700px",
  },
  heading: {
    color: "#003366",
    fontSize: "26px",
    marginBottom: "10px",
  },
  subheading: {
    color: "#336699",
    fontSize: "16px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#004080",
    color: "white",
    padding: "12px",
    fontSize: "15px",
  },
  td: {
    padding: "12px",
    fontSize: "14px",
    borderBottom: "1px solid #ddd",
  },
};

export default AdminSwapHome;
