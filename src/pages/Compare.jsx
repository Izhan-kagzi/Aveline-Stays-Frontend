import { Link } from "react-router-dom";
import { FiCheck, FiMinus, FiX } from "react-icons/fi";
import HotelArt from "../components/HotelArt";
import { Empty, Rating } from "../components/Ui";
import { useCompare } from "../context/CompareContext";
import { useStays } from "../context/StaysContext";
import { money } from "../lib/format";

export default function Compare() {
  const { items, remove, clear } = useCompare();
  const { stays } = useStays();
  const picked = items.map((i) => stays.find((s) => s.id === i.id)).filter(Boolean);
  if (picked.length === 0) return <div className="container-x py-24"><Empty title="Nothing to compare" text="Add up to three stays from the listings."><Link to="/stays" className="btn-primary">Browse stays</Link></Empty></div>;

  const amenities = [...new Set(picked.flatMap((h) => h.amenities || []))].sort();
  const cheapest = Math.min(...picked.map((h) => h.price));
  const best = Math.max(...picked.map((h) => h.rating));
  const cols = { gridTemplateColumns: `180px repeat(${picked.length}, minmax(200px, 1fr))` };
  const Row = ({ label, children }) => (<div className="grid items-center border-t border-ink/10" style={cols}><div className="py-5 pr-4 text-xs font-bold uppercase tracking-[0.18em] text-mist">{label}</div>{children}</div>);

  return (
    <div className="container-x py-14">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow mb-3">Side by side</p><h1 className="h-display text-5xl sm:text-6xl">Compare stays</h1></div><button onClick={clear} className="btn-ghost">Clear all</button></div>
      <div className="card mt-10 overflow-x-auto p-6 sm:p-8"><div className="min-w-[640px]">
        <div className="grid pb-6" style={cols}><div />{picked.map((h) => (
          <div key={h.id} className="relative pr-5"><button onClick={() => remove(h.id)} className="absolute right-7 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow" aria-label="Remove"><FiX /></button>
            <Link to={`/stays/${h.id}`}><div className="aspect-[4/3] overflow-hidden rounded-2xl"><HotelArt hotel={h} /></div><h3 className="mt-4 font-display text-2xl leading-tight">{h.name}</h3></Link></div>))}</div>
        <Row label="City">{picked.map((h) => <p key={h.id} className="py-5 pr-5 text-sm font-medium">{h.city}</p>)}</Row>
        <Row label="Price / night">{picked.map((h) => <p key={h.id} className="py-5 pr-5 text-lg font-bold">{money(h.price)} {h.price === cheapest && picked.length > 1 && <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800">Lowest</span>}</p>)}</Row>
        <Row label="Rating">{picked.map((h) => <div key={h.id} className="py-5 pr-5"><Rating value={h.rating} />{h.rating === best && picked.length > 1 && <span className="ml-2 rounded-full bg-brass/20 px-2 py-0.5 text-[10px] font-bold uppercase text-brass-dark">Best</span>}</div>)}</Row>
        <Row label="Rooms">{picked.map((h) => <p key={h.id} className="py-5 pr-5 text-sm">{(h.roomTypes || []).join(", ") || "—"}</p>)}</Row>
        {amenities.map((a) => <Row key={a} label={a}>{picked.map((h) => <div key={h.id} className="py-4">{h.amenities?.includes(a) ? <FiCheck className="text-emerald-600" /> : <FiMinus className="text-ink/25" />}</div>)}</Row>)}
        <Row label="">{picked.map((h) => <div key={h.id} className="py-6 pr-5"><Link to={`/stays/${h.id}`} className="btn-primary w-full">View stay</Link></div>)}</Row>
      </div></div>
    </div>
  );
}
