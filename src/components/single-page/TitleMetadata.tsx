import React from "react";

interface Genre {
  id: number;
  name: string;
}

interface Props {
  title: string;
  year: string | undefined;
  runtime: string;
  genres: Genre[];
  status: string;
  rating: string;
  seasons?: number;
  mediaType: "movie" | "tv";
}

const TitleMetadata: React.FC<Props> = ({
  title,
  year,
  runtime,
  genres,
  status,
  rating,
  seasons,
  mediaType,
}) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center gap-2 text-zinc-400 flex-wrap">
          <span className="text-sm">{year}</span>
          <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
          <span className="text-sm">{runtime}</span>
        </div>
      </div>

      <div className="mt-6 space-y-4 flex-grow">
        <div className="space-y-2">
          <h4 className="text-sm text-zinc-400 uppercase tracking-wider">
            Genres
          </h4>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-1 bg-zinc-700/50 rounded text-sm text-zinc-300"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1">
            <h4 className="text-sm text-zinc-400 uppercase tracking-wider">
              Status
            </h4>
            <p className="text-sm text-zinc-300">{status}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm text-zinc-400 uppercase tracking-wider">
              Rating
            </h4>
            <p className="text-sm text-zinc-300">{rating}</p>
          </div>
          {mediaType === "tv" && seasons && (
            <div className="space-y-1">
              <h4 className="text-sm text-zinc-400 uppercase tracking-wider">
                Seasons
              </h4>
              <p className="text-sm text-zinc-300">{seasons}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleMetadata;
