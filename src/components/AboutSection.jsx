import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

import livingPhoto from "../assets/real/gallery-1.jpg";
import restPhoto from "../assets/real/gallery-4.jpg";
import Reveal from "./Reveal.jsx";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f6f2] py-24 md:py-32 lg:py-40">
      {/* Decorative background */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#d9e2e8]/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#e8e2da]/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">

          {/* =====================================================
              IMAGE / FEATURE AREA
          ===================================================== */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-[620px]">

              {/* Main large image */}
              <div className="group relative h-[520px] overflow-hidden rounded-[2rem] shadow-[0_25px_70px_rgba(0,0,0,0.12)] md:h-[620px]">
                <img
                  src={livingPhoto}
                  alt="Luxury guest room at Aveline Stays"
                  className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                {/* Image label */}
                <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
                  <div className="text-white">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.3em] text-white/70">
                      The Aveline Experience
                    </p>

                    <h3 className="font-serif text-2xl md:text-3xl">
                      Stay beautifully.
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition duration-300 group-hover:bg-white group-hover:text-black">
                    <FiArrowUpRight size={20} />
                  </div>
                </div>
              </div>

              {/* Floating secondary image */}
              <div className="absolute -bottom-12 -right-5 hidden h-48 w-56 overflow-hidden rounded-2xl border-[8px] border-[#f7f6f2] shadow-2xl sm:block md:-right-10 md:h-60 md:w-72">
                <img
                  src={restPhoto}
                  alt="Relaxing interior at Aveline Stays"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>

              {/* Floating rating card */}
              <div className="absolute -left-4 top-10 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-[0_15px_45px_rgba(0,0,0,0.1)] backdrop-blur-xl md:-left-8">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex gap-1 text-sm">
                      ★ ★ ★ ★ ★
                    </div>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      Guest rated
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative number */}
              <span className="absolute -bottom-20 left-0 hidden select-none font-serif text-[140px] leading-none text-black/[0.035] md:block">
                01
              </span>
            </div>
          </Reveal>

          {/* =====================================================
              CONTENT AREA
          ===================================================== */}
          <Reveal delay={120}>
            <div className="relative">

              {/* Eyebrow */}
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-10 bg-[#111]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gray-500">
                  About Aveline
                </span>
              </div>

              {/* Heading */}
              <h2 className="max-w-xl font-serif text-4xl font-normal leading-[1.08] tracking-[-0.02em] text-[#111] sm:text-5xl md:text-6xl">
                Hospitality with
                <span className="block italic text-[#52616b]">
                  a higher standard.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-7 max-w-xl text-[15px] leading-8 text-gray-600 md:text-base">
                Aveline Stays was created for travelers who believe where you
                stay should feel just as memorable as where you go.
              </p>

              <p className="mt-4 max-w-xl text-[15px] leading-8 text-gray-500">
                We carefully curate every property on our platform, combining
                thoughtful design, genuine hospitality, and uncompromising
                standards so you can book with complete confidence.
              </p>

              {/* =================================================
                  FEATURES
              ================================================= */}
              <div className="mt-9 grid gap-4 border-y border-black/10 py-7 sm:grid-cols-2">

                <div className="group flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111] text-white transition-transform duration-300 group-hover:scale-110">
                    <FiCheck size={16} />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg text-[#111]">
                      Personally Verified
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Properties inspected for quality and authenticity.
                    </p>
                  </div>
                </div>

                <div className="group flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111] text-white transition-transform duration-300 group-hover:scale-110">
                    <FiCheck size={16} />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg text-[#111]">
                      Curated Stays
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      A refined collection chosen with intention.
                    </p>
                  </div>
                </div>

                <div className="group flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111] text-white transition-transform duration-300 group-hover:scale-110">
                    <FiCheck size={16} />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg text-[#111]">
                      Transparent Booking
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Clear details with no unnecessary surprises.
                    </p>
                  </div>
                </div>

                <div className="group flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111] text-white transition-transform duration-300 group-hover:scale-110">
                    <FiCheck size={16} />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg text-[#111]">
                      Guest First
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Support designed around your journey.
                    </p>
                  </div>
                </div>

              </div>

              {/* =================================================
                  CTA
              ================================================= */}
              <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">

                <Link
                  to="/hotels"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#111] px-7 py-4 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#252525] hover:shadow-xl"
                >
                  Explore Our Stays

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                    <FiArrowUpRight size={15} />
                  </span>
                </Link>

                <span className="text-xs uppercase tracking-[0.18em] text-gray-400">
                  Your stay. Your story.
                </span>

              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
