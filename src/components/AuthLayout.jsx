import React from "react";

export default function AuthLayout({ title, subtitle, children, onSwitch, switchText, switchLabel }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h1 className="auth-brand">Career & Skill Adviser</h1>
        <p className="auth-tagline">AI-driven insights to boost your career.</p>
      </div>

      <div className="auth-right">
        <div className="card auth-card">
          <h2 className="auth-title">{title}</h2>
          {subtitle ? <p className="auth-subtitle">{subtitle}</p> : null}
          <div className="formWrap">{children}</div>
          {(switchText || switchLabel) && (
            <p className="auth-switch">
              {switchLabel} {" "}
              <span onClick={onSwitch} className="auth-link">{switchText}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

