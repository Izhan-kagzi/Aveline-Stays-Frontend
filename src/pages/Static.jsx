import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import Reveal from "../components/Reveal";

export function About() {
  return (
    <>
      <section className="container-x py-16"><p className="eyebrow mb-3">Our story</p>
        <h1 className="h-display max-w-4xl text-6xl sm:text-8xl">Hospitality, <span className="italic text-brass">remembered.</span></h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-mist">Aveline began with a simple belief: where you stay shapes the story you tell. We search out places with soul — and look after the details so you can simply arrive.</p></section>
      <section className="bg-forest py-24 text-ivory"><div className="container-x grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-3">
        {[["Curation", "Every property is visited, vetted and loved before it joins us."], ["Care", "Real people, available around the clock — before, during and after your stay."], ["Craft", "Small details, done properly: the welcome note, the fire already lit."]].map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.1}><div className="h-full bg-forest p-10"><p className="font-display text-6xl text-brass-light/50">0{i + 1}</p><h3 className="mt-4 font-display text-3xl">{t}</h3><p className="mt-3 text-ivory/65">{d}</p></div></Reveal>))}</div></section>
      <section className="container-x py-24 text-center"><h2 className="h-display text-5xl">Ready when you are.</h2><Link to="/stays" className="btn-primary mt-8">Explore stays</Link></section>
    </>
  );
}

const FAQ = [
  ["How do I book a stay?", "Choose a stay, pick your dates and room, and check out securely with a card or reserve now and pay at the hotel."],
  ["Can I cancel my booking?", "Yes. From My bookings, send a cancellation request with a reason. Our team reviews it and updates you by notification. Approved cancellations on paid bookings are refunded."],
  ["What do the booking statuses mean?", "Pending — awaiting confirmation; Confirmed — your stay is secured; Checked-in — you've arrived; Completed — your stay is over; Cancelled — the booking was cancelled."],
  ["Is my payment secure?", "Card payments are processed by Stripe. We never see or store your card details."],
  ["How does the AI itinerary work?", "Pick a stay, dates and interests and we generate a day-by-day plan you can save and revisit."],
];
const LEGAL = {
  privacy: ["Privacy policy", ["We collect only what we need to run your booking: your name, email, phone and booking details.", "Payments are handled by Stripe; card details never touch our servers.", "We never sell your personal data. You can ask us to delete your account at any time by contacting stay@avelinestays.com."]],
  terms: ["Terms & conditions", ["Bookings are subject to availability and confirmation by Aveline Stays.", "Prices include a 12% tax. Cancellation requests are reviewed case by case; approved cancellations on paid bookings are refunded to the original payment method.", "Guests are responsible for respecting each property's house rules."]],
};

export function Faqs() {
  const [open, setOpen] = useState(0);
  return (
    <div className="container-x max-w-3xl py-16"><p className="eyebrow mb-3">Support</p><h1 className="h-display text-5xl sm:text-6xl">Frequently asked</h1>
      <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">{FAQ.map(([q, a], i) => (
        <div key={q}><button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left"><span className="font-display text-2xl">{q}</span>{open === i ? <FiMinus className="shrink-0 text-brass" /> : <FiPlus className="shrink-0 text-brass" />}</button>
          {open === i && <p className="pb-6 leading-relaxed text-mist">{a}</p>}</div>))}</div></div>
  );
}
export function Legal() {
  const key = useLocation().pathname.includes("terms") ? "terms" : "privacy";
  const [title, paras] = LEGAL[key];
  return (
    <div className="container-x max-w-3xl py-16"><p className="eyebrow mb-3">Legal</p><h1 className="h-display text-5xl sm:text-6xl">{title}</h1>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80">{paras.map((p, i) => <p key={i}>{p}</p>)}</div></div>
  );
}
export const NotFound = () => (
  <div className="container-x py-40 text-center"><p className="font-display text-9xl text-brass/40">404</p><h1 className="h-display mt-2 text-5xl">Lost on the way?</h1><Link to="/" className="btn-primary mt-8">Back home</Link></div>
);
