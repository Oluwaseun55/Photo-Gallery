import React from "react";
import "../css/About.css";

const About = () => {
  return (
    <main className="about-page">
      <h1 className="about-title">📷 About ReactGallery</h1>

      <section className="about-card">
        <h2>📸 What is ReactGallery?</h2>
        <p>
          ReactGallery is a modern image management platform built for
          simplicity and speed. It allows users to view curated collections and
          gives admins the power to manage content effectively.
        </p>
      </section>

      <section className="about-card">
        <h2>🔥 Key Features</h2>
        <ul>
          <li>View stunning, published-only image collections</li>
          <li>Admin-only image upload and deletion</li>
          <li>Toggle publish/unpublish per image</li>
          <li>Secure image download links</li>
          <li>Responsive UI with grid and card layout</li>
        </ul>
      </section>

      <section className="about-card">
        <h2>🛠 Technologies Used</h2>
        <div className="tech-tags">
          <span>React.js</span>
          <span>PHP (REST APIs)</span>
          <span>MySQL</span>
          <span>CSS Grid & Flexbox</span>
          <span>Session Auth</span>
        </div>
      </section>

      <section className="about-card">
        <h2>👤 Meet the Developer</h2>
        <p>
          Created by <strong>Oluyinka Oluwaseun Emmanuel</strong>, a passionate
          full-stack developer with a strong background in education systems,
          e-commerce, and smart applications using React, PHP, and Data Science.
        </p>
      </section>

      <section className="about-card call-to-action">
        <h2>🚀 Ready to Explore?</h2>
        <p>Head over to the gallery to browse and download awesome uploads.</p>
        <a href="/" className="cta-button" rel="noopener noreferrer">
          Go to Gallery
        </a>
      </section>
    </main>
  );
};

export default About;
