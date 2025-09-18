import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="nav">
      <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1 className="brand" onClick={() => navigate('/')}>Career & Skill Adviser</h1>
        <nav className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
      <div className="nav-right">
        {isLoggedIn ? (
          <button className="btn small danger" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="btn small">Login</Link>
            <Link to="/signup" className="btn small primary">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}


