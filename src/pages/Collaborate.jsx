import React, { useState } from "react";
import { api } from "../data/api.js";
import BackButton from "../components/BackButton.jsx";

export default function Collaborate() {
  const [form, setForm] = useState({
    hotelName: "", ownerName: "", email: "", phone: "", city: "", rooms: "", message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/collaborate", form);
      setStatus({ ok: true, message: res.message });
      setForm({ hotelName: "", ownerName: "", email: "", phone: "", city: "", rooms: "", message: "" });
    } catch (err) {
      setStatus({ ok: false, message: err.message });
    }
    setLoading(false);
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-10">
      <div className="wrap grid lg:grid-cols-2 gap-14">
        <div>
          <BackButton />
          <span className="eyebrow">Partner With Aveline Stays</span>
          <h1 className="text-3xl md:text-4xl mt-3 mb-6">Collaborate with us</h1>
          <p className="text-muted mb-8 max-w-md">
            Tell us about your hotel and our partnerships team will review your submission,
            schedule a property walkthrough, and get you listed.
          </p>
          <ul className="space-y-4">
            {[
              "In-person property walkthrough within a few business days",
              "Housekeeping standards and staff training support",
              "Access to Aveline's booking engine and guest base",
              "Dedicated manager account to manage listings and pricing",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-ink/80">
                <span className="text-gold">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} className="card p-8 space-y-4">
          <input required placeholder="Hotel name" value={form.hotelName}
            onChange={(e) => setForm({ ...form, hotelName: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
          <input required placeholder="Owner / manager name" value={form.ownerName}
            onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
          <div className="grid grid-cols-2 gap-4">
            <input required type="email" placeholder="Email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
            <input required placeholder="Phone" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="City" value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
            <input placeholder="Number of rooms" value={form.rooms}
              onChange={(e) => setForm({ ...form, rooms: e.target.value })}
              className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
          </div>
          <textarea placeholder="Tell us about your property" value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full h-24" />
          <button disabled={loading} className="btn-primary w-full justify-center">
            {loading ? "Submitting…" : "Submit Collaboration Request"}
          </button>
          {status && (
            <p className={`text-sm ${status.ok ? "text-teal" : "text-red-600"}`}>{status.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
