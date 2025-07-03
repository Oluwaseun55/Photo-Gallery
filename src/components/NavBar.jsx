import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/NavBar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/upload");

  return (
    <nav className="navbar">
      <div className="navbar-brand">📸 ReactGallery</div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        {isOpen ? "✕" : "☰"}
      </button>

      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>
          Home
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              About
            </Link>
            {/* Login button removed for public users */}
          </>
        )}

        {isLoggedIn && isAdminRoute && (
          <>
            <Link to="/upload" className="nav-link" onClick={closeMenu}>
              Upload
            </Link>
            <Link to="/admin/images" className="nav-link" onClick={closeMenu}>
              Admin Gallery
            </Link>
            <button
              className="logout-btn"
              onClick={() => {
                onLogout();
                closeMenu();
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
