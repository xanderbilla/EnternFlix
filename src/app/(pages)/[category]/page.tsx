import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPageContent from "@/components/CategoryPage/CategoryPageContent";
import { getCategoryConfig, getAllCategorySlugs } from "@/config/categories";

// Enable ISR - revalidate every hour
export const revalidate = 3600;

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((category) => ({
    category,
  }));
}

// Generate metadata dynamically for each category
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const config = getCategoryConfig(category);

  if (!config) {
    return {
      title: "Not Found - EnternFlix",
    };
  }

  return config.metadata;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const config = getCategoryConfig(category);

  // If category doesn't exist, show 404
  if (!config) {
    notFound();
  }

  return (
    <CategoryPageContent
      title={config.bannerTitle}
      description={config.bannerDescription}
      category={config.slug}
      movieLists={config.movieLists}
    />
  );
}
