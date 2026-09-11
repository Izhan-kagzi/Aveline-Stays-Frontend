import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Profile() {
  const { auth, updateUser } = useAuth();
  const [name, setName] = useState(auth.user.name);
  const [saved, setSaved] = useState(false);

  function save(e) {
    e.preventDefault();
    updateUser({ name });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function onPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateUser({ photo: reader.result });
    reader.readAsDataURL(file);
  }

  return (
    <div className="card p-8 max-w-xl">
      <div className="flex items-center gap-5 mb-8">
        <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center overflow-hidden text-2xl font-serif text-gold">
          {auth.user.photo ? <img src={auth.user.photo} alt="" className="w-full h-full object-cover" /> : name.charAt(0)}
        </div>
        <label className="text-sm text-teal cursor-pointer">
          Change photo
          <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
        </label>
      </div>
      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="eyebrow block mb-2 !text-teal">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full" />
        </div>
        <div>
          <label className="eyebrow block mb-2 !text-teal">Email</label>
          <input value={auth.user.email} disabled className="border border-ink/15 rounded-sm px-3 py-2 text-sm w-full bg-cream text-muted" />
        </div>
        <button className="btn-primary">{saved ? "Saved ✓" : "Save Changes"}</button>
      </form>
    </div>
  );
}
