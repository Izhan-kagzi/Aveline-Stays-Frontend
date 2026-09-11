import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { api } from "../data/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import BackButton from "../components/BackButton.jsx";
import StripePaymentForm from "../components/StripePaymentForm.jsx";
import { getStripe } from "../data/stripe.js";
import { loadCheckoutDraft, clearCheckoutDraft } from "../data/checkoutDraft.js";

export default function Checkout() {
  const { state: routerState } = useLocation();
  const { auth } = useAuth();
  const navigate = useNavigate();

  // Fall back to the persisted draft (our "cart") if the page was refreshed
  // and router state was lost.
  const [draft] = useState(() => routerState?.hotel ? routerState : loadCheckoutDraft());
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!draft?.hotel || !auth) return;
    api
      .post("/payments/create-payment-intent", { amount: draft.total, hotelId: draft.hotel.id, hotelName: draft.hotel.name }, auth.token)
      .then((res) => {
        setClientSecret(res.clientSecret);
      })
      .catch((err) => setError(err.message));
  }, [draft, auth]);

  if (!draft?.hotel) {
    return (
      <div className="pt-40 text-center">
        <p className="text-muted mb-4">No stay selected for checkout.</p>
        <Link to="/hotels" className="btn-primary">Browse Stays</Link>
      </div>
    );
  }

  const { hotel, range, guests, roomType, total, nights } = draft;

  async function handlePaymentSuccess(paymentIntent) {
    try {
      const booking = await api.post(
        "/bookings",
        {
          hotelId: hotel.id,
          checkIn: range?.start || "TBD",
          checkOut: range?.end || "TBD",
          guests,
          roomType,
          amount: total,
          paymentMethod: paymentIntent.payment_method_types?.[0] || "card",
          stripePaymentIntentId: paymentIntent.id,
        },
        auth.token
      );

      // Clear the client-side "cart" now that the order has been placed.
      clearCheckoutDraft();

      navigate("/order-confirmation", {
        replace: true,
        state: {
          trackingNumber: booking.trackingNumber,
          hotelName: hotel.name,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          guests,
          roomType,
          amount: total,
        },
      });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="pt-32 pb-24">
      <div className="wrap grid lg:grid-cols-3 gap-10 px-6 md:px-10">
        <div className="lg:col-span-2 card p-8">
          <BackButton className="mb-0" />
          <h1 className="text-2xl font-serif mb-6">Secure Payment</h1>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          {!clientSecret ? (
            <p className="text-muted text-sm">Preparing secure checkout…</p>
          ) : (
            <Elements
              stripe={getStripe()}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                  variables: {
                    colorPrimary: "#1F4A40",
                    fontFamily: "Manrope, sans-serif",
                    borderRadius: "2px",
                  },
                },
              }}
            >
              <StripePaymentForm amount={total} onSuccess={handlePaymentSuccess} onError={setError} />
            </Elements>
          )}
        </div>

        <div className="card p-6 h-fit">
          <h2 className="font-serif text-lg mb-4">{hotel.name}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted">Check-in</span><span>{range?.start || "TBD"}</span></div>
            <div className="flex justify-between"><span className="text-muted">Check-out</span><span>{range?.end || "TBD"}</span></div>
            <div className="flex justify-between"><span className="text-muted">Guests</span><span>{guests}</span></div>
            <div className="flex justify-between"><span className="text-muted">Room</span><span>{roomType}</span></div>
            <div className="flex justify-between"><span className="text-muted">Nights</span><span>{nights}</span></div>
            <div className="flex justify-between font-serif text-lg pt-3 border-t border-ink/10"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
