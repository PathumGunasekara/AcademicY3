import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/mainhome" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/StudentHome" className="nav-link">Students</Link>
        </li>
        <li className="nav-item">
          <Link to="/instructors" className="nav-link">Instructors</Link>
        </li>
        <li className="nav-item">
          <Link to="/exams" className="nav-link">Exams</Link>
        </li>
        <li className="nav-item">
          <Link to="/courses" className="nav-link">Courses</Link>
        </li>
        <li className="nav-item">
          <Link to="/time-allocations" className="nav-link">Time Allocations</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

