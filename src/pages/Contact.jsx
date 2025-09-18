import React, { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="contact-grid">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Get in Touch</h2>
        <p className="muted">We'd love to hear from you. Send a message and we'll respond soon.</p>
        <form className="form" onSubmit={onSubmit}>
          <input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
          <button className="btn primary" type="submit">Send Message</button>
          {sent && <span className="muted">Message sent. We'll get back to you.</span>}
        </form>
      </div>
      <div className="contact-side">
        <h3>Contact Details</h3>
        <p>For partnership and support inquiries:</p>
        <p><b>Email:</b> support@career-skill.ai</p>
        <p><b>Location:</b> Planet Earth, 2050</p>
      </div>
    </div>
  );
}



