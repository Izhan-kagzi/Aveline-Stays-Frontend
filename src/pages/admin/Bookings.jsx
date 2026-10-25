import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiChevronUp, FiSearch, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { api } from "../../lib/api";
import { BOOKING_STATUSES, fmtDate, money, STATUS_STYLES } from "../../lib/format";
import { PageHead } from "./Dashboard";

export default function Bookings() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);
  const [busy, setBusy] = useState(null);

  useEffect(() => { api("/bookings").then(setList).catch((e) => toast.error(e.message)).finally(() => setLoading(false)); }, []);

  const term = q.trim().replace(/^#/, "").toLowerCase();
  const shown = useMemo(() => list.filter((b) =>
    (filter === "All" || b.status === filter) &&
    (!term || [b.id, b.trackingNumber, b.customerName, b.customerEmail, b.hotelName].filter(Boolean).join(" ").toLowerCase().includes(term))), [list, term, filter]);

  const change = async (b, status) => {
    if (status === b.status) return;
    if (status === "Cancelled" && !window.confirm(`Cancel booking ${b.trackingNumber || b.id}? This can't be undone.`)) return;
    setBusy(b.id);
    try {
      const updated = await api(`/bookings/${b.id}/status`, { method: "PATCH", body: { status } });
      setList((p) => p.map((x) => (x.id === b.id ? { ...x, ...updated } : x)));
      toast.success(`Booking marked ${status}`);
    } catch (e) { toast.error(e.message); } finally { setBusy(null); }
  };

  return (
    <div>
      <PageHead title="Bookings" sub={`${list.length} booking${list.length !== 1 ? "s" : ""} across all stays`} />
      <div className="mb-6 space-y-4">
        <div className="relative max-w-md"><FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
          <input className="field !pl-11 !pr-10" placeholder="Search booking ID, guest or stay (e.g. AV-2026-123456)" value={q} onChange={(e) => setQ(e.target.value)} />
          {q && <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-mist" aria-label="Clear"><FiX /></button>}</div>
        <div className="flex flex-wrap gap-2">{["All", ...BOOKING_STATUSES].map((s) => <button key={s} onClick={() => setFilter(s)} className={`chip ${filter === s ? "chip-on" : ""}`}>{s}</button>)}</div>
      </div>
      <div className="card overflow-hidden">
        {loading ? <div className="space-y-px">{[0, 1, 2, 3].map((i) => <div key={i} className="skeleton h-20" />)}</div>
          : shown.length === 0 ? <p className="py-24 text-center text-mist">{list.length ? "No bookings match your search." : "No bookings yet."}</p>
          : <div className="divide-y divide-ink/5">{shown.map((b) => {
            const isOpen = open === b.id;
            return (
              <div key={b.id}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-6 py-5 transition hover:bg-sand/40">
                  <button onClick={() => setOpen(isOpen ? null : b.id)} className="flex min-w-0 flex-1 flex-wrap items-center gap-x-8 gap-y-2 text-left">
                    <div className="min-w-[130px]"><p className="text-[11px] uppercase tracking-wider text-mist">Booking</p><p className="font-semibold">{b.trackingNumber || b.id}</p></div>
                    <div className="min-w-[150px]"><p className="text-[11px] uppercase tracking-wider text-mist">Guest</p><p className="font-semibold">{b.customerName}</p></div>
                    <div className="min-w-[150px]"><p className="text-[11px] uppercase tracking-wider text-mist">Stay</p><p>{b.hotelName}</p></div>
                    <div className="min-w-[120px]"><p className="text-[11px] uppercase tracking-wider text-mist">Total</p><p className="font-bold text-brass-dark">{money(b.amount)}</p></div>
                    {isOpen ? <FiChevronUp className="text-mist" /> : <FiChevronDown className="text-mist" />}
                  </button>
                  <select value={b.status} disabled={busy === b.id || b.status === "Cancelled"} onChange={(e) => change(b, e.target.value)} aria-label="Update status"
                    className={`rounded-xl border-0 px-4 py-2.5 text-sm font-semibold outline-none ring-1 ring-ink/10 focus:ring-brass disabled:opacity-60 ${STATUS_STYLES[b.status] || ""}`}>
                    {BOOKING_STATUSES.map((s) => <option key={s} value={s} className="bg-white text-ink">{s}</option>)}
                  </select>
                </div>
                {isOpen && (
                  <div className="grid gap-6 bg-sand/40 px-6 py-6 text-sm sm:grid-cols-3">
                    <div><p className="eyebrow mb-2">Guest</p><p className="font-semibold">{b.customerName}</p><p className="text-mist">{b.customerEmail}</p><p className="mt-1 text-mist">{b.guests || 1} guest{(b.guests || 1) > 1 ? "s" : ""} · {b.roomType || "Room"}</p></div>
                    <div><p className="eyebrow mb-2">Stay dates</p><p className="font-semibold">{fmtDate(b.checkIn)} → {fmtDate(b.checkOut)}</p>{b.nights && <p className="text-mist">{b.nights} night{b.nights > 1 ? "s" : ""}</p>}<p className="mt-1 text-mist">Booked {fmtDate(b.createdAt)}</p></div>
                    <div><p className="eyebrow mb-2">Payment</p><p className="font-semibold">{b.paymentStatus}</p><p className="text-mist">{b.paymentMethod === "pay_at_hotel" ? "Pay at hotel" : "Card (Stripe)"}</p>{b.tax != null && <p className="mt-1 text-mist">Subtotal {money(b.subtotal)} + tax {money(b.tax)}</p>}</div>
                  </div>)}
              </div>);
          })}</div>}
      </div>
    </div>
  );
}
