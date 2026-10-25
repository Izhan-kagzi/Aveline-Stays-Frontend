import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiGrid, FiCalendar, FiXCircle, FiHome, FiUsers, FiUserCheck, FiActivity, FiInbox, FiMenu, FiLogOut, FiExternalLink } from "react-icons/fi";
import Logo from "../../components/Logo";
import NotificationBell from "../../components/NotificationBell";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { user, isSuperadmin, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const items = [
    { to: "/admin", label: "Overview", icon: FiGrid, end: true },
    { to: "/admin/bookings", label: "Bookings", icon: FiCalendar },
    { to: "/admin/cancellations", label: "Cancellations", icon: FiXCircle },
    { to: "/admin/stays", label: "Stays", icon: FiHome },
    { to: "/admin/customers", label: "Customers", icon: FiUsers },
    { to: "/admin/requests", label: "Partner requests", icon: FiInbox },
    ...(isSuperadmin ? [{ to: "/admin/managers", label: "Managers", icon: FiUserCheck }, { to: "/admin/logs", label: "Activity log", icon: FiActivity }] : []),
  ];

  return (
    <div className="min-h-screen bg-sand/50 lg:grid lg:grid-cols-[260px_1fr]">
      {open && <div className="fixed inset-0 z-40 bg-ink/50 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-forest-800 p-6 text-ivory transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <Logo light />
        <p className="mt-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-brass-light">{isSuperadmin ? "Admin console" : "Manager console"}</p>
        <nav className="mt-6 flex-1 space-y-1 overflow-y-auto">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-brass text-ink" : "text-ivory/70 hover:bg-white/10 hover:text-white"}`}><Icon size={17} /> {label}</NavLink>
          ))}
        </nav>
        <Link to="/" className="mt-4 flex items-center gap-2 text-xs text-ivory/50 hover:text-white"><FiExternalLink /> View website</Link>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-ink/5 bg-ivory/85 px-5 backdrop-blur-xl sm:px-8">
          <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 lg:hidden" aria-label="Menu"><FiMenu /></button>
          <p className="hidden font-display text-2xl lg:block">Welcome back, <span className="italic text-brass-dark">{user?.name?.split(" ")[0]}</span></p>
          <div className="flex items-center gap-3"><NotificationBell />
            <div className="hidden items-center gap-3 rounded-full border border-ink/10 bg-white py-1.5 pl-1.5 pr-4 sm:flex"><span className="grid h-8 w-8 place-items-center rounded-full bg-forest text-xs font-bold text-ivory">{user?.name?.[0]}</span><span className="text-sm font-semibold">{user?.name}</span></div>
            <button onClick={async () => { await logout(); nav("/login", { state: { staff: true } }); }} className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 hover:bg-white" aria-label="Sign out"><FiLogOut /></button></div>
        </header>
        <div className="p-5 sm:p-8"><Outlet /></div>
      </div>
    </div>
  );
}
