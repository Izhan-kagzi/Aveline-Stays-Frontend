import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import BackButton from "../components/BackButton.jsx";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (sent) {
      setSent(false);
    }
  }

  function submit(e) {
    e.preventDefault();

    // No backend endpoint wired for general contact yet.
    setSent(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#15191c] pt-28 pb-24">
      <div className="wrap px-6 md:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-14 md:mb-18">
          <BackButton />

          <div className="mt-10 max-w-3xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-px w-10 bg-[#c8a96b]" />

              <span className="text-[#a78950] text-[10px] uppercase tracking-[0.3em] font-medium">
                Get In Touch
              </span>
            </div>

            <h1 className="
              font-serif
              text-4xl
              md:text-5xl
              lg:text-6xl
              leading-[1.05]
              tracking-tight
            ">
              Let’s start a
              <span className="block text-[#15191c]/40 italic">
                conversation.
              </span>
            </h1>

            <p className="
              mt-6
              text-[#15191c]/55
              text-sm md:text-base
              leading-7
              max-w-2xl
            ">
              Questions about a booking, a partner property, or anything
              else? Send us a note and our team will get back to you
              within a business day.
            </p>
          </div>
        </div>

        {/* =====================================================
            CONTACT CONTENT
        ===================================================== */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8">

          {/* ===================================================
              FORM
          =================================================== */}
          <div className="
            relative
            bg-white
            border border-[#15191c]/10
            p-6 sm:p-8 md:p-10
          ">

            {/* Decorative corner */}
            <div className="
              absolute
              top-5 right-5
              w-10 h-10
              border-t border-r
              border-[#c8a96b]/35
            " />

            <div className="mb-8">
              <span className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-[#15191c]/35
              ">
                Send a Message
              </span>

              <h2 className="
                font-serif
                text-2xl md:text-3xl
                mt-2
              ">
                How can we help?
              </h2>
            </div>

            <form onSubmit={submit} className="space-y-5">

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">

                <div>
                  <label
                    htmlFor="name"
                    className="
                      block
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-[#15191c]/55
                      font-medium
                      mb-2.5
                    "
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    required
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    className="
                      w-full
                      bg-[#f7f7f5]
                      border border-[#15191c]/10
                      px-4 py-3.5
                      text-sm
                      outline-none
                      placeholder:text-[#15191c]/30
                      transition-all duration-300
                      focus:bg-white
                      focus:border-[#c8a96b]
                      focus:ring-1
                      focus:ring-[#c8a96b]/20
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="
                      block
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-[#15191c]/55
                      font-medium
                      mb-2.5
                    "
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      updateField("email", e.target.value)
                    }
                    className="
                      w-full
                      bg-[#f7f7f5]
                      border border-[#15191c]/10
                      px-4 py-3.5
                      text-sm
                      outline-none
                      placeholder:text-[#15191c]/30
                      transition-all duration-300
                      focus:bg-white
                      focus:border-[#c8a96b]
                      focus:ring-1
                      focus:ring-[#c8a96b]/20
                    "
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="
                    block
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-[#15191c]/55
                    font-medium
                    mb-2.5
                  "
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={(e) =>
                    updateField("subject", e.target.value)
                  }
                  className="
                    w-full
                    bg-[#f7f7f5]
                    border border-[#15191c]/10
                    px-4 py-3.5
                    text-sm
                    outline-none
                    placeholder:text-[#15191c]/30
                    transition-all duration-300
                    focus:bg-white
                    focus:border-[#c8a96b]
                    focus:ring-1
                    focus:ring-[#c8a96b]/20
                  "
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="
                    block
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-[#15191c]/55
                    font-medium
                    mb-2.5
                  "
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  required
                  rows={6}
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={(e) =>
                    updateField("message", e.target.value)
                  }
                  className="
                    w-full
                    bg-[#f7f7f5]
                    border border-[#15191c]/10
                    px-4 py-3.5
                    text-sm
                    leading-6
                    outline-none
                    resize-none
                    placeholder:text-[#15191c]/30
                    transition-all duration-300
                    focus:bg-white
                    focus:border-[#c8a96b]
                    focus:ring-1
                    focus:ring-[#c8a96b]/20
                  "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  group
                  w-full sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-[#15191c]
                  text-white
                  px-8 py-4
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  font-medium
                  transition-all duration-300
                  hover:bg-[#c8a96b]
                  hover:-translate-y-0.5
                "
              >
                Send Message

                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>

              {/* Success */}
              {sent && (
                <div className="
                  border
                  border-[#c8a96b]/30
                  bg-[#faf8f2]
                  px-4 py-3
                  text-sm
                  text-[#6d5b35]
                ">
                  Thank you — your message has been received.
                  Our team will be in touch shortly.
                </div>
              )}
            </form>
          </div>

          {/* ===================================================
              CONTACT DETAILS
          =================================================== */}
          <aside className="
            bg-[#eef1f2]
            border border-[#15191c]/10
            p-7 sm:p-9 md:p-10
            flex flex-col
          ">

            <div className="mb-10">
              <span className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-[#a78950]
              ">
                Aveline Stays
              </span>

              <h2 className="
                font-serif
                text-3xl
                md:text-4xl
                mt-3
                leading-tight
              ">
                We’re here
                <span className="block text-[#15191c]/40 italic">
                  whenever you need us.
                </span>
              </h2>
            </div>

            <div className="space-y-0">

              {/* Email */}
              <ContactItem
                icon={<Mail size={18} strokeWidth={1.4} />}
                label="Email"
              >
                <a
                  href="mailto:hello@avelinestays.com"
                  className="
                    hover:text-[#a78950]
                    transition-colors
                  "
                >
                  hello@avelinestays.com
                </a>
              </ContactItem>

              {/* Phone */}
              <ContactItem
                icon={<Phone size={18} strokeWidth={1.4} />}
                label="Phone"
              >
                <a
                  href="tel:+919000000000"
                  className="
                    hover:text-[#a78950]
                    transition-colors
                  "
                >
                  +91 90000 00000
                </a>
              </ContactItem>

              {/* Support */}
              <ContactItem
                icon={<Clock3 size={18} strokeWidth={1.4} />}
                label="Support Hours"
              >
                Mon–Sun, 24×7
              </ContactItem>

              {/* Location */}
              <ContactItem
                icon={<MapPin size={18} strokeWidth={1.4} />}
                label="Hospitality Network"
              >
                Independent hotels, resorts and heritage stays
                across India.
              </ContactItem>

            </div>

            {/* Partnership */}
            <div className="
              mt-auto
              pt-8
              border-t
              border-[#15191c]/10
            ">
              <p className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#15191c]/35
                mb-3
              ">
                Hotel Partnerships
              </p>

              <p className="
                text-sm
                leading-6
                text-[#15191c]/55
              ">
                Looking to list your property with Aveline?
              </p>

              <Link
                to="/collaborate"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  mt-4
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-[#a78950]
                  hover:text-[#15191c]
                  transition-colors
                "
              >
                Explore Collaboration

                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>

          </aside>
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}
        <div className="
          mt-16 md:mt-20
          text-center
        ">
          <span className="
            text-[9px]
            uppercase
            tracking-[0.3em]
            text-[#15191c]/25
          ">
            Thoughtful hospitality · Personal support · Aveline Stays
          </span>
        </div>

      </div>
    </main>
  );
}

/* =========================================================
   CONTACT ITEM
========================================================= */

function ContactItem({ icon, label, children }) {
  return (
    <div className="
      flex
      gap-4
      py-6
      border-b
      border-[#15191c]/10
      first:border-t
    ">
      <div className="
        shrink-0
        w-10 h-10
        flex items-center justify-center
        border border-[#c8a96b]/35
        text-[#a78950]
      ">
        {icon}
      </div>

      <div>
        <p className="
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-[#15191c]/35
          mb-1.5
        ">
          {label}
        </p>

        <div className="
          text-sm
          leading-6
          text-[#15191c]/70
        ">
          {children}
        </div>
      </div>
    </div>
  );
}