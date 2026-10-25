import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

// One shared fetch of the (small) stays catalogue — powers search, filters, favourites and compare.
const Ctx = createContext({ stays: [], loading: true, reload: () => {} });

export function StaysProvider({ children }) {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = () => api("/hotels", { auth: false }).then(setStays).catch(() => setStays([])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);
  return <Ctx.Provider value={{ stays, loading, reload: load }}>{children}</Ctx.Provider>;
}
export const useStays = () => useContext(Ctx);
