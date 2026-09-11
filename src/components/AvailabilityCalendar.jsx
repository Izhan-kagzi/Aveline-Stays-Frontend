import React, { useMemo, useState } from "react";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Deterministic mock availability/pricing so the same day always shows the same state.
function dayState(dateStr, basePrice) {
  const seed = dateStr.split("-").reduce((a, c) => a + parseInt(c, 10), 0);
  const blocked = seed % 11 === 0;
  const seasonal = seed % 5 === 0;
  const price = seasonal ? Math.round(basePrice * 1.25) : basePrice;
  return { blocked, seasonal, price };
}

export default function AvailabilityCalendar({ basePrice, onSelectRange }) {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [range, setRange] = useState({ start: null, end: null });

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ d, dateStr, ...dayState(dateStr, basePrice) });
    }
    return cells;
  }, [cursor, basePrice]);

  function pick(cell) {
    if (!cell || cell.blocked) return;
    if (!range.start || (range.start && range.end)) {
      const next = { start: cell.dateStr, end: null };
      setRange(next);
    } else {
      const end = cell.dateStr > range.start ? cell.dateStr : range.start;
      const start = cell.dateStr > range.start ? range.start : cell.dateStr;
      const next = { start, end };
      setRange(next);
      onSelectRange && onSelectRange(next);
    }
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} className="text-muted hover:text-ink">←</button>
        <p className="font-serif">{MONTH_NAMES[cursor.getMonth()]} {cursor.getFullYear()}</p>
        <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} className="text-muted hover:text-ink">→</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[0.65rem] text-muted mb-2">
        {["S","M","T","W","T","F","S"].map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((cell, i) => {
          if (!cell) return <span key={i} />;
          const inRange = range.start && cell.dateStr >= range.start && (range.end ? cell.dateStr <= range.end : cell.dateStr === range.start);
          return (
            <button
              key={i}
              disabled={cell.blocked}
              onClick={() => pick(cell)}
              className={`aspect-square rounded-sm text-[0.7rem] flex flex-col items-center justify-center ${
                cell.blocked
                  ? "bg-ink/5 text-ink/25 cursor-not-allowed line-through"
                  : inRange
                  ? "bg-teal text-white"
                  : cell.seasonal
                  ? "bg-gold/15 text-ink hover:bg-gold/30"
                  : "hover:bg-cream text-ink"
              }`}
            >
              <span>{cell.d}</span>
              {!cell.blocked && <span className="text-[0.55rem] opacity-80">₹{cell.price}</span>}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4 mt-4 text-[0.68rem] text-muted">
        <span><span className="inline-block w-3 h-3 bg-gold/25 rounded-sm mr-1 align-middle" />Seasonal pricing</span>
        <span><span className="inline-block w-3 h-3 bg-ink/10 rounded-sm mr-1 align-middle" />Unavailable</span>
      </div>
      {range.start && (
        <p className="text-sm mt-3">Selected: <strong>{range.start}</strong> → <strong>{range.end || "select checkout"}</strong></p>
      )}
    </div>
  );
}
