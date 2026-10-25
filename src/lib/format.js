export const money = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
export const fmtDate = (d, opts = { day: "numeric", month: "short", year: "numeric" }) =>
  d ? new Date(d).toLocaleDateString("en-IN", opts) : "—";
export const todayISO = () => new Date().toISOString().slice(0, 10);
export const addDaysISO = (iso, n) => { const d = new Date(iso); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
export const nightsBetween = (a, b) => (a && b ? Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000)) : 0);
export const TAX_RATE = 0.12;
export const quote = (price, checkIn, checkOut) => {
  const nights = nightsBetween(checkIn, checkOut);
  const subtotal = nights * Number(price || 0);
  const tax = Math.round(subtotal * TAX_RATE);
  return { nights, subtotal, tax, total: subtotal + tax };
};

export const BOOKING_STATUSES = ["Pending", "Confirmed", "Checked-in", "Completed", "Cancelled"];
export const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-800",
  Confirmed: "bg-emerald-100 text-emerald-800",
  "Checked-in": "bg-sky-100 text-sky-800",
  Completed: "bg-stone-200 text-stone-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

// Resize an uploaded image to keep base64 payloads small.
export function fileToDataUrl(file, max = 1400, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
