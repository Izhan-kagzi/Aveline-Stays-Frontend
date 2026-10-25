import { useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { api } from "../../lib/api";
import { fileToDataUrl, money } from "../../lib/format";
import { Modal } from "../../components/Ui";
import HotelArt from "../../components/HotelArt";
import { useStays } from "../../context/StaysContext";
import { PageHead } from "./Dashboard";

const COMMON = ["Free Wi-Fi", "Breakfast Included", "Spa", "Pool", "Pet Friendly", "Parking", "Gym", "Restaurant", "Bar", "Airport Transfer"];
const blank = { name: "", city: "", location: "", landmarks: "", description: "", price: "", amenities: [], roomTypes: "Deluxe, Suite", lat: "", lng: "", images: [] };

export default function StaysAdmin() {
  const { stays, reload, loading } = useStays();
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [custom, setCustom] = useState("");
  const on = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const edit = (h) => setForm({ ...h, roomTypes: (h.roomTypes || []).join(", "), price: h.price, lat: h.lat || "", lng: h.lng || "" });
  const toggleAmenity = (a) => setForm((f) => ({ ...f, amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a] }));
  const addCustom = () => { const a = custom.trim(); if (a && !form.amenities.includes(a)) setForm({ ...form, amenities: [...form.amenities, a] }); setCustom(""); };
  const addImages = async (files) => {
    try { const urls = await Promise.all([...files].slice(0, 6).map((f) => fileToDataUrl(f))); setForm((f) => ({ ...f, images: [...f.images, ...urls].slice(0, 8) })); }
    catch { toast.error("Couldn't read that image."); }
  };

  const save = async (e) => {
    e.preventDefault(); setBusy(true);
    const body = { ...form, price: Number(form.price), lat: Number(form.lat) || 0, lng: Number(form.lng) || 0, roomTypes: form.roomTypes.split(",").map((s) => s.trim()).filter(Boolean) };
    try {
      if (form.id) await api(`/hotels/${form.id}`, { method: "PUT", body }); else await api("/hotels", { method: "POST", body });
      toast.success(form.id ? "Stay updated" : "Stay added"); setForm(null); reload();
    } catch (err) { toast.error(err.message); } finally { setBusy(false); }
  };
  const remove = async (h) => {
    if (!window.confirm(`Remove “${h.name}”? Existing bookings are kept.`)) return;
    try { await api(`/hotels/${h.id}`, { method: "DELETE" }); toast.success("Stay removed"); reload(); } catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <PageHead title="Stays" sub={`${stays.length} properties listed`} action={<button onClick={() => setForm({ ...blank })} className="btn-primary"><FiPlus /> Add stay</button>} />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {loading ? [0, 1, 2].map((i) => <div key={i} className="skeleton h-80 rounded-3xl" />) : stays.map((h) => (
          <div key={h.id} className="card overflow-hidden"><div className="aspect-[16/10]"><HotelArt hotel={h} /></div>
            <div className="p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brass">{h.city}</p><h3 className="mt-1 font-display text-2xl">{h.name}</h3>
              <p className="mt-2 text-sm text-mist">{money(h.price)} / night · ★ {h.rating} · {(h.images || []).length} photo{(h.images || []).length !== 1 ? "s" : ""}</p>
              <div className="mt-5 flex gap-2"><button onClick={() => edit(h)} className="btn-ghost flex-1 !py-2.5"><FiEdit2 /> Edit</button><button onClick={() => remove(h)} className="btn !border !border-rose-200 !px-4 !py-2.5 text-rose-700 hover:bg-rose-50" aria-label="Delete"><FiTrash2 /></button></div></div></div>))}
      </div>
      <Modal wide open={!!form} onClose={() => setForm(null)} title={form?.id ? "Edit stay" : "Add a stay"}>
        {form && <form onSubmit={save} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2"><div><label className="label">Name</label><input required className="field" value={form.name} onChange={on("name")} /></div><div><label className="label">City</label><input required className="field" value={form.city} onChange={on("city")} /></div></div>
          <div className="grid gap-4 sm:grid-cols-2"><div><label className="label">Location</label><input required className="field" placeholder="Coonoor, Tamil Nadu" value={form.location} onChange={on("location")} /></div><div><label className="label">Price per night (₹)</label><input required type="number" min="1" className="field" value={form.price} onChange={on("price")} /></div></div>
          <div><label className="label">Description</label><textarea required className="field min-h-24" value={form.description} onChange={on("description")} /></div>
          <div><label className="label">Nearby landmarks</label><input className="field" value={form.landmarks} onChange={on("landmarks")} /></div>
          <div><label className="label">Amenities</label><div className="flex flex-wrap gap-2">{[...new Set([...COMMON, ...form.amenities])].map((a) => <button type="button" key={a} onClick={() => toggleAmenity(a)} className={`chip ${form.amenities.includes(a) ? "chip-on" : ""}`}>{a}</button>)}</div>
            <div className="mt-3 flex gap-2"><input className="field" placeholder="Add custom amenity" value={custom} onChange={(e) => setCustom(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustom())} /><button type="button" onClick={addCustom} className="btn-ghost">Add</button></div></div>
          <div className="grid gap-4 sm:grid-cols-3"><div className="sm:col-span-1"><label className="label">Room types (comma separated)</label><input className="field" value={form.roomTypes} onChange={on("roomTypes")} /></div><div><label className="label">Latitude</label><input type="number" step="any" className="field" value={form.lat} onChange={on("lat")} /></div><div><label className="label">Longitude</label><input type="number" step="any" className="field" value={form.lng} onChange={on("lng")} /></div></div>
          <div><label className="label">Photos (up to 8)</label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">{form.images.map((src, i) => <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl"><img src={src} alt="" className="h-full w-full object-cover" /><button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })} className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-ink/70 text-white" aria-label="Remove photo"><FiX size={14} /></button></div>)}
              {form.images.length < 8 && <label className="grid aspect-square cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-ink/20 text-mist transition hover:border-brass hover:text-brass"><span className="text-center text-xs font-semibold"><FiUpload className="mx-auto mb-1" size={20} />Upload</span><input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addImages(e.target.files)} /></label>}</div></div>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setForm(null)} className="btn-ghost">Cancel</button><button disabled={busy} className="btn-primary">{busy ? "Saving…" : form.id ? "Save changes" : "Add stay"}</button></div>
        </form>}
      </Modal>
    </div>
  );
}
