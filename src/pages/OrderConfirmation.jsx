import React, { useState } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";

export default function OrderConfirmation() {
  const { state } = useLocation();
  const [copied, setCopied] = useState(false);

  if (!state?.trackingNumber) return <Navigate to="/hotels" replace />;

  const { trackingNumber, hotelName, checkIn, checkOut, guests, roomType, amount } = state;

  function copyTracking() {
    navigator.clipboard?.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="pt-32 pb-24 px-6 flex justify-center">
      <div className="max-w-lg w-full text-center animate-fade-up">
        <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-teal">✓</span>
        </div>
        <span className="eyebrow">Booking Confirmed</span>
        <h1 className="text-3xl md:text-4xl font-serif mt-3 mb-3">You're all set</h1>
        <p className="text-muted mb-8">
          Your payment went through and {hotelName} is expecting you. A confirmation has been added to your account.
        </p>

        <div className="card p-6 mb-8 text-left">
          <p className="eyebrow mb-2">Order Tracking Number</p>
          <button
            onClick={copyTracking}
            className="w-full flex items-center justify-between bg-cream border border-gold/40 rounded-sm px-4 py-3 font-mono text-lg tracking-wide hover:border-gold transition-colors"
          >
            <span>{trackingNumber}</span>
            <span className="text-xs text-teal uppercase tracking-widest">{copied ? "Copied ✓" : "Copy"}</span>
          </button>

          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-6 text-sm">
            <div>
              <p className="text-muted text-xs uppercase tracking-widest mb-1">Hotel</p>
              <p>{hotelName}</p>
            </div>
            <div>
              <p className="text-muted text-xs uppercase tracking-widest mb-1">Room</p>
              <p>{roomType}</p>
            </div>
            <div>
              <p className="text-muted text-xs uppercase tracking-widest mb-1">Check-in</p>
              <p>{checkIn}</p>
            </div>
            <div>
              <p className="text-muted text-xs uppercase tracking-widest mb-1">Check-out</p>
              <p>{checkOut}</p>
            </div>
            <div>
              <p className="text-muted text-xs uppercase tracking-widest mb-1">Guests</p>
              <p>{guests}</p>
            </div>
            <div>
              <p className="text-muted text-xs uppercase tracking-widest mb-1">Amount Paid</p>
              <p className="font-serif">₹{Number(amount).toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/account/bookings" className="btn-primary">View My Bookings</Link>
          <Link to="/hotels" className="btn-outline-dark">Browse More Stays</Link>
        </div>
      </div>
    </div>
  );
}
