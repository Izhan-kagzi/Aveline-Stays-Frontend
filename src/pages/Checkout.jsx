import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { FiCreditCard, FiHome, FiLock } from "react-icons/fi";
import HotelArt from "../components/HotelArt";
import { api } from "../lib/api";
import { money, quote, fmtDate } from "../lib/format";

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) : null;

function CardForm({ onPaid, disabled }) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);

  const pay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    const { error, paymentIntent } = await stripe.confirmPayment({ elements, redirect: "if_required" });
    if (error) { toast.error(error.message || "Payment failed"); setBusy(false); return; }
    if (paymentIntent?.status === "succeeded") await onPaid(paymentIntent.id);
    else { toast.error("Payment didn't complete. Please try again."); setBusy(false); }
  };
  return (
    <form onSubmit={pay} className="space-y-6">
      <PaymentElement />
      <button disabled={!stripe || busy || disabled} className="btn-primary w-full !py-4"><FiLock /> {busy ? "Processing…" : "Pay & confirm booking"}</button>
    </form>
  );
}

export default function Checkout() {
  const { id } = useParams();
  const [sp] = useSearchParams();
  const nav = useNavigate();
  const checkIn = sp.get("checkIn"), checkOut = sp.get("checkOut");
  const guests = Number(sp.get("guests")) || 1;
  const roomType = sp.get("roomType") || "";

  const [hotel, setHotel] = useState(null);
  const [method, setMethod] = useState("card");
  const [secret, setSecret] = useState("");
  const [intentError, setIntentError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { api(`/hotels/${id}`, { auth: false }).then(setHotel).catch(() => nav("/stays")); }, [id, nav]);
  const q = useMemo(() => quote(hotel?.price, checkIn, checkOut), [hotel, checkIn, checkOut]);

  useEffect(() => {
    if (!hotel || method !== "card" || q.nights < 1) return;
    setSecret(""); setIntentError("");
    if (!stripePromise) { setIntentError("Card payments need VITE_STRIPE_PUBLISHABLE_KEY in the frontend .env. You can still pay at the hotel."); return; }
    api("/payments/create-payment-intent", { method: "POST", body: { hotelId: hotel.id, checkIn, checkOut } })
      .then((r) => setSecret(r.clientSecret)).catch((e) => setIntentError(e.message));
  }, [hotel, method, q.nights, checkIn, checkOut]);

  const book = async (stripePaymentIntentId) => {
    try {
      const b = await api("/bookings", { method: "POST", body: { hotelId: id, checkIn, checkOut, guests, roomType, paymentMethod: method, stripePaymentIntentId } });
      nav(`/booking-success/${b.id}`, { replace: true });
    } catch (e) { toast.error(e.message); setBusy(false); }
  };

  if (!hotel) return <div className="container-x py-20"><div className="skeleton h-96 rounded-3xl" /></div>;
  if (!checkIn || !checkOut || q.nights < 1) return <div className="container-x py-32 text-center"><h1 className="h-display text-5xl">Choose your dates first</h1><Link to={`/stays/${id}`} className="btn-primary mt-8">Back to stay</Link></div>;

  return (
    <div className="container-x py-14">
      <p className="eyebrow mb-3">Checkout</p><h1 className="h-display text-5xl">Confirm and pay</h1>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_420px]">
        <div className="space-y-8">
          <div className="card p-8">
            <h2 className="font-display text-3xl">Payment method</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[["card", FiCreditCard, "Pay now", "Secure card payment via Stripe"], ["pay_at_hotel", FiHome, "Pay at hotel", "Reserve now, settle on arrival"]].map(([k, Icon, t, d]) => (
                <button key={k} onClick={() => setMethod(k)} className={`rounded-2xl border p-5 text-left transition ${method === k ? "border-forest bg-forest text-ivory" : "border-ink/10 hover:border-brass"}`}>
                  <Icon size={22} className={method === k ? "text-brass-light" : "text-brass"} /><p className="mt-3 font-semibold">{t}</p><p className={`text-xs ${method === k ? "text-ivory/65" : "text-mist"}`}>{d}</p></button>
              ))}
            </div>
            <div className="mt-8">
              {method === "card" ? (
                secret && stripePromise ? <Elements stripe={stripePromise} options={{ clientSecret: secret, appearance: { theme: "stripe", variables: { colorPrimary: "#1C2E27", borderRadius: "12px" } } }}><CardForm onPaid={book} /></Elements>
                : intentError ? <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{intentError}</p>
                : <div className="skeleton h-40 rounded-2xl" />
              ) : (
                <div className="space-y-5"><p className="rounded-xl bg-sand/70 p-4 text-sm text-ink/80">Your booking will be <b>Pending</b> until our team confirms it. Payment of {money(q.total)} is collected when you arrive.</p>
                  <button disabled={busy} onClick={() => { setBusy(true); book(); }} className="btn-primary w-full !py-4">{busy ? "Booking…" : "Request booking"}</button></div>
              )}
            </div>
          </div>
        </div>

        <aside><div className="card sticky top-28 overflow-hidden">
          <div className="aspect-[16/9]"><HotelArt hotel={hotel} /></div>
          <div className="p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brass">{hotel.city}</p>
            <h3 className="mt-1 font-display text-3xl">{hotel.name}</h3>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-mist">Dates</dt><dd className="font-medium">{fmtDate(checkIn)} → {fmtDate(checkOut)}</dd></div>
              <div className="flex justify-between"><dt className="text-mist">Guests · Room</dt><dd className="font-medium">{guests} · {roomType || "Standard"}</dd></div>
              <div className="flex justify-between"><dt className="text-mist">{money(hotel.price)} × {q.nights} nights</dt><dd>{money(q.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-mist">Taxes (12%)</dt><dd>{money(q.tax)}</dd></div>
              <div className="flex justify-between border-t border-ink/10 pt-4 text-xl font-bold"><dt>Total</dt><dd>{money(q.total)}</dd></div>
            </dl>
          </div>
        </div></aside>
      </div>
    </div>
  );
}
