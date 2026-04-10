"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { lectures, TRACK_LABELS, TRACK_STYLES, type Track } from "./tracks";

const trackKeys: Track[] = ["everyone", "physicists", "programmers"];

export function TrackSwitcher() {
  const [selected, setSelected] = useState<Track | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  if (!mounted) return null;

  return (
    <div style={{ marginTop: "1.5rem" }}>
      {/* Filter buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <button
          onClick={() => setSelected(null)}
          style={{
            padding: "0.375rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
            backgroundColor: selected === null
              ? (dark ? "#fff" : "#111")
              : (dark ? "#262626" : "#f3f4f6"),
            color: selected === null
              ? (dark ? "#111" : "#fff")
              : (dark ? "#9ca3af" : "#4b5563"),
          }}
        >
          Все
        </button>
        {trackKeys.map((track) => {
          const s = TRACK_STYLES[track];
          const active = selected === track;
          return (
            <button
              key={track}
              onClick={() => setSelected(active ? null : track)}
              style={{
                padding: "0.375rem 0.75rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                border: active ? `1px solid ${dark ? s.darkText : s.text}` : "none",
                cursor: "pointer",
                backgroundColor: active
                  ? (dark ? s.darkBg : s.bg)
                  : (dark ? "#262626" : "#f3f4f6"),
                color: active
                  ? (dark ? s.darkText : s.text)
                  : (dark ? "#9ca3af" : "#4b5563"),
              }}
            >
              {TRACK_LABELS[track]}
            </button>
          );
        })}
      </div>

      {/* Lecture cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {lectures.map((lecture) => {
          const highlighted =
            selected === null ||
            lecture.tracks.includes(selected) ||
            lecture.tracks.includes("everyone");

          return (
            <a
              key={lecture.slug}
              href={`/docs/course/${lecture.slug}`}
              style={{
                display: "block",
                padding: "1rem",
                border: `1px solid ${dark ? "#262626" : "#e5e7eb"}`,
                borderRadius: "0.5rem",
                textDecoration: "none",
                color: "inherit",
                opacity: highlighted ? 1 : 0.4,
                transition: "opacity 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.875rem", fontFamily: "monospace", color: dark ? "#6b7280" : "#9ca3af", paddingTop: "0.125rem", flexShrink: 0 }}>
                  {lecture.number}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <h3 style={{ fontWeight: 600, margin: 0, color: dark ? "#f3f4f6" : "#111" }}>
                      {lecture.title}
                    </h3>
                    {lecture.tracks.map((track) => {
                      const s = TRACK_STYLES[track];
                      return (
                        <span
                          key={track}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "0.125rem 0.5rem",
                            borderRadius: "9999px",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            backgroundColor: dark ? s.darkBg : s.bg,
                            color: dark ? s.darkText : s.text,
                          }}
                        >
                          {TRACK_LABELS[track]}
                        </span>
                      );
                    })}
                  </div>
                  <p style={{ fontSize: "0.875rem", color: dark ? "#9ca3af" : "#6b7280", marginTop: "0.25rem", marginBottom: 0 }}>
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
