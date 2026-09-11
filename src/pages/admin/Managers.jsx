import React, { useEffect, useState } from "react";
import { api } from "../../data/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Managers() {
  const { auth } = useAuth();
  const [managers, setManagers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [logsFor, setLogsFor] = useState(null);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  function load() { api.get("/managers", auth.token).then(setManagers).catch(() => {}); }
  useEffect(load, []); // eslint-disable-line

  async function addManager(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/managers", form, auth.token);
      setForm({ name: "", email: "", password: "" });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function viewLogs(m) {
    setLogsFor(m.id);
    const data = await api.get(`/managers/${m.id}/logs`, auth.token);
    setLogs(data);
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-serif mb-6">Managers</h1>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted border-b border-ink/10">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Last Login</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {managers.map((m) => {
                const last = m.loginLogs?.[m.loginLogs.length - 1];
                return (
                  <tr key={m.id} className="border-b border-ink/5">
                    <td className="p-4 font-medium">{m.name}</td>
                    <td className="p-4">{m.email}</td>
                    <td className="p-4 text-xs">{last ? new Date(last.loginAt).toLocaleString() : "—"}</td>
                    <td className="p-4"><button onClick={() => viewLogs(m)} className="text-teal text-xs">View log history</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {logsFor && (
          <div className="card p-5 mt-6">
            <h3 className="font-serif mb-3">Login / logout history</h3>
            <div className="space-y-2 text-sm">
              {logs.length === 0 && <p className="text-muted">No sessions recorded yet.</p>}
              {logs.slice().reverse().map((l) => (
                <div key={l.id} className="flex justify-between border-b border-ink/5 pb-2">
                  <span>Login: {new Date(l.loginAt).toLocaleString()}</span>
                  <span>{l.logoutAt ? `Logout: ${new Date(l.logoutAt).toLocaleString()}` : "Still signed in"}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-serif text-lg mb-4">Add a manager</h2>
        <form onSubmit={addManager} className="card p-6 space-y-4">
          <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
          <input required type="text" placeholder="Temporary password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn-primary w-full justify-center">Add Manager</button>
        </form>
      </div>
    </div>
  );
}
