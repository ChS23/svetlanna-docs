"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { lectures, TRACK_LABELS, TRACK_STYLES } from "./tracks";

export function TrackBadges({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";
  const lecture = lectures.find((l) => l.slug === slug);
  if (!lecture) return null;
  if (!mounted) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
      {lecture.tracks.map((track) => {
        const s = TRACK_STYLES[track];
        return (
          <span
            key={track}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.125rem 0.625rem",
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
  );
}
