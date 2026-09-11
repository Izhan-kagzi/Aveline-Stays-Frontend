import React from "react";
import { Users, BedDouble, BriefcaseBusiness, MapPin } from "lucide-react";

const stats = [
  {
    num: "150+",
    label: "Happy Guests",
    icon: Users,
  },
  {
    num: "40+",
    label: "Luxury Rooms",
    icon: BedDouble,
  },
  {
    num: "400+",
    label: "Dedicated Staff",
    icon: BriefcaseBusiness,
  },
  {
    num: "12",
    label: "Destinations",
    icon: MapPin,
  },
];

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-[#101619] px-6 py-20 md:py-24">

      {/* =====================================================
          BACKGROUND DETAILS
      ====================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#c8a96b]/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="wrap relative">

        {/* =================================================
            TOP LABEL
        ================================================== */}

        <div className="mb-14 text-center">

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c8a96b]/60" />

            <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/40">
              Aveline By The Numbers
            </span>

            <span className="h-px w-10 bg-[#c8a96b]/60" />
          </div>

        </div>

        {/* =================================================
            STATS
        ================================================== */}

        <div className="grid grid-cols-2 md:grid-cols-4">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`
                  group
                  relative
                  px-5
                  py-7
                  text-center
                  transition-all
                  duration-500
                  md:px-8
                  md:py-4
                  ${
                    index < stats.length - 1
                      ? "md:border-r md:border-white/10"
                      : ""
                  }
                  ${
                    index < 2
                      ? "border-b border-white/10 md:border-b-0"
                      : ""
                  }
                `}
              >

                {/* Icon */}
                <div
                  className="
                    mx-auto
                    mb-5
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    text-[#c8a96b]
                    transition-all
                    duration-500
                    group-hover:border-[#c8a96b]/40
                    group-hover:bg-[#c8a96b]/10
                    group-hover:scale-105
                  "
                >
                  <Icon
                    size={18}
                    strokeWidth={1.3}
                  />
                </div>

                {/* Number */}
                <p
                  className="
                    font-serif
                    text-4xl
                    leading-none
                    tracking-tight
                    text-[#c8a96b]
                    transition-transform
                    duration-500
                    group-hover:-translate-y-1
                    sm:text-5xl
                    md:text-5xl
                  "
                >
                  {stat.num}
                </p>

                {/* Label */}
                <p
                  className="
                    mt-3
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-white/40
                    transition-colors
                    duration-300
                    group-hover:text-white/65
                    sm:text-[10px]
                  "
                >
                  {stat.label}
                </p>

                {/* Bottom accent */}
                <div
                  className="
                    mx-auto
                    mt-5
                    h-px
                    w-6
                    bg-white/10
                    transition-all
                    duration-500
                    group-hover:w-12
                    group-hover:bg-[#c8a96b]
                  "
                />
              </div>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================== */}

        <div className="mt-14 text-center">

          <p className="mx-auto max-w-xl font-serif text-lg text-white/70 md:text-xl">
            "Every number represents a stay,
            <span className="text-[#c8a96b]"> a memory, </span>
            and a reason to return."
          </p>

        </div>
      </div>
    </section>
  );
}
