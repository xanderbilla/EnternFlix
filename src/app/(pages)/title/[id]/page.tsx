import { Metadata } from "next";
import TitlePageContent from "@/components/TitlePage/TitlePageContent";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    // Fetch basic title info for metadata
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_DB_API_KEY}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    );

    if (response.ok) {
      const data = await response.json();
      const title = data.title || data.name || "EnternFlix";
      const description =
        data.overview || "Watch movies and TV shows on EnternFlix";

      return {
        title: `${title} - EnternFlix`,
        description,
        openGraph: {
          title: `${title} - EnternFlix`,
          description,
          images: data.backdrop_path
            ? [
                {
                  url: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
                  width: 1280,
                  height: 720,
                  alt: title,
                },
              ]
            : [],
        },
        twitter: {
          card: "summary_large_image",
          title: `${title} - EnternFlix`,
          description,
        },
      };
    }
  } catch (error) {
    // Fallback for TV shows or if movie fetch fails
    try {
      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_DB_API_KEY}`,
        { next: { revalidate: 3600 } },
      );

      if (tvResponse.ok) {
        const data = await tvResponse.json();
        const title = data.name || data.title || "EnternFlix";
        const description =
          data.overview || "Watch movies and TV shows on EnternFlix";

        return {
          title: `${title} - EnternFlix`,
          description,
          openGraph: {
            title: `${title} - EnternFlix`,
            description,
            images: data.backdrop_path
              ? [
                  {
                    url: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
                    width: 1280,
                    height: 720,
                    alt: title,
                  },
                ]
              : [],
          },
          twitter: {
            card: "summary_large_image",
            title: `${title} - EnternFlix`,
            description,
          },
        };
      }
    } catch (tvError) {
      // Continue to fallback
    }
  }

  // Fallback metadata
  return {
    title: "EnternFlix - Next Gen Entertainment",
    description: "Watch movies and TV shows on EnternFlix",
  };
}

export default async function TitlePage({ params }: PageProps) {
  const { id } = await params;
  return <TitlePageContent id={id} />;
}
