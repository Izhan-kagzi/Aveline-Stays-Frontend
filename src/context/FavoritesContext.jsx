import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../lib/api";
import { useAuth } from "./AuthContext";

const Ctx = createContext(null);

export function FavoritesProvider({ children }) {
  const { isCustomer } = useAuth();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    if (!isCustomer) { setIds([]); return; }
    api("/favorites").then(setIds).catch(() => setIds([]));
  }, [isCustomer]);

  const toggle = useCallback(async (hotelId) => {
    if (!isCustomer) { toast("Sign in to save stays"); return false; }
    const has = ids.includes(hotelId);
    setIds((p) => (has ? p.filter((i) => i !== hotelId) : [...p, hotelId])); // optimistic
    try {
      setIds(await api(`/favorites/${hotelId}`, { method: has ? "DELETE" : "POST" }));
      toast.success(has ? "Removed from saved" : "Saved to your list");
    } catch (e) {
      setIds((p) => (has ? [...p, hotelId] : p.filter((i) => i !== hotelId)));
      toast.error(e.message);
    }
    return true;
  }, [ids, isCustomer]);

  const value = useMemo(() => ({ ids, toggle, has: (id) => ids.includes(id) }), [ids, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useFavorites = () => useContext(Ctx);
