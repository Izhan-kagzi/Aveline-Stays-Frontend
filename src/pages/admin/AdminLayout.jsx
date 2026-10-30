export default function AdminLayout() {
  const { user, isSuperadmin, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    nav("/login", { state: { staff: true } });
  };

  // ...items stay the same

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

        <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
          <Link
            to="/stays"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ivory/70 transition hover:bg-white/10 hover:text-white"
          >
            <FiArrowLeft size={17} /> Back to Stays
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ivory/70 transition hover:bg-red-500/15 hover:text-red-200"
          >
            <FiLogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-ink/5 bg-ivory/85 px-5 backdrop-blur-xl sm:px-8">
          {/* ...unchanged... */}
          <div className="flex items-center gap-3"><NotificationBell />
            <div className="hidden items-center gap-3 rounded-full border border-ink/10 bg-white py-1.5 pl-1.5 pr-4 sm:flex"><span className="grid h-8 w-8 place-items-center rounded-full bg-forest text-xs font-bold text-ivory">{user?.name?.[0]}</span><span className="text-sm font-semibold">{user?.name}</span></div>
            <button onClick={handleLogout} className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 hover:bg-white" aria-label="Sign out"><FiLogOut /></button></div>
        </header>
        <div className="p-5 sm:p-8"><Outlet /></div>
      </div>
    </div>
  );
}