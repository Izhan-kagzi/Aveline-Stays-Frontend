import React, { useEffect, useState } from "react";
import { api } from "../../data/api.js";
import { useWishlist } from "../../context/WishlistContext.jsx";
import HotelCard from "../../components/HotelCard.jsx";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const [hotels, setHotels] = useState([]);

  useEffect(() => { api.get("/hotels").then(setHotels).catch(() => setHotels([])); }, []);

  const saved = hotels.filter((h) => wishlist.includes(h.id));

  if (!saved.length) return <p className="text-muted">No saved stays yet — tap the heart icon on any hotel to save it here.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {saved.map((h) => <HotelCard key={h.id} hotel={h} />)}
    </div>
  );
}
