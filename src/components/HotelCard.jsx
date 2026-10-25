import { Link } from "react-router-dom";
import { FiHeart, FiMapPin, FiPlus, FiCheck } from "react-icons/fi";
import HotelArt from "./HotelArt";
import { Rating } from "./Ui";
import { money } from "../lib/format";
import { useFavorites } from "../context/FavoritesContext";
import { useCompare } from "../context/CompareContext";

export default function HotelCard({ hotel, query = "" }) {
  const fav = useFavorites();
  const cmp = useCompare();
  const saved = fav.has(hotel.id);
  const comparing = cmp.has(hotel.id);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand shadow-soft">
        <Link to={`/stays/${hotel.id}${query}`} className="block h-full w-full">
          <div className="h-full w-full transition duration-700 group-hover:scale-105"><HotelArt hotel={hotel} showLabel={false} /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        </Link>
        <button onClick={() => fav.toggle(hotel.id)} aria-label="Save stay"
          className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full backdrop-blur transition ${saved ? "bg-brass text-ink" : "bg-white/85 text-ink hover:bg-white"}`}>
          <FiHeart className={saved ? "fill-current" : ""} />
        </button>
        <button onClick={() => cmp.toggle(hotel)} aria-label="Compare stay"
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-wider backdrop-blur transition ${comparing ? "bg-ivory text-ink" : "bg-white/85 text-ink opacity-0 hover:bg-white group-hover:opacity-100"}`}>
          {comparing ? <><FiCheck /> Added</> : <><FiPlus /> Compare</>}
        </button>
        <div className="absolute inset-x-5 bottom-5 text-white">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"><FiMapPin size={12} /> {hotel.city}</p>
          <h3 className="mt-1 font-display text-2xl leading-tight">{hotel.name}</h3>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <p className="line-clamp-1 text-sm text-mist">{(hotel.amenities || []).slice(0, 3).join(" · ")}</p>
        <Rating value={hotel.rating} />
      </div>
      <p className="mt-1 px-1 text-sm"><span className="text-lg font-bold">{money(hotel.price)}</span> <span className="text-mist">/ night</span></p>
    </article>
  );
}
