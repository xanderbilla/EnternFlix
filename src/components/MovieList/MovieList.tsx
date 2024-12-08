"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "@/helper/axios";
import MovieCard from "../MovieCard/MovieCard";

interface Movie {
  id: number;
  // Define other properties of the movie here
}

interface MovieListProps {
  // data: Record<string, any>[];
  data: string;
//   data: { results: Movie[] };
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const base_url = 'https://image.tmdb.org/t/p/original/';

    const fetchData = useCallback(async () => {
        try {
            const request = await axios.get(data);
            setMovies(request.data.results);
            return request;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }, [data]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!movies || movies.length === 0) {
        return null;
    }


    console.log(movies);
    

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div className="mb-8">
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {movies.slice(0, 7).map((movie) => (
                        <MovieCard key={movie.id} data={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;