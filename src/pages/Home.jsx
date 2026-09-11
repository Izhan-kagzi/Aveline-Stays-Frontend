import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../data/api.js";
import { services, testimonials } from "../data/content.js";
import HotelCard from "../components/HotelCard.jsx";
import ServicesIcons from "../components/ServicesIcons.jsx";
import AboutSection from "../components/AboutSection.jsx";
import PhotoGallery from "../components/PhotoGallery.jsx";
import SplitFeature from "../components/SplitFeature.jsx";
import FeaturedRoomsSection from "../components/FeaturedRoomsSection.jsx";
import RestaurantBarSection from "../components/RestaurantBarSection.jsx";
import StatsBar from "../components/StatsBar.jsx";
import Reveal from "../components/Reveal.jsx";
import heroImage from "../assets/real/beach-deck-hero.jpg";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState({ city: "", checkIn: "", checkOut: "", guests: 2 });
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/hotels").then(setHotels).catch(() => setHotels([]));
  }, []);

  function submitSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.city) params.set("city", form.city);
    if (form.checkIn) params.set("checkIn", form.checkIn);
    if (form.checkOut) params.set("checkOut", form.checkOut);
    if (form.guests) params.set("guests", form.guests);
    navigate(`/hotels?${params.toString()}`);
  }

  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-screen flex flex-col justify-end pt-36"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(20,26,20,0.35) 0%, rgba(20,26,20,0.15) 40%, rgba(15,20,16,0.9) 100%), url(" +
            heroImage +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="wrap px-6 md:px-10 pb-24 w-full">
          <div className="flex items-center gap-4 mb-6 animate-fade-up">
            <span className="w-11 h-px bg-goldBright" />
            <span className="eyebrow !text-goldBright">Let's Work Together</span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl leading-tight max-w-3xl font-normal animate-fade-up-1">
            Stays that feel <em className="italic font-light text-goldBright">quietly extraordinary</em>
          </h1>
          <p className="text-white/80 max-w-md mt-6 animate-fade-up-2">
            From boutique heritage bungalows to beachfront resorts, every Aveline partner hotel is
            inspected, verified, and held to the same standard of housekeeping and service.
          </p>

          <form onSubmit={submitSearch} className="mt-14 bg-white border border-gold rounded-sm shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_auto] animate-fade-up-3">
            <div className="p-5 border-b sm:border-r border-ink/10">
              <label className="eyebrow block mb-2 !text-teal">City / Location</label>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Where to?"
                className="font-serif text-lg w-full outline-none"
              />
            </div>
            <div className="p-5 border-b lg:border-r border-ink/10">
              <label className="eyebrow block mb-2 !text-teal">Check-in</label>
              <input
                type="date"
                value={form.checkIn}
                onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                className="font-serif text-base w-full outline-none"
              />
            </div>
            <div className="p-5 border-b sm:border-b-0 sm:border-r border-ink/10">
              <label className="eyebrow block mb-2 !text-teal">Check-out</label>
              <input
                type="date"
                value={form.checkOut}
                onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                className="font-serif text-base w-full outline-none"
              />
            </div>
            <div className="p-5 sm:border-r border-ink/10">
              <label className="eyebrow block mb-2 !text-teal">Guests</label>
              <input
                type="number"
                min="1"
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="font-serif text-base w-full outline-none"
              />
            </div>
            <button type="submit" className="col-span-full lg:col-span-1 bg-teal text-white px-10 py-4 lg:py-0 text-xs uppercase tracking-widest hover:bg-tealDark transition-colors">
              Search Stays
            </button>
          </form>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[["150+", "Happy Clients"], ["400+", "Professional Staff"], ["99%", "Client Satisfaction"], ["24×7", "Support"]].map(
              ([num, label]) => (
                <div key={label}>
                  <p className="text-gold font-serif text-3xl">{num}</p>
                  <p className="text-white/70 text-sm">{label}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <AboutSection />

      <PhotoGallery />

      <ServicesIcons />

      {/* SERVICES TEASER */}
<section className="relative overflow-hidden bg-[#f7f7f5] text-[#15191c] py-20 md:py-28">
  {/* Decorative background */}
  <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#c8a96b]/6 blur-3xl" />
  <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#dfe5e8]/50 blur-3xl" />

  <div className="relative wrap px-6 md:px-10">

    {/* =====================================================
        HEADER
    ===================================================== */}
    <div className="max-w-3xl mb-14 md:mb-16">
      <div className="flex items-center gap-4 mb-5">
        <span className="h-px w-10 bg-[#c8a96b]" />

        <span className="text-[#a78950] text-[10px] uppercase tracking-[0.3em] font-medium">
          What We Do
        </span>
      </div>

      <h2 className="
        font-serif
        text-4xl
        md:text-5xl
        lg:text-6xl
        leading-[1.05]
        tracking-tight
        max-w-3xl
      ">
        Hospitality,
        <span className="block text-[#15191c]/40 italic">
          held to one standard.
        </span>
      </h2>

      <p className="
        mt-6
        text-[#15191c]/50
        text-sm md:text-base
        leading-7
        max-w-xl
      ">
        From spotless rooms to thoughtful guest support, every detail is
        carefully considered to make your stay effortless.
      </p>
    </div>

    {/* =====================================================
        SERVICE CARDS
    ===================================================== */}
    <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
      {services.slice(0, 3).map((s, index) => (
        <article
          key={s.title}
          className="
            group
            relative
            bg-white
            border border-[#15191c]/10
            p-7 md:p-8 lg:p-9
            min-h-[250px]
            flex flex-col
            transition-all duration-500
            hover:-translate-y-2
            hover:shadow-[0_20px_50px_rgba(21,25,28,0.08)]
            hover:border-[#c8a96b]/40
          "
        >
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

          {/* Icon / decorative mark */}
          <div className="
            w-10 h-10
            flex items-center justify-center
            border border-[#c8a96b]/30
            text-[#a78950]
            mb-8
            font-serif
            text-lg
            transition-all duration-300
            group-hover:bg-[#15191c]
            group-hover:text-white
            group-hover:border-[#15191c]
          ">
            +
          </div>

          {/* Title */}
          <h3 className="
            font-serif
            text-xl md:text-2xl
            mb-3
            text-[#15191c]
          ">
            {s.title}
          </h3>

          {/* Description */}
          <p className="
            text-[#15191c]/50
            text-sm
            leading-7
            max-w-sm
          ">
            {s.desc}
          </p>

          {/* Bottom accent */}
          <div className="
            mt-auto
            pt-7
            flex items-center justify-between
          ">
            <span className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-[#15191c]/30
            ">
              Aveline Standard
            </span>

            <span className="
              text-[#c8a96b]
              opacity-0
              translate-x-[-6px]
              group-hover:opacity-100
              group-hover:translate-x-0
              transition-all duration-300
            ">
              ↗
            </span>
          </div>

          {/* Gold hover line */}
          <div className="
            absolute
            bottom-0 left-0
            h-[2px]
            w-0
            bg-[#c8a96b]
            group-hover:w-full
            transition-all duration-500
          " />
        </article>
      ))}
    </div>

    {/* =====================================================
        CTA
    ===================================================== */}
    <div className="mt-10 flex items-center justify-between">
      <p className="
        hidden sm:block
        text-[10px]
        uppercase
        tracking-[0.2em]
        text-[#15191c]/30
      ">
        Thoughtful service · Consistent standards
      </p>

      <Link
        to="/services"
        className="
          group
          inline-flex
          items-center
          gap-3
          border border-[#15191c]/15
          px-6 py-3.5
          text-[10px]
          uppercase
          tracking-[0.2em]
          text-[#15191c]/65
          hover:bg-[#15191c]
          hover:text-white
          hover:border-[#15191c]
          transition-all duration-300
        "
      >
        See All Services

        <span className="
          text-base
          transition-transform duration-300
          group-hover:translate-x-1
        ">
          →
        </span>
      </Link>
    </div>

  </div>
</section>

      <SplitFeature />

      <FeaturedRoomsSection />

      {/* FEATURED HOTELS */}
      <section className="section">
        <div className="wrap">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="eyebrow">Featured Stays</span>
              <h2 className="text-3xl md:text-4xl mt-3">Hand-picked for this season</h2>
            </div>
            <Link to="/hotels" className="text-teal text-sm font-medium hover:text-gold">Browse all stays →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.slice(0, 4).map((h, i) => (
              <Reveal key={h.id} delay={i * 80}>
                <HotelCard hotel={h} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RestaurantBarSection />

      <StatsBar />

    {/* TESTIMONIALS TEASER */}
<section className="relative overflow-hidden bg-[#f7f7f5] text-[#15191c] py-20 md:py-28">
  {/* Soft decorative background */}
  <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#c8a96b]/10 blur-3xl" />
  <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#dfe5e8]/40 blur-3xl" />

  <div className="relative wrap">

    {/* Heading */}
    <div className="max-w-3xl mb-14 md:mb-20">
      <div className="flex items-center gap-4 mb-5">
        <span className="h-px w-10 bg-[#c8a96b]" />

        <span className="text-[#a78950] text-[11px] uppercase tracking-[0.3em] font-medium">
          Guest Voices
        </span>
      </div>

      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#15191c]">
        Stories from stays
        <span className="block text-[#15191c]/40 italic">
          worth remembering.
        </span>
      </h2>

      <p className="mt-6 max-w-xl text-[#15191c]/55 text-sm md:text-base leading-7">
        Every stay has a story. Discover what our guests have to say
        about their experience at Aveline.
      </p>
    </div>

    {/* Testimonials */}
    <div className="grid md:grid-cols-3 gap-5">

      {testimonials.map((t, index) => (
        <article
          key={t.name}
          className="
            group relative
            bg-white
            border border-[#15191c]/10
            p-7 md:p-8 lg:p-10
            transition-all duration-500
            hover:-translate-y-2
            hover:shadow-[0_20px_50px_rgba(21,25,28,0.08)]
            hover:border-[#c8a96b]/40
          "
        >

          {/* Number */}
          <span className="
            absolute top-7 right-7
            text-[10px]
            tracking-[0.25em]
            text-[#15191c]/20
          ">
            0{index + 1}
          </span>

          {/* Quote */}
          <div className="font-serif text-6xl leading-none text-[#c8a96b]/40 mb-4">
            “
          </div>

          {/* Stars */}
          <div
            className="flex gap-1 mb-6 text-[#b49355]"
            aria-label={`${t.stars} out of 5 stars`}
          >
            {Array.from({ length: t.stars }).map((_, i) => (
              <span key={i} className="text-sm">
                ★
              </span>
            ))}
          </div>

          {/* Review */}
          <p className="
            text-[#15191c]/70
            text-sm md:text-[15px]
            leading-7
            min-h-[140px]
          ">
            “{t.text}”
          </p>

          {/* Divider */}
          <div className="
            h-px
            bg-[#15191c]/10
            my-7
            group-hover:bg-[#c8a96b]/40
            transition-colors duration-500
          " />

          {/* Guest */}
          <div>
            <p className="font-serif text-lg text-[#15191c]">
              {t.name}
            </p>

            <p className="
              mt-1
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-[#15191c]/40
            ">
              {t.room}
            </p>
          </div>

          {/* Gold hover line */}
          <div className="
            absolute bottom-0 left-0
            h-[2px] w-0
            bg-[#c8a96b]
            group-hover:w-full
            transition-all duration-500
          " />

        </article>
      ))}
    </div>

    {/* Bottom */}
    <div className="
      mt-12
      flex flex-col md:flex-row
      md:items-center
      md:justify-between
      gap-6
    ">

      <p className="
        font-serif italic
        text-xl md:text-2xl
        text-[#15191c]/55
      ">
        “Hospitality is remembered long after the room is forgotten.”
      </p>

      <a
        href="/testimonials"
        className="
          inline-flex items-center justify-center
          border border-[#15191c]/15
          px-6 py-3
          text-[11px]
          uppercase
          tracking-[0.22em]
          text-[#15191c]/70
          hover:border-[#c8a96b]
          hover:text-[#a78950]
          transition-all duration-300
        "
      >
        Read All Stories
        <span className="ml-3 text-base">↗</span>
      </a>

    </div>
  </div>
</section>

      {/* COLLABORATE CTA */}
<section className="relative overflow-hidden bg-white py-20 md:py-28">
  {/* Decorative elements */}
  <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#c8a96b]/5 blur-3xl" />
  <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#e8edf0]/60 blur-3xl" />

  <div className="relative wrap">
    <div
      className="
        relative overflow-hidden
        border border-[#15191c]/10
        bg-[#f7f7f5]
        px-6 py-14
        sm:px-10
        md:px-16 md:py-20
        lg:px-24 lg:py-24
        text-center
      "
    >
      {/* Decorative corner lines */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-[#c8a96b]/40" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-[#c8a96b]/40" />

      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="h-px w-8 bg-[#c8a96b]" />

        <span className="text-[#a78950] text-[10px] uppercase tracking-[0.3em] font-medium">
          For Hotel Owners
        </span>

        <span className="h-px w-8 bg-[#c8a96b]" />
      </div>

      {/* Heading */}
      <h2
        className="
          font-serif
          text-4xl
          md:text-5xl
          lg:text-6xl
          leading-[1.05]
          tracking-tight
          text-[#15191c]
          max-w-3xl
          mx-auto
        "
      >
        Bring your property
        <span className="block text-[#15191c]/40 italic">
          to Aveline Stays.
        </span>
      </h2>

      {/* Description */}
      <p
        className="
          mt-6
          text-[#15191c]/55
          text-sm md:text-base
          leading-7
          max-w-2xl
          mx-auto
        "
      >
        Join a growing network of independently owned hotels, resorts,
        and heritage stays — with bookings, housekeeping standards,
        and guest support handled in one place.
      </p>

      {/* CTA */}
      <div className="mt-9">
        <Link
          to="/collaborate"
          className="
            inline-flex items-center justify-center
            bg-[#15191c]
            text-white
            px-8 py-4
            text-[11px]
            uppercase
            tracking-[0.22em]
            font-medium
            transition-all duration-300
            hover:bg-[#c8a96b]
            hover:text-white
            hover:-translate-y-1
            shadow-sm
          "
        >
          Start a Collaboration
          <span className="ml-4 text-base transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </Link>
      </div>

      {/* Bottom note */}
      <p className="mt-7 text-[10px] uppercase tracking-[0.2em] text-[#15191c]/30">
        Independent hospitality · Thoughtfully connected
      </p>
    </div>
  </div>
</section>
    </div>
  );
  }
