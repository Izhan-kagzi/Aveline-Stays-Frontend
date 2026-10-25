import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import { api } from "../lib/api";
import { SectionHead } from "../components/Ui";

function useSubmit(extra = {}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const send = async (body, reset) => {
    setBusy(true);
    try { const r = await api("/collaborate", { method: "POST", auth: false, body: { ...extra, ...body } }); setDone(r.message); reset(); }
    catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };
  return { busy, done, send };
}

export function Collaborate() {
  const empty = { name: "", email: "", company: "", type: "Property owner", message: "" };
  const [f, setF] = useState(empty);
  const { busy, done, send } = useSubmit({ source: "collaborate" });
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="container-x py-14">
      <div className="grid gap-16 lg:grid-cols-2">
        <div><p className="eyebrow mb-3">Partnerships</p><h1 className="h-display text-5xl sm:text-7xl">Let's host together.</h1>
          <p className="mt-6 max-w-md text-lg text-mist">Own a villa, run a boutique hotel, or represent a brand that belongs in our world? Tell us about it — our partnerships team replies within two business days.</p>
          <ul className="mt-10 space-y-4 text-sm">{["Reach guests who value character over convenience", "Beautiful presentation of your property", "Dedicated partner support & transparent payouts"].map((t) => <li key={t} className="flex items-center gap-3"><span className="h-px w-8 bg-brass" />{t}</li>)}</ul></div>
        <form onSubmit={(e) => { e.preventDefault(); send(f, () => setF(empty)); }} className="card space-y-5 p-8 sm:p-10">
          {done && <p className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">{done}</p>}
          <div className="grid gap-5 sm:grid-cols-2"><div><label className="label">Name</label><input required className="field" value={f.name} onChange={on("name")} /></div><div><label className="label">Email</label><input required type="email" className="field" value={f.email} onChange={on("email")} /></div></div>
          <div className="grid gap-5 sm:grid-cols-2"><div><label className="label">Property / company</label><input className="field" value={f.company} onChange={on("company")} /></div>
            <div><label className="label">I am a…</label><select className="field" value={f.type} onChange={on("type")}>{["Property owner", "Hotel operator", "Travel creator", "Brand / sponsor", "Other"].map((o) => <option key={o}>{o}</option>)}</select></div></div>
          <div><label className="label">Message</label><textarea required className="field min-h-32" value={f.message} onChange={on("message")} /></div>
          <button disabled={busy} className="btn-primary w-full !py-4">{busy ? "Sending…" : "Send proposal"}</button>
        </form>
      </div>
    </div>
  );
}

export function Contact() {
  const empty = { name: "", email: "", message: "" };
  const [f, setF] = useState(empty);
  const { busy, done, send } = useSubmit({ source: "contact", type: "General enquiry" });
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="container-x py-14">
      <SectionHead eyebrow="Contact" title="We'd love to hear from you" sub="Questions about a stay, a booking or a trip? Our concierge team is here around the clock." />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">{[[FiMail, "Email", "stay@avelinestays.com"], [FiPhone, "Phone", "+91 98765 43210"], [FiMapPin, "Studio", "Surat, Gujarat, India"], [FiClock, "Hours", "Concierge 24/7 · Office 10am–7pm IST"]].map(([Icon, l, v]) => (
          <div key={l} className="card flex items-center gap-5 p-6"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-brass/15 text-brass-dark"><Icon size={20} /></span><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-mist">{l}</p><p className="font-semibold">{v}</p></div></div>))}</div>
        <form onSubmit={(e) => { e.preventDefault(); send(f, () => setF(empty)); }} className="card space-y-5 p-8 sm:p-10">
          {done && <p className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">Thanks — we'll get back to you shortly.</p>}
          <div className="grid gap-5 sm:grid-cols-2"><div><label className="label">Name</label><input required className="field" value={f.name} onChange={on("name")} /></div><div><label className="label">Email</label><input required type="email" className="field" value={f.email} onChange={on("email")} /></div></div>
          <div><label className="label">How can we help?</label><textarea required className="field min-h-36" value={f.message} onChange={on("message")} /></div>
          <button disabled={busy} className="btn-primary w-full !py-4">{busy ? "Sending…" : "Send message"}</button>
        </form>
      </div>
    </div>
  );
}
