import React, { useState } from "react";

export default function ReviewCarousel({ reviews, perPage = 3 }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(reviews.length / perPage));
  const current = reviews.slice(page * perPage, page * perPage + perPage);

  function prev() { setPage((p) => (p - 1 + totalPages) % totalPages); }
  function next() { setPage((p) => (p + 1) % totalPages); }

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6 animate-fade-in" key={page}>
        {current.map((t, i) => (
          <div key={t.name + i} className="card p-6">
            <p className="text-gold mb-2">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</p>
            <p className="text-ink/80 text-sm mb-4">"{t.text}"</p>
            <p className="font-serif">{t.name}</p>
            {t.room && <p className="text-muted text-xs">{t.room}</p>}
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-8">
          <button onClick={prev} className="btn-outline-dark px-4 py-2 text-xs">← Previous</button>
          <span className="text-xs text-muted">{page + 1} / {totalPages}</span>
          <button onClick={next} className="btn-outline-dark px-4 py-2 text-xs">Next →</button>
        </div>
      )}
    </div>
  );
}
