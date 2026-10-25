import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiMapPin, FiCalendar, FiUsers, FiShield, FiAward, FiCompass, FiHeart } from "react-icons/fi";
import Reveal from "../components/Reveal";
import HotelCard from "../components/HotelCard";
import HotelArt from "../components/HotelArt";
import { SectionHead, CardSkeleton } from "../components/Ui";
import { useStays } from "../context/StaysContext";
import { api } from "../lib/api";
import { todayISO, addDaysISO, fmtDate } from "../lib/format";

const REVIEWS = [
  { q: "Woke up to mist rolling over the pines, a fire already lit. Easily the best weekend we've had in years.", n: "Priya N.", s: "The Pine Villa Retreat" },
  { q: "Everything was seamless — booking, check-in, even the little notes the staff left. It felt personal.", n: "Rohan M.", s: "Coastal stay, Goa" },
  { q: "Aveline's itinerary planner turned a vague idea into a perfect three-day plan. Genuinely useful.", n: "Aisha K.", s: "AI Itinerary" },
];

function SearchBar() {
  const { stays } = useStays();
  const nav = useNavigate();
  const cities = useMemo(() => [...new Set(stays.map((s) => s.city))].sort(), [stays]);
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState(addDaysISO(todayISO(), 7));
  const [checkOut, setCheckOut] = useState(addDaysISO(todayISO(), 10));
  const [guests, setGuests] = useState(2);

  const submit = (e) => {
    e.preventDefault();
    const p = new URLSearchParams({ checkIn, checkOut, guests });
    if (city) p.set("city", city);
    nav(`/stays?${p}`);
  };
  const cell = "flex min-w-[170px] flex-1 items-center gap-3 px-5 py-3";
  return (
    <form onSubmit={submit} className="mx-auto mt-12 flex w-full max-w-4xl flex-col divide-y divide-ink/10 overflow-hidden rounded-[2rem] bg-ivory p-2 text-left text-ink shadow-lift md:flex-row md:divide-x md:divide-y-0 md:rounded-full">
      <label className={cell}><FiMapPin className="text-brass" />
        <span className="flex-1"><span className="block text-[10px] font-bold uppercase tracking-widest text-mist">Destination</span>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none">
            <option value="">Anywhere</option>{cities.map((c) => <option key={c}>{c}</option>)}
          </select></span></label>
      <label className={cell}><FiCalendar className="text-brass" />
        <span className="flex-1"><span className="block text-[10px] font-bold uppercase tracking-widest text-mist">Check-in</span>
          <input type="date" min={todayISO()} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (e.target.value >= checkOut) setCheckOut(addDaysISO(e.target.value, 1)); }} className="w-full bg-transparent text-sm font-semibold outline-none" /></span></label>
      <label className={cell}><FiCalendar className="text-brass" />
        <span className="flex-1"><span className="block text-[10px] font-bold uppercase tracking-widest text-mist">Check-out</span>
          <input type="date" min={addDaysISO(checkIn, 1)} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none" /></span></label>
      <label className={cell}><FiUsers className="text-brass" />
        <span className="flex-1"><span className="block text-[10px] font-bold uppercase tracking-widest text-mist">Guests</span>
          <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none">
            {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>)}
          </select></span></label>
      <button className="btn-primary m-1 !px-8 !py-4 md:ml-2">Search</button>
    </form>
  );
}

