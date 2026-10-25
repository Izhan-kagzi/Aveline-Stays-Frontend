import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { useCompare } from "../context/CompareContext";
import { useStays } from "../context/StaysContext";
import HotelArt from "./HotelArt";

export default function CompareBar() {
  const { items, remove, clear } = useCompare();
  const { stays } = useStays();
  const picked = items.map((i) => stays.find((s) => s.id === i.id)).filter(Boolean);
  if (picked.length === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-5 z-40 px-4">
      <div className="mx-auto flex max-w-2xl items-center gap-4 rounded-full bg-forest p-2.5 pl-4 text-ivory shadow-lift">
        <div className="flex -space-x-2">
          {picked.map((h) => (
            <div key={h.id} className="group relative h-11 w-11 overflow-hidden rounded-full border-2 border-forest">
              <HotelArt hotel={h} />
              <button onClick={() => remove(h.id)} aria-label={`Remove ${h.name}`} className="absolute inset-0 grid place-items-center bg-ink/70 opacity-0 transition group-hover:opacity-100"><FiX /></button>
            </div>
          ))}
        </div>
        <p className="flex-1 text-sm font-semibold">{picked.length} stay{picked.length > 1 ? "s" : ""} selected</p>
        <button onClick={clear} className="text-xs text-ivory/60 hover:text-white">Clear</button>
        <Link to="/compare" className="btn-brass !py-2.5">Compare</Link>
      </div>
    </div>
  );
}
