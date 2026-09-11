import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail, Phone, User } from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";
import BackButton from "../components/BackButton.jsx";
import poolImage from "../assets/real/pool-palms.jpg";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(form);
      navigate("/account");
    } catch (err) {
      setError(err.message || "Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div
        className="
          w-full max-w-6xl
          min-h-[700px]
          grid lg:grid-cols-[1.05fr_0.95fr]
          bg-white
          border border-[#15191c]/10
          shadow-[0_25px_80px_rgba(21,25,28,0.10)]
          overflow-hidden
        "
      >

        {/* =====================================================
            IMAGE SIDE
        ===================================================== */}
        <div className="relative hidden lg:flex min-h-[700px] overflow-hidden">

          <img
            src={poolImage}
            alt="Luxury pool at Aveline Stays"
            className="
              absolute inset-0
              w-full h-full
              object-cover
              transition-transform duration-1000
              hover:scale-105
            "
          />

          {/* Image overlay */}
          <div className="
            absolute inset-0
            bg-gradient-to-t
            from-[#101619]/80
            via-[#101619]/20
            to-transparent
          " />

          {/* Branding */}
          <div className="absolute top-10 left-10">
            <p className="font-serif text-2xl text-white tracking-wide">
              Aveline
            </p>

            <p className="
              text-[9px]
              uppercase
              tracking-[0.35em]
              text-white/60
              mt-1
            ">
              Stays
            </p>
          </div>

          {/* Image message */}
          <div className="relative mt-auto p-10 max-w-lg text-white">

            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-[#c8a96b]" />

              <span className="
                text-[#e0c98f]
                text-[10px]
                uppercase
                tracking-[0.3em]
              ">
                Begin Your Journey
              </span>
            </div>

            <h2 className="
              font-serif
              text-4xl xl:text-5xl
              leading-tight
            ">
              Stay somewhere
              <span className="block italic text-white/65">
                worth remembering.
              </span>
            </h2>

            <p className="
              mt-5
              text-sm
              leading-7
              text-white/60
              max-w-md
            ">
              Create your Aveline account and discover carefully selected
              stays, effortless bookings and experiences made for you.
            </p>
          </div>
        </div>

        {/* =====================================================
            SIGNUP SIDE
        ===================================================== */}
        <div className="
          relative
          flex
          items-center
          justify-center
          px-6
          py-10
          sm:px-10
          lg:px-14
          xl:px-20
        ">

          {/* Decorative corner */}
          <div className="
            absolute
            top-7
            right-7
            w-10
            h-10
            border-t
            border-r
            border-[#c8a96b]/40
          " />

          <div className="w-full max-w-md animate-fade-up">

            {/* Back */}
            <div className="mb-9">
              <BackButton />
            </div>

            {/* Header */}
            <div className="mb-8">

              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[#c8a96b]" />

                <span className="
                  text-[#a78950]
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  font-medium
                ">
                  Create Account
                </span>
              </div>

              <h1 className="
                font-serif
                text-4xl
                sm:text-5xl
                leading-[1.05]
                text-[#15191c]
              ">
                Welcome to
                <span className="block text-[#15191c]/40 italic">
                  Aveline Stays.
                </span>
              </h1>

              <p className="
                text-[#15191c]/50
                text-sm
                leading-6
                mt-5
                max-w-sm
              ">
                Create your account to save stays, manage reservations
                and enjoy a smoother booking experience.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-5">

              {/* Full Name */}
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
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={17}
                    strokeWidth={1.5}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#15191c]/35
                    "
                  />

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
                      px-11 py-3.5
                      text-sm
                      text-[#15191c]
                      placeholder:text-[#15191c]/30
                      outline-none
                      transition-all duration-300
                      focus:bg-white
                      focus:border-[#c8a96b]
                      focus:ring-1
                      focus:ring-[#c8a96b]/20
                    "
                  />
                </div>
              </div>

              {/* Email */}
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

                <div className="relative">
                  <Mail
                    size={17}
                    strokeWidth={1.5}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#15191c]/35
                    "
                  />

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
                      px-11 py-3.5
                      text-sm
                      text-[#15191c]
                      placeholder:text-[#15191c]/30
                      outline-none
                      transition-all duration-300
                      focus:bg-white
                      focus:border-[#c8a96b]
                      focus:ring-1
                      focus:ring-[#c8a96b]/20
                    "
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
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
                  Phone Number
                  <span className="normal-case tracking-normal text-[#15191c]/25 ml-1">
                    (optional)
                  </span>
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    strokeWidth={1.5}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#15191c]/35
                    "
                  />

                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={(e) =>
                      updateField("phone", e.target.value)
                    }
                    className="
                      w-full
                      bg-[#f7f7f5]
                      border border-[#15191c]/10
                      px-11 py-3.5
                      text-sm
                      text-[#15191c]
                      placeholder:text-[#15191c]/30
                      outline-none
                      transition-all duration-300
                      focus:bg-white
                      focus:border-[#c8a96b]
                      focus:ring-1
                      focus:ring-[#c8a96b]/20
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
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
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.5}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#15191c]/35
                    "
                  />

                  <input
                    id="password"
                    required
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={(e) =>
                      updateField("password", e.target.value)
                    }
                    className="
                      w-full
                      bg-[#f7f7f5]
                      border border-[#15191c]/10
                      px-11 py-3.5
                      text-sm
                      text-[#15191c]
                      placeholder:text-[#15191c]/30
                      outline-none
                      transition-all duration-300
                      focus:bg-white
                      focus:border-[#c8a96b]
                      focus:ring-1
                      focus:ring-[#c8a96b]/20
                    "
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  text-red-600
                ">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-3
                  bg-[#15191c]
                  text-white
                  px-6
                  py-4
                  text-[11px]
                  uppercase
                  tracking-[0.22em]
                  font-medium
                  transition-all duration-300
                  hover:bg-[#c8a96b]
                  hover:-translate-y-0.5
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  disabled:hover:translate-y-0
                "
              >
                {loading ? (
                  "Creating…"
                ) : (
                  <>
                    Create Account

                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <div className="
              mt-7
              pt-6
              border-t
              border-[#15191c]/10
            ">
              <p className="text-sm text-[#15191c]/45">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="
                    text-[#a78950]
                    font-medium
                    hover:text-[#15191c]
                    transition-colors
                  "
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Trust note */}
            <div className="
              mt-7
              flex
              items-center
              gap-3
              text-[#15191c]/30
            ">
              <div className="h-px flex-1 bg-[#15191c]/10" />

              <span className="
                text-[9px]
                uppercase
                tracking-[0.2em]
              ">
                Secure & Private
              </span>

              <div className="h-px flex-1 bg-[#15191c]/10" />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}