import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const Ctx = createContext(null);
const KEY = "aveline_compare";

export function CompareProvider({ children }) {
  const [items, setItems] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  const value = useMemo(() => ({
    items,
    has: (id) => items.some((h) => h.id === id),
    toggle: (hotel) => {
      if (items.some((h) => h.id === hotel.id)) return setItems(items.filter((h) => h.id !== hotel.id));
      if (items.length >= 3) return toast.error("You can compare up to 3 stays");
      setItems([...items, { id: hotel.id }]);
    },
    remove: (id) => setItems(items.filter((h) => h.id !== id)),
    clear: () => setItems([]),
  }), [items]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useCompare = () => useContext(Ctx);
