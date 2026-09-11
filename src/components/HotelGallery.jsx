import React, { useState } from "react";

export default function HotelGallery({ images, alt, isSaved, onToggleSave }) {
  const [active, setActive] = useState(0);
  const safeImages = images && images.length ? images : [];

  return (
    <div className="mb-8">
      <div className="relative h-[420px] rounded-md overflow-hidden">
        {safeImages[active] && (
          <img src={safeImages[active]} alt={alt} className="w-full h-full object-cover" />
        )}
        <button
          onClick={onToggleSave}
          className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm backdrop-blur bg-white/85 ${isSaved ? "text-gold" : "text-ink"}`}
        >
          {isSaved ? "♥ Saved" : "♡ Save"}
        </button>
      </div>

      {safeImages.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto">
          {safeImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 w-24 h-16 rounded-sm overflow-hidden border-2 transition-colors ${
                active === i ? "border-gold" : "border-transparent opacity-80 hover:opacity-100"
              }`}
            >
              <img src={src} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
