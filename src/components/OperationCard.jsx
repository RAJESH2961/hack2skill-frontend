import React from "react";

export default function OperationCard({ title, description, actionLabel, onAction, disabled }) {
  return (
    <div className="op-card">
      <h4>{title}</h4>
      <p>{description}</p>
      <button className="btn small primary" onClick={onAction} disabled={disabled}>{actionLabel}</button>
    </div>
  );
}


