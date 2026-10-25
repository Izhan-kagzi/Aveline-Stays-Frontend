import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import { api } from "../lib/api";
import { fmtDate, money } from "../lib/format";
import { Empty, Modal, StatusBadge } from "../components/Ui";

const TABS = ["All", "Upcoming", "Past", "Cancelled"];

export default function MyBookings() {
  const [list, setList] = useState([]);
  const [cancels, setCancels] = useState({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [target, setTarget] = useState(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const bookings = await api("/bookings/mine");
      setList(bookings);
      const entries = await Promise.all(bookings.map((b) => api(`/cancellations/booking/${b.id}`, { auth: false }).then((c) => [b.id, c]).catch(() => [b.id, []])));
      setCancels(Object.fromEntries(entries));
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const today = new Date().toISOString().slice(0, 10);
  const shown = useMemo(() => list.filter((b) => {
    const t = q.trim().toLowerCase().replace(/^#/, "");
    if (t && !`${b.trackingNumber || ""} ${b.hotelName || ""}`.toLowerCase().includes(t)) return false;
    if (tab === "Cancelled") return b.status === "Cancelled";
    if (tab === "Upcoming") return b.status !== "Cancelled" && b.status !== "Completed" && (b.checkOut || "9999") >= today;
    if (tab === "Past") return b.status === "Completed" || (b.status !== "Cancelled" && (b.checkOut || "") < today);
    return true;
  }), [list, tab, q, today]);

  const pending = (b) => (cancels[b.id] || []).find((c) => c.status === "pending");
  const rejected = (b) => (cancels[b.id] || []).find((c) => c.status === "rejected");
  const canCancel = (b) => ["Pending", "Confirmed"].includes(b.status) && !pending(b);

  const submit = async () => {
    if (reason.trim().length < 5) return toast.error("Please tell us why you're cancelling.");
    setBusy(true);
    try {
      await api("/cancellations/request", { method: "POST", body: { bookingId: target.id, reason: reason.trim() } });
      toast.success("Cancellation request sent. We'll review it shortly.");
      setTarget(null); setReason(""); load();
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <div className="container-x py-14">
      <p className="eyebrow mb-3">Your trips</p><h1 className="h-display text-5xl sm:text-6xl">My bookings</h1>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">{TABS.map((t) => <button key={t} onClick={() => setTab(t)} className={`chip ${tab === t ? "chip-on" : ""}`}>{t}</button>)}</div>
        <div className="relative w-full sm:w-72"><FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" /><input className="field !pl-11" placeholder="Search by booking ID or stay" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      </div>
      <div className="mt-8 space-y-5">
        {loading ? [0, 1].map((i) => <div key={i} className="skeleton h-44 rounded-3xl" />)
          : shown.length === 0 ? <Empty title={list.length ? "Nothing here" : "No bookings yet"} text={list.length ? "Try a different filter." : "Your reservations will appear here."}>{!list.length && <Link to="/stays" className="btn-primary">Find a stay</Link>}</Empty>
          : shown.map((b) => (
            <article key={b.id} className="card flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3"><p className="font-display text-3xl">{b.hotelName || "Stay"}</p><StatusBadge status={b.status} /></div>
                <p className="text-sm text-mist">Ref <b className="text-ink">{b.trackingNumber || b.id}</b> · {b.roomType || "Room"} · {b.guests || 1} guest{(b.guests || 1) > 1 ? "s" : ""}</p>
                <p className="text-sm">{fmtDate(b.checkIn)} → {fmtDate(b.checkOut)}{b.nights ? ` · ${b.nights} night${b.nights > 1 ? "s" : ""}` : ""}</p>
                {pending(b) && <p className="pt-2 text-sm font-semibold text-amber-700">Cancellation requested — awaiting review</p>}
                {rejected(b) && b.status !== "Cancelled" && <p className="pt-2 text-sm font-semibold text-rose-700">Cancellation request declined{rejected(b).notes ? `: ${rejected(b).notes}` : ""}</p>}
              </div>
              <div className="flex items-center gap-6 md:flex-col md:items-end md:gap-3">
                <div className="text-right"><p className="text-2xl font-bold">{money(b.amount)}</p><p className="text-xs text-mist">{b.paymentStatus || "Paid"}</p></div>
                <div className="flex gap-2"><Link to={`/stays/${b.hotelId}`} className="btn-ghost !px-5 !py-2.5">View stay</Link>
                  {canCancel(b) && <button onClick={() => setTarget(b)} className="btn !border !border-rose-200 !px-5 !py-2.5 text-rose-700 hover:bg-rose-50">Request cancellation</button>}</div>
              </div>
            </article>
          ))}
      </div>
      <Modal open={!!target} onClose={() => setTarget(null)} title="Request cancellation">
        <p className="text-sm text-mist">Booking <b className="text-ink">{target?.trackingNumber}</b> at {target?.hotelName}. Our team reviews every request and will notify you of the outcome.</p>
        <label className="label mt-6">Reason</label>
        <textarea className="field min-h-28" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Tell us what changed…" />
        <div className="mt-6 flex justify-end gap-3"><button onClick={() => setTarget(null)} className="btn-ghost">Keep booking</button><button disabled={busy} onClick={submit} className="btn bg-rose-700 text-white hover:bg-rose-800">{busy ? "Sending…" : "Send request"}</button></div>
      </Modal>
    </div>
  );
}
