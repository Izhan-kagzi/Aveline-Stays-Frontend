
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FiSearch,
  FiHeart,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiBriefcase,
  FiCompass,
  FiChevronDown,
  FiArrowUpRight,
  FiHome,
  FiBookOpen,
  FiPhone,
  FiInfo,
  FiMapPin,
} from "react-icons/fi";

import { AnimatePresence, motion } from "framer-motion";

import Logo from "./Logo";
import SearchOverlay from "./SearchOverlay";
import NotificationBell from "./NotificationBell";

import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

/* =========================================================
   NAVIGATION DATA
========================================================= */

const links = [
  { to: "/", label: "Home" },
  { to: "/stays", label: "Stays" },
  { to: "/itinerary", label: "AI Itinerary" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/* Replace these image URLs with your own hotel images. */

const stayCategories = [
  {
    title: "Luxury Escapes",
    description: "Exceptional stays with unforgettable views.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=85",
    to: "/stays?category=luxury",
    tag: "LUXURY",
  },
  {
    title: "Boutique Stays",
    description: "Character-rich hotels with a personal touch.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
    to: "/stays?category=boutique",
    tag: "BOUTIQUE",
  },
  {
    title: "Nature Retreats",
    description: "Slow down and reconnect with nature.",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=85",
    to: "/stays?category=nature",
    tag: "NATURE",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function Navbar() {
  const { user, isCustomer, isStaff, logout } = useAuth();
  const fav = useFavorites();

  const loc = useLocation();
  const nav = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [megaMenu, setMegaMenu] = useState(false);
  const [mobileStays, setMobileStays] = useState(false);

  const overHero = loc.pathname === "/" && !scrolled;

  const text = overHero ? "text-white" : "text-ink";

  /* =========================================================
     SCROLL EFFECT
  ========================================================= */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* =========================================================
     CLOSE MENUS ON ROUTE CHANGE
  ========================================================= */

  useEffect(() => {
    setMobile(false);
    setMenu(false);
    setMegaMenu(false);
    setMobileStays(false);
  }, [loc.pathname, loc.search]);

  /* =========================================================
     LOCK BODY SCROLL WHEN DRAWER IS OPEN
  ========================================================= */

  useEffect(() => {
    if (!mobile) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobile(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobile]);

  /* =========================================================
     CLOSE PROFILE MENU WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    if (!menu) return;

    const handleClick = (event) => {
      if (!event.target.closest("[data-profile-menu]")) {
        setMenu(false);
      }
    };

    document.addEventListener("pointerdown", handleClick);

    return () => {
      document.removeEventListener("pointerdown", handleClick);
    };
  }, [menu]);

  /* =========================================================
     SIGN OUT
  ========================================================= */

  const handleLogout = async () => {
    setMenu(false);
    setMobile(false);

    await logout();

    nav("/");
  };

  /* =========================================================
     REUSABLE NAV LINK
  ========================================================= */

  const desktopLinkClass = ({ isActive }) =>
    `relative whitespace-nowrap py-2 text-sm font-medium transition-colors duration-300
    ${
      isActive
        ? "text-brass"
        : `${text} opacity-85 hover:opacity-100`
    }
    after:absolute after:bottom-0 after:left-0 after:h-px after:bg-brass
    after:transition-all after:duration-300
    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          overHero
            ? "bg-transparent"
            : "border-b border-ink/5 bg-ivory/90 shadow-[0_1px_0_rgba(16,26,23,.04)] backdrop-blur-xl"
        }`}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-3 lg:h-20">

          {/* LEFT: HAMBURGER + LOGO */}

          <div className="flex shrink-0 items-center gap-3">

            {/* LEFT SLIDER TRIGGER */}

            <button
              type="button"
              onClick={() => setMobile(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobile}
              aria-controls="mobile-navigation"
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current/20 transition hover:bg-current/10 lg:hidden ${text}`}
            >
              <FiMenu size={21} />
            </button>

            <Logo light={overHero} />

          </div>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            className="hidden items-center gap-5 xl:gap-8 lg:flex"
            aria-label="Main navigation"
          >
            {/* HOME */}

            <NavLink to="/" end className={desktopLinkClass}>
              Home
            </NavLink>

            {/* STAYS MEGA MENU */}

            <div
              className="static"
              onMouseEnter={() => setMegaMenu(true)}
              onMouseLeave={() => setMegaMenu(false)}
            >
              <button
                type="button"
                onClick={() => setMegaMenu((value) => !value)}
                onFocus={() => setMegaMenu(true)}
                aria-expanded={megaMenu}
                className={`flex items-center gap-1.5 py-2 text-sm font-medium transition hover:text-brass ${text}`}
              >
                Stays

                <FiChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    megaMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {megaMenu && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 12,
                      visibility: "visible",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      visibility: "visible",
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                    }}
                    transition={{ duration: 0.22 }}
                    className="absolute left-0 right-0 top-full z-50 hidden pt-3 lg:block"
                  >
                    <div className="mx-auto max-w-7xl px-6">
                      <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-2xl">

                        <div className="grid grid-cols-12">

                          {/* LEFT CONTENT */}

                          <div className="col-span-3 bg-[#f6f3ed] p-8">

                            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brass">
                              Discover your stay
                            </span>

                            <h3 className="mt-4 font-display text-3xl leading-tight text-ink">
                              Your next
                              <br />
                              escape starts
                              <br />
                              here.
                            </h3>

                            <p className="mt-4 text-sm leading-6 text-ink/65">
                              Find a place that feels like it was made
                              just for you.
                            </p>

                            <Link
                              to="/stays"
                              onClick={() => setMegaMenu(false)}
                              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-brass"
                            >
                              Explore all stays
                              <FiArrowUpRight />
                            </Link>

                          </div>

                          {/* IMAGE CARDS */}

                          <div className="col-span-9 p-6">

                            <div className="grid grid-cols-3 gap-5">

                              {stayCategories.map((stay) => (
                                <Link
                                  key={stay.title}
                                  to={stay.to}
                                  onClick={() => setMegaMenu(false)}
                                  className="group min-w-0"
                                >
                                  <div className="relative h-44 overflow-hidden rounded-2xl bg-sand">

                                    <img
                                      src={stay.image}
                                      alt={stay.title}
                                      loading="lazy"
                                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                                    <span className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-black/20 px-3 py-1 text-[9px] font-semibold tracking-[0.18em] text-white backdrop-blur-sm">
                                      {stay.tag}
                                    </span>

                                    <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition group-hover:opacity-100">
                                      <FiArrowUpRight />
                                    </span>

                                  </div>

                                  <h4 className="mt-4 font-display text-xl text-ink transition group-hover:text-brass">
                                    {stay.title}
                                  </h4>

                                  <p className="mt-1 text-xs leading-5 text-ink/60">
                                    {stay.description}
                                  </p>

                                </Link>
                              ))}

                            </div>

                          </div>

                        </div>

                        {/* MEGA MENU FOOTER */}

                        <div className="flex items-center justify-between border-t border-ink/10 px-8 py-4">

                          <p className="text-xs text-ink/55">
                            Thoughtfully selected stays for every journey.
                          </p>

                          <Link
                            to="/stays"
                            onClick={() => setMegaMenu(false)}
                            className="inline-flex items-center gap-2 text-xs font-semibold text-ink transition hover:text-brass"
                          >
                            View all properties
                            <FiArrowUpRight />
                          </Link>

                        </div>

                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* REMAINING LINKS */}

            {links
              .filter(
                (link) =>
                  link.to !== "/" && link.to !== "/stays"
              )
              .map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={desktopLinkClass}
                >
                  {link.label}
                </NavLink>
              ))}

          </nav>

          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <div className={`flex shrink-0 items-center gap-1.5 sm:gap-2 ${text}`}>

            {/* SEARCH */}

            <button
              type="button"
              onClick={() => setSearch(true)}
              aria-label="Search"
              className="grid h-10 w-10 place-items-center rounded-full border border-current/20 transition hover:bg-current/10"
            >
              <FiSearch size={18} />
            </button>

            {/* FAVORITES */}

            {isCustomer && (
              <Link
                to="/favorites"
                aria-label="Saved stays"
                className="relative grid h-10 w-10 place-items-center rounded-full border border-current/20 transition hover:bg-current/10"
              >
                <FiHeart size={18} />

                {fav.ids.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brass px-1 text-[10px] font-bold text-ink">
                    {fav.ids.length}
                  </span>
                )}
              </Link>
            )}

            {/* NOTIFICATIONS */}

            {user && <NotificationBell dark={overHero} />}

            {/* USER PROFILE */}

            {user ? (
              <div className="relative" data-profile-menu>

                <button
                  type="button"
                  onClick={() => setMenu((value) => !value)}
                  aria-expanded={menu}
                  aria-label="Open account menu"
                  className="flex h-10 items-center gap-2 rounded-full border border-current/20 pl-1 pr-2 sm:pr-3 transition hover:bg-current/10"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brass text-xs font-bold text-ink">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </span>

                  <span className="hidden max-w-20 truncate text-sm font-semibold sm:block">
                    {user.name?.split(" ")[0]}
                  </span>

                  <FiChevronDown
                    size={13}
                    className={`hidden transition-transform sm:block ${
                      menu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {menu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-ink/10 bg-white text-ink shadow-lift"
                    >

                      <div className="border-b border-ink/10 bg-[#f8f6f1] px-4 py-4">
                        <p className="text-sm font-semibold">
                          {user.name}
                        </p>

                        <p className="mt-1 text-xs capitalize text-ink/55">
                          {user.role || "Customer"}
                        </p>
                      </div>

                      {isStaff && (
                        <Link
                          to="/admin"
                          onClick={() => setMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-sand"
                        >
                          <FiBriefcase />
                          {user.role === "superadmin"
                            ? "Admin dashboard"
                            : "Manager dashboard"}
                        </Link>
                      )}

                      {isCustomer && (
                        <>
                          <Link
                            to="/my-bookings"
                            onClick={() => setMenu(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-sand"
                          >
                            <FiUser />
                            My bookings
                          </Link>

                          <Link
                            to="/favorites"
                            onClick={() => setMenu(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-sand"
                          >
                            <FiHeart />
                            Saved stays
                          </Link>

                          <Link
                            to="/itinerary"
                            onClick={() => setMenu(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-sand"
                          >
                            <FiCompass />
                            My itineraries
                          </Link>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 border-t border-ink/10 px-4 py-3 text-left text-sm text-rose-700 transition hover:bg-sand"
                      >
                        <FiLogOut />
                        Sign out
                      </button>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            ) : (
              <Link
                to="/login"
                className={`btn hidden !py-2.5 sm:inline-flex ${
                  overHero ? "btn-light" : "btn-primary"
                }`}
              >
                Sign in
              </Link>
            )}

          </div>

        </div>
      </header>

      {/* =====================================================
          MOBILE LEFT SLIDE DRAWER
      ===================================================== */}

      <AnimatePresence>
        {mobile && (
          <>
            {/* BACKDROP */}

            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobile(false)}
              className="fixed inset-0 z-[60] cursor-default bg-black/50 backdrop-blur-[3px]"
            />

            {/* DRAWER */}

            <motion.aside
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 32,
              }}
              className="fixed inset-y-0 left-0 z-[70] flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-[#fbf9f5] text-ink shadow-2xl"
            >

              {/* DRAWER HEADER */}

              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-5">

                <div onClick={() => setMobile(false)}>
                  <Logo light={false} />
                </div>

                <button
                  type="button"
                  onClick={() => setMobile(false)}
                  aria-label="Close navigation menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 transition hover:bg-sand"
                >
                  <FiX size={21} />
                </button>

              </div>

              {/* WELCOME AREA */}

              <div className="px-6 pb-5 pt-7">

                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brass">
                  Discover something special
                </span>

                <h2 className="mt-3 font-display text-3xl leading-tight">
                  Make room
                  <br />
                  for the extraordinary.
                </h2>

                <p className="mt-3 text-sm leading-6 text-ink/60">
                  Find your next stay, plan a journey, and discover
                  places worth remembering.
                </p>

              </div>

              {/* NAVIGATION LINKS */}

              <nav
                aria-label="Mobile navigation links"
                className="flex-1 px-4 pb-6"
              >

                {/* HOME */}

                <NavLink
                  to="/"
                  end
                  onClick={() => setMobile(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#eee6d9] text-ink"
                        : "hover:bg-[#f0ece5]"
                    }`
                  }
                >
                  <FiHome size={18} />
                  Home
                </NavLink>

                {/* MOBILE STAYS EXPANSION */}

                <div className="mt-1">

                  <div className="flex items-center rounded-xl transition hover:bg-[#f0ece5]">

                    <NavLink
                      to="/stays"
                      onClick={() => setMobile(false)}
                      className={({ isActive }) =>
                        `flex flex-1 items-center gap-4 px-4 py-3.5 text-sm font-semibold ${
                          isActive ? "text-brass" : ""
                        }`
                      }
                    >
                      <FiMapPin size={18} />
                      Stays
                    </NavLink>

                    <button
                      type="button"
                      aria-label="Expand stays categories"
                      aria-expanded={mobileStays}
                      onClick={() =>
                        setMobileStays((value) => !value)
                      }
                      className="grid h-11 w-12 place-items-center"
                    >
                      <FiChevronDown
                        className={`transition-transform duration-300 ${
                          mobileStays ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                  </div>

                  <AnimatePresence>
                    {mobileStays && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pb-3 pl-4 pt-2">

                          {stayCategories.map((stay) => (
                            <Link
                              key={stay.title}
                              to={stay.to}
                              onClick={() => setMobile(false)}
                              className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-[#f0ece5]"
                            >

                              <img
                                src={stay.image}
                                alt=""
                                loading="lazy"
                                className="h-14 w-16 shrink-0 rounded-lg object-cover"
                              />

                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold">
                                  {stay.title}
                                </p>

                                <p className="mt-1 line-clamp-2 text-xs text-ink/55">
                                  {stay.description}
                                </p>
                              </div>

                              <FiArrowUpRight
                                className="shrink-0 text-ink/40 transition group-hover:text-brass"
                              />

                            </Link>
                          ))}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* OTHER LINKS */}

                {links
                  .filter(
                    (link) =>
                      link.to !== "/" && link.to !== "/stays"
                  )
                  .map((link) => {
                    const Icon =
                      link.to === "/itinerary"
                        ? FiCompass
                        : link.to === "/journal"
                          ? FiBookOpen
                          : link.to === "/about"
                            ? FiInfo
                            : FiPhone;

                    return (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobile(false)}
                        className={({ isActive }) =>
                          `mt-1 flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                            isActive
                              ? "bg-[#eee6d9] text-ink"
                              : "hover:bg-[#f0ece5]"
                          }`
                        }
                      >
                        <Icon size={18} />
                        {link.label}
                      </NavLink>
                    );
                  })}

                {/* CUSTOMER LINKS */}

                {isCustomer && (
                  <div className="mt-5 border-t border-ink/10 pt-4">

                    <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/45">
                      Your account
                    </p>

                    <Link
                      to="/my-bookings"
                      onClick={() => setMobile(false)}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm transition hover:bg-[#f0ece5]"
                    >
                      <FiUser size={18} />
                      My bookings
                    </Link>

                    <Link
                      to="/favorites"
                      onClick={() => setMobile(false)}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm transition hover:bg-[#f0ece5]"
                    >
                      <FiHeart size={18} />
                      Saved stays
                    </Link>

                    <Link
                      to="/itinerary"
                      onClick={() => setMobile(false)}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm transition hover:bg-[#f0ece5]"
                    >
                      <FiCompass size={18} />
                      My itineraries
                    </Link>

                  </div>
                )}

                {/* STAFF DASHBOARD */}

                {isStaff && (
                  <Link
                    to="/admin"
                    onClick={() => setMobile(false)}
                    className="mt-5 flex items-center gap-4 rounded-xl border-t border-ink/10 px-4 py-5 text-sm font-semibold"
                  >
                    <FiBriefcase size={18} />
                    {user?.role === "superadmin"
                      ? "Admin dashboard"
                      : "Manager dashboard"}
                  </Link>
                )}

              </nav>

              {/* DRAWER FOOTER */}

              <div className="border-t border-ink/10 bg-white px-5 py-5">

                {user ? (
                  <div className="space-y-3">

                    <div className="flex items-center gap-3">

                      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#eee6d9] font-semibold text-ink">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {user.name}
                        </p>

                        <p className="mt-1 text-xs text-ink/50">
                          Signed in
                        </p>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                    >
                      <FiLogOut size={17} />
                      Sign out
                    </button>

                  </div>
                ) : (
                  <div className="space-y-3">

                    <p className="text-xs leading-5 text-ink/55">
                      Ready for your next getaway?
                    </p>

                    <Link
                      to="/login"
                      onClick={() => setMobile(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-ink/90"
                    >
                      <FiUser size={17} />
                      Sign in to your account
                    </Link>

                  </div>
                )}

              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY */}

      <SearchOverlay
        open={search}
        onClose={() => setSearch(false)}
      />

    </>
  );
}