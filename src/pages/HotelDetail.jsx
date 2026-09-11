import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../data/api.js";
import { hotelImageMap, hotelGalleryMap, testimonials } from "../data/content.js";
import StarRating from "../components/StarRating.jsx";
import AvailabilityCalendar from "../components/AvailabilityCalendar.jsx";
import BackButton from "../components/BackButton.jsx";
import ReviewCarousel from "../components/ReviewCarousel.jsx";
import HotelGallery from "../components/HotelGallery.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { saveCheckoutDraft } from "../data/checkoutDraft.js";

export default function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [range, setRange] = useState(null);
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState("");
  const { isSaved, toggle } = useWishlist();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/hotels/${id}`).then((h) => { setHotel(h); setRoomType(h.roomTypes?.[0] || ""); }).catch(() => setHotel(null));
  }, [id]);

  if (!hotel) return <div className="pt-40 text-center text-muted">Loading stay…</div>;

  const heroImg = hotelImageMap[hotel.id] || hotel.images?.[0];
  const galleryImages = hotelGalleryMap[hotel.id] || [heroImg, ...(hotel.images || [])].filter(Boolean);

  const nights = range?.start && range?.end
    ? Math.max(1, Math.round((new Date(range.end) - new Date(range.start)) / 86400000))
    : 1;
  const total = hotel.price * nights;

  function goBook() {
    if (!auth) return navigate("/login", { state: { from: `/hotels/${id}` } });
    const draft = { hotel, range, guests, roomType, total, nights };
    saveCheckoutDraft(draft);
    navigate("/checkout", { state: draft });
  }

  return (
    <div className="pt-28">
      <div className="wrap px-6 md:px-10 pt-6">
        <BackButton />
        <HotelGallery
          images={galleryImages}
          alt={hotel.name}
          isSaved={isSaved(hotel.id)}
          onToggleSave={() => toggle(hotel.id)}
        />

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <span className="eyebrow">{hotel.city}</span>
            <div className="flex items-center justify-between mt-2 mb-4">
              <h1 className="text-3xl md:text-4xl">{hotel.name}</h1>
              <StarRating value={hotel.rating} />
            </div>
            <p className="text-muted mb-2">{hotel.location}</p>
            <p className="text-muted text-sm mb-8">📍 {hotel.landmarks}</p>
            <p className="text-ink/80 leading-relaxed mb-8">{hotel.description}</p>

            <h3 className="font-serif text-lg mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {hotel.amenities.map((a) => (
                <span key={a} className="text-xs uppercase tracking-wide bg-cream text-ink/70 px-3 py-1.5 rounded-full">{a}</span>
              ))}
            </div>

            <h3 className="font-serif text-lg mb-3">Room Types</h3>
            <div className="flex flex-wrap gap-2 mb-10">
              {hotel.roomTypes.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoomType(r)}
                  className={`px-4 py-2 text-sm rounded-full border ${roomType === r ? "bg-teal text-white border-teal" : "border-ink/20"}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <h3 className="font-serif text-lg mb-3">Availability & Pricing</h3>
            <AvailabilityCalendar basePrice={hotel.price} onSelectRange={setRange} />

            <h3 className="font-serif text-lg mt-12 mb-4">Guest Reviews</h3>
            <ReviewCarousel reviews={testimonials} perPage={2} />
          </div>

          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-28">
              <p className="font-serif text-2xl mb-1">₹{hotel.price.toLocaleString("en-IN")} <span className="text-sm text-muted font-sans">/ night</span></p>
              <p className="text-muted text-sm mb-6">Taxes and fees calculated at checkout</p>

              <label className="eyebrow block mb-2 !text-teal">Guests</label>
              <input
                type="number" min="1" value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full mb-4"
              />

              <div className="border-t border-ink/10 pt-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Nights</span><span>{nights}</span></div>
                <div className="flex justify-between"><span className="text-muted">Room</span><span>{roomType}</span></div>
                <div className="flex justify-between font-serif text-lg"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
              </div>

              <button onClick={goBook} className="btn-primary w-full justify-center">Reserve This Stay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
