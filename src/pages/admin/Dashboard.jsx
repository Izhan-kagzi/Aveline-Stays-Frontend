import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FiArrowRight } from "react-icons/fi";
import { api } from "../../lib/api";
import { fmtDate, money } from "../../lib/format";
import { StatusBadge } from "../../components/Ui";
import { useStays } from "../../context/StaysContext";
import { useAuth } from "../../context/AuthContext";
import { asList, byNewest, EmptyState, ErrorNote, moneyShort, PageHead, Panel } from "./AdminUi";

export { PageHead }; // kept so older imports from "./Dashboard" keep working

const STATUS_COLORS = { Pending: "#D9A441", Confirmed: "#3B8F6B", "Checked-in": "#3B82B6", Completed: "#9CA3AF", Cancelled: "#C2504A" };
const greeting = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; };
const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

function StatStrip({ stats, loading }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl bg-white/10 shadow-lift sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((s, i) => (
        <Link key={s.label} to={s.to}
          className={`group flex min-h-[168px] flex-col justify-between bg-forest-800 p-6 text-ivory transition hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brass-light ${i === stats.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
          <p className="text-sm text-ivory/60">{s.label}</p>
          {loading ? <span className="skeleton h-10 w-24 rounded !bg-white/10" /> : <p className={`font-display text-5xl leading-none tabular-nums ${s.alert ? "text-brass-light" : ""}`}>{s.value}</p>}
          <p className="flex items-center justify-between gap-2 text-xs text-ivory/50">
            <span className="truncate">{loading ? "Loading…" : s.hint}</span>
            <FiArrowRight className="shrink-0 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
          </p>
        </Link>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { stays } = useStays();
  const { user } = useAuth();
  const [data, setData] = useState({ rev: null, bookings: null, customers: null, cancels: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    const res = await Promise.allSettled([api("/revenue"), api("/bookings"), api("/customers"), api("/cancellations")]);
    const ok = (i) => (res[i].status === "fulfilled" ? res[i].value : null);
    const rev = ok(0);
    setData({
      rev: rev ? { total: Number(rev.total) || 0, series: asList(rev.series) } : null,
      bookings: Array.isArray(ok(1)) ? ok(1) : null,
      customers: Array.isArray(ok(2)) ? ok(2) : null,
      cancels: Array.isArray(ok(3)) ? ok(3) : null,
    });
    if (res.every((r) => r.status === "rejected")) setError(res[0].reason?.message || "Couldn't load the dashboard.");
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const { rev, bookings, customers, cancels } = data;
  const staysList = asList(stays);
  const pendingCancels = cancels ? cancels.filter((c) => c.status === "pending").length : 0;
  const pendingBookings = bookings ? bookings.filter((b) => b.status === "Pending").length : 0;

  const series = useMemo(() => asList(rev?.series).map((s) => ({ ...s, label: new Date(`${s.month}-01`).toLocaleDateString("en-IN", { month: "short", year: "2-digit" }) })), [rev]);
  const delta = useMemo(() => {
    if (series.length < 2) return null;
    const last = Number(series.at(-1).revenue) || 0, prev = Number(series.at(-2).revenue) || 0;
    return prev > 0 ? Math.round(((last - prev) / prev) * 100) : null;
  }, [series]);

  const statusData = useMemo(() => Object.keys(STATUS_COLORS).map((s) => ({ name: s, value: (bookings || []).filter((b) => b.status === s).length })).filter((d) => d.value), [bookings]);
  const statusTotal = statusData.reduce((a, d) => a + d.value, 0);
  const recent = useMemo(() => [...(bookings || [])].sort(byNewest("createdAt")).slice(0, 6), [bookings]);

  const avgPrice = staysList.length ? Math.round(staysList.reduce((a, h) => a + Number(h.price || 0), 0) / staysList.length) : 0;
  const blocked = customers ? customers.filter((c) => c.status === "blocked").length : 0;
  const dash = "—";

  const stats = [
    { label: "Total revenue", to: "/admin/bookings", value: rev ? moneyShort(rev.total) : dash, hint: delta == null ? "Across all bookings" : `${delta >= 0 ? "Up" : "Down"} ${Math.abs(delta)}% on last month` },
    { label: "Bookings", to: "/admin/bookings", value: bookings ? bookings.length : dash, hint: bookings ? `${pendingBookings} waiting for confirmation` : "Not available" },
    { label: "Customers", to: "/admin/customers", value: customers ? customers.length : dash, hint: customers ? (blocked ? `${blocked} blocked` : "All accounts active") : "Not available" },
    { label: "Stays", to: "/admin/stays", value: staysList.length, hint: staysList.length ? `Average ${money(avgPrice)} a night` : "Add your first stay" },
    { label: "Cancellation requests", to: "/admin/cancellations", value: cancels ? pendingCancels : dash, hint: !cancels ? "Not available" : pendingCancels ? "Waiting for your decision" : "Nothing waiting", alert: pendingCancels > 0 },
  ];

  const attention = [
    pendingCancels > 0 && { to: "/admin/cancellations", text: `${plural(pendingCancels, "cancellation request")} to review` },
    pendingBookings > 0 && { to: "/admin/bookings", text: `${plural(pendingBookings, "booking")} waiting for confirmation` },
  ].filter(Boolean);

  return (
    <div>
      <PageHead title={`${greeting()}, ${user?.name?.split(" ")[0] || "there"}`} sub={new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} />
      {error && <ErrorNote message={error} onRetry={load} />}
      <StatStrip stats={stats} loading={loading} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Panel title="Revenue by month">
          <div className="h-72">
            {series.length ? (
              <ResponsiveContainer>
                <AreaChart data={series} margin={{ left: 0, right: 8, top: 8 }}>
                  <defs><linearGradient id="rv" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B38B4D" stopOpacity=".45" /><stop offset="100%" stopColor="#B38B4D" stopOpacity="0" /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#101A1712" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} width={64} tickFormatter={moneyShort} />
                  <Tooltip formatter={(v) => [money(v), "Revenue"]} contentStyle={{ borderRadius: 14, border: "none", boxShadow: "0 10px 40px -12px rgba(16,26,23,.3)" }} />
                  <Area type="monotone" dataKey="revenue" stroke="#8F6C37" strokeWidth={2.5} fill="url(#rv)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : <p className="grid h-full place-items-center text-mist">{loading ? "Loading…" : "No revenue yet."}</p>}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="Booking status">
            {statusTotal ? (
              <>
                <div className="flex h-3 overflow-hidden rounded-full bg-sand" role="img" aria-label="Bookings by status">
                  {statusData.map((d) => <div key={d.name} title={`${d.name}: ${d.value}`} style={{ width: `${(d.value / statusTotal) * 100}%`, background: STATUS_COLORS[d.name] }} />)}
                </div>
                <ul className="mt-5 space-y-3 text-sm">
                  {statusData.map((d) => (
                    <li key={d.name} className="flex items-center gap-3"><i className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLORS[d.name] }} /><span className="flex-1">{d.name}</span><span className="font-semibold tabular-nums">{d.value}</span><span className="w-10 text-right text-xs text-mist tabular-nums">{Math.round((d.value / statusTotal) * 100)}%</span></li>
                  ))}
                </ul>
              </>
            ) : <p className="py-8 text-center text-mist">{loading ? "Loading…" : "No bookings yet."}</p>}
          </Panel>

          <Panel title="Waiting on you">
            {attention.length ? (
              <ul className="-my-2 divide-y divide-ink/5">
                {attention.map((a) => <li key={a.to}><Link to={a.to} className="flex items-center justify-between gap-3 py-3 text-sm font-semibold hover:text-brass-dark">{a.text}<FiArrowRight className="shrink-0" /></Link></li>)}
              </ul>
            ) : <p className="text-sm text-mist">{loading ? "Loading…" : "You're all caught up."}</p>}
          </Panel>
        </div>
      </div>

      <Panel className="mt-6" pad={false} title="Recent bookings" action={<Link to="/admin/bookings" className="text-sm font-semibold text-brass-dark hover:underline">View all bookings</Link>}>
        <div className="overflow-x-auto px-6 pb-4 sm:px-7">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs text-mist"><tr><th className="pb-3 font-semibold">Booking</th><th className="font-semibold">Guest</th><th className="font-semibold">Stay</th><th className="font-semibold">Booked on</th><th className="text-right font-semibold">Amount</th><th className="text-right font-semibold">Status</th></tr></thead>
            <tbody className="divide-y divide-ink/5">
              {recent.map((b) => (
                <tr key={b.id}><td className="py-3.5 font-semibold">{b.trackingNumber || b.id}</td><td>{b.customerName}</td><td className="text-mist">{b.hotelName}</td><td className="text-mist">{fmtDate(b.createdAt || b.checkIn)}</td><td className="text-right font-semibold tabular-nums">{money(b.amount)}</td><td className="text-right"><StatusBadge status={b.status} /></td></tr>
              ))}
            </tbody>
          </table>
          {recent.length === 0 && <EmptyState title={loading ? "Loading bookings…" : "No bookings yet"} text={loading ? "" : "New bookings from guests will show up here."} />}
        </div>
      </Panel>
    </div>
  );
}
