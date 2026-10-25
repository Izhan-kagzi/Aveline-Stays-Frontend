import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiSearch, FiHeart, FiMenu, FiX, FiUser, FiLogOut, FiBriefcase, FiCompass } from "react-icons/fi";
import Logo from "./Logo";
import SearchOverlay from "./SearchOverlay";
import NotificationBell from "./NotificationBell";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

const links = [
  { to: "/stays", label: "Stays" },
  { to: "/itinerary", label: "AI Itinerary" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { user, isCustomer, isStaff, logout } = useAuth();
  const fav = useFavorites();
  const loc = useLocation();
  const nav = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);

  const overHero = loc.pathname === "/" && !scrolled;
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setMobile(false); setMenu(false); }, [loc.pathname]);

  const text = overHero ? "text-white" : "text-ink";
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${overHero ? "bg-transparent" : "bg-ivory/85 shadow-[0_1px_0_rgba(16,26,23,.08)] backdrop-blur-xl"}`}>
        <div className="container-x flex h-20 items-center justify-between">
          <Logo light={overHero} />
          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `relative text-sm font-semibold transition ${text} ${isActive ? "after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:bg-brass" : "opacity-80 hover:opacity-100"}`}>{l.label}</NavLink>
            ))}
          </nav>
          <div className={`flex items-center gap-2 ${text}`}>
            <button onClick={() => setSearch(true)} aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full border border-current/20 transition hover:bg-current/10"><FiSearch /></button>
            {isCustomer && (
              <Link to="/favorites" aria-label="Saved stays" className="relative grid h-10 w-10 place-items-center rounded-full border border-current/20 transition hover:bg-current/10">
                <FiHeart />{fav.ids.length > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brass px-1 text-[10px] font-bold text-ink">{fav.ids.length}</span>}
              </Link>
            )}
            {user && <NotificationBell dark={overHero} />}
            {user ? (
              <div className="relative">
                <button onClick={() => setMenu((m) => !m)} className="flex h-10 items-center gap-2 rounded-full border border-current/20 pl-1.5 pr-4 text-sm font-semibold transition hover:bg-current/10">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brass text-xs font-bold text-ink">{user.name?.[0]?.toUpperCase()}</span>
                  <span className="hidden max-w-24 truncate sm:block">{user.name?.split(" ")[0]}</span>
                </button>
                {menu && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-ink/10 bg-white text-ink shadow-lift">
                    {isStaff && <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-sand"><FiBriefcase /> {user.role === "superadmin" ? "Admin" : "Manager"} dashboard</Link>}
                    {isCustomer && <Link to="/my-bookings" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-sand"><FiUser /> My bookings</Link>}
                    {isCustomer && <Link to="/favorites" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-sand"><FiHeart /> Saved stays</Link>}
                    {isCustomer && <Link to="/itinerary" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-sand"><FiCompass /> My itineraries</Link>}
                    <button onClick={async () => { await logout(); nav("/"); }} className="flex w-full items-center gap-3 border-t border-ink/10 px-4 py-3 text-left text-sm text-rose-700 hover:bg-sand"><FiLogOut /> Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className={`btn hidden sm:inline-flex ${overHero ? "btn-light" : "btn-primary"} !py-2.5`}>Sign in</Link>
            )}
            <button onClick={() => setMobile((m) => !m)} className="grid h-10 w-10 place-items-center rounded-full border border-current/20 lg:hidden" aria-label="Menu">{mobile ? <FiX /> : <FiMenu />}</button>
          </div>
        </div>
        {mobile && (
          <div className="border-t border-ink/10 bg-ivory px-5 py-6 text-ink lg:hidden">
            {links.map((l) => <NavLink key={l.to} to={l.to} className="block py-3 font-display text-3xl">{l.label}</NavLink>)}
            {!user && <Link to="/login" className="btn-primary mt-4 w-full">Sign in</Link>}
          </div>
        )}
      </header>
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
