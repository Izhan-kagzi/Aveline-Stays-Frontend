import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { FiDollarSign, FiCalendar, FiUsers, FiHome, FiXCircle } from "react-icons/fi";
import { api } from "../../lib/api";
import { fmtDate, money } from "../../lib/format";
import { StatusBadge } from "../../components/Ui";
import { useStays } from "../../context/StaysContext";

const PIE = { Pending: "#D9A441", Confirmed: "#3B8F6B", "Checked-in": "#3B82B6", Completed: "#9CA3AF", Cancelled: "#C2504A" };
export const PageHead = ({ title, sub, action }) => (<div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h1 className="h-display text-4xl sm:text-5xl">{title}</h1>{sub && <p className="mt-2 text-mist">{sub}</p>}</div>{action}</div>);

export default function Dashboard() {
  const { stays } = useStays();
  const [rev, setRev] = useState({ total: 0, series: [] });
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cancels, setCancels] = useState([]);
  useEffect(() => {
    api("/revenue").then(setRev).catch(() => {});
    api("/bookings").then(setBookings).catch(() => {});
    api("/customers").then(setCustomers).catch(() => {});
    api("/cancellations").then(setCancels).catch(() => {});
  }, []);

  const pending = cancels.filter((c) => c.status === "pending").length;
  const statusData = useMemo(() => Object.keys(PIE).map((s) => ({ name: s, value: bookings.filter((b) => b.status === s).length })).filter((d) => d.value), [bookings]);
  const series = rev.series.map((s) => ({ ...s, label: new Date(s.month + "-01").toLocaleDateString("en-IN", { month: "short", year: "2-digit" }) }));

  const stats = [[FiDollarSign, "Total revenue", money(rev.total)], [FiCalendar, "Bookings", bookings.length], [FiUsers, "Customers", customers.length], [FiHome, "Stays", stays.length], [FiXCircle, "Pending cancellations", pending]];
  return (
    <div>
      <PageHead title="Overview" sub="A snapshot of how Aveline Stays is doing." />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">{stats.map(([Icon, l, v], i) => (
        <div key={l} className={`card p-6 ${i === 4 && pending ? "!border-rose-200" : ""}`}><span className="grid h-11 w-11 place-items-center rounded-2xl bg-brass/15 text-brass-dark"><Icon size={19} /></span><p className="mt-5 font-display text-4xl">{v}</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-mist">{l}</p></div>))}</div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="card p-7"><h2 className="font-display text-2xl">Revenue by month</h2>
          <div className="mt-6 h-72">{series.length ? <ResponsiveContainer><AreaChart data={series}><defs><linearGradient id="rv" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B38B4D" stopOpacity=".5" /><stop offset="100%" stopColor="#B38B4D" stopOpacity="0" /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#101A1710" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} /><YAxis tickLine={false} axisLine={false} fontSize={12} width={60} tickFormatter={(v) => `₹${v / 1000}k`} />
            <Tooltip formatter={(v) => money(v)} contentStyle={{ borderRadius: 14, border: "none", boxShadow: "0 10px 40px -12px rgba(16,26,23,.3)" }} /><Area type="monotone" dataKey="revenue" stroke="#8F6C37" strokeWidth={2.5} fill="url(#rv)" /></AreaChart></ResponsiveContainer>
            : <p className="grid h-full place-items-center text-mist">No revenue yet.</p>}</div></div>
        <div className="card p-7"><h2 className="font-display text-2xl">Booking status</h2>
          <div className="h-72">{statusData.length ? <ResponsiveContainer><PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>{statusData.map((d) => <Cell key={d.name} fill={PIE[d.name]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer> : <p className="grid h-full place-items-center text-mist">No bookings yet.</p>}</div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">{statusData.map((d) => <span key={d.name} className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ background: PIE[d.name] }} />{d.name} ({d.value})</span>)}</div></div>
      </div>
      <div className="card mt-6 p-7"><div className="mb-5 flex items-center justify-between"><h2 className="font-display text-2xl">Recent bookings</h2><Link to="/admin/bookings" className="text-sm font-semibold text-brass-dark hover:underline">View all</Link></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead className="text-xs uppercase tracking-wider text-mist"><tr><th className="pb-3">Ref</th><th>Guest</th><th>Stay</th><th>Date</th><th className="text-right">Amount</th><th className="text-right">Status</th></tr></thead>
          <tbody className="divide-y divide-ink/5">{bookings.slice(0, 6).map((b) => <tr key={b.id}><td className="py-3.5 font-semibold">{b.trackingNumber || b.id}</td><td>{b.customerName}</td><td className="text-mist">{b.hotelName}</td><td className="text-mist">{fmtDate(b.createdAt || b.checkIn)}</td><td className="text-right font-semibold">{money(b.amount)}</td><td className="text-right"><StatusBadge status={b.status} /></td></tr>)}
            {bookings.length === 0 && <tr><td colSpan="6" className="py-10 text-center text-mist">No bookings yet.</td></tr>}</tbody></table></div></div>
    </div>
  );
}
