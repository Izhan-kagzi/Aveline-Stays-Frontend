import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import BackButton from "../components/BackButton.jsx";
import poolImage from "../assets/real/pool-palms.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);

      if (data.role === "superadmin") {
        navigate("/superadmin");
      } else if (data.role === "manager") {
        navigate("/manager");
      } else {
        navigate(location.state?.from || "/account");
      }
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div
        className="
          w-full max-w-6xl
          min-h-[680px]
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
        <div
          className="
            relative
            hidden lg:flex
            min-h-[680px]
            overflow-hidden
          "
        >
          <img
            src={poolImage}
            alt="Luxury pool at Aveline Stays"
            className="
              absolute inset-0
              w-full h-full
              object-cover
              scale-100
              transition-transform duration-1000
              hover:scale-105
            "
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101619]/80 via-[#101619]/20 to-transparent" />

          {/* Top branding */}
          <div className="absolute top-10 left-10">
            <p className="font-serif text-2xl text-white tracking-wide">
              Aveline
            </p>

            <p className="text-[9px] uppercase tracking-[0.35em] text-white/60 mt-1">
              Stays
            </p>
          </div>

          {/* Image content */}
          <div className="relative mt-auto p-10 max-w-lg text-white">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-[#c8a96b]" />

              <span className="text-[#e0c98f] text-[10px] uppercase tracking-[0.3em]">
                Aveline Stays
              </span>
            </div>

            <h2 className="font-serif text-4xl xl:text-5xl leading-tight">
              Your next
              <span className="block italic text-white/65">
                beautiful stay awaits.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/60 max-w-md">
              Discover thoughtfully selected hotels, resorts and heritage
              stays designed around comfort, character and unforgettable
              experiences.
            </p>
          </div>
        </div>

        {/* =====================================================
            LOGIN SIDE
        ===================================================== */}
        <div className="relative flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">
          {/* Decorative corner */}
          <div className="absolute top-7 right-7 w-10 h-10 border-t border-r border-[#c8a96b]/40" />

          <div className="w-full max-w-md animate-fade-up">
            {/* Back button */}
            <div className="mb-10">
              <BackButton />
            </div>

            {/* Header */}
            <div className="mb-9">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[#c8a96b]" />

                <span className="text-[#a78950] text-[10px] uppercase tracking-[0.3em] font-medium">
                  Welcome Back
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl leading-[1.05] text-[#15191c]">
                Sign in to
                <span className="block text-[#15191c]/40 italic">
                  Aveline Stays.
                </span>
              </h1>

              <p className="text-[#15191c]/50 text-sm leading-6 mt-5 max-w-sm">
                Book a stay, manage your reservations and keep your favourite
                properties close.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-6">

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
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
                <div className="flex items-center justify-between mb-2.5">
                  <label
                    htmlFor="password"
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-[#15191c]/55
                      font-medium
                    "
                  >
                    Password
                  </label>
                </div>

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
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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
                <div
                  className="
                    border border-red-200
                    bg-red-50
                    px-4 py-3
                    text-sm
                    text-red-600
                  "
                >
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
                  flex items-center justify-center
                  gap-3
                  bg-[#15191c]
                  text-white
                  px-6 py-4
                  text-[11px]
                  uppercase
                  tracking-[0.22em]
                  font-medium
                  transition-all duration-300
                  hover:bg-[#c8a96b]
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {loading ? (
                  "Signing in…"
                ) : (
                  <>
                    Sign In

                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="
                        transition-transform duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}
              </button>
            </form>

            {/* Signup */}
            <div className="mt-8 pt-7 border-t border-[#15191c]/10">
              <p className="text-sm text-[#15191c]/45">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="
                    text-[#a78950]
                    font-medium
                    hover:text-[#15191c]
                    transition-colors
                  "
                >
                  Create one
                </Link>
              </p>
            </div>

            {/* Trust note */}
            <div className="mt-8 flex items-center gap-3 text-[#15191c]/30">
              <div className="h-px flex-1 bg-[#15191c]/10" />

              <span className="text-[9px] uppercase tracking-[0.2em]">
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