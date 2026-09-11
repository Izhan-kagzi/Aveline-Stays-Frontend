import React from "react";
import { ArrowUpRight, Utensils } from "lucide-react";
import deck from "../assets/real/restaurant-deck.jpg";

const menu = [
  {
    category: "Starter",
    name: "Garden Salad Bowl",
    description: "Seasonal greens, herbs & house dressing",
    price: "₹450",
  },
  {
    category: "Main Course",
    name: "Grilled Beef with Potatoes",
    description: "Char-grilled beef, roasted potatoes & jus",
    price: "₹950",
  },
  {
    category: "Dessert",
    name: "Chef's Dessert Plate",
    description: "A selection of the chef's seasonal creations",
    price: "₹380",
  },
  {
    category: "Indian",
    name: "Ultimate Thali",
    description: "A generous selection of regional favourites",
    price: "₹520",
  },
  {
    category: "Breakfast",
    name: "Weekend Breakfast Stack",
    description: "Fluffy pancakes, berries & maple",
    price: "₹340",
  },
  {
    category: "Bar",
    name: "Sunset Signature Cocktail",
    description: "Our signature blend, crafted for golden hour",
    price: "₹420",
  },
  {
    category: "Signature",
    name: "Tandoori Sizzler",
    description: "Traditional spices, fire-grilled & served sizzling",
    price: "₹680",
  },
  {
    category: "Platter",
    name: "Ham & Pineapple Platter",
    description: "Sweet, savoury & beautifully presented",
    price: "₹410",
  },
];

export default function RestaurantBarSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f3ee] py-24 md:py-32">

      {/* =====================================================
          BACKGROUND DETAILS
      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#ded9cd]/40 blur-3xl" />

      <div className="wrap relative">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">

          <div className="max-w-2xl">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/50">
                Resto & Bar
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-6xl">
              Taste the art of
              <br />
              <span className="text-ink/40">
                exceptional dining.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-ink/50 md:text-right">
            From leisurely breakfasts to intimate dinners and golden-hour
            cocktails, every plate is created to complement your stay.
          </p>
        </div>

        {/* =================================================
            MAIN RESTAURANT EXPERIENCE
        ================================================== */}

        <div className="grid overflow-hidden rounded-[2rem] bg-[#111417] shadow-[0_30px_80px_rgba(0,0,0,0.14)] lg:grid-cols-[0.85fr_1.15fr]">

          {/* =================================================
              IMAGE SIDE
          ================================================== */}

          <div className="group relative min-h-[420px] overflow-hidden lg:min-h-[760px]">

            <img
              src={deck}
              alt="Aveline restaurant deck"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-[1200ms]
                ease-out
                group-hover:scale-105
              "
            />

            {/* Image overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />

            {/* Vertical decorative line */}
            <div className="absolute left-7 top-7 h-24 w-px bg-white/30" />

            {/* Image content */}
            <div className="absolute bottom-8 left-8 right-8 text-white md:bottom-10 md:left-10">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                <Utensils
                  size={19}
                  strokeWidth={1.3}
                />
              </div>

              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/60">
                The Aveline Kitchen
              </p>

              <h3 className="mt-2 font-serif text-3xl md:text-4xl">
                Crafted with intention.
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
                Thoughtful ingredients, refined techniques and warm
                hospitality come together in every experience.
              </p>
            </div>

            {/* Floating location badge */}
            <div className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-md">
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/70">
                Open Daily
              </span>
            </div>
          </div>

          {/* =================================================
              MENU SIDE
          ================================================== */}

          <div className="bg-[#111417] px-6 py-8 sm:px-8 md:px-10 lg:px-12 lg:py-12">

            {/* Menu heading */}
            <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-6">

              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#c8a96b]">
                  Chef's Selection
                </p>

                <h3 className="mt-2 font-serif text-3xl text-white md:text-4xl">
                  From our kitchen
                </h3>
              </div>

              <span className="hidden text-[9px] uppercase tracking-[0.2em] text-white/30 sm:block">
                Menu
              </span>
            </div>

            {/* Menu items */}
            <div className="divide-y divide-white/10">

              {menu.map((item, index) => (
                <div
                  key={item.name}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    py-5
                    transition-all
                    duration-300
                    hover:px-2
                  "
                >

                  {/* Number */}
                  <span className="w-6 shrink-0 font-serif text-xs text-white/20 transition-colors duration-300 group-hover:text-[#c8a96b]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="font-serif text-lg text-white transition-colors duration-300 group-hover:text-[#c8a96b] md:text-xl">
                        {item.name}
                      </h4>

                      <span className="text-[8px] uppercase tracking-[0.18em] text-white/30">
                        {item.category}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs leading-5 text-white/40">
                      {item.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 text-right">
                    <span className="font-serif text-base text-[#c8a96b]">
                      {item.price}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div
                    className="
                      hidden
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      text-white/30
                      transition-all
                      duration-300
                      group-hover:border-[#c8a96b]/50
                      group-hover:text-[#c8a96b]
                      sm:flex
                    "
                  >
                    <ArrowUpRight size={13} strokeWidth={1.4} />
                  </div>
                </div>
              ))}
            </div>

            {/* =================================================
                BOTTOM CTA
            ================================================== */}

            <div className="mt-8 border-t border-white/10 pt-7">

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                <div>
                  <p className="text-sm font-serif text-white">
                    Dining reservations recommended
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    Ask our team about today's chef specials.
                  </p>
                </div>

                <button
                  type="button"
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    border
                    border-[#c8a96b]
                    px-5
                    py-3
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#c8a96b]
                    transition-all
                    duration-300
                    hover:bg-[#c8a96b]
                    hover:text-white
                  "
                >
                  Reserve a Table

                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================== */}

        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <span className="h-px w-10 bg-gold/50" />

          <p className="text-[9px] uppercase tracking-[0.25em] text-ink/35">
            Seasonal ingredients · Curated menus · Memorable evenings
          </p>

          <span className="h-px w-10 bg-gold/50" />
        </div>
      </div>
    </section>
  );
}
