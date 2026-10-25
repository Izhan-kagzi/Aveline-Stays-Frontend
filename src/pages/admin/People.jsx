import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiDownload, FiPlus } from "react-icons/fi";
import { api, downloadCsv } from "../../lib/api";
import { fmtDate, money } from "../../lib/format";
import { Modal } from "../../components/Ui";
import { PageHead } from "./Dashboard";

export function Customers() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");
  const load = useCallback(() => api("/customers").then(setList).catch((e) => toast.error(e.message)), []);
  useEffect(() => { load(); }, [load]);
  const setStatus = async (c) => { try { await api(`/customers/${c.id}/status`, { method: "PATCH", body: { status: c.status === "active" ? "blocked" : "active" } }); toast.success("Customer updated"); load(); } catch (e) { toast.error(e.message); } };
  const shown = list.filter((c) => `${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHead title="Customers" sub={`${list.length} registered guests`} action={<button onClick={() => downloadCsv("/customers/export.csv", "aveline-customers.csv").catch((e) => toast.error(e.message))} className="btn-ghost"><FiDownload /> Export CSV</button>} />
      <input className="field mb-6 max-w-sm" placeholder="Search guests…" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="card overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-sand/60 text-xs uppercase tracking-wider text-mist"><tr><th className="px-6 py-4">Guest</th><th>Phone</th><th>Joined</th><th>Bookings</th><th>Spend</th><th>Status</th><th /></tr></thead>
        <tbody className="divide-y divide-ink/5">{shown.map((c) => (
          <tr key={c.id} className="hover:bg-sand/30"><td className="px-6 py-4"><p className="font-semibold">{c.name}</p><p className="text-xs text-mist">{c.email}</p></td><td className="text-mist">{c.phone || "—"}</td><td className="text-mist">{fmtDate(c.joined)}</td><td>{c.totalBookings || 0}</td><td className="font-semibold">{money(c.totalSpend)}</td>
            <td><span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${c.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-700"}`}>{c.status}</span></td>
            <td className="pr-6 text-right"><button onClick={() => setStatus(c)} className="text-xs font-semibold text-brass-dark hover:underline">{c.status === "active" ? "Block" : "Unblock"}</button></td></tr>))}
          {shown.length === 0 && <tr><td colSpan="7" className="py-16 text-center text-mist">No guests found.</td></tr>}</tbody></table></div>
    </div>
  );
}

export function Managers() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [logs, setLogs] = useState(null);
  const load = useCallback(() => api("/managers").then(setList).catch((e) => toast.error(e.message)), []);
  useEffect(() => { load(); }, [load]);
  const create = async (e) => { e.preventDefault(); try { await api("/managers", { method: "POST", body: f }); toast.success("Manager added"); setOpen(false); setF({ name: "", email: "", password: "" }); load(); } catch (err) { toast.error(err.message); } };
  const showLogs = async (m) => setLogs({ m, items: await api(`/managers/${m.id}/logs`).catch(() => []) });
  return (
    <div>
      <PageHead title="Managers" sub="People who can run day-to-day operations." action={<button onClick={() => setOpen(true)} className="btn-primary"><FiPlus /> Add manager</button>} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{list.map((m) => (
        <div key={m.id} className="card p-7"><div className="flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-full bg-forest font-display text-2xl text-ivory">{m.name[0]}</span><div><p className="font-semibold">{m.name}</p><p className="text-sm text-mist">{m.email}</p></div></div>
          <p className="mt-5 text-sm text-mist">{(m.loginLogs || []).length} login{(m.loginLogs || []).length !== 1 ? "s" : ""} recorded</p><button onClick={() => showLogs(m)} className="btn-ghost mt-4 w-full !py-2.5">View login history</button></div>))}
        {list.length === 0 && <p className="text-mist">No managers yet.</p>}</div>
      <Modal open={open} onClose={() => setOpen(false)} title="Add manager">
        <form onSubmit={create} className="space-y-4"><div><label className="label">Name</label><input required className="field" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div><div><label className="label">Email</label><input type="email" required className="field" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div><div><label className="label">Temporary password</label><input required minLength={6} className="field" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></div><button className="btn-primary w-full">Create manager</button></form>
      </Modal>
      <Modal open={!!logs} onClose={() => setLogs(null)} title={`${logs?.m.name} — logins`}>
        <div className="max-h-96 divide-y divide-ink/10 overflow-y-auto text-sm">{(logs?.items || []).slice().reverse().map((l) => <div key={l.id} className="flex justify-between py-3"><span>In: {fmtDate(l.loginAt, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span><span className="text-mist">Out: {l.logoutAt ? fmtDate(l.logoutAt, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}</span></div>)}{logs?.items?.length === 0 && <p className="py-8 text-center text-mist">No logins yet.</p>}</div>
      </Modal>
    </div>
  );
}

export function Logs() {
  const [list, setList] = useState([]);
  const [action, setAction] = useState("");
  useEffect(() => { api("/logs").then(setList).catch((e) => toast.error(e.message)); }, []);
  const actions = [...new Set(list.map((l) => l.action))];
  const shown = list.filter((l) => !action || l.action === action);
  return (
    <div>
      <PageHead title="Activity log" sub="Everything that happens across the platform." action={<button onClick={() => downloadCsv("/logs/export/csv", "aveline-activity.csv").catch((e) => toast.error(e.message))} className="btn-ghost"><FiDownload /> Export CSV</button>} />
      <select className="field mb-6 max-w-xs" value={action} onChange={(e) => setAction(e.target.value)}><option value="">All actions</option>{actions.map((a) => <option key={a}>{a}</option>)}</select>
      <div className="card divide-y divide-ink/5">{shown.slice(0, 150).map((l) => (
        <div key={l.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-sm"><div><p className="font-semibold capitalize">{l.action.replace(/_/g, " ")}</p><p className="text-xs text-mist">{l.bookingId ? `Booking ${l.bookingId.slice(0, 8)} · ` : ""}{l.details?.by || l.details?.email || l.userId}</p></div><p className="text-xs text-mist">{fmtDate(l.timestamp, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p></div>))}
        {shown.length === 0 && <p className="py-16 text-center text-mist">No activity yet.</p>}</div>
    </div>
  );
}

export function Requests() {
  const [list, setList] = useState([]);
  useEffect(() => { api("/collaborate").then(setList).catch((e) => toast.error(e.message)); }, []);
  return (
    <div>
      <PageHead title="Partner & contact requests" sub="Messages submitted through the website." />
      <div className="space-y-4">{[...list].reverse().map((r) => (
        <div key={r.id} className="card p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-semibold">{r.name} <span className="font-normal text-mist">· {r.email}</span></p><p className="text-xs text-mist">{r.type}{r.company ? ` · ${r.company}` : ""}</p></div><p className="text-xs text-mist">{fmtDate(r.submittedAt)}</p></div><p className="mt-4 text-sm leading-relaxed text-ink/80">{r.message}</p></div>))}
        {list.length === 0 && <div className="card py-20 text-center text-mist">No requests yet.</div>}</div>
    </div>
  );
}
