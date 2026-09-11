import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Check, MapPin } from "lucide-react";
import { api } from "../data/api.js";
import { hotelImageMap, hotelPartnerLogos } from "../data/content.js";
import BackButton from "../components/BackButton.jsx";

export default function HotelPartners() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    api
      .get("/hotels")
      .then(setHotels)
      .catch(() => setHotels([]));
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#15191c] pt-28 pb-24">
      <div className="wrap px-6 md:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-16 md:mb-20">
          <BackButton />

          <div className="mt-10 max-w-3xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-px w-10 bg-[#c8a96b]" />

              <span className="text-[#a78950] text-[10px] uppercase tracking-[0.3em] font-medium">
                Our Network
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Places with
              <span className="block text-[#15191c]/40 italic">
                a story to tell.
              </span>
            </h1>

            <p className="mt-7 text-[#15191c]/55 text-sm md:text-base leading-7 max-w-2xl">
              Discover independently owned hotels, resorts and heritage
              stays carefully selected by Aveline. Every property is
              personally inspected before becoming part of our collection.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#15191c]/45">
              <Check size={15} className="text-[#c8a96b]" />
              Personally Inspected
            </div>

            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#15191c]/45">
              <Check size={15} className="text-[#c8a96b]" />
              Independent Properties
            </div>

            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#15191c]/45">
              <Check size={15} className="text-[#c8a96b]" />
              Aveline Approved
            </div>
          </div>
        </div>

        {/* =====================================================
            HOTEL COLLECTION
        ===================================================== */}
        {hotels.length > 0 ? (
          <section>
            <div className="flex items-end justify-between mb-7">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#15191c]/35">
                  The Collection
                </span>

                <h2 className="font-serif text-2xl md:text-3xl mt-2">
                  Our partner properties
                </h2>
              </div>

              <span className="hidden sm:block text-xs text-[#15191c]/35">
                {hotels.length} properties
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {hotels.map((h, index) => (
                <Link
                  key={h.id}
                  to={`/hotels/${h.id}`}
                  className="
                    group
                    bg-white
                    border border-[#15191c]/10
                    overflow-hidden
                    transition-all duration-500
                    hover:-translate-y-2
                    hover:shadow-[0_20px_45px_rgba(21,25,28,0.09)]
                  "
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={hotelImageMap[h.id]}
                      alt={h.name}
                      className="
                        w-full h-full object-cover
                        transition-transform duration-700
                        group-hover:scale-105
                      "
                    />

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                    {/* Number */}
                    <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] text-white/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Location */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <MapPin size={13} strokeWidth={1.5} />

                      <span className="text-[10px] uppercase tracking-[0.15em]">
                        {h.location}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="font-serif text-xl text-[#15191c]">
                      {h.name}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#15191c]/35">
                        Explore Stay
                      </span>

                      <span
                        className="
                          w-8 h-8
                          flex items-center justify-center
                          border border-[#15191c]/10
                          text-[#15191c]/50
                          transition-all duration-300
                          group-hover:bg-[#15191c]
                          group-hover:text-white
                          group-hover:border-[#15191c]
                        "
                      >
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>

                  {/* Gold hover line */}
                  <div className="h-[2px] w-0 bg-[#c8a96b] group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <div className="py-16 text-center border border-[#15191c]/10 bg-white">
            <Building2
              size={30}
              strokeWidth={1}
              className="mx-auto text-[#c8a96b] mb-4"
            />

            <p className="font-serif text-xl">
              Our collection is being refreshed.
            </p>

            <p className="text-sm text-[#15191c]/45 mt-2">
              Please check back soon for our latest partner properties.
            </p>
          </div>
        )}

        {/* =====================================================
            PARTNER LOGOS
        ===================================================== */}
        {hotelPartnerLogos?.length > 0 && (
          <section className="mt-20 md:mt-28">
            <div className="text-center mb-10">
              <span className="text-[#a78950] text-[10px] uppercase tracking-[0.3em]">
                In Good Company
              </span>

              <h2 className="font-serif text-2xl md:text-3xl mt-3">
                Trusted hospitality partners
              </h2>
            </div>

            <div
              className="
                bg-white
                border-y border-[#15191c]/10
                py-8 md:py-10
                flex flex-wrap
                items-center
                justify-center
                gap-x-10 gap-y-6
                md:gap-x-16
              "
            >
              {hotelPartnerLogos.map((name) => (
                <span
                  key={name}
                  className="
                    font-serif
                    text-lg md:text-xl
                    tracking-wide
                    text-[#15191c]/35
                    hover:text-[#15191c]/70
                    transition-colors duration-300
                  "
                >
                  {name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            COLLABORATE CTA
        ===================================================== */}
        <section className="mt-20 md:mt-28">
          <div
            className="
              relative overflow-hidden
              bg-white
              border border-[#15191c]/10
              px-6 py-14
              sm:px-10
              md:px-16 md:py-20
              lg:px-24
              text-center
            "
          >
            {/* Decorative circles */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#c8a96b]/7 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-[#e8edf0]/60 blur-3xl" />

            {/* Corner details */}
            <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-[#c8a96b]/40" />
            <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-[#c8a96b]/40" />

            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-5">
                <span className="h-px w-8 bg-[#c8a96b]" />

                <span className="text-[#a78950] text-[10px] uppercase tracking-[0.3em]">
                  For Hotel Owners
                </span>

                <span className="h-px w-8 bg-[#c8a96b]" />
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
                Your property could be
                <span className="block text-[#15191c]/40 italic">
                  our next destination.
                </span>
              </h2>

              <p className="text-[#15191c]/50 text-sm md:text-base leading-7 mt-5 max-w-xl mx-auto">
                List your property with Aveline and connect with guests
                who value character, comfort and thoughtfully chosen stays.
              </p>

              <div className="mt-8">
                <Link
                  to="/collaborate"
                  className="
                    group
                    inline-flex items-center justify-center
                    gap-3
                    bg-[#15191c]
                    text-white
                    px-8 py-4
                    text-[11px]
                    uppercase
                    tracking-[0.22em]
                    font-medium
                    transition-all duration-300
                    hover:bg-[#c8a96b]
                    hover:-translate-y-1
                  "
                >
                  Start a Collaboration

                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}