"use client";

import { useState } from "react";
import { lectures, TRACK_LABELS, TRACK_COLORS, type Track } from "./tracks";

const trackKeys: Track[] = ["everyone", "physicists", "programmers"];

export function TrackSwitcher() {
  const [selected, setSelected] = useState<Track | null>(null);

  return (
    <div className="not-prose">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelected(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === null
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-400 dark:hover:bg-neutral-700"
          }`}
        >
          Все
        </button>
        {trackKeys.map((track) => (
          <button
            key={track}
            onClick={() => setSelected(selected === track ? null : track)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selected === track
                ? `${TRACK_COLORS[track].bg} ${TRACK_COLORS[track].text} ring-1 ring-current`
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-400 dark:hover:bg-neutral-700"
            }`}
          >
            {TRACK_LABELS[track]}
          </button>
        ))}
      </div>

      {/* Lecture cards */}
      <div className="space-y-3">
        {lectures.map((lecture) => {
          const highlighted =
            selected === null ||
            lecture.tracks.includes(selected) ||
            lecture.tracks.includes("everyone");

          return (
            <a
              key={lecture.slug}
              href={`/docs/course/${lecture.slug}`}
              className={`block p-4 border rounded-lg transition-all duration-200 ${
                highlighted
                  ? "border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700"
                  : "border-gray-100 dark:border-neutral-900 opacity-40"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-sm font-mono text-gray-400 dark:text-gray-500 pt-0.5 shrink-0">
                  {lecture.number}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {lecture.title}
                    </h3>
                    {lecture.tracks.map((track) => (
                      <span
                        key={track}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${TRACK_COLORS[track].bg} ${TRACK_COLORS[track].text}`}
                      >
                        {TRACK_LABELS[track]}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {lecture.description}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
