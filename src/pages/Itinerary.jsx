import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiBookmark, FiTrash2, FiZap } from "react-icons/fi";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useStays } from "../context/StaysContext";
import { addDaysISO, fmtDate, todayISO } from "../lib/format";

const INTERESTS = ["Culture", "Food", "Nature", "Adventure", "Wellness", "Shopping", "Nightlife", "Photography"];
const STYLES = ["Relaxed", "Balanced", "Packed"];
const GROUPS = ["Solo", "Couple", "Family", "Friends"];

function Plan({ text }) {
  const lines = String(text || "").split("\n");
  return (
    <div className="space-y-2.5 text-[15px] leading-relaxed text-ink/85">
      {lines.map((l, i) => {
        const t = l.trim();
        if (!t) return <div key={i} className="h-2" />;
        if (/^#{1,3}\s/.test(t) || /^\*\*.+\*\*$/.test(t) || /^day\s*\d+/i.test(t))
          return <h4 key={i} className="pt-4 font-display text-2xl text-forest">{t.replace(/^#{1,3}\s/, "").replace(/\*\*/g, "")}</h4>;
        if (/^[-*•]\s/.test(t)) return <p key={i} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />{t.replace(/^[-*•]\s/, "").replace(/\*\*/g, "")}</p>;
        return <p key={i}>{t.replace(/\*\*/g, "")}</p>;
      })}
    </div>
  );
}

export default function Itinerary() {
  const { isCustomer } = useAuth();
  const { stays } = useStays();
  const [f, setF] = useState({ hotelId: "", checkIn: addDaysISO(todayISO(), 14), checkOut: addDaysISO(todayISO(), 17), interests: ["Culture", "Food"], budget: "", travelStyle: "Balanced", groupSize: "Couple" });
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(null);
  const [saved, setSaved] = useState([]);

  const load = useCallback(() => isCustomer && api("/itinerary").then(setSaved).catch(() => {}), [isCustomer]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (!f.hotelId && stays[0]) setF((p) => ({ ...p, hotelId: stays[0].id })); }, [stays, f.hotelId]);

  const toggle = (i) => setF((p) => ({ ...p, interests: p.interests.includes(i) ? p.interests.filter((x) => x !== i) : [...p.interests, i] }));
  const generate = async (e) => {
    e.preventDefault(); setBusy(true);
    try { const r = await api("/itinerary/generate", { method: "POST", body: { ...f, budget: f.budget || undefined } }); setActive(r); load(); toast.success("Your itinerary is ready"); }
    catch (err) { toast.error(err.message); } finally { setBusy(false); }
  };
  const remove = async (id) => { await api(`/itinerary/${id}`, { method: "DELETE" }).catch((e) => toast.error(e.message)); if (active?.id === id) setActive(null); load(); };
  const bookmark = async (it) => { const r = await api(`/itinerary/${it.id}`, { method: "PATCH", body: { bookmarked: !it.bookmarked } }).catch((e) => toast.error(e.message)); if (r) { if (active?.id === r.id) setActive(r); load(); } };

  return (
    <div className="container-x py-14">
      <p className="eyebrow mb-3">AI trip planner</p><h1 className="h-display text-5xl sm:text-7xl">Plan your stay, <span className="italic text-brass">effortlessly.</span></h1>
      <p className="mt-5 max-w-xl text-mist">Pick a stay, your dates and what you love. We'll build a day-by-day plan around it.</p>
      {!isCustomer ? (
        <div className="card mt-12 max-w-xl p-10 text-center"><h2 className="font-display text-3xl">Sign in to plan your trip</h2><p className="mt-3 text-mist">Itineraries are saved to your account so you can revisit them.</p><Link to="/login" state={{ from: "/itinerary" }} className="btn-primary mt-7">Sign in</Link></div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[420px_1fr]">
          <form onSubmit={generate} className="card h-fit space-y-6 p-8">
            <div><label className="label">Stay</label><select required className="field" value={f.hotelId} onChange={(e) => setF({ ...f, hotelId: e.target.value })}>{stays.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.city}</option>)}</select></div>
            <div className="grid grid-cols-2 gap-3"><div><label className="label">Check-in</label><input type="date" required className="field" value={f.checkIn} onChange={(e) => setF({ ...f, checkIn: e.target.value })} /></div><div><label className="label">Check-out</label><input type="date" required className="field" min={f.checkIn} value={f.checkOut} onChange={(e) => setF({ ...f, checkOut: e.target.value })} /></div></div>
            <div><label className="label">Interests</label><div className="flex flex-wrap gap-2">{INTERESTS.map((i) => <button type="button" key={i} onClick={() => toggle(i)} className={`chip ${f.interests.includes(i) ? "chip-on" : ""}`}>{i}</button>)}</div></div>
            <div className="grid grid-cols-2 gap-3"><div><label className="label">Pace</label><select className="field" value={f.travelStyle} onChange={(e) => setF({ ...f, travelStyle: e.target.value })}>{STYLES.map((s) => <option key={s}>{s}</option>)}</select></div><div><label className="label">Travelling as</label><select className="field" value={f.groupSize} onChange={(e) => setF({ ...f, groupSize: e.target.value })}>{GROUPS.map((s) => <option key={s}>{s}</option>)}</select></div></div>
            <div><label className="label">Daily budget (optional)</label><input className="field" placeholder="e.g. ₹5,000 per day" value={f.budget} onChange={(e) => setF({ ...f, budget: e.target.value })} /></div>
            <button disabled={busy || !f.hotelId} className="btn-primary w-full !py-4"><FiZap /> {busy ? "Planning your trip…" : "Generate itinerary"}</button>
          </form>
          <div className="space-y-8">
            <div className="card min-h-[24rem] p-8 sm:p-10">
              {busy ? <div className="space-y-4">{[80, 60, 90, 70, 85].map((w, i) => <div key={i} className="skeleton h-4 rounded" style={{ width: `${w}%` }} />)}</div>
                : active ? (<>
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-ink/10 pb-6"><div><p className="eyebrow">{active.hotelName}</p><h2 className="font-display text-4xl">{fmtDate(active.checkIn)} → {fmtDate(active.checkOut)}</h2></div>
                    <div className="flex gap-2"><button onClick={() => bookmark(active)} className={`btn-ghost !px-4 !py-2.5 ${active.bookmarked ? "!bg-brass !text-ink" : ""}`}><FiBookmark /> {active.bookmarked ? "Bookmarked" : "Bookmark"}</button><button onClick={() => remove(active.id)} className="btn-ghost !px-4 !py-2.5"><FiTrash2 /></button></div></div>
                  <Plan text={active.content} /></>)
                : <div className="grid h-full min-h-[20rem] place-items-center text-center text-mist"><div><FiZap className="mx-auto text-brass" size={32} /><p className="mt-4 font-display text-3xl text-ink">Your itinerary will appear here</p><p className="mt-1 text-sm">Fill in the details and hit generate.</p></div></div>}
            </div>
            {saved.length > 0 && <div><h3 className="mb-4 font-display text-3xl">Saved itineraries</h3><div className="grid gap-4 sm:grid-cols-2">{saved.map((it) => (
              <button key={it.id} onClick={() => { setActive(it); window.scrollTo({ top: 200, behavior: "smooth" }); }} className="card p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lift"><div className="flex items-center justify-between"><p className="font-semibold">{it.hotelName}</p>{it.bookmarked && <FiBookmark className="fill-brass text-brass" />}</div><p className="mt-1 text-xs text-mist">{fmtDate(it.checkIn)} → {fmtDate(it.checkOut)}</p></button>))}</div></div>}
          </div>
        </div>
      )}
    </div>
  );
}
