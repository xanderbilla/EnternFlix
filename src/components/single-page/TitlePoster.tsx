import React from "react";
import Image from "next/image";

interface Props {
  posterPath: string;
  title: string;
}

const TitlePoster: React.FC<Props> = ({ posterPath, title }) => {
  return (
    <div className="flex justify-center items-center w-full lg:w-[280px] flex-shrink-0 self-center">
      <div className="flex items-center justify-center w-full h-full">
        <Image
          src={`https://image.tmdb.org/t/p/original${posterPath}`}
          alt={`${title} poster`}
          width={280}
          height={420}
          className="rounded-lg shadow-md object-contain w-full h-full max-h-[420px] bg-zinc-800"
        />
      </div>
    </div>
  );
};

export default TitlePoster;
