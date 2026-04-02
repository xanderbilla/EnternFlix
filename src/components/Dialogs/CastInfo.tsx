"use client";

import MovieGrid from "@/components/UI/MovieGrid";
import type { Movie } from "@/types/movie";
import { usePerson } from "@/hooks/api/usePerson";
import { useMemo, memo } from "react";

interface CastInfoProps {
  castId: string;
  castName: string;
  movies: Movie[];
  onMovieClick: (movieId: number | string) => void;
}

function CastInfo({ castId, castName, movies, onMovieClick }: CastInfoProps) {
  const { data: personData } = usePerson(castId);

  const handleScrollToAbout = useMemo(
    () => () => {
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );

  // Format birth date
  const formatDate = useMemo(
    () => (date?: string) => {
      if (!date) return null;
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return null;
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    },
    [],
  );

  const formattedBirthDate = useMemo(
    () => (personData?.birthDate ? formatDate(personData.birthDate) : null),
    [personData?.birthDate, formatDate],
  );

  return (
    <>
      {/* Movie Grid - Always visible */}
      <MovieGrid
        movies={movies}
        onMovieClick={onMovieClick}
        columns={4}
        disableHover={true}
        disableAnimation={true}
      />

      {/* Info Content - Only show when data is loaded */}
      {personData && (
        <div className="bg-zinc-900">
          <div className="px-4 md:px-16 py-8">
            {/* Bio and Quick Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Bio */}
              {personData.bio && (
                <div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {personData.bio}
                  </p>
                </div>
              )}

              {/* Right Column - Quick Info */}
              <div>
                {personData.careerStatus && (
                  <div className="text-sm mb-2">
                    <span className="text-gray-400">Career Status: </span>
                    <span className="text-white/80">
                      {personData.careerStatus}
                    </span>
                  </div>
                )}
                {personData.tags && personData.tags.length > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-400">Tags: </span>
                    <span className="text-white/80">
                      {personData.tags.slice(0, 3).map((tag, index) => (
                        <span key={tag.id}>
                          <button className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors">
                            {tag.name}
                          </button>
                          {index < Math.min(personData.tags!.length, 3) - 1 &&
                            ", "}
                        </span>
                      ))}
                      {personData.tags.length > 3 && (
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
                )}
              </div>
            </div>

            {/* About Section */}
            <div id="about-section" className="mt-12">
              <h2 className="text-white/80 text-xl mb-6">
                About <span className="font-medium text-2xl">{castName}</span>
              </h2>

              <div className="space-y-2">
                {formattedBirthDate && (
                  <div className="text-sm">
                    <span className="text-gray-400">Birth Date: </span>
                    <span className="text-white/80">{formattedBirthDate}</span>
                  </div>
                )}

                {personData.birthPlace && (
                  <div className="text-sm">
                    <span className="text-gray-400">Birth Place: </span>
                    <span className="text-white/80">
                      {personData.birthPlace}
                    </span>
                  </div>
                )}

                {personData.nationality && (
                  <div className="text-sm">
                    <span className="text-gray-400">Nationality: </span>
                    <span className="text-white/80">
                      {personData.nationality}
                    </span>
                  </div>
                )}

                {personData.height && (
                  <div className="text-sm">
                    <span className="text-gray-400">Height: </span>
                    <span className="text-white/80">
                      {personData.height} cm
                    </span>
                  </div>
                )}

                {personData.debutYear && (
                  <div className="text-sm">
                    <span className="text-gray-400">Debut Year: </span>
                    <span className="text-white/80">
                      {personData.debutYear}
                    </span>
                  </div>
                )}

                {personData.measurements?.bodyType && (
                  <div className="text-sm">
                    <span className="text-gray-400">Body Type: </span>
                    <span className="text-white/80">
                      {personData.measurements.bodyType}
                    </span>
                  </div>
                )}

                {(personData.measurements?.bust ||
                  personData.measurements?.waist ||
                  personData.measurements?.hips) && (
                  <div className="text-sm">
                    <span className="text-gray-400">Measurements: </span>
                    <span className="text-white/80">
                      {[
                        personData.measurements.bust &&
                          `${personData.measurements.bust}`,
                        personData.measurements.waist &&
                          `${personData.measurements.waist}`,
                        personData.measurements.hips &&
                          `${personData.measurements.hips}`,
                      ]
                        .filter(Boolean)
                        .join("-")}
                    </span>
                  </div>
                )}

                {personData.measurements?.eyeColor && (
                  <div className="text-sm">
                    <span className="text-gray-400">Eye Color: </span>
                    <span className="text-white/80">
                      {personData.measurements.eyeColor}
                    </span>
                  </div>
                )}

                {personData.measurements?.hairColor && (
                  <div className="text-sm">
                    <span className="text-gray-400">Hair Color: </span>
                    <span className="text-white/80">
                      {personData.measurements.hairColor}
                    </span>
                  </div>
                )}

                {personData.categories && personData.categories.length > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-400">Categories: </span>
                    <span className="text-white/80">
                      {personData.categories.map((category, index) => (
                        <span key={category.id}>
                          <button className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors">
                            {category.name}
                          </button>
                          {index < personData.categories!.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {personData.specialties &&
                  personData.specialties.length > 0 && (
                    <div className="text-sm">
                      <span className="text-gray-400">Specialties: </span>
                      <span className="text-white/80">
                        {personData.specialties.map((specialty, index) => (
                          <span key={specialty.id}>
                            <button className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors">
                              {specialty.name}
                            </button>
                            {index < personData.specialties!.length - 1 && ", "}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}

                {personData.tags && personData.tags.length > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-400">Tags: </span>
                    <span className="text-white/80">
                      {personData.tags.map((tag, index) => (
                        <span key={tag.id}>
                          <button className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors">
                            {tag.name}
                          </button>
                          {index < personData.tags!.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(CastInfo);
