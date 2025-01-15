import Image from "next/image";
import React from "react";

type Props = {
  mediaType: "movie" | "tv";
};

export default function TitleInfo({ mediaType }: Props) {
  return (
    <div className="px-12 py-8 bg-gradient-to-t from-zinc-950 to-transparent">
      <div className="text-2xl font-bold mb-4">
        {mediaType === "tv" ? "TV Series" : "Movie"} Info
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-lg font-medium">Release Year: 2021</div>
        <div className="text-lg font-medium">Language: English</div>
        <div className="text-lg font-medium">Studio: Studio Name</div>
        <div className="text-lg font-medium">Original Release Country: USA</div>
        <div className="text-lg font-medium">Genre: Drama</div>
      </div>
      <div className="mt-4">
        <div className="text-lg font-medium mb-4">Cast:</div>
        <div className="flex space-x-6">
          {["Actor 1", "Actor 2", "Actor 3"].map((actor, index) => (
            <div key={index} className="text-center">
              <Image
                width={100}
                height={100}
                src={`/img/cast.jpg`}
                alt={`Cast ${index + 1}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-sm mt-2">{actor}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
