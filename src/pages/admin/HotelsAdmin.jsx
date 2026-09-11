import React, { useEffect, useState } from "react";
import { api } from "../../data/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { amenityOptions, roomTypeOptions } from "../../data/content.js";

const empty = {
  name: "", description: "", location: "", landmarks: "", city: "", price: "",
  amenities: [], roomTypes: [], images: [],
};

export default function HotelsAdmin() {
  const { auth } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  function load() { api.get("/hotels").then(setHotels).catch(() => {}); }
  useEffect(load, []);

  function onImages(e) {
    const files = Array.from(e.target.files || []).slice(0, 5);
    Promise.all(
      files.map(
        (f) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(f);
          })
      )
    ).then((images) => setForm((f) => ({ ...f, images })));
  }

  function toggleMulti(key, val) {
    setForm((f) => ({ ...f, [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val] }));
  }

  async function submit(e) {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    if (editingId) {
      await api.put(`/hotels/${editingId}`, payload, auth.token);
    } else {
      await api.post("/hotels", payload, auth.token);
    }
    setForm(empty);
    setEditingId(null);
    load();
  }

  function editHotel(h) {
    setForm({
      name: h.name, description: h.description, location: h.location, landmarks: h.landmarks,
      city: h.city, price: h.price, amenities: h.amenities, roomTypes: h.roomTypes, images: h.images || [],
    });
    setEditingId(h.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function removeHotel(id) {
    await api.del(`/hotels/${id}`, auth.token);
    load();
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-serif mb-6">Hotels</h1>
        <div className="space-y-3">
          {hotels.map((h) => (
            <div key={h.id} className="card p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-serif">{h.name}</p>
                <p className="text-muted text-xs">{h.location} · ₹{h.price.toLocaleString("en-IN")}/night</p>
              </div>
              <div className="flex gap-3 text-sm shrink-0">
                <button onClick={() => editHotel(h)} className="text-teal">Edit</button>
                <button onClick={() => removeHotel(h.id)} className="text-red-600">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-serif text-lg mb-4">{editingId ? "Edit hotel" : "Add a hotel"}</h2>
        <form onSubmit={submit} className="card p-6 space-y-4">
          <input required placeholder="Hotel name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
          <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full h-20" />
          <input required placeholder="Location (area, state)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
          <input placeholder="Nearby landmarks" value={form.landmarks} onChange={(e) => setForm({ ...form, landmarks: e.target.value })}
            className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
            <input required type="number" placeholder="Price / night" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
          </div>

          <div>
            <label className="eyebrow block mb-2 !text-teal">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map((a) => (
                <button type="button" key={a} onClick={() => toggleMulti("amenities", a)}
                  className={`text-xs px-2.5 py-1 rounded-full border ${form.amenities.includes(a) ? "bg-teal text-white border-teal" : "border-ink/20"}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="eyebrow block mb-2 !text-teal">Room types</label>
            <div className="flex flex-wrap gap-2">
              {roomTypeOptions.map((r) => (
                <button type="button" key={r} onClick={() => toggleMulti("roomTypes", r)}
                  className={`text-xs px-2.5 py-1 rounded-full border ${form.roomTypes.includes(r) ? "bg-teal text-white border-teal" : "border-ink/20"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="eyebrow block mb-2 !text-teal">Images (up to 5)</label>
            <input type="file" accept="image/*" multiple onChange={onImages} className="file-input" />
            {form.images.length > 0 && (
              <div className="flex gap-2 mt-2">
                {form.images.map((src, i) => <img key={i} src={src} alt="" className="w-14 h-14 object-cover rounded-sm" />)}
              </div>
            )}
          </div>

          <button className="btn-primary w-full justify-center">{editingId ? "Save Changes" : "Add Hotel"}</button>
          {editingId && (
            <button type="button" onClick={() => { setForm(empty); setEditingId(null); }} className="text-sm text-muted w-full text-center">
              Cancel edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
