import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../constants";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Signup failed");
      }
      navigate("/login");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us and start your journey."
      onSwitch={() => navigate("/login")}
      switchLabel="Already have an account?"
      switchText="Login"
    >
      <form onSubmit={submit} className="form">
        <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn primary" type="submit" disabled={loading}>{loading ? "Creating..." : "Signup"}</button>
      </form>
      {error && <p className="error" style={{ textAlign: 'center' }}>{error}</p>}
    </AuthLayout>
  );
}
