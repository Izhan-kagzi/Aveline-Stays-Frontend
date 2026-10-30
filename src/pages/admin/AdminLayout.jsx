import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiCalendar, FiXCircle, FiHome, FiUsers, FiUserCheck, FiActivity, FiInbox, FiMenu, FiLogOut, FiArrowLeft, FiX } from "react-icons/fi";
import Logo from "../../components/Logo";
import NotificationBell from "../../components/NotificationBell";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import { Avatar } from "./AdminUi";

const GROUPS = (isSuperadmin) => [
  { title: "Operations", items: [
    { to: "/admin", label: "Overview", icon: FiGrid, end: true },
    { to: "/admin/bookings", label: "Bookings", icon: FiCalendar },
    { to: "/admin/cancellations", label: "Cancellations", icon: FiXCircle, badgeKey: "cancellations" },
  ] },
  { title: "Catalogue", items: [
    { to: "/admin/stays", label: "Stays", icon: FiHome },
    { to: "/admin/customers", label: "Customers", icon: FiUsers },
    { to: "/admin/requests", label: "Partner requests", icon: FiInbox },
  ] },
  ...(isSuperadmin ? [{ title: "Administration", items: [
    { to: "/admin/managers", label: "Managers", icon: FiUserCheck },
    { to: "/admin/logs", label: "Activity log", icon: FiActivity },
  ] }] : []),
];

export default function AdminLayout() {
  const { user, isSuperadmin, logout } = useAuth();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(0);

  const groups = GROUPS(isSuperadmin);
  const current = groups.flatMap((g) => g.items).find((i) => (i.end ? pathname === i.to : pathname.startsWith(i.to)));

  const handleLogout = async () => {
    await logout();
    nav("/login", { state: { staff: true }, replace: true });
  };

  // Badge: pending cancellation requests, refreshed every minute.
  const loadPending = useCallback(() => {
    api("/cancellations").then((c) => setPending(Array.isArray(c) ? c.filter((x) => x.status === "pending").length : 0)).catch(() => {});
  }, []);
  useEffect(() => { loadPending(); const t = setInterval(loadPending, 60000); return () => clearInterval(t); }, [loadPending, pathname]);

  // Close the drawer on navigation and on Escape.
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-screen bg-sand/50 lg:grid lg:grid-cols-[264px_1fr]">
      {open && <div className="fixed inset-0 z-40 bg-ink/50 lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />}

      <aside aria-label="Admin navigation" className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col bg-forest-800 px-4 py-6 text-ivory transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-2">
          <Logo light />
          <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full text-ivory/70 hover:bg-white/10 lg:hidden" aria-label="Close menu"><FiX /></button>
        </div>
        <p className="mx-2 mt-6 text-sm text-ivory/50">{isSuperadmin ? "Admin console" : "Manager console"}</p>

        <nav className="mt-4 flex-1 space-y-6 overflow-y-auto pr-1">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="mb-2 px-3 text-xs font-semibold text-ivory/40">{g.title}</p>
              <div className="space-y-1">
                {g.items.map(({ to, label, icon: Icon, end, badgeKey }) => (
                  <NavLink key={to} to={to} end={end}
                    className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-light ${isActive ? "bg-brass text-ink" : "text-ivory/70 hover:bg-white/10 hover:text-white"}`}>
                    <Icon size={17} />
                    <span className="flex-1">{label}</span>
                    {badgeKey === "cancellations" && pending > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1.5 text-[11px] font-bold text-white">{pending}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
          <Link to="/stays" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ivory/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-light">
            <FiArrowLeft size={17} /> Back to Stays
          </Link>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ivory/70 transition hover:bg-rose-500/15 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-light">
            <FiLogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-ink/5 bg-ivory/85 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <button onClick={() => setOpen(true)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 lg:hidden" aria-label="Open menu"><FiMenu /></button>
            <p className="truncate font-display text-2xl">{current?.label || "Admin"}</p>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />
            <div className="hidden items-center gap-3 rounded-full border border-ink/10 bg-white py-1.5 pl-1.5 pr-5 sm:flex">
              <Avatar name={user?.name} size={32} />
              <div className="leading-tight"><p className="text-sm font-semibold">{user?.name}</p><p className="text-[11px] text-mist">{isSuperadmin ? "Superadmin" : "Manager"}</p></div>
            </div>
            <button onClick={handleLogout} className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 hover:bg-white lg:hidden" aria-label="Logout"><FiLogOut /></button>
          </div>
        </header>
        <main className="p-5 sm:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
