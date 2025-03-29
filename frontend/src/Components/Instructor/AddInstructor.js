import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddInstructor() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    faculty: "Faculty of Computing",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  // Handle input changes and restrict numeric input for first and last names
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict numeric input for first and last names
    if ((name === "firstName" || name === "lastName") && /[^a-zA-Z\s]/.test(value)) {
      return; // If the value contains any non-alphabetic characters, don't update the state
    }

    // Restrict letters in the phone number field, allowing only digits
    if (name === "phone" && /[^0-9]/.test(value)) {
      return; // If the value contains any non-numeric characters, don't update the state
    }

    setFormData({ ...formData, [name]: value });
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    // First Name validation (alphabetic and min 2 chars, no numbers allowed)
    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
    } else if (!/^[A-Za-z\s]{2,}$/.test(formData.firstName)) {
      newErrors.firstName = "First name must contain only alphabetic characters and be at least 2 characters long.";
    }

    // Last Name validation (alphabetic and min 2 chars, no numbers allowed)
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z\s]{2,}$/.test(formData.lastName)) {
      newErrors.lastName = "Last name must contain only alphabetic characters and be at least 2 characters long.";
    }

    // Email validation (strict format)
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone validation (only digits and exactly 10 digits)
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    // Set errors
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Only submit if the form is valid

    axios
      .post("http://localhost:5000/instructors", formData)
      .then(() => {
        alert("Instructor added successfully!");
        navigate("/InstructorHome"); // Redirect to the instructor list page
      })
      .catch((error) => {
        console.error("Error adding instructor:", error);
        alert("Failed to add instructor");
      });
  };

  return (
    <div>
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#003366', marginBottom: '20px' }}>Add New Instructor</h2>
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
            {errors.firstName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</p>}
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
            {errors.lastName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.lastName}</p>}
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
            {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
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
            {errors.phone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</p>}
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
            Add Instructor
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddInstructor;
