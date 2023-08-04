"use client"

import requests from '@/helper/request';
import axios from '@/helper/axios';
import React, { useEffect, useState } from 'react'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import {BsPlayFill} from 'react-icons/bs'
import Image from 'next/image';

const Banner = () => {

    const [movie, setMovie] = useState([])

    const fetchData = async () => {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
            request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
            ]
        )
        return request
    }

    console.log(movie);

    useEffect(() => {
        fetchData()
    }, [])

    const truncate = (string:string, n:number) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }
    return (
        <div className="relative h-4/5">
            <Image className='w-full h-full object-cover brightness-[60%]' 
            fill
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} 
            alt="" />
            <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
                <p className='text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl 
                font-bold drop-shadow-xl'>
                    {movie?.title || movie?.name || movie?.original_name}
                    </p>
                    <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 
                    w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                        {truncate(movie?.overview, 150)}
                    </p>
                    <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                        <button className="bg-white text-black rounded-[4px] 
                        py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold 
                        flex flex-row items-center hover:bg-neutral-300 transition">
                            <BsPlayFill className="mr-1"/> Play
                        </button>
                        <button className="bg-white text-white bg-opacity-30 rounded-[4px] 
                        py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold 
                        flex flex-row items-center hover:bg-opacity-20 gap-1 transition">
                            <AiOutlineInfoCircle className="mr-1"/> More Info
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default Banner