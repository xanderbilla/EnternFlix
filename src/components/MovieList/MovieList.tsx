"use client"

import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import axios from '@/helper/axios'
import MovieCard from '../MovieCard/MovieCard';

interface MovieListProps {
    // data: Record<string, any>[];
    data: string;
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({data, title}) => {

    const [movies, setMovies] = useState([])
    const base_url = "https://image.tmdb.org/t/p/original/"

    const fetchData = async () => {
        const request = await axios.get(data);
        setMovies(request.data.results)
        return request
    }

    useEffect(() => {
        fetchData()
    }, [data])

    if(isEmpty(data)){
        return null;
    }

    

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
        <div className="mb-8">
            <p className="text-white text-md md:text-xl lg:text-2xl 
            font-semibold mb-4">
                {title}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {movies.map((movie) => (
                        <MovieCard key={movie?.id} data={movie}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default MovieList