import React from "react";
import SearchItem from "./SearchItem";
import SearchItemSkeleton from "../Skeleton/SearchItemSkeleton";

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
  isLoading?: boolean;
}

const SearchList: React.FC<SearchListProps> = ({
  title,
  data,
  isLoading = false,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading
          ? // Show skeleton items while loading
            Array.from({ length: 10 }).map((_, index) => (
              <SearchItemSkeleton key={index} />
            ))
          : // Show actual items when data is loaded
            data.map((item) => <SearchItem key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default SearchList;
