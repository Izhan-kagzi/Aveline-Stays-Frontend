import React, { useEffect, useState } from "react";
import { api } from "../../data/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ManagerDashboard() {
  const { auth } = useAuth();
  const [hotels, setHotels] = useState([]);

  useEffect(() => { api.get("/hotels").then(setHotels).catch(() => {}); }, []);

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Welcome back, {auth.user.name.split(" ")[0]}</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-6">
          <p className="text-muted text-xs uppercase tracking-wide mb-2">Hotels Listed</p>
          <p className="text-3xl font-serif">{hotels.length}</p>
        </div>
        <div className="card p-6">
          <p className="text-muted text-xs uppercase tracking-wide mb-2">Your Role</p>
          <p className="text-3xl font-serif">Manager</p>
        </div>
      </div>
      <p className="text-muted text-sm mt-6">Use the Hotels tab to add or update property listings — name, images, description, location, landmarks, city and price.</p>
    </div>
  );
}
