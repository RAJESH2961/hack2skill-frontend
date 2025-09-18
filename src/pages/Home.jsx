import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import OperationCard from "../components/OperationCard";
import { API_BASE } from "../constants";

export default function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [message, setMessage] = useState("");
  const [results, setResults] = useState(null);
  const [loadingKey, setLoadingKey] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  // Generic fetcher for GET endpoints
  const runGet = async (path, key, successMsg) => {
    setLoadingKey(key);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Request failed");
      }

      const data = await res.json();

      if (successMsg) setMessage(successMsg);
      setResults(data);
    } catch (e) {
      setMessage(e.message || "Something went wrong");
      setResults(null);
    } finally {
      setLoadingKey("");
    }
  };

  // Upload Resume (POST)
  const uploadResume = async () => {
    if (!resumeFile) {
      setMessage("⚠️ Please select a resume file before uploading.");
      return;
    }

    setLoadingKey("upload");
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const res = await fetch(`${API_BASE}/upload-resume`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Upload failed");
      }

      const data = await res.json();
      setMessage("✅ Resume uploaded successfully!");
      setResults(data);
    } catch (e) {
      setMessage(e.message || "Something went wrong during upload");
    } finally {
      setLoadingKey("");
    }
  };

  const parseResume = () =>
    runGet("/parse", "parse", "✅ Resume parsed successfully!");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const queryButtons = [
    { label: "🔍 GenAI Tech Trends", path: "/trends-genai", key: "trends" },
    { label: "🌐 Emerging Tech & Jobs", path: "/emerging-tech", key: "emerging" },
    { label: "📄 Summarize Resume", path: "/summarize-resume", key: "summarize" },
    { label: "🖼️ Career Path Visual", path: "/career-path-visual", key: "careerPath" },
    { label: "🌞 Jobs in India", path: "/job-search-india", key: "jobSearch" },
    { label: "📑 Resume → Job Match", path: "/resume-job-match", key: "jobMatch" },
    { label: "🧠 Generate Cover Letter", path: "/generate-cover-letter", key: "coverLetter" },
  ];

  return (
    <main className="card home-card">
      {/* Hero Section */}
      <section className="hero">
        <div>
          <h2>AI that powers your future career</h2>
          <p className="muted">
            Resume is automatically loaded from backend for insights and recommendations.
          </p>
          <div className="cta-row">
            {/* Resume Upload */}
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
            <button
              className="btn primary"
              onClick={uploadResume}
              disabled={loadingKey === "upload"}
            >
              {loadingKey === "upload" ? "Uploading..." : "Upload Resume"}
            </button>

            {/* Parse Button */}
            <button
              className="btn success"
              onClick={parseResume}
              disabled={loadingKey === "parse"}
            >
              {loadingKey === "parse" ? "Parsing..." : "Fetch & Parse Resume"}
            </button>

            {/* Logout */}
            <button className="btn danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="hero-image">🤖</div>
      </section>

      {/* Query Buttons */}
      <section className="query-row">
        {queryButtons.map((btn, i) => (
          <button
            key={i}
            className="btn query"
            onClick={() => runGet(btn.path, btn.key)}
            disabled={!!loadingKey}
          >
            {loadingKey === btn.key ? "Loading..." : btn.label}
          </button>
        ))}
      </section>

      {/* Operation Cards */}
      <section className="ops-row">
        <OperationCard
          title="Career Recommendations"
          description="Personalized roles and paths."
          actionLabel={loadingKey === "rec" ? "Running..." : "Run"}
          onAction={() => runGet("/career-recommend", "rec")}
          disabled={!!loadingKey}
        />
        <OperationCard
          title="Skill Gap Analysis"
          description="Find missing skills and learning plan."
          actionLabel={loadingKey === "gap" ? "Running..." : "Run"}
          onAction={() => runGet("/skill-gap", "gap")}
          disabled={!!loadingKey}
        />
        <OperationCard
          title="AI Insights"
          description="Quick insights from your profile."
          actionLabel={loadingKey === "ins" ? "Running..." : "Run"}
          onAction={() => runGet("/ai-insights", "ins")}
          disabled={!!loadingKey}
        />
      </section>

      {/* Results */}
      {/* Results */}
<section className="results">
  <h3>Results</h3>
  {message && <p className="muted">{message}</p>}
  {results ? (
    <div
      style={{
        marginTop: "1rem",
        padding: "1rem 2.25rem",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(148,163,184,0.2)",
        borderRadius: "14px",
        fontFamily: "monospace",
        fontSize: "0.95rem",
        lineHeight: "1.5",
        color: "#f9fafb",
        whiteSpace: "pre-wrap",   // ✅ wrap long lines
        wordBreak: "break-word",  // ✅ prevent overflow
        maxHeight: "420px",       // ✅ scroll if too long
        overflowY: "auto",
        boxShadow: "inset 0 0 18px rgba(59,130,246,0.15)",
      }}
    >
      {results.response
        ? results.response
        : JSON.stringify(results, null, 2)}
    </div>
  ) : (
    <p className="muted">No results yet. Try running an operation.</p>
  )}
</section>


    </main>
  );
}
