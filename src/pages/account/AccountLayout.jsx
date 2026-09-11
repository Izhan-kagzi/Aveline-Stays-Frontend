import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import BackButton from "../../components/BackButton.jsx";

export default function AccountLayout() {
  const { auth } = useAuth();
  const tabs = [
    { to: "/account", label: "Profile", end: true },
    { to: "/account/bookings", label: "Booking History" },
    { to: "/account/wishlist", label: "Wishlist" },
  ];
  return (
    <div className="pt-28 pb-24 px-6 md:px-10">
      <div className="wrap">
        <BackButton />
        <span className="eyebrow">My Account</span>
        <h1 className="text-3xl md:text-4xl mt-3 mb-8">Hi, {auth.user.name.split(" ")[0]}</h1>
        <div className="flex gap-6 border-b border-ink/10 mb-10">
          {tabs.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end}
              className={({ isActive }) => `pb-3 text-sm ${isActive ? "border-b-2 border-gold text-ink font-medium" : "text-muted"}`}>
              {t.label}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
