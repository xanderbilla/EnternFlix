import React from "react";
import Image from "next/image";

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string;
}

interface Creator {
  id: number;
  name: string;
  profile_path: string;
}

interface Props {
  productionCompanies: ProductionCompany[];
  creators?: Creator[];
  mediaType: "movie" | "tv";
}

const ProductionInfo: React.FC<Props> = ({
  productionCompanies,
  creators,
  mediaType,
}) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col">
      <div className="space-y-6 flex-grow">
        {/* Production Companies */}
        {productionCompanies.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Production Companies
            </h3>
            <div className="flex flex-wrap gap-4">
              {productionCompanies.map((company) => (
                <div
                  key={company.id}
                  className="flex flex-col items-center gap-2"
                >
                  {company.logo_path ? (
                    <div className="relative w-24 h-12">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                        alt={company.name}
                        fill
                        className="object-contain brightness-0 invert"
                      />
                    </div>
                  ) : (
                    <span className="text-white text-sm">{company.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Created By */}
        {mediaType === "tv" && creators && creators.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Created By
            </h3>
            <div className="flex flex-wrap gap-4">
              {creators.map((creator) => (
                <div
                  key={creator.id}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${creator.profile_path}`}
                      alt={creator.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-white text-sm">{creator.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductionInfo;
