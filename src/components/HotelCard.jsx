import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowUpRight, MapPin } from "lucide-react";

import { hotelImageMap } from "../data/content.js";
import StarRating from "./StarRating.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

export default function HotelCard({ hotel }) {
  const { isSaved, toggle } = useWishlist();

  const image = hotelImageMap[hotel.id] || hotel.images?.[0];
  const saved = isSaved(hotel.id);

  return (
    <article className="group bg-white border border-[#15191c]/10 overflow-hidden">

      <div className="relative h-52 overflow-hidden bg-[#eeeeeb]">

        {image ? (
          <img
            src={image}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-[#15191c]/40">
              Image unavailable
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => toggle(hotel.id)}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm"
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            fill={saved ? "currentColor" : "none"}
            className={saved ? "text-[#a78950]" : "text-[#15191c]/60"}
          />
        </button>

        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-2 flex items-center gap-2">
          <StarRating value={hotel.rating} />

          <span className="text-xs text-[#15191c]/60">
            {hotel.rating}
          </span>
        </div>
      </div>

      <div className="p-5">

        <h3 className="font-serif text-xl leading-tight text-[#15191c]">
          {hotel.name}
        </h3>

        <div className="flex items-center gap-2 mt-2 mb-4">
          <MapPin
            size={14}
            strokeWidth={1.4}
            className="text-[#a78950] shrink-0"
          />

          <p className="text-sm text-[#15191c]/50">
            {hotel.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {(hotel.amenities || []).slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="text-[9px] uppercase tracking-wider bg-[#f1f1ee] text-[#15191c]/60 px-2 py-1.5"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="border-t border-[#15191c]/10 pt-5 flex items-end justify-between gap-4">

          <div>
            <span className="font-serif text-xl text-[#15191c]">
              ₹{Number(hotel.price || 0).toLocaleString("en-IN")}
            </span>

            <span className="block text-xs text-[#15191c]/40 mt-1">
              / night
            </span>
          </div>

          <Link
            to={`/hotels/${hotel.id}`}
            className="flex items-center gap-2 text-xs font-medium text-[#15191c]/65 hover:text-[#a78950] transition-colors"
          >
            View Stay

            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
            />
          </Link>

        </div>
      </div>
    </article>
  );
}
