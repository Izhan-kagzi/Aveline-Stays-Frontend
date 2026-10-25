// Real photo when the stay has one; otherwise a refined generated illustration so the
// site still looks premium before photos are uploaded from the admin panel.
const PALETTES = [
  ["#1C2E27", "#3B5547", "#D4B483"],
  ["#2A2433", "#5B4A6B", "#E3B7A0"],
  ["#14262E", "#2F5D66", "#E8CFA0"],
  ["#2E2318", "#6B4F34", "#E9C98F"],
  ["#1B2A3A", "#46688A", "#F1D6A6"],
  ["#2B2A1C", "#6E6B3D", "#EAD9A0"],
];
const hash = (s = "") => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export default function HotelArt({ hotel, src, label, className = "", rounded = "", showLabel = true }) {
  const image = src ?? hotel?.images?.[0];
  if (image) return <img src={image} alt={hotel?.name || label || ""} loading="lazy" className={`h-full w-full object-cover ${className}`} />;

  const key = hotel?.id || label || "x";
  const h = hash(key);
  const [a, b, c] = PALETTES[h % PALETTES.length];
  const sun = 20 + (h % 40);
  const text = hotel?.city || label || "";
  const gid = `g${h}`;
  return (
    <div className={`relative h-full w-full overflow-hidden ${rounded} ${className}`} style={{ background: `linear-gradient(160deg, ${a}, ${b})` }}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id={gid} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={c} stopOpacity=".95" /><stop offset="100%" stopColor={c} stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx={90 + (h % 220)} cy={sun + 40} r="90" fill={`url(#${gid})`} />
        <circle cx={90 + (h % 220)} cy={sun + 40} r="22" fill={c} opacity=".9" />
        <path d={`M0 ${200 - (h % 30)} Q 90 ${150 + (h % 30)} 180 ${195} T 400 ${170 + (h % 25)} V300 H0Z`} fill="#000" opacity=".18" />
        <path d={`M0 ${235} Q 120 ${190 + (h % 20)} 230 ${230} T 400 ${215} V300 H0Z`} fill="#000" opacity=".28" />
        <path d={`M0 ${268} Q 150 ${240} 260 ${266} T 400 ${255} V300 H0Z`} fill="#000" opacity=".4" />
      </svg>
      {text && showLabel && <span className="absolute bottom-3 left-4 font-display text-2xl italic text-white/80">{text}</span>}
      <div className="grain absolute inset-0" />
    </div>
  );
}
