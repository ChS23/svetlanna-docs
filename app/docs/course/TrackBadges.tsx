import { lectures, TRACK_LABELS, TRACK_COLORS } from "./tracks";

export function TrackBadges({ slug }: { slug: string }) {
  const lecture = lectures.find((l) => l.slug === slug);
  if (!lecture) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2 mb-6 not-prose">
      {lecture.tracks.map((track) => (
        <span
          key={track}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${TRACK_COLORS[track].bg} ${TRACK_COLORS[track].text}`}
        >
          {TRACK_LABELS[track]}
        </span>
      ))}
    </div>
  );
}
