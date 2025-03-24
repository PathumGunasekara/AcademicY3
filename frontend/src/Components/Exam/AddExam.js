import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExam = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    examType: '',
    date: '',
    startTime: '',
    duration: '',
    endTime: '',
    location: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for Course Name (no numbers allowed)
    if (name === 'courseName' && /\d/.test(value)) {
      setError('Course name should not contain numbers.');
      return;
    }

    // Validation for Date (cannot be a past date)
    if (name === 'date') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison

      if (selectedDate < currentDate) {
        setError('You cannot select a past date.');
        return;
      }
    }

    // Clear any previous errors
    setError('');

    // Update the form data
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there is any error before submitting
    if (error) {
      alert('Please fix the error before submitting.');
      return;
    } 

    try {
      const response = await axios.post('http://Localhost:5000/exams', formData);
      if (response.status === 200) {
        alert('Exam added successfully!');
        navigate('/exams');
        // Clear the form after successful submission
        setFormData({
          courseName: '',
          courseCode: '',
          examType: '',
          date: '',
          startTime: '',
          duration: '',
          endTime: '',
          location: ''
        });
      }
    } catch (error) {
      console.error('Error adding exam:', error);
      alert('Failed to add exam. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add Exam</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
          {error && error.includes('Course name') && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <div>
          <label>Course Code:</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Exam Type:</label>
          <input
            type="text"
            name="examType"
            value={formData.examType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {error && error.includes('past date') && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration (in minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Exam</button>
      </form>
    </div>
  );
};

export default AddExam;