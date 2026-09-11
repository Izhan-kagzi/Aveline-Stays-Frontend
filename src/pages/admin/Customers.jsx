import React, { useEffect, useState } from "react";
import { api, API_URL } from "../../data/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Customers() {
  const { auth } = useAuth();
  const [customers, setCustomers] = useState([]);

  function load() {
    api.get("/customers", auth.token).then(setCustomers).catch(() => {});
  }
  useEffect(load, []); // eslint-disable-line

  async function setStatus(id, status) {
    await api.patch(`/customers/${id}/status`, { status }, auth.token);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif">Customers</h1>
        <a
          href={`${API_URL}/customers/export.csv`}
          onClick={async (e) => {
            e.preventDefault();
            const res = await fetch(`${API_URL}/customers/export.csv`, { headers: { Authorization: `Bearer ${auth.token}` } });
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "aveline-customers.csv"; a.click();
          }}
          className="btn-outline-dark"
        >
          Download CSV
        </a>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted border-b border-ink/10">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Bookings</th>
              <th className="p-4">Spend</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-ink/5">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4">{c.email}</td>
                <td className="p-4">{c.phone}</td>
                <td className="p-4">{c.joined}</td>
                <td className="p-4">{c.totalBookings}</td>
                <td className="p-4">₹{Number(c.totalSpend || 0).toLocaleString("en-IN")}</td>
                <td className="p-4">
                  <select
                    value={c.status}
                    onChange={(e) => setStatus(c.id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded-full border ${c.status === "active" ? "border-teal text-teal" : "border-ink/30 text-muted"}`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
