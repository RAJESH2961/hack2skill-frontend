import React, { useState } from "react";
import { API_BASE } from "../constants";

export default function ResumeUpload({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");

  const onFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f || null);
    setWarning(f ? "Resume selected. Please click Parse Resume to continue." : "");
    setError("");
  };

  const parse = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("resume", file);
      const res = await fetch(`${API_BASE}/parse-resume`, { method: "POST", body: form });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Failed to parse resume");
      }
      const data = await res.json();
      onResult?.(data);
      setWarning("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: "1rem" }}>
      <h3>Resume Upload</h3>
      <input type="file" accept=".pdf,.docx" onChange={onFileChange} />
      {warning && <p className="muted" style={{ marginTop: "0.5rem" }}>{warning}</p>}
      {error && <p className="error" style={{ marginTop: "0.5rem" }}>{error}</p>}
      <div style={{ marginTop: "0.75rem" }}>
        <button className="btn primary" onClick={parse} disabled={!file || loading}>
          {loading ? "Parsing..." : "Parse Resume"}
        </button>
      </div>
    </div>
  );
}


