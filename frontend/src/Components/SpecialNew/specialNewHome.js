import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";

function SpecialNewHome() {
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search term
  const [showFormFor, setShowFormFor] = useState(null);
  const [formData, setFormData] = useState(initialFormData());
  const [editing, setEditing] = useState({ instructorId: null, sessionIndex: null });

  function initialFormData() {
    return {
      startTime: "",
      endTime: "",
      moduleName: "",
      moduleCode: "",
      location: "",
      description: ""
    };
  }

  const LOCAL_SESSIONS_KEY = "allocatedSessions";

  const loadStoredSessions = () => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_SESSIONS_KEY)) || {};
    } catch (e) {
      return {};
    }
  };

  const storeSessions = (sessionMap) => {
    localStorage.setItem(LOCAL_SESSIONS_KEY, JSON.stringify(sessionMap));
  };

  useEffect(() => {
    axios.get("http://localhost:5000/instructors")
      .then((res) => {
        const fetched = res.data.instructors;
        const savedSessions = loadStoredSessions();

        const updated = fetched.map((inst) => ({
          ...inst,
          sessions: [...(inst.sessions || []), ...(savedSessions[inst._id] || [])]
        }));

        setInstructors(updated);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const getAvailabilityStatus = (availability) => {
    if (!availability?.length) return "Not Available";
    const now = new Date();
    const currentDay = now.toLocaleString("en-us", { weekday: "long" });
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return availability.some(({ day, startTime, endTime }) => {
      if (day !== currentDay) return false;
      const [startH, startM] = startTime.split(":").map(Number);
      const [endH, endM] = endTime.split(":").map(Number);
      const start = startH * 60 + startM;
      const end = endH * 60 + endM;
      return currentMinutes >= start && currentMinutes <= end;
    }) ? "Available" : "Not Available";
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e, instructorId) => {
    e.preventDefault();

    setInstructors(prev => {
      const updated = prev.map(inst => {
        if (inst._id === instructorId) {
          const allSessions = loadStoredSessions();
          const newSessions = [...(inst.sessions || [])];

          if (editing.instructorId === instructorId && editing.sessionIndex !== null) {
            newSessions[editing.sessionIndex] = { ...formData };
            allSessions[instructorId] = newSessions;
          } else {
            newSessions.push({ ...formData });
            allSessions[instructorId] = newSessions;
          }

          storeSessions(allSessions);
          return { ...inst, sessions: newSessions };
        }
        return inst;
      });

      return updated;
    });

    setShowFormFor(null);
    setEditing({ instructorId: null, sessionIndex: null });
    setFormData(initialFormData());
    alert(editing.sessionIndex !== null ? "Session updated." : "Session allocated.");
  };

  const handleEdit = (instructorId, sessionIndex) => {
    const instructor = instructors.find(i => i._id === instructorId);
    const session = instructor.sessions[sessionIndex];

    setFormData(session);
    setShowFormFor(instructorId);
    setEditing({ instructorId, sessionIndex });
  };

  const handleDelete = (instructorId, sessionIndex) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;

    setInstructors(prev => {
      const updated = prev.map(inst => {
        if (inst._id === instructorId) {
          const newSessions = [...inst.sessions];
          newSessions.splice(sessionIndex, 1);
          const allSessions = loadStoredSessions();
          allSessions[instructorId] = newSessions;
          storeSessions(allSessions);
          return { ...inst, sessions: newSessions };
        }
        return inst;
      });

      return updated;
    });
  };

  // ✅ Filter instructors and their sessions
  const filteredInstructors = instructors.map(inst => ({
    ...inst,
    sessions: (inst.sessions || []).filter(s => {
      const combined = `${inst.firstName} ${inst.lastName} ${s.moduleName} ${s.moduleCode} ${s.location} ${s.description}`.toLowerCase();
      return combined.includes(searchTerm.toLowerCase());
    })
  })).filter(inst => {
    const nameMatch = `${inst.firstName} ${inst.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || inst.sessions.length > 0;
  });

  // ✅ CSV Download
  const downloadCSV = () => {
    const headers = ["Instructor", "Module", "Code", "Start", "End", "Location", "Description"];
    const rows = filteredInstructors.flatMap(inst =>
      inst.sessions.map(s => [
        `${inst.firstName} ${inst.lastName}`,
        s.moduleName,
        s.moduleCode,
        s.startTime,
        s.endTime,
        s.location,
        s.description
      ])
    );
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "filtered_sessions.csv";
    a.click();
  };

  return (
    <div style={{ fontFamily: "Arial", backgroundColor: "#f4f7fb", minHeight: "100vh" }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Nav />
      </div>

      <div style={{ marginTop: 90, padding: 30 }}>
        <h2 style={{ textAlign: "center", color: "#003366",fontSize: "36px" }}>Set Time Allocations</h2>

        {/* ✅ Search input */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search by name, module, code, etc."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%", padding: 10, fontSize: 16, border: "1px solid #ccc", borderRadius: 4 }}
          />
        </div>

        <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <thead style={{ backgroundColor: "#0052cc", color: "#fff" }}>
            <tr>
              <th>Name</th><th>Faculty</th><th>Email</th><th>Availability</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstructors.map(inst => {
              const status = getAvailabilityStatus(inst.availability);
              return (
                <React.Fragment key={inst._id}>
                  <tr style={{ textAlign: "center" }}>
                    <td>{inst.firstName} {inst.lastName}</td>
                    <td>{inst.faculty}</td>
                    <td>{inst.email}</td>
                    <td>{status}</td>
                    <td>
                      {status === "Available" && (
                        <button
                          onClick={() => {
                            setShowFormFor(inst._id);
                            setFormData(initialFormData());
                            setEditing({ instructorId: null, sessionIndex: null });
                          }}
                          style={{ background: "#28a745", color: "#fff", padding: "6px 12px", borderRadius: 4 }}
                        >
                          Allocate
                        </button>
                      )}
                    </td>
                  </tr>
                  {showFormFor === inst._id && (
                    <tr>
                      <td colSpan="5" style={{ padding: 20 }}>
                        <form onSubmit={(e) => handleFormSubmit(e, inst._id)} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          <div>
                            <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} required />
                            <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} required style={{ marginLeft: 10 }} />
                          </div>
                          <div>
                            <input type="text" name="moduleName" placeholder="Module Name" value={formData.moduleName} onChange={handleInputChange} required />
                            <input type="text" name="moduleCode" placeholder="Module Code" value={formData.moduleCode} onChange={handleInputChange} required style={{ marginLeft: 10 }} />
                          </div>
                          <div>
                            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} required />
                            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required style={{ marginLeft: 10 }} />
                          </div>
                          <button type="submit" style={{ background: "#0052cc", color: "#fff", padding: "8px 16px", borderRadius: 4 }}>
                            {editing.sessionIndex !== null ? "Update Session" : "Submit"}
                          </button>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        <div style={{ marginTop: 50 }}>
         <h3 style={{ textAlign: "center", color: "#003366", fontSize: "36px" }}>Allocated Sessions</h3>
          <button onClick={downloadCSV} style={{ marginBottom: 10, background: "#0052cc", color: "#fff", padding: "6px 12px", borderRadius: 4 }}>
            Download Report
          </button>

          <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <thead style={{ backgroundColor: "#0052cc", color: "#fff" }}>
              <tr>
                <th>Instructor</th><th>Module</th><th>Code</th><th>Start</th><th>End</th><th>Location</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstructors.flatMap(inst =>
                (inst.sessions || []).map((s, idx) => (
                  <tr key={`${inst._id}-${idx}`} style={{ textAlign: "center" }}>
                    <td>{inst.firstName} {inst.lastName}</td>
                    <td>{s.moduleName}</td>
                    <td>{s.moduleCode}</td>
                    <td>{s.startTime}</td>
                    <td>{s.endTime}</td>
                    <td>{s.location}</td>
                    <td>
                      <button onClick={() => handleEdit(inst._id, idx)} style={{ marginRight: 6, background: "#ffc107", color: "#000", padding: "4px 10px", borderRadius: 4 }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(inst._id, idx)} style={{ background: "#dc3545", color: "#fff", padding: "4px 10px", borderRadius: 4 }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
              {filteredInstructors.every(i => !i.sessions?.length) && (
                <tr><td colSpan="7" style={{ textAlign: "center", padding: 20 }}>No sessions allocated.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SpecialNewHome;
