import { useCallback, useEffect, useRef, useState } from "react";
import { FiBell } from "react-icons/fi";
import { api } from "../lib/api";
import { fmtDate } from "../lib/format";

export default function NotificationBell({ dark = false }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  const load = useCallback(() => api("/notifications").then(setItems).catch(() => {}), []);
  useEffect(() => { load(); const t = setInterval(load, 30000); return () => clearInterval(t); }, [load]);
  useEffect(() => {
    const close = (e) => box.current && !box.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const unread = items.filter((n) => !n.read).length;
  const markAll = async () => { await api("/notifications/all/read", { method: "PATCH" }).catch(() => {}); load(); };
  const markOne = async (id) => { await api(`/notifications/${id}/read`, { method: "PATCH" }).catch(() => {}); load(); };

  return (
    <div className="relative" ref={box}>
      <button onClick={() => setOpen((o) => !o)} aria-label="Notifications"
        className={`relative grid h-10 w-10 place-items-center rounded-full border transition ${dark ? "border-white/15 text-white hover:bg-white/10" : "border-ink/10 hover:bg-sand"}`}>
        <FiBell />
        {unread > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brass px-1 text-[10px] font-bold text-ink">{unread}</span>}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-ink/10 bg-white text-ink shadow-lift">
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
            <p className="font-semibold">Notifications</p>
            {unread > 0 && <button onClick={markAll} className="text-xs font-semibold text-brass-dark hover:underline">Mark all read</button>}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 && <p className="p-8 text-center text-sm text-mist">You're all caught up.</p>}
            {items.slice(0, 20).map((n) => (
              <button key={n.id} onClick={() => markOne(n.id)} className={`block w-full border-b border-ink/5 px-4 py-3 text-left hover:bg-sand/60 ${n.read ? "opacity-60" : ""}`}>
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-mist">{n.message}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-mist/70">{fmtDate(n.createdAt)}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
