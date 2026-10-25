import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FiHeart, FiMapPin, FiCheck, FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import HotelArt from "../components/HotelArt";
import HotelCard from "../components/HotelCard";
import { Rating, SectionHead } from "../components/Ui";
import { api } from "../lib/api";
import { money, quote, todayISO, addDaysISO } from "../lib/format";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { useCompare } from "../context/CompareContext";
import { useStays } from "../context/StaysContext";

export default function StayDetails() {
  const { id } = useParams();
  const [sp] = useSearchParams();
  const nav = useNavigate();
  const { isCustomer, isStaff } = useAuth();
  const fav = useFavorites();
  const cmp = useCompare();
  const { stays } = useStays();

  const [hotel, setHotel] = useState(null);
  const [state, setState] = useState("loading");
  const [img, setImg] = useState(0);
  const [checkIn, setCheckIn] = useState(sp.get("checkIn") || addDaysISO(todayISO(), 7));
  const [checkOut, setCheckOut] = useState(sp.get("checkOut") || addDaysISO(todayISO(), 10));
  const [guests, setGuests] = useState(Number(sp.get("guests")) || 2);
  const [roomType, setRoomType] = useState("");

  useEffect(() => {
    setState("loading"); setImg(0);
    api(`/hotels/${id}`, { auth: false }).then((h) => { setHotel(h); setRoomType(h.roomTypes?.[0] || ""); setState("ok"); }).catch(() => setState("missing"));
  }, [id]);

  const q = useMemo(() => quote(hotel?.price, checkIn, checkOut), [hotel, checkIn, checkOut]);
  const similar = useMemo(() => stays.filter((s) => s.id !== id && (s.city === hotel?.city || true)).sort((a, b) => (a.city === hotel?.city ? -1 : 1)).slice(0, 3), [stays, hotel, id]);

  if (state === "loading") return <div className="container-x py-16"><div className="skeleton aspect-[16/7] rounded-3xl" /></div>;
  if (state === "missing") return <div className="container-x py-32 text-center"><h1 className="h-display text-5xl">Stay not found</h1><Link to="/stays" className="btn-primary mt-8">Browse stays</Link></div>;

  const images = hotel.images?.length ? hotel.images : [null];
  const reserve = () => {
    if (q.nights < 1) return;
    const params = new URLSearchParams({ checkIn, checkOut, guests, roomType });
    nav(`/checkout/${hotel.id}?${params}`);
  };
  const bbox = (d) => `${hotel.lng - d},${hotel.lat - d},${hotel.lng + d},${hotel.lat + d}`;

  return (
    <div className="container-x py-10">
      <nav className="mb-6 text-sm text-mist"><Link to="/stays" className="hover:text-ink">Stays</Link> / <Link to={`/stays?city=${hotel.city}`} className="hover:text-ink">{hotel.city}</Link> / <span className="text-ink">{hotel.name}</span></nav>

      <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] bg-sand shadow-soft">
        <HotelArt hotel={hotel} src={images[img]} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        {images.length > 1 && <>
          <button onClick={() => setImg((i) => (i - 1 + images.length) % images.length)} className="absolute left-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 hover:bg-white" aria-label="Previous"><FiChevronLeft /></button>
          <button onClick={() => setImg((i) => (i + 1) % images.length)} className="absolute right-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 hover:bg-white" aria-label="Next"><FiChevronRight /></button>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">{images.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === img ? "w-8 bg-white" : "w-1.5 bg-white/50"}`} />)}</div>
        </>}
      </div>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brass"><FiMapPin /> {hotel.location}</p>
              <h1 className="h-display mt-3 text-5xl sm:text-6xl">{hotel.name}</h1></div>
            <div className="flex items-center gap-3">
              <Rating value={hotel.rating} className="rounded-full bg-sand px-4 py-2" />
              <button onClick={() => fav.toggle(hotel.id)} className={`grid h-11 w-11 place-items-center rounded-full border transition ${fav.has(hotel.id) ? "border-brass bg-brass text-ink" : "border-ink/15 hover:bg-sand"}`} aria-label="Save"><FiHeart className={fav.has(hotel.id) ? "fill-current" : ""} /></button>
              <button onClick={() => cmp.toggle(hotel)} className={`btn-ghost !px-4 !py-2.5 ${cmp.has(hotel.id) ? "!bg-ink !text-ivory" : ""}`}>{cmp.has(hotel.id) ? <><FiCheck /> Comparing</> : <><FiPlus /> Compare</>}</button>
            </div>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-ink/80">{hotel.description}</p>
          {hotel.landmarks && <p className="mt-4 rounded-2xl bg-sand/70 px-5 py-4 text-sm text-ink/80"><b className="text-ink">Nearby:</b> {hotel.landmarks}</p>}

          <h2 className="h-display mt-14 text-3xl">What's included</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">{(hotel.amenities || []).map((a) => <li key={a} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-5 py-3.5 text-sm font-medium"><span className="grid h-6 w-6 place-items-center rounded-full bg-brass/20 text-brass-dark"><FiCheck size={13} /></span>{a}</li>)}</ul>

          {hotel.roomTypes?.length > 0 && <>
            <h2 className="h-display mt-14 text-3xl">Rooms</h2>
            <div className="mt-5 flex flex-wrap gap-3">{hotel.roomTypes.map((r) => <button key={r} onClick={() => setRoomType(r)} className={`rounded-2xl border px-6 py-4 text-left transition ${roomType === r ? "border-forest bg-forest text-ivory" : "border-ink/10 bg-white hover:border-brass"}`}><p className="font-display text-xl">{r}</p><p className={`text-xs ${roomType === r ? "text-ivory/60" : "text-mist"}`}>Selected for your booking</p></button>)}</div>
          </>}

          {(hotel.lat || hotel.lng) ? <>
            <h2 className="h-display mt-14 text-3xl">Location</h2>
            <div className="mt-5 overflow-hidden rounded-3xl border border-ink/10 shadow-soft">
              <iframe title="Map" className="h-80 w-full" loading="lazy" src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox(0.05)}&layer=mapnik&marker=${hotel.lat},${hotel.lng}`} />
            </div>
          </> : null}
        </div>

        {/* BOOKING CARD */}
        <aside><div className="card sticky top-28 p-7">
          <p className="text-3xl font-bold">{money(hotel.price)} <span className="text-base font-medium text-mist">/ night</span></p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div><label className="label">Check-in</label><input type="date" className="field" min={todayISO()} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (e.target.value >= checkOut) setCheckOut(addDaysISO(e.target.value, 1)); }} /></div>
            <div><label className="label">Check-out</label><input type="date" className="field" min={addDaysISO(checkIn, 1)} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /></div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div><label className="label">Guests</label><select className="field" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>{[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}</select></div>
            <div><label className="label">Room</label><select className="field" value={roomType} onChange={(e) => setRoomType(e.target.value)}>{(hotel.roomTypes || ["Standard"]).map((r) => <option key={r}>{r}</option>)}</select></div>
          </div>
          {q.nights > 0 ? (
            <dl className="mt-6 space-y-3 border-t border-ink/10 pt-6 text-sm">
              <div className="flex justify-between"><dt className="text-mist">{money(hotel.price)} × {q.nights} night{q.nights > 1 ? "s" : ""}</dt><dd>{money(q.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-mist">Taxes (12%)</dt><dd>{money(q.tax)}</dd></div>
              <div className="flex justify-between border-t border-ink/10 pt-4 text-lg font-bold"><dt>Total</dt><dd>{money(q.total)}</dd></div>
            </dl>
          ) : <p className="mt-6 text-sm text-rose-700">Check-out must be after check-in.</p>}
          {isStaff ? <p className="mt-6 rounded-xl bg-sand p-4 text-center text-sm text-mist">Staff accounts can't make bookings.</p>
            : <button onClick={reserve} disabled={q.nights < 1} className="btn-primary mt-6 w-full !py-4">{isCustomer ? "Reserve now" : "Sign in to reserve"}</button>}
          <p className="mt-4 text-center text-xs text-mist">You won't be charged yet. Free cancellation requests.</p>
        </div></aside>
      </div>

      {similar.length > 0 && <section className="pt-28"><SectionHead eyebrow="You may also like" title="More stays to love" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{similar.map((h) => <HotelCard key={h.id} hotel={h} />)}</div></section>}
    </div>
  );
}
