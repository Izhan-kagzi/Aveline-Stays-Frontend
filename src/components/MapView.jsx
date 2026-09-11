import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Lightweight lat/lng plot — no external map tiles or API key required.
 * Swap this for react-leaflet or @react-google-maps/api + VITE_GOOGLE_MAPS_API_KEY
 * once you have a key; hotel lat/lng is already stored on each record.
 */
export default function MapView({ hotels }) {
  const [active, setActive] = useState(null);

  const bounds = useMemo(() => {
    if (!hotels.length) return null;
    const lats = hotels.map((h) => h.lat);
    const lngs = hotels.map((h) => h.lng);
    return {
      minLat: Math.min(...lats) - 0.5,
      maxLat: Math.max(...lats) + 0.5,
      minLng: Math.min(...lngs) - 0.5,
      maxLng: Math.max(...lngs) + 0.5,
    };
  }, [hotels]);

  if (!bounds) return <div className="card p-10 text-center text-muted">No hotels to show on the map.</div>;

  function project(h) {
    const x = ((h.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    const y = 100 - ((h.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
    return { x, y };
  }

  return (
    <div className="relative w-full h-[480px] rounded-md overflow-hidden border border-ink/10 bg-cream">
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={"h" + i} x1="0" y1={i * 12.5} x2="100" y2={i * 12.5} stroke="#1E2635" strokeWidth="0.1" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={"v" + i} x1={i * 12.5} y1="0" x2={i * 12.5} y2="100" stroke="#1E2635" strokeWidth="0.1" />
        ))}
      </svg>

      {hotels.map((h) => {
        const { x, y } = project(h);
        return (
          <button
            key={h.id}
            onMouseEnter={() => setActive(h.id)}
            onMouseLeave={() => setActive(null)}
            style={{ left: `${x}%`, top: `${y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center"
          >
            <span className="text-[0.65rem] bg-teal text-white px-2 py-0.5 rounded-full whitespace-nowrap mb-1">
              ₹{h.price.toLocaleString("en-IN")}
            </span>
            <span className="w-4 h-4 rounded-full bg-gold border-2 border-white shadow" />
            {active === h.id && (
              <div className="absolute top-6 w-52 card p-3 text-left z-10 shadow-lg">
                <p className="font-serif text-sm mb-1">{h.name}</p>
                <p className="text-xs text-muted mb-2">{h.location}</p>
                <Link to={`/hotels/${h.id}`} className="text-xs text-gold font-medium">View stay →</Link>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
