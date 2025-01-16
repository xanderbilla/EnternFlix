import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Movie {
  backdrop_path?: string;
  poster_path?: string;
  profile_path?: string;
  media_type: string;
  name: string;
}

interface Props {
  title: string;
  data: Movie[];
}

export default function SearchList({ title, data }: Props) {
  const router = useRouter();

  return data?.[0]?.media_type === "person" ? (
    <div className="py-4">
      <h1 className="text-4xl font-bold mb-6 text-white">Cast</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {data.map(
          (person, index) =>
            person.profile_path && (
              <div key={index} className="w-48 h-56 p-1 rounded shadow">
                <div className="h-full flex flex-col items-center cursor-pointer">
                  <Image
                    width={1920}
                    height={1080}
                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                    alt="Person Image"
                    className="h-32 w-32 md:h-48 md:w-48 object-cover rounded-full"
                  />
                  <div className="text-white mt-2 text-center text-sm md:text-base">
                    {person.name}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  ) : (
    <div className="py-4">
      <h1 className="text-4xl font-bold mb-6 text-white">{title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {data.map((movie, index) => (
          <div key={index} className="bg-zinc-800 w-48 h-72 rounded shadow">
            <div
              className="h-full cursor-pointer"
              onClick={() => router.push(`/title/70205012`)}
            >
              <Image
                width={1920}
                height={1080}
                src={`https://image.tmdb.org/t/p/w500${
                  movie.poster_path || movie.backdrop_path
                }`}
                alt="Movie Poster"
                className="h-full w-full object-cover rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
