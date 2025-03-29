import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateInstructor() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    faculty: "Faculty of Computing",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch instructor data on component mount
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/instructors/${id}`);
        console.log("API Response Data:", response.data); // Debug line
        
        // Check if data exists and has the expected structure
        if (response.data) {
          // Use the data directly if it's at the root level
          const instructorData = response.data.instructor || response.data;
          
          setFormData({
            firstName: instructorData.firstName || "",
            lastName: instructorData.lastName || "",
            email: instructorData.email || "",
            phone: instructorData.phone || "",
            faculty: instructorData.faculty || "Faculty of Computing",
          });
        } else {
          setError("Invalid instructor data format");
        }
      } catch (err) {
        console.error("Full error details:", err.response || err); // Debug line
        setError("Failed to fetch instructor data");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict numeric input for first and last names
    if ((name === "firstName" || name === "lastName") && /[^a-zA-Z\s]/.test(value)) {
      setError("Name fields should contain only letters");
      return;
    }

    // Restrict letters in the phone number field, allowing only digits
    if (name === "phone" && /[^0-9]/.test(value)) {
      setError("Phone number should contain only digits");
      return;
    }

    setError(""); // Clear error if valid
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if an error exists
    if (error) {
      alert("Please fix the error before submitting.");
      return;
    }

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    if (!/^[A-Za-z\s]{2,}$/.test(formData.firstName)) {
      alert("First name must contain only alphabetic characters and be at least 2 characters long");
      return;
    }

    if (!/^[A-Za-z\s]{2,}$/.test(formData.lastName)) {
      alert("Last name must contain only alphabetic characters and be at least 2 characters long");
      return;
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/instructors/${id}`, formData);
      alert("Instructor updated successfully!");
      navigate("/InstructorHome");
    } catch (error) {
      console.error("Error updating instructor:", error);
      alert("Failed to update instructor");
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading instructor data...</div>;
  if (error && !formData.firstName) return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: 'auto', 
      backgroundColor: '#ffffff', 
      borderRadius: '10px', 
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' 
    }}>
      <h2 style={{ textAlign: 'center', color: '#003366', marginBottom: '20px' }}>Update Instructor</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>First Name</label><br />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Last Name</label><br />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Email</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Phone</label><br />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Faculty</label><br />
          <select
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="Faculty of Computing">Faculty of Computing</option>
            <option value="Faculty of Engineering">Faculty of Engineering</option>
            <option value="Faculty of Business">Faculty of Business</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#003366',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Update Instructor
        </button>
      </form>
    </div>
  );
}

export default UpdateInstructor;