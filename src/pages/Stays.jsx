import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiSliders, FiX } from "react-icons/fi";
import HotelCard from "../components/HotelCard";
import { CardSkeleton, Empty } from "../components/Ui";
import { useStays } from "../context/StaysContext";

const SORTS = { featured: "Featured", rating: "Top rated", low: "Price: low to high", high: "Price: high to low" };

export default function Stays() {
  const { stays, loading } = useStays();
  const [sp, setSp] = useSearchParams();
  const [open, setOpen] = useState(false);

  const q = sp.get("q") || "";
  const city = sp.get("city") || "";
  const min = Number(sp.get("min") || 0);
  const max = Number(sp.get("max") || 0);
  const rating = Number(sp.get("rating") || 0);
  const sort = sp.get("sort") || "featured";
  const amenities = sp.getAll("amenity");
  const roomType = sp.get("room") || "";

  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }); };
  const toggleAmenity = (a) => { const n = new URLSearchParams(sp); const cur = n.getAll("amenity"); n.delete("amenity"); (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]).forEach((x) => n.append("amenity", x)); setSp(n, { replace: true }); };

  const cities = useMemo(() => [...new Set(stays.map((s) => s.city))].sort(), [stays]);
  const allAmenities = useMemo(() => [...new Set(stays.flatMap((s) => s.amenities || []))].sort(), [stays]);
  const allRooms = useMemo(() => [...new Set(stays.flatMap((s) => s.roomTypes || []))].sort(), [stays]);

  const results = useMemo(() => {
    let r = stays.filter((h) =>
      (!q || `${h.name} ${h.location} ${h.city}`.toLowerCase().includes(q.toLowerCase())) &&
      (!city || h.city === city) && (!min || h.price >= min) && (!max || h.price <= max) &&
      (!rating || h.rating >= rating) && (!roomType || h.roomTypes?.includes(roomType)) &&
      amenities.every((a) => h.amenities?.includes(a)));
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [stays, q, city, min, max, rating, sort, amenities.join("|"), roomType]);

  // carry dates/guests through to the details page
  const carry = ["checkIn", "checkOut", "guests"].filter((k) => sp.get(k)).map((k) => `${k}=${sp.get(k)}`).join("&");
  const activeCount = [q, city, min, max, rating, roomType].filter(Boolean).length + amenities.length;

  const Filters = (
    <div className="space-y-8">
      <div><label className="label">Destination</label>
        <select className="field" value={city} onChange={(e) => set("city", e.target.value)}><option value="">All destinations</option>{cities.map((c) => <option key={c}>{c}</option>)}</select></div>
      <div><label className="label">Price per night (₹)</label>
        <div className="flex gap-3"><input className="field" type="number" min="0" placeholder="Min" value={min || ""} onChange={(e) => set("min", e.target.value)} /><input className="field" type="number" min="0" placeholder="Max" value={max || ""} onChange={(e) => set("max", e.target.value)} /></div></div>
      <div><label className="label">Minimum rating</label>
        <div className="flex flex-wrap gap-2">{[0, 4, 4.5, 4.8].map((r) => <button key={r} onClick={() => set("rating", r || "")} className={`chip ${rating === r ? "chip-on" : ""}`}>{r ? `${r}+` : "Any"}</button>)}</div></div>
      {allRooms.length > 0 && <div><label className="label">Room type</label>
        <div className="flex flex-wrap gap-2"><button onClick={() => set("room", "")} className={`chip ${!roomType ? "chip-on" : ""}`}>Any</button>{allRooms.map((r) => <button key={r} onClick={() => set("room", r)} className={`chip ${roomType === r ? "chip-on" : ""}`}>{r}</button>)}</div></div>}
      <div><label className="label">Amenities</label>
        <div className="flex flex-wrap gap-2">{allAmenities.map((a) => <button key={a} onClick={() => toggleAmenity(a)} className={`chip ${amenities.includes(a) ? "chip-on" : ""}`}>{a}</button>)}</div></div>
      {activeCount > 0 && <button onClick={() => setSp({}, { replace: true })} className="text-sm font-semibold text-brass-dark underline">Clear all filters</button>}
    </div>
  );

  return (
    <div className="container-x py-14">
      <div className="mb-10"><p className="eyebrow mb-3">Stays</p><h1 className="h-display text-5xl sm:text-6xl">{city ? `Stays in ${city}` : "Find your stay"}</h1></div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1"><FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
          <input className="field !pl-11" placeholder="Search by name or location" value={q} onChange={(e) => set("q", e.target.value)} /></div>
        <select className="field !w-auto" value={sort} onChange={(e) => set("sort", e.target.value)}>{Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <button onClick={() => setOpen(true)} className="btn-ghost lg:hidden"><FiSliders /> Filters{activeCount > 0 && ` (${activeCount})`}</button>
      </div>
      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block"><div className="card sticky top-28 p-7">{Filters}</div></aside>
        <div>
          <p className="mb-6 text-sm text-mist">{loading ? "Loading…" : `${results.length} stay${results.length !== 1 ? "s" : ""}`}</p>
          {loading ? <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}</div>
            : results.length === 0 ? <Empty title="No stays match" text="Try widening your filters or searching another destination."><button onClick={() => setSp({}, { replace: true })} className="btn-primary">Reset filters</button></Empty>
            : <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">{results.map((h) => <HotelCard key={h.id} hotel={h} query={carry ? `?${carry}` : ""} />)}</div>}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-y-auto bg-ivory p-7" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between"><h3 className="h-display text-3xl">Filters</h3><button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-ink/5"><FiX /></button></div>
            {Filters}<button onClick={() => setOpen(false)} className="btn-primary mt-8 w-full">Show {results.length} stays</button>
          </div>
        </div>
      )}
    </div>
  );
}
