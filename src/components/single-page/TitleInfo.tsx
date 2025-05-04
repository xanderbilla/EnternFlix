import React from "react";
import Image from "next/image";

interface Movie {
  id: number;
  genres: Array<{ id: number; name: string }>;
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status: string;
  tagline?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  created_by?: Array<{ id: number; name: string; profile_path: string }>;
  production_companies: Array<{ id: number; name: string; logo_path: string }>;
  poster_path: string;
  title?: string;
  name?: string;
}

interface Props {
  mediaType: "movie" | "tv";
  data: Movie;
  isLoading?: boolean;
}

const TitleInfo: React.FC<Props> = ({ mediaType, data, isLoading = false }) => {
  return (
    <div
      className={`mx-8 mb-8 sm:mb-10 md:mb-12 rounded-xl overflow-visible ${
        mediaType == "tv" ? "hidden" : "flex"
      } flex-col lg:flex-row items-stretch gap-4 md:gap-6`}
    >
      {/* Poster */}
      <div className="flex justify-center items-center w-full lg:w-[280px] flex-shrink-0 self-center">
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={`${data.title ?? data.name} poster`}
            width={280}
            height={420}
            className="rounded-lg shadow-md object-contain w-full h-full"
            style={{
              maxHeight: "420px",
              width: "auto",
              height: "auto",
              background: "#23272f",
            }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-center bg-zinc-800/60 rounded-xl p-4 sm:p-6 md:p-8 min-w-0 h-[420px]">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 h-full">
          {/* Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {data.title ?? data.name}
              </h2>
              <div className="flex items-center gap-2 text-zinc-400 flex-wrap">
                <span className="text-sm">
                  {data.release_date?.split("-")[0] ??
                    data.first_air_date?.split("-")[0]}
                </span>
                <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                <span className="text-sm">
                  {data.runtime
                    ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4 flex-grow">
              <div className="space-y-2">
                <h4 className="text-sm text-zinc-400 uppercase tracking-wider">
                  Genres
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.genres.map((genre) => (
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
                  <p className="text-sm text-zinc-300">{data.status}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-zinc-400 uppercase tracking-wider">
                    Rating
                  </h4>
                  <p className="text-sm text-zinc-300">
                    {data.vote_average?.toFixed(1)}/10
                  </p>
                </div>
                {mediaType === "tv" && (
                  <div className="space-y-1">
                    <h4 className="text-sm text-zinc-400 uppercase tracking-wider">
                      Seasons
                    </h4>
                    <p className="text-sm text-zinc-300">
                      {data.number_of_seasons}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="space-y-6 flex-grow">
              {/* Production Companies */}
              {data.production_companies.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Production Companies
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {data.production_companies.map((company) => (
                      <div
                        key={company.id}
                        className="flex flex-col items-center gap-2"
                      >
                        {company.logo_path ? (
                          <div className="relative w-24 h-12">
                            <Image
                              src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                              alt={company.name}
                              fill
                              className="object-contain brightness-0 invert"
                            />
                          </div>
                        ) : (
                          <span className="text-white text-sm">
                            {company.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Created By */}
              {mediaType === "tv" &&
                data.created_by &&
                data.created_by.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      Created By
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {data.created_by.map((creator) => (
                        <div
                          key={creator.id}
                          className="flex flex-col items-center gap-2"
                        >
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={`https://image.tmdb.org/t/p/original${creator.profile_path}`}
                              alt={creator.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-white text-sm">
                            {creator.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleInfo;
