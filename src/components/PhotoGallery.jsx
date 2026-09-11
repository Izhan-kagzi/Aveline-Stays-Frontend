import React from "react";
import g1 from "../assets/real/gallery-1.jpg";
import g2 from "../assets/real/gallery-2.jpg";
import g3 from "../assets/real/gallery-3.jpg";
import g4 from "../assets/real/gallery-4.jpg";
import g5 from "../assets/real/gallery-5.jpg";

const images = [g1, g2, g3, g4, g5];

export default function PhotoGallery() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-5">
      {images.map((src, i) => (
        <div key={i} className="h-56 md:h-72 overflow-hidden group">
          <img
            src={src}
            alt="Life at an Aveline stay"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ))}
    </section>
  );
}
