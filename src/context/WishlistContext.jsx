import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const raw = localStorage.getItem("aveline_wishlist");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("aveline_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function toggle(hotelId) {
    setWishlist((prev) => (prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]));
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isSaved: (id) => wishlist.includes(id) }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
