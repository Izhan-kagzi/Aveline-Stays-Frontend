import React from "react";
import manager from "../assets/real/staff-manager.jpg";
import staff1 from "../assets/real/staff-1.jpg";
import staff2 from "../assets/real/staff-2.jpg";

const staff = [
  { img: manager, name: "Aditya Rao", role: "Hotel Manager" },
  { img: staff1, name: "Kabir Singh", role: "Guest Relations" },
  { img: staff2, name: "Meera Kapoor", role: "Front Desk" },
];

export default function StaffSection() {
  return (
    <section className="section bg-ink">
      <div className="wrap">
        <h2 className="text-3xl md:text-4xl text-white mb-12">Our Staff</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {staff.map((s) => (
            <div key={s.name} className="relative rounded-md overflow-hidden group h-96">
              <img
                src={s.img}
                alt={s.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                <div>
                  <p className="text-goldBright font-semibold text-sm tracking-wide uppercase">{s.name}</p>
                  <p className="text-white/70 text-xs uppercase tracking-widest">{s.role}</p>
                </div>
                <span className="text-goldBright text-xl">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
