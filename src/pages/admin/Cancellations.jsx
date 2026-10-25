import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiX } from "react-icons/fi";
import { api } from "../../lib/api";
import { fmtDate, money } from "../../lib/format";
import { Modal } from "../../components/Ui";
import { PageHead } from "./Dashboard";

const BADGE = { pending: "bg-amber-100 text-amber-800", approved: "bg-emerald-100 text-emerald-800", rejected: "bg-rose-100 text-rose-700" };

export default function Cancellations() {
  const [list, setList] = useState([]);
  const [bookings, setBookings] = useState({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pending");
  const [act, setAct] = useState(null);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [c, b] = await Promise.all([api("/cancellations"), api("/bookings")]);
      setList([...c].sort((x, y) => new Date(y.requestedAt) - new Date(x.requestedAt)));
      setBookings(Object.fromEntries(b.map((x) => [x.id, x])));
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const submit = async () => {
    setBusy(true);
    try { await api(`/cancellations/${act.c.id}/${act.type}`, { method: "PATCH", body: { notes } }); toast.success(act.type === "approve" ? "Cancellation approved" : "Request declined"); setAct(null); setNotes(""); load(); }
    catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };
  const shown = list.filter((c) => tab === "all" || c.status === tab);

  return (
    <div>
      <PageHead title="Cancellations" sub="Review guest cancellation requests." />
      <div className="mb-6 flex flex-wrap gap-2">{["pending", "approved", "rejected", "all"].map((t) => <button key={t} onClick={() => setTab(t)} className={`chip capitalize ${tab === t ? "chip-on" : ""}`}>{t}{t === "pending" && ` (${list.filter((c) => c.status === "pending").length})`}</button>)}</div>
      <div className="space-y-4">
        {loading ? [0, 1].map((i) => <div key={i} className="skeleton h-36 rounded-3xl" />) : shown.length === 0 ? <div className="card py-20 text-center text-mist">Nothing here.</div>
          : shown.map((c) => { const b = bookings[c.bookingId]; return (
            <div key={c.id} className="card flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-3"><p className="font-display text-2xl">{b?.hotelName || "Booking"}</p><span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${BADGE[c.status]}`}>{c.status}</span></div>
                <p className="text-sm text-mist">{b?.trackingNumber || c.bookingId} · {b?.customerName || "Guest"} · {b ? `${fmtDate(b.checkIn)} → ${fmtDate(b.checkOut)} · ${money(b.amount)}` : ""}</p>
                <p className="rounded-xl bg-sand/60 px-4 py-3 text-sm"><b>Reason:</b> {c.reason}</p>
                {c.notes && <p className="text-sm text-mist"><b>Staff note:</b> {c.notes}</p>}
                <p className="text-xs text-mist">Requested {fmtDate(c.requestedAt)}</p>
              </div>
              {c.status === "pending" && <div className="flex shrink-0 gap-3"><button onClick={() => setAct({ c, type: "reject" })} className="btn-ghost"><FiX /> Decline</button><button onClick={() => setAct({ c, type: "approve" })} className="btn-primary"><FiCheck /> Approve</button></div>}
            </div>); })}
      </div>
      <Modal open={!!act} onClose={() => setAct(null)} title={act?.type === "approve" ? "Approve cancellation" : "Decline request"}>
        <p className="text-sm text-mist">{act?.type === "approve" ? "The booking will be cancelled and paid bookings marked refunded. The guest is notified." : "The booking stays active. The guest is notified with your note."}</p>
        <label className="label mt-6">Note to guest (optional)</label><textarea className="field min-h-24" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <div className="mt-6 flex justify-end gap-3"><button onClick={() => setAct(null)} className="btn-ghost">Back</button><button disabled={busy} onClick={submit} className="btn-primary">{busy ? "Saving…" : "Confirm"}</button></div>
      </Modal>
    </div>
  );
}
