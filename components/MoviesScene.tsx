"use client";

import React, { useRef, useEffect, useState } from "react";

type Film = {
  title: string;
  year: string;
  rating: string;
  link: string;
  poster: string;
};

function Corners() {
  return (
    <>
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black dark:border-white pointer-events-none" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black dark:border-white pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black dark:border-white pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black dark:border-white pointer-events-none" />
    </>
  );
}

export default function MoviesScene({ active }: { active: boolean }) {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
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

  // Collapse when panel closes
  useEffect(() => {
    if (!active) setExpanded(null);
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

  if (films.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <span
          className="text-[10px] text-secondary uppercase tracking-widest"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          no recent watches
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-4 py-3 gap-2">
      <span
        className="text-[9px] text-secondary uppercase tracking-widest"
        style={{ fontFamily: "var(--font-pixel)" }}
      >
        recently watched
      </span>

      <div className="flex gap-3 flex-1 items-start">
        {films.slice(0, 4).map((film, i) => {
          const isExpanded = expanded === i;
          return (
            <button
              key={i}
              onClick={() => setExpanded(isExpanded ? null : i)}
              className={`relative cursor-pointer transition-all duration-300 ease-out ${
                isExpanded ? "flex-[2]" : "flex-1"
              }`}
              style={{ minWidth: 0 }}
            >
              <div
                className={`relative p-2 transition-all duration-300 ${
                  isExpanded ? "h-full" : ""
                }`}
              >
                <Corners />

                {!isExpanded ? (
                  /* ── Collapsed: title + year ── */
                  <div className="flex flex-col items-center gap-1 py-2">
                    <span
                      className="text-[10px] text-black dark:text-white uppercase tracking-wider text-center leading-tight"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      {film.title}
                    </span>
                    <span
                      className="text-[8px] text-secondary"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      {film.year}
                    </span>
                  </div>
                ) : (
                  /* ── Expanded: poster + details ── */
                  <div className="flex gap-3 items-start">
                    {film.poster && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={film.poster}
                        alt={film.title}
                        className="w-[60px] h-[85px] object-cover shrink-0"
                        draggable={false}
                      />
                    )}
                    <div className="flex flex-col gap-1 min-w-0 py-1">
                      <span
                        className="text-[10px] text-black dark:text-white uppercase tracking-wider leading-tight"
                        style={{ fontFamily: "var(--font-pixel)" }}
                      >
                        {film.title}
                      </span>
                      <span
                        className="text-[8px] text-secondary"
                        style={{ fontFamily: "var(--font-pixel)" }}
                      >
                        {film.year}
                      </span>
                      {film.rating && (
                        <span className="text-[10px] text-secondary/80">
                          {film.rating}
                        </span>
                      )}
                      <a
                        href={film.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[8px] text-secondary/40 hover:text-secondary transition-colors mt-1"
                        style={{ fontFamily: "var(--font-pixel)" }}
                      >
                        view on letterboxd
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
