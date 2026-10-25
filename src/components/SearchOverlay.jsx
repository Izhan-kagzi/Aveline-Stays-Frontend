import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiClock, FiMapPin, FiX } from "react-icons/fi";
import { useStays } from "../context/StaysContext";
import HotelArt from "./HotelArt";
import { money } from "../lib/format";

const KEY = "aveline_recent";

export default function SearchOverlay({ open, onClose }) {
  const { stays } = useStays();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const ref = useRef(null);
  const recent = useMemo(() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }, [open]);

  useEffect(() => { if (open) { setQ(""); setTimeout(() => ref.current?.focus(), 50); } }, [open]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const term = q.trim().toLowerCase();
  const results = term
    ? stays.filter((h) => `${h.name} ${h.city} ${h.location} ${(h.amenities || []).join(" ")}`.toLowerCase().includes(term)).slice(0, 6)
    : [];

  const remember = (value) => {
    const next = [value, ...recent.filter((r) => r !== value)].slice(0, 5);
    localStorage.setItem(KEY, JSON.stringify(next));
  };
  const go = (path, value) => { if (value) remember(value); onClose(); nav(path); };
  const submit = (e) => { e.preventDefault(); if (term) go(`/stays?q=${encodeURIComponent(q.trim())}`, q.trim()); };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] bg-ink/70 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-auto mt-[10vh] w-[92%] max-w-2xl overflow-hidden rounded-3xl bg-ivory shadow-lift" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={submit} className="flex items-center gap-3 border-b border-ink/10 px-6 py-5">
          <FiSearch className="text-brass" size={20} />
          <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a stay, city or amenity…"
            className="w-full bg-transparent text-lg outline-none placeholder:text-mist/60" />
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-mist hover:bg-ink/5"><FiX /></button>
        </form>
        <div className="max-h-[55vh] overflow-y-auto p-3">
          {!term && recent.length > 0 && (
            <div className="p-3">
              <p className="eyebrow mb-3">Recent</p>
              {recent.map((r) => (
                <button key={r} onClick={() => go(`/stays?q=${encodeURIComponent(r)}`, r)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-sand">
                  <FiClock className="text-mist" /> {r}
                </button>
              ))}
            </div>
          )}
          {!term && recent.length === 0 && (
            <div className="p-3">
              <p className="eyebrow mb-3">Popular destinations</p>
              <div className="flex flex-wrap gap-2">
                {[...new Set(stays.map((s) => s.city))].slice(0, 8).map((c) => (
                  <button key={c} onClick={() => go(`/stays?city=${encodeURIComponent(c)}`, c)} className="chip"><FiMapPin className="mr-1.5" size={12} />{c}</button>
                ))}
              </div>
            </div>
          )}
          {term && results.length === 0 && <p className="p-8 text-center text-mist">No stays match “{q}”.</p>}
          {results.map((h) => (
            <button key={h.id} onClick={() => go(`/stays/${h.id}`, h.name)} className="flex w-full items-center gap-4 rounded-2xl p-3 text-left hover:bg-sand">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl"><HotelArt hotel={h} /></div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{h.name}</p>
                <p className="truncate text-xs text-mist">{h.location}</p>
              </div>
              <p className="text-sm font-bold">{money(h.price)}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
