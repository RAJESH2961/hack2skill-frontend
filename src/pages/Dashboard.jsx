import React, { useEffect, useState } from "react";
import { API_BASE } from "../constants";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    (async () => {
      try {
        const me = await fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (me.ok) setProfile(await me.json());
        const dash = await fetch(`${API_BASE}/ops/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
        if (dash.ok) {
          const d = await dash.json();
          setMessage(d.message || "Welcome back");
        }
      } catch (e) {
        setMessage(e.message);
      }
    })();
  }, []);

  return (
    <div className="card dashboard-card">
      <h2 style={{ marginTop: 0 }}>Dashboard</h2>
      <p className="muted">{message}</p>
      {profile ? (
        <div className="profile-block">
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
        </div>
      ) : (
        <p className="muted">Login to view profile details.</p>
      )}
    </div>
  );
}


