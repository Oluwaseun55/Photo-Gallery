import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

const Footer = ({ isLoggedIn }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>📸 ReactGallery</h2>
          <p>Beautiful. Simple. Yours.</p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {isLoggedIn && <Link to="/upload">Upload</Link>}
          {isLoggedIn && <Link to="/admin/images">Admin Gallery</Link>}
        </div>

        <div className="footer-social">
          <h4>Connect</h4>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} ReactGallery by Oluwaseun. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
