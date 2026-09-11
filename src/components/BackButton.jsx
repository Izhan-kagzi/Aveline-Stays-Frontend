import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton({ className = "" }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`inline-flex items-center gap-2 text-sm text-muted hover:text-gold transition-colors mb-6 ${className}`}
    >
      <span aria-hidden>←</span> Back
    </button>
  );
}
