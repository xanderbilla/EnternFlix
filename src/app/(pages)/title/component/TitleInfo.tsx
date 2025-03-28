import React from "react";

interface Movie {
  id: number;
  genres: Array<{ id: number; name: string }>;
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status: string;
  tagline?: string;
  created_by?: Array<{ id: number; name: string; profile_path: string }>;
  production_companies: Array<{ id: number; name: string; logo_path: string }>;
}

interface Props {
  mediaType: "movie" | "tv";
  data: Movie;
}

const TitleInfo: React.FC<Props> = ({ mediaType, data }) => {
  return (
    <div className="px-4 md:px-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Basic Info */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white/90">
            Details
          </h2>
          <div className="space-y-6">
            {/* Genres */}
            <div className="text-lg">
              <span className="text-gray-400 font-medium">Genres: </span>
              <span className="text-white/90">
                {data.genres.map((genre) => genre.name).join(", ")}
              </span>
            </div>

            {/* Duration/Seasons */}
            {mediaType === "movie" && data.runtime && (
              <div className="text-lg">
                <span className="text-gray-400 font-medium">Duration: </span>
                <span className="text-white/90">
                  {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
                </span>
              </div>
            )}
            {mediaType === "tv" && (
              <>
                <div className="text-lg">
                  <span className="text-gray-400 font-medium">Seasons: </span>
                  <span className="text-white/90">
                    {data.number_of_seasons}
                  </span>
                </div>
                <div className="text-lg">
                  <span className="text-gray-400 font-medium">Episodes: </span>
                  <span className="text-white/90">
                    {data.number_of_episodes}
                  </span>
                </div>
              </>
            )}

            {/* Status */}
            <div className="text-lg">
              <span className="text-gray-400 font-medium">Status: </span>
              <span className="text-white/90">{data.status}</span>
            </div>

            {/* Tagline */}
            {data.tagline && (
              <div className="text-lg">
                <span className="text-gray-400 font-medium">Tagline: </span>
                <span className="text-white/90 italic">
                  &ldquo;{data.tagline}&rdquo;
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Production Info */}
        <div>
          {mediaType === "tv" &&
            data.created_by &&
            data.created_by.length > 0 && (
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white/90">
                  Created By
                </h2>
                <div className="flex flex-wrap gap-6">
                  {data.created_by.map((creator) => (
                    <div key={creator.id} className="text-center">
                      <div className="text-lg text-white/90">
                        {creator.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {data.production_companies.length > 0 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white/90">
                Production Companies
              </h2>
              <div className="flex flex-wrap gap-6">
                {data.production_companies.map((company) => (
                  <div key={company.id} className="text-lg text-white/90">
                    {company.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleInfo;
