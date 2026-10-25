import { Link } from "react-router-dom";
import HotelCard from "../components/HotelCard";
import { Empty, CardSkeleton } from "../components/Ui";
import { useFavorites } from "../context/FavoritesContext";
import { useStays } from "../context/StaysContext";

export default function Favorites() {
  const { ids } = useFavorites();
  const { stays, loading } = useStays();
  const saved = stays.filter((s) => ids.includes(s.id));
  return (
    <div className="container-x py-14">
      <p className="eyebrow mb-3">Your shortlist</p><h1 className="h-display text-5xl sm:text-6xl">Saved stays</h1>
      <div className="mt-12">
        {loading ? <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <CardSkeleton key={i} />)}</div>
          : saved.length === 0 ? <Empty title="Nothing saved yet" text="Tap the heart on any stay to keep it here."><Link to="/stays" className="btn-primary">Explore stays</Link></Empty>
          : <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{saved.map((h) => <HotelCard key={h.id} hotel={h} />)}</div>}
      </div>
    </div>
  );
}
