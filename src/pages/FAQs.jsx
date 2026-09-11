import React, { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { faqs } from "../data/content.js";
import BackButton from "../components/BackButton.jsx";

export default function FAQs() {
  const [open, setOpen] = useState(0);

  function toggleFaq(index) {
    setOpen((current) => (current === index ? -1 : index));
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#15191c] pt-28 pb-24">
      <div className="wrap max-w-4xl px-6 md:px-10">

        <BackButton />

        {/* Header */}
        <header className="mt-10 mb-14 md:mb-20">
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px w-10 bg-[#c8a96b]" />

            <span className="text-[#a78950] text-[10px] uppercase tracking-[0.3em] font-medium">
              Support
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
                Frequently asked
                <span className="block text-[#15191c]/40 italic">
                  questions.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm md:text-base leading-7 text-[#15191c]/55">
                Find answers to some of the most common questions about
                reservations, stays, amenities and the Aveline experience.
              </p>
            </div>

            <div className="hidden md:flex w-20 h-20 shrink-0 items-center justify-center border border-[#c8a96b]/35 text-[#a78950]">
              <HelpCircle size={27} strokeWidth={1.2} />
            </div>
          </div>
        </header>

        {/* FAQ List */}
        <section>
          <div className="flex items-center justify-between border-y border-[#15191c]/10 py-4 mb-8">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#15191c]/40">
              Guest Support
            </span>

            <span className="text-[9px] uppercase tracking-[0.2em] text-[#15191c]/30">
              {faqs.length} {faqs.length === 1 ? "Question" : "Questions"}
            </span>
          </div>

          <div className="border-t border-[#15191c]/10">
            {faqs.map((faq, index) => {
              const isOpen = open === index;

              return (
                <div
                  key={faq.q}
                  className="border-b border-[#15191c]/10"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group"
                  >
                    <div className="flex items-start gap-5 md:gap-7">
                      <span className="hidden sm:block text-[9px] tracking-[0.2em] text-[#a78950] pt-1.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="font-serif text-lg md:text-xl leading-7 pr-2">
                        {faq.q}
                      </span>
                    </div>

                    <span
                      className={
                        isOpen
                          ? "shrink-0 w-9 h-9 flex items-center justify-center border border-[#c8a96b] bg-[#c8a96b] text-white transition-all duration-300"
                          : "shrink-0 w-9 h-9 flex items-center justify-center border border-[#15191c]/15 text-[#15191c]/50 group-hover:border-[#c8a96b] group-hover:text-[#a78950] transition-all duration-300"
                      }
                    >
                      <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        className={
                          isOpen
                            ? "rotate-180 transition-transform duration-300"
                            : "transition-transform duration-300"
                        }
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-7 pl-0 sm:pl-12 md:pl-16 pr-12 md:pr-20">
                      <div className="border-l border-[#c8a96b]/50 pl-5 md:pl-6">
                        <p className="text-sm md:text-base leading-7 text-[#15191c]/55">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-16 md:mt-20">
          <div className="relative bg-white border border-[#15191c]/10 p-7 sm:p-9 md:p-10">

            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#c8a96b]/30" />

            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#c8a96b]/30" />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-7">

              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#a78950]">
                  Still need help?
                </span>

                <h2 className="font-serif text-2xl md:text-3xl mt-3">
                  We're here to assist.
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#15191c]/50 max-w-lg">
                  If you cannot find the answer you're looking for,
                  our team will be happy to help with your stay.
                </p>
              </div>

              <Link
                to="/contact"
                className="group shrink-0 inline-flex items-center justify-center gap-3 bg-[#15191c] text-white px-6 py-3.5 text-[9px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-[#c8a96b]"
              >
                Contact Us

                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

            </div>
          </div>
        </section>

        {/* Bottom statement */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-[#15191c]/10 text-center">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#15191c]/25">
            Thoughtful hospitality · Clear answers · Aveline Stays
          </span>
        </div>

      </div>
    </main>
  );
}
