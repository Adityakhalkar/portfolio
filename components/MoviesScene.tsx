"use client";

import React, { useRef, useEffect, useState } from "react";

type Film = {
  title: string;
  year: string;
  rating: string;
  link: string;
  poster: string;
};

export default function MoviesScene({ active }: { active: boolean }) {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  useEffect(() => {
    if (!active || fetched.current) return;
    fetched.current = true;

    fetch("/api/letterboxd")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data.films || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [active]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span
          className="text-[10px] text-secondary uppercase tracking-widest animate-pulse"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          loading reel...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-5 py-3">
      {/* Header */}
      <span
        className="text-[10px] text-secondary uppercase tracking-widest mb-3"
        style={{ fontFamily: "var(--font-pixel)" }}
      >
        recently watched by me
      </span>

      {/* Films row — posters fill available height */}
      <div className="flex gap-4 flex-1 min-h-0 overflow-hidden">
        {films.slice(0, 4).map((film, i) => (
          <a
            key={i}
            href={film.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-[6px] group flex-1 min-w-0 min-h-0"
          >
            {/* Poster — fills remaining height */}
            <div className="relative w-full flex-1 min-h-0">
              {film.poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={film.poster}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full bg-secondary/5" />
              )}
            </div>

            {/* Title + meta */}
            <div className="flex flex-col items-center gap-[1px] w-full shrink-0">
              <span
                className="text-[9px] text-black dark:text-white uppercase tracking-wider text-center leading-tight truncate w-full group-hover:text-secondary transition-colors"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                {film.title}
              </span>
              <div className="flex items-center gap-1">
                <span
                  className="text-[8px] text-secondary/50"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  {film.year}
                </span>
                {film.rating && (
                  <span className="text-[8px] text-secondary/70">
                    {film.rating}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
