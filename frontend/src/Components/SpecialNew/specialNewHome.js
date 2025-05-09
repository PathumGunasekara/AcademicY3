import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";

function SpecialNewHome() {
  const [instructors, setInstructors] = useState([]);
  const [showFormFor, setShowFormFor] = useState(null);
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    moduleName: "",
    moduleCode: "",
    location: "",
    description: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = () => {
    axios
      .get("http://localhost:5000/instructors")
      .then((response) => {
        setInstructors(response.data.instructors);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  };

  const getAvailabilityStatus = (availability) => {
    if (!availability || availability.length === 0) return "Not Available";
    const now = new Date();
    const currentDay = now.toLocaleString("en-us", { weekday: "long" });
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    for (const slot of availability) {
      if (slot.day === currentDay) {
        const [startH, startM] = slot.startTime.split(":").map(Number);
        const [endH, endM] = slot.endTime.split(":").map(Number);
        const startMin = startH * 60 + startM;
        const endMin = endH * 60 + endM;
        if (currentMinutes >= startMin && currentMinutes <= endMin) {
          return "Available";
        }
      }
    }
    return "Not Available";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e, instructorId) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/sessions", {
        ...formData,
        instructorId
      });
      alert("Session successfully created!");

      // Update the instructor's sessions locally
      setInstructors((prevInstructors) =>
        prevInstructors.map((instructor) =>
          instructor._id === instructorId
            ? {
                ...instructor,
                sessions: [...(instructor.sessions || []), response.data.session]
              }
            : instructor
        )
      );

      setShowFormFor(null);
      setFormData({
        startTime: "",
        endTime: "",
        moduleName: "",
        moduleCode: "",
        location: "",
        description: ""
      });
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Failed to create session.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7fb", minHeight: "100vh" }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Nav />
      </div>

      <div style={{ marginTop: "90px", padding: "30px" }}>
        <h2 style={{ color: "#003366", fontSize: "28px", textAlign: "center", marginBottom: "30px" }}>
          Set Time Allocations
        </h2>

        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <thead style={{ backgroundColor: "#0052cc", color: "white" }}>
            <tr>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Faculty</th>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Availability</th>
              <th style={{ padding: "10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {instructors.length > 0 ? (
              instructors.map((i) => {
                const status = getAvailabilityStatus(i.availability);
                return (
                  <React.Fragment key={i._id}>
                    <tr style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "10px" }}>{i.firstName} {i.lastName}</td>
                      <td>{i.faculty}</td>
                      <td>{i.email}</td>
                      <td>{status}</td>
                      <td>
                        {status === "Available" && (
                          <button
                            style={{ backgroundColor: "#28a745", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
                            onClick={() => setShowFormFor(i._id)}
                          >
                            Allocate
                          </button>
                        )}
                      </td>
                    </tr>

                    {showFormFor === i._id && (
                      <tr>
                        <td colSpan="5">
                          <form onSubmit={(e) => handleFormSubmit(e, i._id)} style={{ padding: "20px", backgroundColor: "#eef", marginTop: "10px" }}>
                            <div style={{ marginBottom: "10px" }}>
                              <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} required />
                              <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} required style={{ marginLeft: "10px" }} />
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                              <input type="text" name="moduleName" value={formData.moduleName} onChange={handleInputChange} required placeholder="Module Name" />
                              <input type="text" name="moduleCode" value={formData.moduleCode} onChange={handleInputChange} required placeholder="Module Code" style={{ marginLeft: "10px" }} />
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                              <input type="text" name="location" value={formData.location} onChange={handleInputChange} required placeholder="Location" />
                              <input type="text" name="description" value={formData.description} onChange={handleInputChange} required placeholder="Description" style={{ marginLeft: "10px" }} />
                            </div>
                            <button type="submit" style={{ backgroundColor: "#0052cc", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px" }}>
                              Submit
                            </button>
                          </form>
                        </td>
                      </tr>
                    )}

                    {i.sessions && i.sessions.length > 0 && (
                      <tr>
                        <td colSpan="5" style={{ padding: "10px", backgroundColor: "#f9f9f9" }}>
                          <h4>Sessions:</h4>
                          <ul>
                            {i.sessions.map((session, index) => (
                              <li key={index}>
                                {session.moduleName} ({session.moduleCode}) - {session.startTime} to {session.endTime} at {session.location}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: "15px", textAlign: "center" }}>
                  No instructors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SpecialNewHome;