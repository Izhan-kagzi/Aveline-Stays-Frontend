import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BedDouble } from "lucide-react";

import roomSuite from "../assets/real/room-suite.jpg";
import roomFamily from "../assets/real/room-family.jpg";
import roomDeluxe from "../assets/real/room-deluxe.jpg";

const rooms = [
  {
    title: "Suite Room",
    desc: "Spacious suites with a separate sitting area, warm wood tones, and room to spread out for a longer stay.",
    price: "₹8,200",
    img: roomSuite,
    imgFirst: false,
  },
  {
    title: "Family Room",
    desc: "Extra beds and a layout built for families, with soft furnishings and enough space for everyone to settle in.",
    price: "₹9,600",
    img: roomFamily,
    imgFirst: true,
  },
  {
    title: "Deluxe Room",
    desc: "Bright, quiet, and comfortable — a deluxe room with garden or courtyard views and thoughtful little details.",
    price: "₹7,400",
    img: roomDeluxe,
    imgFirst: false,
  },
];

export default function FeaturedRoomsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f7f5] text-[#15191c] py-20 md:py-28">
      {/* Decorative background */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#c8a96b]/6 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#dfe5e8]/50 blur-3xl" />

      <div className="relative wrap px-6 md:px-10">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px w-10 bg-[#c8a96b]" />

            <span className="text-[#a78950] text-[10px] uppercase tracking-[0.3em] font-medium">
              Our Rooms
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                Spaces made
                <span className="block text-[#15191c]/40 italic">
                  for slowing down.
                </span>
              </h2>

              <p className="mt-6 text-[#15191c]/50 text-sm md:text-base leading-7 max-w-xl">
                Thoughtfully designed rooms that bring together comfort,
                character and the little details that make a stay memorable.
              </p>
            </div>

            <Link
              to="/hotels"
              className="
                hidden md:inline-flex
                items-center gap-3
                text-[10px]
                uppercase
                tracking-[0.22em]
                text-[#15191c]/55
                hover:text-[#a78950]
                transition-colors duration-300
              "
            >
              View All Rooms
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* =====================================================
            ROOMS
        ===================================================== */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {rooms.map((room, index) => (
            <article
              key={room.title}
              className="
                group
                bg-white
                border border-[#15191c]/10
                overflow-hidden
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-[0_25px_55px_rgba(21,25,28,0.10)]
              "
            >
              {/* Image first */}
              {room.imgFirst && (
                <RoomImage
                  src={room.img}
                  title={room.title}
                  index={index}
                  position="top"
                />
              )}

              {/* Content */}
              <div className="relative p-7 md:p-8 lg:p-9 text-left">

                {/* Number */}
                <span className="
                  absolute
                  top-7 right-7
                  text-[10px]
                  tracking-[0.25em]
                  text-[#15191c]/20
                ">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="
                  w-10 h-10
                  flex items-center justify-center
                  border border-[#c8a96b]/30
                  text-[#a78950]
                  mb-7
                  transition-all duration-300
                  group-hover:bg-[#15191c]
                  group-hover:text-white
                  group-hover:border-[#15191c]
                ">
                  <BedDouble size={17} strokeWidth={1.3} />
                </div>

                <h3 className="font-serif text-2xl md:text-[27px] mb-3">
                  {room.title}
                </h3>

                <p className="
                  text-[#15191c]/55
                  text-sm
                  leading-7
                  mb-7
                ">
                  {room.desc}
                </p>

                {/* Price + CTA */}
                <div className="
                  pt-6
                  border-t border-[#15191c]/10
                  flex items-center justify-between gap-4
                ">
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.18em] text-[#15191c]/35 mb-1">
                      From
                    </span>

                    <span className="font-serif text-xl text-[#a78950]">
                      {room.price}
                    </span>

                    <span className="text-[10px] text-[#15191c]/35 ml-1">
                      / night
                    </span>
                  </div>

                  <Link
                    to="/hotels"
                    className="
                      group/btn
                      inline-flex items-center gap-2
                      border border-[#15191c]/15
                      px-4 py-2.5
                      text-[10px]
                      uppercase
                      tracking-[0.16em]
                      text-[#15191c]/65
                      hover:bg-[#15191c]
                      hover:text-white
                      hover:border-[#15191c]
                      transition-all duration-300
                    "
                  >
                    Book Now
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                      className="
                        transition-transform duration-300
                        group-hover/btn:translate-x-0.5
                        group-hover/btn:-translate-y-0.5
                      "
                    />
                  </Link>
                </div>
              </div>

              {/* Image last */}
              {!room.imgFirst && (
                <RoomImage
                  src={room.img}
                  title={room.title}
                  index={index}
                  position="bottom"
                />
              )}

              {/* Gold hover line */}
              <div className="
                h-[2px]
                w-0
                bg-[#c8a96b]
                group-hover:w-full
                transition-all duration-500
              " />
            </article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/hotels"
            className="
              inline-flex items-center gap-3
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-[#15191c]/55
              hover:text-[#a78950]
              transition-colors duration-300
            "
          >
            View All Rooms
            <ArrowUpRight size={15} strokeWidth={1.5} />
          </Link>
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   ROOM IMAGE
========================================================= */

function RoomImage({ src, title, index }) {
  return (
    <div className="relative h-64 md:h-60 lg:h-64 overflow-hidden">
      <img
        src={src}
        alt={title}
        className="
          w-full h-full
          object-cover
          transition-transform duration-700
          group-hover:scale-105
        "
      />

      {/* Image overlay */}
      <div className="
        absolute inset-0
        bg-gradient-to-t
        from-black/45
        via-transparent
        to-transparent
        opacity-70
      " />

      {/* Image label */}
      <div className="absolute bottom-4 left-5">
        <span className="
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-white/80
        ">
          Aveline Collection · 0{index + 1}
        </span>
      </div>
    </div>
  );
}