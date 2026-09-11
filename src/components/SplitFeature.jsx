import React from "react";
import { Link } from "react-router-dom";
import suite from "../assets/real/suite-room.jpg";
import pool from "../assets/real/infinity-pool.jpg";

export default function SplitFeature() {
  return (
    <section className="grid md:grid-cols-2">
      {[
        { img: suite, alt: "Luxury Suite Room" },
        { img: pool, alt: "Infinity Pool" },
      ].map((panel) => (
        <Link key={panel.alt} to="/hotels" className="relative h-[320px] md:h-[560px] block group overflow-hidden">
          <img src={panel.img} alt={panel.alt} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
        </Link>
      ))}
    </section>
  );
}
