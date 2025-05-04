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
}

interface Props {
  mediaType: "movie" | "tv";
  data: Movie;
  isLoading?: boolean;
}

const TitleInfo: React.FC<Props> = ({ mediaType, data, isLoading = false }) => {
  return (
    <div className="w-full py-12 bg-gradient-to-b from-zinc-900/50 to-zinc-900">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-12 px-4 md:px-12">
          {/* Left Column - Created By */}
          <div className="space-y-8 flex-1">
            {!isLoading && data.created_by && data.created_by.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-12 bg-red-950 rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Created By
                  </h2>
                </div>
                <div className="flex flex-wrap gap-6">
                  {data.created_by.map((creator) => (
                    <div
                      key={creator.id}
                      className="flex flex-col items-center gap-3 w-32"
                    >
                      <div className="relative w-20 h-20 rounded-full overflow-hidden">
                        <Image
                          src={`https://image.tmdb.org/t/p/original${creator.profile_path}`}
                          alt={creator.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-white text-center">
                        {creator.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Production Companies */}
          <div className="space-y-8 flex-1">
            {!isLoading && data.production_companies.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-12 bg-red-950 rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Production Companies
                  </h2>
                </div>
                <div className="flex flex-wrap gap-6">
                  {data.production_companies.map((company) => (
                    <div
                      key={company.id}
                      className="flex flex-col items-center gap-3 w-32"
                    >
                      {company.logo_path ? (
                        <div className="relative w-32 h-16">
                          <Image
                            src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                            alt={company.name}
                            fill
                            className="object-contain brightness-0 invert"
                          />
                        </div>
                      ) : (
                        <span className="text-white text-center">
                          {company.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleInfo;