export default function Home() {
  const { stays, loading } = useStays();
  const [posts, setPosts] = useState([]);
  useEffect(() => { api("/blogs", { auth: false }).then((p) => setPosts(p.slice(0, 3))).catch(() => {}); }, []);

  const featured = useMemo(() => [...stays].sort((a, b) => b.rating - a.rating).slice(0, 6), [stays]);
  const cities = useMemo(() => {
    const m = new Map();
    stays.forEach((s) => { const c = m.get(s.city) || { city: s.city, count: 0, from: Infinity, sample: s }; c.count++; c.from = Math.min(c.from, s.price); m.set(s.city, c); });
    return [...m.values()].slice(0, 6);
  }, [stays]);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest-800 text-ivory">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(212,180,131,.35),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(59,85,71,.8),transparent_60%)]" />
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-3/4 w-full opacity-90">
            <path d="M0 520 Q 240 380 480 470 T 960 430 T 1440 480 V800 H0Z" fill="#223A31" />
            <path d="M0 600 Q 300 480 560 560 T 1100 540 T 1440 590 V800 H0Z" fill="#1A2D26" />
            <path d="M0 690 Q 360 610 700 670 T 1440 660 V800 H0Z" fill="#111E19" />
          </svg>
          <div className="grain absolute inset-0" />
        </div>
        <div className="container-x pb-20 pt-36 text-center">
          <Reveal><p className="eyebrow !text-brass-light">Boutique stays across India</p></Reveal>
          <Reveal delay={0.1}><h1 className="h-display mx-auto mt-6 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">Stay somewhere <span className="italic text-brass-light">you'll remember.</span></h1></Reveal>
          <Reveal delay={0.2}><p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ivory/75">Villas, heritage havelis and hillside retreats — handpicked for character and quietly looked after by people who care.</p></Reveal>
          <Reveal delay={0.3}><SearchBar /></Reveal>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-ink/10 bg-sand/60">
        <div className="container-x grid grid-cols-2 gap-8 py-10 text-center md:grid-cols-4">
          {[[stays.length || "9", "Handpicked stays"], [cities.length || "7", "Destinations"], ["4.8", "Average guest rating"], ["24/7", "Concierge support"]].map(([n, l]) => (
            <div key={l}><p className="font-display text-5xl text-forest">{n}</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-mist">{l}</p></div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-x pt-28">
        <SectionHead eyebrow="Guest favourites" title="Our most loved stays" sub="Top-rated by the people who've slept there."
          action={<Link to="/stays" className="btn-ghost">View all stays <FiArrowRight /></Link>} />
        <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />) : featured.map((h, i) => <Reveal key={h.id} delay={(i % 3) * 0.08}><HotelCard hotel={h} /></Reveal>)}
        </div>
      </section>

      {/* DESTINATIONS */}
      {cities.length > 0 && (
        <section className="container-x pt-32">
          <SectionHead eyebrow="Destinations" title="Where to next?" align="center" />
          <div className="grid auto-rows-[220px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c, i) => (
              <Reveal key={c.city} delay={i * 0.05} className={i === 0 ? "sm:row-span-2 sm:auto-rows-auto lg:row-span-2" : ""}>
                <Link to={`/stays?city=${encodeURIComponent(c.city)}`} className="group relative block h-full overflow-hidden rounded-3xl">
                  <div className="h-full w-full transition duration-700 group-hover:scale-105"><HotelArt hotel={c.sample} /></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
                    <div><h3 className="font-display text-3xl">{c.city}</h3><p className="text-sm text-white/75">{c.count} stay{c.count > 1 ? "s" : ""}</p></div>
                    <p className="text-xs text-white/80">from ₹{c.from.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* WHY */}
      <section className="mt-32 bg-forest text-ivory">
        <div className="container-x py-28">
          <SectionHead eyebrow="The Aveline way" title="Considered down to the last detail" light align="center" />
          <div className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[[FiAward, "Handpicked, always", "Every stay is visited and vetted. No templates, no compromises."], [FiShield, "Secure booking", "Stripe-secured payments and free cancellation requests, handled by real people."], [FiCompass, "AI trip planner", "Get a day-by-day itinerary tailored to your stay and your style."], [FiHeart, "Looked after", "24/7 concierge support from the moment you book to the moment you leave."]].map(([Icon, t, d]) => (
              <div key={t} className="bg-forest p-9 transition hover:bg-forest-700"><Icon className="text-brass-light" size={26} /><h3 className="mt-6 font-display text-2xl">{t}</h3><p className="mt-3 text-sm leading-relaxed text-ivory/65">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ITINERARY BAND */}
      <section className="container-x pt-28">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-sand px-8 py-16 sm:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div><p className="eyebrow mb-4">New</p><h2 className="h-display text-5xl">Your trip, planned in seconds.</h2>
              <p className="mt-5 max-w-md text-mist">Tell us who's travelling and what you love. Our AI planner builds a day-by-day itinerary around your stay — restaurants, sights, timings and tips.</p>
              <Link to="/itinerary" className="btn-primary mt-8">Plan my trip <FiArrowRight /></Link></div>
            <div className="space-y-3">
              {["Day 1 — Slow morning, valley viewpoint, candlelit dinner", "Day 2 — Tea estate walk, local market, sunset at the ridge", "Day 3 — Late breakfast, spa hour, easy drive home"].map((l, i) => (
                <div key={l} className="card flex items-center gap-4 px-6 py-4" style={{ marginLeft: i * 18 }}><span className="grid h-9 w-9 place-items-center rounded-full bg-brass/20 text-sm font-bold text-brass-dark">{i + 1}</span><p className="text-sm font-medium">{l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x pt-32">
        <SectionHead eyebrow="Kind words" title="Guests say it best" align="center" />
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.1}><figure className="card h-full p-9"><p className="font-display text-7xl leading-none text-brass/40">“</p>
              <blockquote className="-mt-4 text-lg leading-relaxed">{r.q}</blockquote>
              <figcaption className="mt-7 border-t border-ink/10 pt-5"><p className="font-semibold">{r.n}</p><p className="text-sm text-mist">{r.s}</p></figcaption></figure></Reveal>
          ))}
        </div>
      </section>

      {/* JOURNAL */}
      {posts.length > 0 && (
        <section className="container-x pt-32">
          <SectionHead eyebrow="The journal" title="Stories from the road" action={<Link to="/journal" className="btn-ghost">All stories <FiArrowRight /></Link>} />
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.id} to={`/journal/${p.id}`} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl"><div className="h-full transition duration-700 group-hover:scale-105"><HotelArt src={p.cover} label={p.title} /></div></div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brass">{fmtDate(p.date)}</p>
                <h3 className="mt-2 font-display text-2xl leading-snug group-hover:text-moss">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-mist">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* PARTNER CTA */}
      <section className="container-x pt-32">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-800 px-8 py-20 text-center text-ivory">
          <div className="grain absolute inset-0" />
          <div className="relative"><p className="eyebrow !text-brass-light">For hosts & brands</p>
            <h2 className="h-display mx-auto mt-4 max-w-2xl text-5xl">Own a stay worth sharing?</h2>
            <p className="mx-auto mt-5 max-w-lg text-ivory/70">Partner with Aveline and welcome guests who value character over convenience.</p>
            <Link to="/collaborate" className="btn-brass mt-9">Partner with us <FiArrowRight /></Link></div>
        </div>
      </section>
    </>
  );
}
