import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { api } from "../../data/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Dashboard() {
  const { auth } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [revenue, setRevenue] = useState({ total: 0, series: [] });

  useEffect(() => {
    api.get("/customers", auth.token).then(setCustomers).catch(() => {});
    api.get("/hotels").then(setHotels).catch(() => {});
    api.get("/revenue", auth.token).then(setRevenue).catch(() => {});
  }, []); // eslint-disable-line

  const active = customers.filter((c) => c.status === "active").length;

  const cards = [
    { label: "Total Customers", value: customers.length },
    { label: "Active Customers", value: active },
    { label: "Listed Hotels", value: hotels.length },
    { label: "Total Revenue", value: `₹${revenue.total.toLocaleString("en-IN")}` },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Overview</h1>
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="card p-5">
            <p className="text-muted text-xs uppercase tracking-wide mb-2">{c.label}</p>
            <p className="text-2xl font-serif">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-serif text-lg mb-4">Revenue by month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenue.series}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E263520" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`} />
            <Line type="monotone" dataKey="revenue" stroke="#B8892B" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
