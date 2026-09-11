import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

/**
 * Renders Stripe's native PaymentElement (test-mode) and confirms the
 * PaymentIntent client-side. Stripe decides which methods to show based on
 * what's enabled on the connected account and the PaymentIntent options —
 * no hand-built card/PayPal/UPI tabs needed.
 */
export default function StripePaymentForm({ amount, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // keep the flow in-app instead of a full-page redirect
    });

    if (submitError) {
      setError(submitError.message || "Payment failed. Please check your details and try again.");
      setLoading(false);
      onError && onError(submitError.message);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent);
      // Deliberately leave `loading` true here — the parent immediately
      // navigates away to the confirmation screen.
    } else {
      setError("Payment did not complete. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: "tabs" }} />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Processing...." : `Pay ₹${amount.toLocaleString("en-IN")}`}
      </button>

      <div className="border border-gold/30 bg-cream rounded-sm p-4 text-xs text-muted">
        <p className="font-medium text-ink mb-1">Test mode</p>
        <p>Use card number <span className="font-mono">4242 4242 4242 4242</span>, any future expiry, any CVC, and any postal code.</p>
      </div>
    </form>
  );
}
