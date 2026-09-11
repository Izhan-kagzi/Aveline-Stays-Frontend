import React, { useState } from "react";
import BackButton from "../components/BackButton.jsx";
import Reveal from "../components/Reveal.jsx";

import room1 from "../assets/gallery/gallery-room-1.jpg";
import room2 from "../assets/gallery/gallery-room-2.jpg";
import lobby1 from "../assets/gallery/gallery-lobby-1.jpg";
import lobby2 from "../assets/gallery/gallery-lobby-2.jpg";
import lobby3 from "../assets/gallery/gallery-lobby-3.jpg";
import bathroom from "../assets/gallery/gallery-bathroom.jpg";
import living from "../assets/gallery/gallery-living.jpg";
import kitchen from "../assets/gallery/gallery-kitchen.jpg";
import prayer from "../assets/gallery/gallery-prayer.jpg";
import pool from "../assets/gallery/gallery-pool.jpg";
import gym from "../assets/gallery/gallery-gym.jpg";

const images = [
  { src: room1, category: "Rooms", title: "Deluxe Twin Room" },
  { src: room2, category: "Rooms", title: "Ocean View Suite" },
  { src: lobby1, category: "Lobby", title: "Reception & Lounge" },
  { src: lobby2, category: "Lobby", title: "Grand Lobby" },
  { src: lobby3, category: "Lobby", title: "Modern Atrium" },
  { src: bathroom, category: "Bathroom", title: "Spa Bathroom" },
  { src: living, category: "Living Area", title: "Suite Living Room" },
  { src: kitchen, category: "Kitchen", title: "In-Suite Kitchen" },
  { src: prayer, category: "Prayer Room", title: "Quiet Prayer Room" },
  { src: pool, category: "Pool", title: "Indoor Pool" },
  { src: gym, category: "Fitness", title: "Fitness Centre" },
];

const categories = ["All", ...Array.from(new Set(images.map((i) => i.category)))];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? images : images.filter((i) => i.category === filter);

  return (
    <div className="pt-28 pb-24 px-6 md:px-10">
      <div className="wrap">
        <BackButton />
        <span className="eyebrow">Take a Look Inside</span>
        <h1 className="text-3xl md:text-4xl mt-3 mb-8">Gallery</h1>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 text-xs uppercase tracking-widest rounded-full border transition-colors ${
                filter === c ? "bg-teal text-white border-teal" : "border-ink/20 text-ink/70 hover:border-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((img, i) => (
            <Reveal key={img.src} delay={(i % 6) * 60}>
              <div className="relative rounded-md overflow-hidden group h-72 card">
                <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white font-serif">{img.title}</p>
                    <p className="text-white/70 text-xs uppercase tracking-widest">{img.category}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
