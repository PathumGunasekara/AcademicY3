import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/Home" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/StudentDetails" className="nav-link">Students</Link>
        </li>
        <li className="nav-item">
          <Link to="/InstructorHome" className="nav-link">Instructors</Link>
        </li>
        <li className="nav-item">
          <Link to="/exams" className="nav-link">Exams</Link>
        </li>
        <li className="nav-item">
          <Link to="/courses" className="nav-link">Courses</Link>
        </li>
        <li className="nav-item">
          <Link to="/specialNewHome" className="nav-link">Time Allocations</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

