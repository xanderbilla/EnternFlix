import React from "react";
import TitlePoster from "./TitlePoster";
import TitleMetadata from "./TitleMetadata";
import ProductionInfo from "./ProductionInfo";

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
  const title = data.title ?? data.name ?? "";
  const year =
    data.release_date?.split("-")[0] ?? data.first_air_date?.split("-")[0];
  const runtime = data.runtime
    ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
    : "N/A";
  const rating = `${data.vote_average?.toFixed(1)}/10`;

  return (
    <div
      className={`mx-8 mb-8 sm:mb-10 md:mb-12 rounded-xl overflow-visible ${
        mediaType == "tv" ? "hidden" : "flex"
      } flex-col lg:flex-row items-stretch gap-4 md:gap-6`}
    >
      <TitlePoster posterPath={data.poster_path} title={title} />

      <div className="flex-1 flex flex-col justify-center bg-zinc-800/60 rounded-xl p-4 sm:p-6 md:p-8 min-w-0 h-[420px]">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 h-full">
          <TitleMetadata
            title={title}
            year={year}
            runtime={runtime}
            genres={data.genres}
            status={data.status}
            rating={rating}
            seasons={data.number_of_seasons}
            mediaType={mediaType}
          />
          <ProductionInfo
            productionCompanies={data.production_companies}
            creators={data.created_by}
            mediaType={mediaType}
          />
        </div>
      </div>
    </div>
  );
};

export default TitleInfo;
