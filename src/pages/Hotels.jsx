import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../data/api.js";
import { amenityOptions, roomTypeOptions } from "../data/content.js";
import HotelCard from "../components/HotelCard.jsx";
import MapView from "../components/MapView.jsx";
import BackButton from "../components/BackButton.jsx";

export default function Hotels() {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    amenity: "",
    roomType: "",
  });

  async function runSearch() {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));
    try {
      const data = await api.get(`/hotels?${params.toString()}`);
      setHotels(data);
    } catch (e) {
      setHotels([]);
    }
    setLoading(false);
  }

  useEffect(() => { runSearch(); }, []); // eslint-disable-line

  return (
    <div className="pt-28 pb-24 px-6 md:px-10">
      <div className="wrap">
        <BackButton />
        <span className="eyebrow">Find Stays</span>
        <h1 className="text-3xl md:text-4xl mt-3 mb-8">Search & filter partner hotels</h1>

        <div className="card p-6 grid md:grid-cols-6 gap-4 mb-10">
          <input
            placeholder="City / location"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm md:col-span-2"
          />
          <input
            type="number"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm"
          />
          <select
            value={filters.rating}
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm"
          >
            <option value="">Any star rating</option>
            {[4.5, 4, 3.5, 3].map((r) => <option key={r} value={r}>{r}+ stars</option>)}
          </select>
          <button onClick={runSearch} className="btn-primary justify-center">Apply Filters</button>

          <select
            value={filters.amenity}
            onChange={(e) => setFilters({ ...filters, amenity: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm"
          >
            <option value="">Any amenity</option>
            {amenityOptions.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select
            value={filters.roomType}
            onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm"
          >
            <option value="">Any room type</option>
            {roomTypeOptions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <input type="date" className="border border-ink/15 rounded-sm px-3 py-2 text-sm" title="Check-in" />
          <input type="date" className="border border-ink/15 rounded-sm px-3 py-2 text-sm" title="Check-out" />
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-muted text-sm">{loading ? "Searching…" : `${hotels.length} stays found`}</p>
          <div className="flex gap-2">
            <button onClick={() => setView("list")} className={`px-4 py-2 text-xs uppercase tracking-widest rounded-full border ${view === "list" ? "bg-teal text-white border-teal" : "border-ink/20"}`}>List</button>
            <button onClick={() => setView("map")} className={`px-4 py-2 text-xs uppercase tracking-widest rounded-full border ${view === "map" ? "bg-teal text-white border-teal" : "border-ink/20"}`}>Map</button>
          </div>
        </div>

        {view === "list" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((h) => <HotelCard key={h.id} hotel={h} />)}
            {!loading && hotels.length === 0 && (
              <p className="text-muted col-span-full text-center py-16">No stays match those filters yet — try widening your search.</p>
            )}
          </div>
        ) : (
          <MapView hotels={hotels} />
        )}
      </div>
    </div>
  );
}
