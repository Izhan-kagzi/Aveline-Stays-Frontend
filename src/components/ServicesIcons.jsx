import React from "react";
import {
  Wifi,
  CalendarCheck,
  Utensils,
  Waves,
  Sparkles,
  Headphones,
  ArrowUpRight,
} from "lucide-react";

const items = [
  {
    number: "01",
    icon: Wifi,
    label: "Free Wi-Fi",
    description:
      "Stay effortlessly connected with fast, complimentary Wi-Fi throughout your stay.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    label: "Easy Booking",
    description:
      "A simple and seamless reservation experience designed around your journey.",
  },
  {
    number: "03",
    icon: Utensils,
    label: "Restaurant",
    description:
      "Discover thoughtfully prepared dining experiences featuring local and international flavours.",
  },
  {
    number: "04",
    icon: Waves,
    label: "Swimming Pool",
    description:
      "Slow down and unwind beside beautifully maintained pools and tranquil spaces.",
  },
  {
    number: "05",
    icon: Sparkles,
    label: "Beauty & Wellness",
    description:
      "Rejuvenate with carefully selected wellness, beauty and relaxation experiences.",
  },
  {
    number: "06",
    icon: Headphones,
    label: "24/7 Support",
    description:
      "Our team is always available to make your stay comfortable, smooth and memorable.",
  },
];

export default function ServicesIcons() {
  return (
    <section className="relative overflow-hidden bg-[#f6f5f1] py-24 md:py-32">

      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[450px] w-[450px] rounded-full bg-white/70 blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-180px] left-[-10%] h-[450px] w-[450px] rounded-full bg-[#e8e5dc]/60 blur-3xl" />

      <div className="wrap relative">

        {/* =================================================
            SECTION HEADER
        ================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/50">
              The Aveline Experience
            </span>

            <span className="h-px w-10 bg-gold" />
          </div>

          <h2 className="font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl">
            Everything you need,
            <br />
            <span className="text-ink/40">
              beautifully considered.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-ink/55 md:text-base">
            From the moment you arrive to the moment you leave, our carefully
            selected services are designed to make every part of your stay
            effortless.
          </p>
        </div>

        {/* =================================================
            SERVICES GRID
        ================================================== */}

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[1.5rem]
                  border
                  border-ink/10
                  bg-white/80
                  p-7
                  backdrop-blur-sm
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-gold/30
                  hover:bg-white
                  hover:shadow-[0_25px_60px_rgba(0,0,0,0.09)]
                  md:p-8
                "
              >

                {/* Hover glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-32
                    w-32
                    rounded-full
                    bg-gold/10
                    opacity-0
                    blur-2xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Top row */}
                <div className="relative flex items-start justify-between">

                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-ink/10
                      bg-[#f8f7f3]
                      text-ink
                      transition-all
                      duration-500
                      group-hover:border-gold/40
                      group-hover:bg-ink
                      group-hover:text-white
                    "
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.4}
                    />
                  </div>

                  {/* Number */}
                  <span
                    className="
                      font-serif
                      text-sm
                      text-ink/25
                      transition-colors
                      duration-300
                      group-hover:text-gold
                    "
                  >
                    {item.number}
                  </span>
                </div>

                {/* Content */}
                <div className="relative mt-8">

                  <h3
                    className="
                      font-serif
                      text-2xl
                      text-ink
                      transition-colors
                      duration-300
                      group-hover:text-gold
                    "
                  >
                    {item.label}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-ink/50">
                    {item.description}
                  </p>
                </div>

                {/* Bottom line */}
                <div
                  className="
                    relative
                    mt-7
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      h-px
                      w-10
                      bg-ink/15
                      transition-all
                      duration-500
                      group-hover:w-20
                      group-hover:bg-gold
                    "
                  />

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-ink/10
                      text-ink/40
                      transition-all
                      duration-300
                      group-hover:border-gold
                      group-hover:text-gold
                    "
                  >
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                    />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM MESSAGE
        ================================================== */}

        <div
          className="
            mx-auto
            mt-16
            flex
            max-w-2xl
            flex-col
            items-center
            justify-center
            gap-4
            text-center
            sm:flex-row
          "
        >
          <span className="h-px w-12 bg-gold/50" />

          <p className="text-xs uppercase tracking-[0.2em] text-ink/40">
            Thoughtful details. Exceptional stays.
          </p>

          <span className="h-px w-12 bg-gold/50" />
        </div>
      </div>
    </section>
  );
}