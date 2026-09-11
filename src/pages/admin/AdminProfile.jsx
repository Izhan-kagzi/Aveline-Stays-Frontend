import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminProfile() {
  const { auth, updateUser } = useAuth();

  function onPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateUser({ photo: reader.result });
    reader.readAsDataURL(file);
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-serif mb-6">My Profile</h1>
      <div className="card p-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center overflow-hidden text-2xl font-serif text-gold">
            {auth.user.photo ? <img src={auth.user.photo} alt="" className="w-full h-full object-cover" /> : auth.user.name.charAt(0)}
          </div>
          <label className="text-sm text-teal cursor-pointer">
            Change photo
            <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
          </label>
        </div>
        <p className="text-sm text-muted mb-1">Name</p>
        <p className="mb-4">{auth.user.name}</p>
        <p className="text-sm text-muted mb-1">Email</p>
        <p>{auth.user.email}</p>
      </div>
    </div>
  );
}
