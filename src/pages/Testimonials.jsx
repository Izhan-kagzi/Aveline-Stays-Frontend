import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquareQuote, Star } from "lucide-react";

import { testimonials as seed } from "../data/content.js";
import { useAuth } from "../context/AuthContext.jsx";
import BackButton from "../components/BackButton.jsx";
import ReviewCarousel from "../components/ReviewCarousel.jsx";

export default function Testimonials() {
  const [list, setList] = useState(seed);
  const [form, setForm] = useState({
    room: "",
    text: "",
    stars: 5,
  });

  const { auth } = useAuth();

  function updateForm(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function submit(e) {
    e.preventDefault();

    if (!auth) {
      return;
    }

    const newReview = {
      name: auth.user && auth.user.name ? auth.user.name : "Verified Guest",
      room: form.room || "Verified Guest",
      text: form.text,
      stars: form.stars,
    };

    setList((previous) => [newReview, ...previous]);

    setForm({
      room: "",
      text: "",
      stars: 5,
    });
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#15191c] pt-28 pb-24">
      <div className="wrap px-6 md:px-10">

        <BackButton />

        {/* Header */}
        <header className="mt-10 mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px w-10 bg-[#c8a96b]" />

            <span className="text-[#a78950] text-[10px] uppercase tracking-[0.3em] font-medium">
              Guest Voices
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
                Stories from stays
                <span className="block text-[#15191c]/40 italic">
                  worth remembering.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm md:text-base leading-7 text-[#15191c]/55">
                Discover what guests have experienced across the Aveline
                Stays network, from peaceful mornings to memorable escapes.
              </p>
            </div>

            <div className="hidden lg:flex w-24 h-24 shrink-0 items-center justify-center border border-[#c8a96b]/35 text-[#a78950]">
              <MessageSquareQuote size={28} strokeWidth={1.2} />
            </div>
          </div>
        </header>

        {/* Reviews */}
        <section className="mb-20 md:mb-28">
          <div className="flex items-center justify-between border-y border-[#15191c]/10 py-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#15191c]/35">
                Guest Reviews
              </span>

              <span className="w-1 h-1 rounded-full bg-[#c8a96b]" />

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#15191c]/30">
                {list.length} {list.length === 1 ? "Review" : "Reviews"}
              </span>
            </div>

            <Star
              size={14}
              fill="currentColor"
              strokeWidth={1.2}
              className="text-[#c8a96b]"
            />
          </div>

          <ReviewCarousel reviews={list} />
        </section>

        {/* Review Form */}
        <section className="max-w-3xl mx-auto relative">

          <div className="absolute -top-5 -left-5 w-16 h-16 border-l border-t border-[#c8a96b]/25 pointer-events-none" />

          <div className="absolute -bottom-5 -right-5 w-16 h-16 border-r border-b border-[#c8a96b]/25 pointer-events-none" />

          <div className="relative bg-white border border-[#15191c]/10 p-7 sm:p-9 md:p-12">

            <div className="mb-9">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquareQuote
                  size={18}
                  strokeWidth={1.3}
                  className="text-[#a78950]"
                />

                <span className="text-[9px] uppercase tracking-[0.25em] text-[#a78950]">
                  Your Experience
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                Share your stay.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#15191c]/50">
                Your experience helps other travellers discover places
                that are worth staying for.
              </p>
            </div>

            {!auth ? (
              <div className="border border-[#15191c]/10 bg-[#f7f7f5] p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#a78950] mb-2">
                      Guest Account Required
                    </p>

                    <p className="text-sm leading-6 text-[#15191c]/55">
                      Please sign in to share your experience with the
                      Aveline community.
                    </p>
                  </div>

                  <Link
                    to="/login"
                    className="group shrink-0 inline-flex items-center justify-center gap-3 bg-[#15191c] text-white px-6 py-3.5 text-[9px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-[#c8a96b]"
                  >
                    Sign In

                    <ArrowRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">

                {/* Hotel */}
                <div>
                  <label
                    htmlFor="review-room"
                    className="block text-[9px] uppercase tracking-[0.2em] text-[#15191c]/50 font-medium mb-2.5"
                  >
                    Hotel / Room
                  </label>

                  <input
                    id="review-room"
                    type="text"
                    placeholder="Which hotel did you stay at?"
                    value={form.room}
                    onChange={(e) => updateForm("room", e.target.value)}
                    className="w-full bg-[#f7f7f5] border border-[#15191c]/10 px-4 py-3.5 text-sm outline-none placeholder:text-[#15191c]/30 transition-all duration-300 focus:bg-white focus:border-[#c8a96b] focus:ring-1 focus:ring-[#c8a96b]/20"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#15191c]/50 font-medium mb-3">
                    Your Rating
                  </label>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((number) => (
                      <button
                        key={number}
                        type="button"
                        aria-label={`Rate ${number} out of 5`}
                        onClick={() => updateForm("stars", number)}
                        className="p-1 transition-transform duration-200 hover:scale-110 focus:outline-none"
                      >
                        <Star
                          size={23}
                          strokeWidth={1.3}
                          fill={number <= form.stars ? "currentColor" : "none"}
                          className={
                            number <= form.stars
                              ? "text-[#c8a96b]"
                              : "text-[#15191c]/20"
                          }
                        />
                      </button>
                    ))}

                    <span className="ml-3 text-[9px] uppercase tracking-[0.15em] text-[#15191c]/35">
                      {form.stars} / 5
                    </span>
                  </div>
                </div>

                {/* Review */}
                <div>
                  <label
                    htmlFor="review-text"
                    className="block text-[9px] uppercase tracking-[0.2em] text-[#15191c]/50 font-medium mb-2.5"
                  >
                    Your Review
                  </label>

                  <textarea
                    id="review-text"
                    required
                    rows={6}
                    placeholder="Tell us about your stay..."
                    value={form.text}
                    onChange={(e) => updateForm("text", e.target.value)}
                    className="w-full bg-[#f7f7f5] border border-[#15191c]/10 px-4 py-3.5 text-sm leading-6 outline-none resize-none placeholder:text-[#15191c]/30 transition-all duration-300 focus:bg-white focus:border-[#c8a96b] focus:ring-1 focus:ring-[#c8a96b]/20"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                  <p className="text-[9px] uppercase tracking-[0.15em] text-[#15191c]/30">
                    Share your experience with future guests.
                  </p>

                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-3 bg-[#15191c] text-white px-7 py-4 text-[9px] uppercase tracking-[0.22em] font-medium transition-all duration-300 hover:bg-[#c8a96b] hover:-translate-y-0.5"
                  >
                    Post Review

                    <ArrowRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                </div>
              </form>
            )}
          </div>
        </section>

        {/* Bottom statement */}
        <div className="mt-20 md:mt-28 pt-8 border-t border-[#15191c]/10 text-center">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#15191c]/25">
            Thoughtful hospitality · Personal experiences · Aveline Stays
          </span>
        </div>

      </div>
    </main>
  );
}