import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ handleSearch }) {
  return (
    <header className="header">
      {/* LOGO */}
      <div className="logoBox">
        <h2>User Management</h2>
      </div>

      {/* NAV */}
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/view">View Users</Link>
      </nav>

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by username or email..."
          onChange={handleSearch}
        />
      </div>
    </header>
  );
}

export default Header;