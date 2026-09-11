import React, { useEffect, useState } from "react";
import { api } from "../../data/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Bookings() {
  const { auth } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/bookings/mine", auth.token).then(setBookings).catch(() => setBookings([])).finally(() => setLoading(false));
  }, []); // eslint-disable-line

  if (loading) return <p className="text-muted">Loading bookings…</p>;
  if (!bookings.length) return <p className="text-muted">You haven't booked a stay yet — <a href="/hotels" className="text-teal underline">browse stays</a>.</p>;

  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div key={b.id} className="card p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-serif">{b.roomType} · Tracking #{b.trackingNumber || b.confirmation}</p>
            <p className="text-muted text-sm">{b.checkIn} → {b.checkOut} · {b.guests} guests</p>
          </div>
          <div className="text-right">
            <p className="font-serif">₹{Number(b.amount).toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted uppercase">{b.paymentMethod}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
