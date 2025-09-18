import React from "react";

export default function AboutUs() {
  return (
    <section className="about-section">
      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">
          Career & Skill Adviser is an AI-powered platform designed to help you achieve your career goals.
          We deliver personalized insights, skill recommendations, and career roadmaps.
        </p>

        <div className="about-grid">
          <div className="glass-card">
            <h2>🚀 Our Mission</h2>
            <p>Bridge the gap between skills and opportunities with data-driven guidance.</p>
          </div>
          <div className="glass-card">
            <h2>💡 Our Vision</h2>
            <p>Be the go-to platform for AI-driven learning paths and job readiness.</p>
          </div>
          <div className="glass-card">
            <h2>🤝 Our Values</h2>
            <p>Innovation, inclusivity, and empowerment for every learner and professional.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

