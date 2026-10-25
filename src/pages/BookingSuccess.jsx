import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { api } from "../lib/api";
import { fmtDate, money } from "../lib/format";
import { StatusBadge } from "../components/Ui";

export default function BookingSuccess() {
  const { id } = useParams();
  const [b, setB] = useState(null);
  useEffect(() => { api("/bookings/mine").then((l) => setB(l.find((x) => x.id === id) || null)).catch(() => {}); }, [id]);
  return (
    <div className="container-x py-24">
      <div className="card mx-auto max-w-2xl p-10 text-center sm:p-14">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-700"><FiCheck size={36} /></div>
        <h1 className="h-display mt-8 text-5xl">{b?.status === "Pending" ? "Request received" : "You're booked."}</h1>
        <p className="mt-4 text-mist">{b?.status === "Pending" ? "Our team will confirm your stay shortly." : "A confirmation is on its way. We can't wait to host you."}</p>
        {b && (
          <div className="mt-10 rounded-2xl bg-sand/60 p-7 text-left">
            <div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.2em] text-mist">Booking reference</p><StatusBadge status={b.status} /></div>
            <p className="mt-1 font-display text-4xl text-forest">{b.trackingNumber}</p>
            <dl className="mt-6 grid grid-cols-2 gap-5 text-sm">
              <div><dt className="text-mist">Stay</dt><dd className="font-semibold">{b.hotelName}</dd></div>
              <div><dt className="text-mist">Room</dt><dd className="font-semibold">{b.roomType} · {b.guests} guest{b.guests > 1 ? "s" : ""}</dd></div>
              <div><dt className="text-mist">Check-in</dt><dd className="font-semibold">{fmtDate(b.checkIn)}</dd></div>
              <div><dt className="text-mist">Check-out</dt><dd className="font-semibold">{fmtDate(b.checkOut)}</dd></div>
              <div><dt className="text-mist">Total</dt><dd className="font-semibold">{money(b.amount)}</dd></div>
              <div><dt className="text-mist">Payment</dt><dd className="font-semibold">{b.paymentStatus}</dd></div>
            </dl>
          </div>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3"><Link to="/my-bookings" className="btn-primary">View my bookings</Link><Link to="/itinerary" className="btn-ghost">Plan my trip with AI</Link></div>
      </div>
    </div>
  );
}
