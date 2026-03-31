"use client";

import MovieGrid from "@/components/UI/MovieGrid";
import type { Movie } from "@/types/movie";

interface CastInfoProps {
  castName: string;
  movies: Movie[];
  onMovieClick: (movieId: number | string) => void;
}

export default function CastInfo({
  castName,
  movies,
  onMovieClick,
}: CastInfoProps) {
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hardcoded cast information (in real app, this would come from API)
  const castData = {
    name: castName,
    stageName: "JS",
    bio: "Professional film and television actress known for versatile performances in drama and action genres. Recognized for strong screen presence and commitment to character-driven roles.",
    birthDate: "May 15, 1990",
    birthPlace: "Los Angeles, California, USA",
    nationality: "American",
    gender: "Female",
    height: "170 cm",
    debutYear: 2010,
    careerStatus: "Active",
    measurements: {
      bodyType: "Athletic",
      eyeColor: "Blue",
      hairColor: "Dark Brown",
    },
    tags: [
      "Award Winning",
      "Action Star",
      "Dramatic Performer",
      "Stunt Performer",
      "Method Actor",
    ],
    categories: ["Drama", "Action"],
    specialties: ["Method Acting", "Stunts"],
  };

  return (
    <>
      {/* Movie Grid - Below Title */}
      <MovieGrid
        movies={movies}
        onMovieClick={onMovieClick}
        columns={4}
        disableHover={true}
      />

      {/* Info Content - Always visible */}
      <div className="bg-zinc-900">
        <div className="px-4 md:px-16 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Bio */}
            <div>
              {/* Bio */}
              <p className="text-white/80 text-sm leading-relaxed">
                {castData.bio}
              </p>
            </div>

            {/* Right Column - Quick Info */}
            <div>
              <div className="text-sm mb-2">
                <span className="text-gray-400">Gender: </span>
                <span className="text-white/80">{castData.gender}</span>
              </div>
              <div className="text-sm mb-2">
                <span className="text-gray-400">Career Status: </span>
                <span className="text-white/80">{castData.careerStatus}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Tags: </span>
                <span className="text-white/80">
                  {castData.tags.slice(0, 3).map((tag, index) => (
                    <span key={index}>
                      <button className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors">
                        {tag}
                      </button>
                      {index < Math.min(castData.tags.length, 3) - 1 && ", "}
                    </span>
                  ))}
                  {castData.tags.length > 3 && (
                    <>
                      {", "}
                      <button
                        onClick={handleScrollToAbout}
                        className="italic hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                      >
                        more
                      </button>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* About Section - Matching DialogAboutSection styling */}
          <div id="about-section" className="mt-12">
            <h2 className="text-white/80 text-xl mb-6">
              About{" "}
              <span className="font-medium text-2xl">{castData.name}</span>
            </h2>

            <div className="space-y-2">
              {/* Birth Date */}
              <div className="text-sm">
                <span className="text-gray-400">Birth Date: </span>
                <span className="text-white/80">{castData.birthDate}</span>
              </div>

              {/* Birth Place */}
              <div className="text-sm">
                <span className="text-gray-400">Birth Place: </span>
                <span className="text-white/80">{castData.birthPlace}</span>
              </div>

              {/* Nationality */}
              <div className="text-sm">
                <span className="text-gray-400">Nationality: </span>
                <span className="text-white/80">{castData.nationality}</span>
              </div>

              {/* Height */}
              <div className="text-sm">
                <span className="text-gray-400">Height: </span>
                <span className="text-white/80">{castData.height}</span>
              </div>

              {/* Debut Year */}
              <div className="text-sm">
                <span className="text-gray-400">Debut Year: </span>
                <span className="text-white/80">{castData.debutYear}</span>
              </div>

              {/* Body Type */}
              <div className="text-sm">
                <span className="text-gray-400">Body Type: </span>
                <span className="text-white/80">
                  {castData.measurements.bodyType}
                </span>
              </div>

              {/* Eye Color */}
              <div className="text-sm">
                <span className="text-gray-400">Eye Color: </span>
                <span className="text-white/80">
                  {castData.measurements.eyeColor}
                </span>
              </div>

              {/* Hair Color */}
              <div className="text-sm">
                <span className="text-gray-400">Hair Color: </span>
                <span className="text-white/80">
                  {castData.measurements.hairColor}
                </span>
              </div>

              {/* Categories */}
              <div className="text-sm">
                <span className="text-gray-400">Categories: </span>
                <span className="text-white/80">
                  {castData.categories.map((category, index) => (
                    <span key={index}>
                      <button className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors">
                        {category}
                      </button>
                      {index < castData.categories.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </div>

              {/* Specialties */}
              <div className="text-sm">
                <span className="text-gray-400">Specialties: </span>
                <span className="text-white/80">
                  {castData.specialties.map((specialty, index) => (
                    <span key={index}>
                      <button className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors">
                        {specialty}
                      </button>
                      {index < castData.specialties.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </div>

              {/* Tags */}
              <div className="text-sm">
                <span className="text-gray-400">Tags: </span>
                <span className="text-white/80">
                  {castData.tags.map((tag, index) => (
                    <span key={index}>
                      <button className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors">
                        {tag}
                      </button>
                      {index < castData.tags.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
