import { Link } from "react-router-dom";
export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brass text-ink">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 19 12 3l9 16h-4L12 11l-5 8z" /></svg>
      </span>
      <span className={`font-display text-2xl font-semibold tracking-tight ${light ? "text-ivory" : "text-ink"}`}>
        Aveline <span className="italic text-brass">Stays</span>
      </span>
    </Link>
  );
}
