import React from "react";
import Image from "next/image";
import { BsStarFill, BsCalendar } from "react-icons/bs";

interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  name: string;
  overview: string;
  media_type: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  profile_path?: string;
}

interface SearchListProps {
  title: string;
  data: Movie[];
}

const SearchList: React.FC<SearchListProps> = ({ title, data }) => {
  const getImagePath = (item: Movie) => {
    if (item.media_type === "person") {
      return item.profile_path
        ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
        : "/img/default-avatar.png";
    }
    return item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : "/img/default-movie.png";
  };

  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).getFullYear();
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((item) => (
          <div key={item.id} className="relative group cursor-pointer">
            <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-zinc-800">
              <Image
                src={getImagePath(item)}
                alt={item.title || item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 text-sm text-white/90 mb-2">
                    {item.vote_average && (
                      <span className="flex items-center gap-1">
                        <BsStarFill className="text-yellow-500" />
                        {item.vote_average.toFixed(1)}
                      </span>
                    )}
                    {(item.release_date || item.first_air_date) && (
                      <span className="flex items-center gap-1">
                        <BsCalendar />
                        {formatDate(item.release_date ?? item.first_air_date)}
                      </span>
                    )}
                  </div>
                  <p className="text-white text-sm line-clamp-2">
                    {item.overview}
                  </p>
                </div>
              </div>
            </div>
            <h3 className="mt-2 text-white font-medium line-clamp-1">
              {item.title || item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchList;
