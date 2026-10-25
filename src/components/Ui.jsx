import { FiStar } from "react-icons/fi";
import { STATUS_STYLES } from "../lib/format";

export const Rating = ({ value, className = "" }) => (
  <span className={`inline-flex items-center gap-1 text-sm font-semibold ${className}`}>
    <FiStar className="fill-brass text-brass" size={14} /> {Number(value || 0).toFixed(1)}
  </span>
);

export const StatusBadge = ({ status }) => (
  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status] || "bg-stone-100 text-stone-600"}`}>{status}</span>
);

export const SectionHead = ({ eyebrow, title, sub, align = "left", light = false, action }) => (
  <div className={`mb-10 flex flex-wrap items-end justify-between gap-6 ${align === "center" ? "justify-center text-center" : ""}`}>
    <div className={align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={`h-display text-4xl sm:text-5xl ${light ? "text-ivory" : "text-ink"}`}>{title}</h2>
      {sub && <p className={`mt-4 text-base leading-relaxed ${light ? "text-ivory/70" : "text-mist"}`}>{sub}</p>}
    </div>
    {action}
  </div>
);

export const CardSkeleton = () => (
  <div className="space-y-4"><div className="skeleton aspect-[4/5] rounded-3xl" /><div className="skeleton h-4 w-2/3 rounded" /><div className="skeleton h-4 w-1/3 rounded" /></div>
);

export const Empty = ({ title, text, children }) => (
  <div className="card mx-auto max-w-xl px-8 py-16 text-center">
    <h3 className="h-display text-3xl">{title}</h3>
    {text && <p className="mt-3 text-mist">{text}</p>}
    {children && <div className="mt-6 flex justify-center gap-3">{children}</div>}
  </div>
);

export const Modal = ({ open, onClose, title, children, wide }) => !open ? null : (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm" onClick={onClose}>
    <div className={`max-h-[90vh] w-full overflow-y-auto rounded-3xl bg-ivory p-7 shadow-lift ${wide ? "max-w-3xl" : "max-w-lg"}`} onClick={(e) => e.stopPropagation()}>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="h-display text-3xl">{title}</h3>
        <button onClick={onClose} className="rounded-full p-2 text-mist hover:bg-ink/5" aria-label="Close">✕</button>
      </div>
      {children}
    </div>
  </div>
);
