import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export const PageHead = ({ title, sub, action }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div className="min-w-0">
      <h1 className="h-display text-4xl sm:text-5xl">{title}</h1>
      {sub && <p className="mt-2 max-w-xl text-mist">{sub}</p>}
    </div>
    {action}
  </div>
);

export const Panel = ({ title, action, children, className = "", pad = true }) => (
  <section className={`card ${pad ? "p-6 sm:p-7" : ""} ${className}`}>
    {(title || action) && (
      <div className={`flex items-center justify-between gap-3 ${pad ? "mb-5" : "px-6 pt-6 pb-4 sm:px-7"}`}>
        {title && <h2 className="font-display text-2xl">{title}</h2>}
        {action}
      </div>
    )}
    {children}
  </section>
);

const TONES = {
  amber: "bg-amber-100 text-amber-800",
  green: "bg-emerald-100 text-emerald-800",
  rose: "bg-rose-100 text-rose-700",
  stone: "bg-stone-200 text-stone-700",
  sky: "bg-sky-100 text-sky-800",
};
export const Pill = ({ tone = "stone", children }) => (
  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${TONES[tone] || TONES.stone}`}>{children}</span>
);

export const ErrorNote = ({ message, onRetry }) => (
  <div role="alert" className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800">
    <FiAlertCircle className="shrink-0" size={18} />
    <p className="min-w-0 flex-1">{message || "Something went wrong while loading this page."}</p>
    {onRetry && <button onClick={onRetry} className="inline-flex items-center gap-2 font-semibold underline-offset-2 hover:underline"><FiRefreshCw size={14} /> Try again</button>}
  </div>
);

export const EmptyState = ({ title, text }) => (
  <div className="px-6 py-16 text-center">
    <p className="font-display text-2xl">{title}</p>
    {text && <p className="mx-auto mt-2 max-w-sm text-sm text-mist">{text}</p>}
  </div>
);

export const Avatar = ({ name = "", size = 40, dark = false }) => (
  <span style={{ width: size, height: size }} className={`grid shrink-0 place-items-center rounded-full font-display ${dark ? "bg-brass text-ink" : "bg-forest text-ivory"}`}>
    <span style={{ fontSize: size * 0.45 }}>{(name || "?").trim()[0]?.toUpperCase()}</span>
  </span>
);

export const asList = (v) => (Array.isArray(v) ? v : []);
export const byNewest = (key) => (a, b) => new Date(b[key] || 0) - new Date(a[key] || 0);
export const moneyShort = (n) => {
  const v = Number(n || 0);
  if (Math.abs(v) < 100000) return "₹" + v.toLocaleString("en-IN");
  return "₹" + new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(v);
};
