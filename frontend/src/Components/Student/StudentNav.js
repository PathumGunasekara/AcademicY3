import React from "react";
import { Link } from "react-router-dom";

function StudentNav() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      width: '100%',
      marginBottom: '30px'
    }}>
      <header>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          marginTop: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          maxWidth: '1200px',
          margin: '20px auto'
        }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            fontWeight: 'bold'
          }}>
            <Link to="/Home" style={{ textDecoration: 'none' }}>
              <button style={{
                backgroundColor: '#003366',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                ':hover': {
                  backgroundColor: '#004080',
                  transform: 'translateY(-2px)'
                }
              }}>
                Back to Home
              </button>
            </Link>
            <Link to="/AddStudent" style={{ textDecoration: 'none' }}>
              <button style={{
                backgroundColor: '#003366',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                ':hover': {
                  backgroundColor: '#004080',
                  transform: 'translateY(-2px)'
                }
              }}>
                Add Student
              </button>
            </Link>
            <Link to="/StudentDetails" style={{ textDecoration: 'none' }}>
              <button style={{
                backgroundColor: '#003366',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                ':hover': {
                  backgroundColor: '#004080',
                  transform: 'translateY(-2px)'
                }
              }}>
                Students Details
              </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default StudentNav;