import { Fragment } from "react";

interface SubtitleDisplayProps {
  subtitle: string;
}

export default function SubtitleDisplay({ subtitle }: SubtitleDisplayProps) {
  if (!subtitle) return null;

  const lines = subtitle.split("\n");

  return (
    <div className="absolute bottom-24 left-0 right-0 flex justify-center px-4 pointer-events-none z-20">
      <div
        className="bg-black/80 text-white px-4 py-2 rounded text-lg md:text-xl font-medium text-center max-w-4xl"
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
        }}
      >
        {lines.map((line, index) => (
          <Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
