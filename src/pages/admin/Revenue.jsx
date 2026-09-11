import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { api } from "../../data/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Revenue() {
  const { auth } = useAuth();
  const [revenue, setRevenue] = useState({ total: 0, series: [] });

  useEffect(() => { api.get("/revenue", auth.token).then(setRevenue).catch(() => {}); }, []); // eslint-disable-line

  return (
    <div>
      <h1 className="text-2xl font-serif mb-2">Revenue</h1>
      <p className="text-muted mb-6">Total booked revenue: <strong className="text-ink">₹{revenue.total.toLocaleString("en-IN")}</strong></p>
      <div className="card p-6">
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={revenue.series}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E263520" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`} />
            <Bar dataKey="revenue" fill="#1F4A40" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
