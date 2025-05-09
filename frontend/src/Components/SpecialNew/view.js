import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";

function View() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = () => {
    axios
  .get("http://localhost:5000/api/sessions/<instructorId>")
  .then((response) => {
    setSessions(response.data.sessions || []);
  })
  .catch((error) => {
    console.error("Error fetching sessions:", error);
    alert("Failed to fetch sessions.");
  });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7fb", minHeight: "100vh" }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Nav />
      </div>

      <div style={{ marginTop: "90px", padding: "30px" }}>
        <h2 style={{ color: "#003366", fontSize: "28px", textAlign: "center", marginBottom: "30px" }}>
          All Session Allocations
        </h2>

        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "#0052cc",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            marginBottom: "20px",
            cursor: "pointer"
          }}
        >
          ← Back
        </button>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >
          <thead style={{ backgroundColor: "#0052cc", color: "white" }}>
            <tr>
              <th style={{ padding: "10px" }}>Module Name</th>
              <th style={{ padding: "10px" }}>Module Code</th>
              <th style={{ padding: "10px" }}>Start Time</th>
              <th style={{ padding: "10px" }}>End Time</th>
              <th style={{ padding: "10px" }}>Location</th>
              <th style={{ padding: "10px" }}>Description</th>
              <th style={{ padding: "10px" }}>Instructor ID</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <tr key={session._id} style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}>
                  <td>{session.moduleName}</td>
                  <td>{session.moduleCode}</td>
                  <td>{session.startTime}</td>
                  <td>{session.endTime}</td>
                  <td>{session.location}</td>
                  <td>{session.description}</td>
                  <td>{session.instructorId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: "20px", textAlign: "center" }}>
                  No sessions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
