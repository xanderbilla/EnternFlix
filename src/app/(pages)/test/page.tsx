"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import requests from "@/helper/request";
import Navbar from "@/components/Navbar/Navbar";
import instance from "@/helper/axios";

interface Movie {
  backdrop_path: string;
  title: string;
  name: string;
  original_name: string;
  overview: string;
  media_type: string;
}

const quiz = [
  {
    id: 1,
    question: "Elvin",
    answer: "Guerza",
  },
  {
    id: 2,
    question: "Hyacinthie",
    answer: "Yellow-billed hornbill",
  },
  {
    id: 3,
    question: "Cristine",
    answer: "Four-spotted skimmer",
  },
  {
    id: 4,
    question: "Anallise",
    answer: "Warthog",
  },
  {
    id: 5,
    question: "Yolanthe",
    answer: "Monster, gila",
  },
  {
    id: 6,
    question: "Elayne",
    answer: "Avocet, pied",
  },
  {
    id: 7,
    question: "Amie",
    answer: "Red kangaroo",
  },
  {
    id: 8,
    question: "Glynda",
    answer: "Jackrabbit, white-tailed",
  },
  {
    id: 9,
    question: "Mareah",
    answer: "Pademelon, red-legged",
  },
  {
    id: 10,
    question: "Maressa",
    answer: "Stanley bustard",
  },
];

const Page: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null); // Changed initial state type
  const [searchRes, setSearchRes] = useState<Movie[]>([]); // Changed initial state type
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchSearchResults = async () => {
    try {
      const res = await instance.get(`${requests.searchRequest}${searchQuery}`);
      setSearchRes(res.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const fetchData = async () => {
    try {
      const request = await instance.get(requests.fetchTrending);
      const randomIndex = Math.floor(
        Math.random() * request.data.results.length
      );
      setMovie(request.data.results[randomIndex]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  console.log(searchRes);

  return (
    <>
      <Navbar />
      <div className="relative w-full ">
        {movie && (
          <>
            <div className="relative w-full h-80">
              <Image
                className="w-full h-full object-cover brightness-[80%]"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt=""
                width={1920} // Adjust width and height as needed
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-10/12 flex flex-col sm:flex-row items-center justify-center h-auto sm:h-36 gap-2 p-4">
              <input
                type="text"
                placeholder="Search for movies, TV shows, videos, or cast..."
                className="w-full sm:w-3/4 p-4 rounded bg-zinc-800 text-white text-lg focus:border-red-500"
                onChange={handleSearch}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 px-12">
        {quiz.map((result, index) => (
          <div
            key={index}
            className="border p-4 rounded bg-zinc-800 text-white"
          >
            <p className="mt-2">{result.question}</p>
            <button
              className="mt-4 p-2 bg-red-500 rounded text-white"
              onClick={() => {
                const answerElement = document.getElementById(
                  `answer-${index}`
                );
                if (answerElement) {
                  answerElement.style.display =
                    answerElement.style.display === "none" ? "block" : "none";
                }
              }}
            >
              Show Answer
            </button>
            <div
              id={`answer-${index}`}
              style={{ display: "none" }}
              className="mt-2"
            >
              <p>Answer: {result.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
