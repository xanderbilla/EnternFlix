import React from "react";

type Props = {};

export default function CategoryBanner({}: Props) {
    return (
        <div
            className="h-[50vh] bg-zinc-900 text-white flex flex-col justify-center items-start bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://image.tmdb.org/t/p/original/odVlTMqPPiMksmxpN9cCbPCjUPP.jpg')",
            }}
        >
            <div className="bg-gradient-to-r from-black to-transparent w-full md:w-2/3 h-full flex flex-col justify-center items-start p-4 md:p-12">
                <h1 className="text-3xl md:text-6xl font-extrabold">Category Name</h1>
                <p className="mt-4 w-full md:w-1/2 text-sm md:text-lg">
                    Explore a wide range of anime series and movies. Dive into the world
                    of animation and enjoy your favorite shows.
                </p>
            </div>
        </div>
    );
}
