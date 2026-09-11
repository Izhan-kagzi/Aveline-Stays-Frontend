import React from "react";

export default function StarRating({ value = 0, outOf = 5 }) {
  return (
    <span className="text-gold text-sm tracking-widest">
      {"★".repeat(Math.round(value))}
      <span className="text-ink/20">{"★".repeat(outOf - Math.round(value))}</span>
    </span>
  );
}
