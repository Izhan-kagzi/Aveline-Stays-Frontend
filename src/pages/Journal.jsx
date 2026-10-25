import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import HotelArt from "../components/HotelArt";
import { Empty } from "../components/Ui";
import { api } from "../lib/api";
import { fmtDate } from "../lib/format";

export function Journal() {
  const [posts, setPosts] = useState(null);
  useEffect(() => { api("/blogs", { auth: false }).then(setPosts).catch(() => setPosts([])); }, []);
  return (
    <div className="container-x py-14">
      <p className="eyebrow mb-3">The journal</p><h1 className="h-display text-5xl sm:text-7xl">Stories from the road</h1>
      <p className="mt-5 max-w-xl text-mist">Notes on places, people and the quiet joy of staying somewhere worth remembering.</p>
      <div className="mt-14">
        {!posts ? <div className="grid gap-8 md:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-80 rounded-3xl" />)}</div>
          : posts.length === 0 ? <Empty title="No stories yet" text="Check back soon." />
          : <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">{posts.map((p, i) => (
            <Link key={p.id} to={`/journal/${p.id}`} className={`group ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}>
              <div className={`overflow-hidden rounded-3xl ${i === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}><div className="h-full transition duration-700 group-hover:scale-105"><HotelArt src={p.cover} label={p.title} /></div></div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brass">{fmtDate(p.date)} · {p.author}</p>
              <h2 className={`mt-2 font-display leading-snug group-hover:text-moss ${i === 0 ? "text-4xl" : "text-2xl"}`}>{p.title}</h2>
              <p className="mt-2 line-clamp-2 text-mist">{p.excerpt}</p>
            </Link>))}</div>}
      </div>
    </div>
  );
}

export function JournalPost() {
  const { id } = useParams();
  const [p, setP] = useState(undefined);
  useEffect(() => { api(`/blogs/${id}`, { auth: false }).then(setP).catch(() => setP(null)); }, [id]);
  if (p === undefined) return <div className="container-x py-20"><div className="skeleton h-96 rounded-3xl" /></div>;
  if (!p) return <div className="container-x py-32 text-center"><h1 className="h-display text-5xl">Story not found</h1><Link to="/journal" className="btn-primary mt-8">Back to journal</Link></div>;
  return (
    <article className="container-x max-w-3xl py-14">
      <Link to="/journal" className="inline-flex items-center gap-2 text-sm font-semibold text-mist hover:text-ink"><FiArrowLeft /> All stories</Link>
      <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-brass">{fmtDate(p.date)} · {p.author}</p>
      <h1 className="h-display mt-4 text-5xl sm:text-6xl">{p.title}</h1>
      <div className="mt-10 aspect-[16/9] overflow-hidden rounded-3xl"><HotelArt src={p.cover} label={p.title} /></div>
      <p className="mt-10 text-xl italic leading-relaxed text-ink/80">{p.excerpt}</p>
      <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/85">{String(p.content || "").split(/\n+/).map((para, i) => <p key={i}>{para}</p>)}</div>
    </article>
  );
}
