import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // ✅ Simulate backend validation here
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (
        user ||
        (email === "balajiscientist@gmail.com" && password === "Balaji@123")
      ) {
        // Use AuthContext login function
        login("dummy_access_token");
        navigate("/home");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your journey."
      onSwitch={() => navigate("/signup")}
      switchLabel="New here?"
      switchText="Create an account"
    >
      <form onSubmit={submit} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && (
        <p className="error" style={{ textAlign: "center" }}>
          {error}
        </p>
      )}
    </AuthLayout>
  );
}
