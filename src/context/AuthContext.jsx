import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../data/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem("aveline_auth");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (auth) localStorage.setItem("aveline_auth", JSON.stringify(auth));
    else localStorage.removeItem("aveline_auth");
  }, [auth]);

  async function login(email, password) {
    const data = await api.post("/auth/login", { email, password });
    setAuth(data);
    return data;
  }

  async function signup(payload) {
    const data = await api.post("/auth/signup", payload);
    setAuth(data);
    return data;
  }

  async function logout() {
    if (auth?.role === "manager" && auth?.token) {
      try { await api.post("/auth/logout", {}, auth.token); } catch (e) { /* ignore */ }
    }
    setAuth(null);
  }

  function updateUser(patch) {
    setAuth((prev) => (prev ? { ...prev, user: { ...prev.user, ...patch } } : prev));
  }

  return (
    <AuthContext.Provider value={{ auth, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
