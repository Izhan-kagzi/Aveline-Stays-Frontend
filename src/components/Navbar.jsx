import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import logoWhite from "../assets/logo-white.svg";
import logoDark from "../assets/logo.svg";

import { useAuth } from "../context/AuthContext.jsx";

const primaryLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/hotels", label: "Find Stays" },
  { to: "/gallery", label: "Gallery" },
];

const exploreLinks = [
  { to: "/services", label: "Services" },
  { to: "/hotel-partners", label: "Hotel Partners" },
  { to: "/blogs", label: "Journal" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/faqs", label: "FAQs" },
];

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(!transparent);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);

  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  /* =========================================================
     SCROLL EFFECT
  ========================================================= */

  useEffect(() => {
    if (!transparent) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 45);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [transparent]);

  /* =========================================================
     LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
  ========================================================= */

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* =========================================================
     ACCOUNT
  ========================================================= */

  function handleAccountClick() {
    setMenuOpen(false);

    if (!auth) {
      navigate("/login");
      return;
    }

    if (auth.role === "superadmin") {
      navigate("/superadmin");
      return;
    }

    if (auth.role === "manager") {
      navigate("/manager");
      return;
    }

    navigate("/account");
  }

  function handleLogout() {
    setMenuOpen(false);
    logout();
  }

  function closeMenu() {
    setMenuOpen(false);
    setMobileExploreOpen(false);
  }

  /* =========================================================
     COLORS
  ========================================================= */

  const textColor = scrolled ? "text-ink" : "text-white";

  const hamburgerColor = scrolled
    ? "bg-ink"
    : "bg-white";

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header
        className={`
          fixed inset-x-0 top-0 z-50
          transition-all duration-500 ease-out
          ${
            scrolled
              ? `
                bg-white/90
                backdrop-blur-xl
                border-b border-ink/10
                shadow-[0_8px_35px_rgba(0,0,0,0.06)]
                py-3
              `
              : `
                bg-transparent
                border-b border-white/15
                py-5
              `
          }
        `}
      >
        <nav
          className="
            wrap
            flex
            items-center
            justify-between
            gap-5
            px-5
            sm:px-7
            md:px-10
            lg:px-12
            xl:px-16
          "
        >

          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            to="/"
            onClick={closeMenu}
            className="
              group
              relative
              z-[60]
              shrink-0
              flex
              items-center
            "
          >
            <img
              src={scrolled ? logoDark : logoWhite}
              alt="Aveline Stays"
              className="
                h-9
                w-auto
                sm:h-10
                md:h-11
                transition-all
                duration-500
                group-hover:opacity-80
              "
            />
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <ul
            className="
              hidden
              lg:flex
              items-center
              gap-7
              xl:gap-10
              list-none
              m-0
              p-0
            "
          >
            {primaryLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    ${textColor}
                    text-[11px]
                    xl:text-xs
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "opacity-100"
                        : "opacity-75 hover:opacity-100"
                    }
                    `
                  }
                >
                  {link.label}

                  <span
                    className="
                      absolute
                      -bottom-2
                      left-0
                      h-px
                      w-0
                      bg-goldBright
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </NavLink>
              </li>
            ))}

            {/* =================================================
                EXPLORE DROPDOWN
            ================================================== */}

            <li
              className="relative"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setExploreOpen((value) => !value)}
                className={`
                  flex
                  items-center
                  gap-2
                  ${textColor}
                  text-[11px]
                  xl:text-xs
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  opacity-75
                  hover:opacity-100
                  transition-all
                  duration-300
                `}
              >
                Explore

                <span
                  className={`
                    text-[9px]
                    transition-transform
                    duration-300
                    ${exploreOpen ? "rotate-180" : ""}
                  `}
                >
                  ↓
                </span>
              </button>

              {/* Dropdown */}
              <div
                className={`
                  absolute
                  left-1/2
                  top-full
                  -translate-x-1/2
                  pt-5
                  w-56
                  transition-all
                  duration-300
                  ${
                    exploreOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-3 pointer-events-none"
                  }
                `}
              >
                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-ink/10
                    bg-white
                    shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                  "
                >
                  {/* Dropdown heading */}
                  <div className="border-b border-ink/10 px-5 py-4">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-ink/40">
                      Discover
                    </p>

                    <p className="mt-1 font-serif text-lg text-ink">
                      Aveline
                    </p>
                  </div>

                  <div className="py-2">
                    {exploreLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setExploreOpen(false)}
                        className={({ isActive }) =>
                          `
                          group
                          flex
                          items-center
                          justify-between
                          px-5
                          py-3
                          text-sm
                          transition-all
                          duration-200
                          ${
                            isActive
                              ? "bg-cream text-gold"
                              : "text-ink/75 hover:bg-cream hover:text-ink"
                          }
                          `
                        }
                      >
                        {link.label}

                        <span
                          className="
                            opacity-0
                            -translate-x-2
                            transition-all
                            duration-200
                            group-hover:opacity-100
                            group-hover:translate-x-0
                          "
                        >
                          →
                        </span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {/* Contact */}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `
                  group
                  relative
                  ${textColor}
                  text-[11px]
                  xl:text-xs
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "opacity-100"
                      : "opacity-75 hover:opacity-100"
                  }
                  `
                }
              >
                Contact

                <span
                  className="
                    absolute
                    -bottom-2
                    left-0
                    h-px
                    w-0
                    bg-goldBright
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </NavLink>
            </li>
          </ul>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================== */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-5
              xl:gap-6
            "
          >
            {/* Account */}
            <button
              type="button"
              onClick={handleAccountClick}
              className={`
                ${textColor}
                text-xs
                font-medium
                transition-colors
                duration-300
                hover:text-gold
              `}
            >
              {auth
                ? `Hi, ${auth.user.name.split(" ")[0]}`
                : "Login"}
            </button>

            {/* Sign out */}
            {auth && (
              <button
                type="button"
                onClick={handleLogout}
                className={`
                  ${textColor}
                  text-xs
                  font-medium
                  opacity-60
                  hover:opacity-100
                  hover:text-gold
                  transition-all
                  duration-300
                `}
              >
                Sign out
              </button>
            )}

            {/* Book Now */}
            <Link
              to="/hotels"
              className={`
                group
                relative
                overflow-hidden
                rounded-full
                px-6
                py-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                transition-all
                duration-300
                ${
                  scrolled
                    ? `
                      border
                      border-gold
                      text-ink
                      hover:bg-gold
                      hover:text-white
                    `
                    : `
                      border
                      border-white/60
                      text-white
                      hover:border-gold
                      hover:bg-gold
                    `
                }
              `}
            >
              <span className="relative z-10">
                Book Now
              </span>
            </Link>
          </div>

          {/* =================================================
              MOBILE / TABLET HAMBURGER
          ================================================== */}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="
              lg:hidden
              relative
              z-[60]
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-current/10
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <span className="flex w-5 flex-col gap-[5px]">
              <span
                className={`
                  block
                  h-[1.5px]
                  w-full
                  ${hamburgerColor}
                  transition-all
                  duration-300
                `}
              />

              <span
                className={`
                  block
                  h-[1.5px]
                  w-3/4
                  ${hamburgerColor}
                  transition-all
                  duration-300
                `}
              />

              <span
                className={`
                  block
                  h-[1.5px]
                  w-full
                  ${hamburgerColor}
                  transition-all
                  duration-300
                `}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* =====================================================
          MOBILE / TABLET OVERLAY
      ====================================================== */}

      <div
        onClick={closeMenu}
        className={`
          fixed
          inset-0
          z-[70]
          bg-black/40
          backdrop-blur-sm
          transition-opacity
          duration-500
          lg:hidden
          ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* =====================================================
          LEFT MOBILE DRAWER
      ====================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[80]
          flex
          h-[100dvh]
          w-[88%]
          max-w-[390px]
          flex-col
          bg-[#fbfbfa]
          shadow-[20px_0_70px_rgba(0,0,0,0.18)]
          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:hidden
          ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
        aria-hidden={!menuOpen}
      >

        {/* =================================================
            DRAWER HEADER
        ================================================== */}

        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <Link
            to="/"
            onClick={closeMenu}
            className="shrink-0"
          >
            <img
              src={logoDark}
              alt="Aveline Stays"
              className="h-9 w-auto"
            />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-ink/10
              text-xl
              text-ink
              transition-all
              duration-300
              hover:bg-ink
              hover:text-white
            "
          >
            ×
          </button>
        </div>

        {/* =================================================
            DRAWER CONTENT
        ================================================== */}

        <div className="flex-1 overflow-y-auto px-6 py-8">

          {/* Label */}
          <div className="mb-7">
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-ink/40">
              Navigation
            </span>
          </div>

          {/* Main links */}
          <div className="space-y-1">
            {primaryLinks.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `
                  group
                  flex
                  items-center
                  justify-between
                  border-b
                  border-ink/10
                  py-4
                  text-xl
                  font-serif
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "text-gold"
                      : "text-ink hover:pl-2"
                  }
                  `
                }
              >
                <span>{link.label}</span>

                <span
                  className="
                    text-sm
                    opacity-30
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:opacity-100
                  "
                >
                  →
                </span>
              </NavLink>
            ))}

            {/* =================================================
                MOBILE EXPLORE
            ================================================== */}

            <div className="border-b border-ink/10">
              <button
                type="button"
                onClick={() =>
                  setMobileExploreOpen((value) => !value)
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  py-4
                  text-left
                  font-serif
                  text-xl
                  text-ink
                "
              >
                Explore

                <span
                  className={`
                    text-sm
                    text-ink/40
                    transition-transform
                    duration-300
                    ${
                      mobileExploreOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                >
                  ↓
                </span>
              </button>

              <div
                className={`
                  overflow-hidden
                  transition-all
                  duration-400
                  ${
                    mobileExploreOpen
                      ? "max-h-96 opacity-100 pb-3"
                      : "max-h-0 opacity-0"
                  }
                `}
              >
                {exploreLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `
                      flex
                      items-center
                      justify-between
                      px-3
                      py-3
                      text-sm
                      transition-colors
                      ${
                        isActive
                          ? "text-gold"
                          : "text-ink/60 hover:text-ink"
                      }
                      `
                    }
                  >
                    {link.label}

                    <span className="text-xs opacity-40">
                      →
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Contact */}
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                `
                group
                flex
                items-center
                justify-between
                border-b
                border-ink/10
                py-4
                text-xl
                font-serif
                transition-all
                duration-300
                ${
                  isActive
                    ? "text-gold"
                    : "text-ink hover:pl-2"
                }
                `
              }
            >
              Contact

              <span className="text-sm opacity-30">
                →
              </span>
            </NavLink>
          </div>

          {/* =================================================
              ACCOUNT AREA
          ================================================== */}

          <div className="mt-10 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-ink/40">
              Your Account
            </p>

            <button
              type="button"
              onClick={handleAccountClick}
              className="
                mt-4
                flex
                w-full
                items-center
                justify-between
                text-left
                text-sm
                font-medium
                text-ink
              "
            >
              <span>
                {auth
                  ? `Hi, ${auth.user.name.split(" ")[0]}`
                  : "Login / Account"}
              </span>

              <span>→</span>
            </button>

            {auth && (
              <button
                type="button"
                onClick={handleLogout}
                className="
                  mt-4
                  text-xs
                  text-ink/50
                  transition-colors
                  hover:text-gold
                "
              >
                Sign out
              </button>
            )}
          </div>
        </div>

        {/* =================================================
            DRAWER FOOTER
        ================================================== */}

        <div className="border-t border-ink/10 px-6 py-5">

          <Link
            to="/hotels"
            onClick={closeMenu}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-full
              bg-ink
              px-6
              py-4
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-white
              transition-all
              duration-300
              hover:bg-gold
            "
          >
            <span>Book Your Stay</span>

            <span
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </Link>

          <p className="mt-4 text-center text-[9px] uppercase tracking-[0.2em] text-ink/30">
            Curated stays · Thoughtfully chosen
          </p>
        </div>
      </aside>
    </>
  );
}
