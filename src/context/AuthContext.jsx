import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, setToken, getToken } from "../lib/api";

const AuthContext = createContext(null);
const USER_KEY = "aveline_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return getToken() ? JSON.parse(localStorage.getItem(USER_KEY)) : null; } catch { return null; }
  });

  const persist = (data) => {
    const u = { ...data.user, role: data.role };
    setToken(data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
    return u;
  };

  const login = useCallback(async (email, password) => persist(await api("/auth/login", { method: "POST", body: { email, password }, auth: false })), []);
  const signup = useCallback(async (form) => persist(await api("/auth/signup", { method: "POST", body: form, auth: false })), []);

  const logout = useCallback(async () => {
    if (user?.role === "manager") { try { await api("/auth/logout", { method: "POST" }); } catch { /* ignore */ } }
    setToken(null); localStorage.removeItem(USER_KEY); setUser(null);
  }, [user]);

  // Expired token → sign out quietly.
  useEffect(() => {
    if (!user) return;
    const t = getToken();
    if (!t) return;
    try {
      const { exp } = JSON.parse(atob(t.split(".")[1]));
      if (exp * 1000 < Date.now()) { setToken(null); localStorage.removeItem(USER_KEY); setUser(null); }
    } catch { /* ignore */ }
  }, [user]);

  const value = useMemo(() => ({
    user, login, signup, logout,
    isCustomer: user?.role === "customer",
    isStaff: user?.role === "manager" || user?.role === "superadmin",
    isSuperadmin: user?.role === "superadmin",
  }), [user, login, signup, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
