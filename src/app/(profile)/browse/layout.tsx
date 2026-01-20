import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Profile - EnternFlix",
  description:
    "Choose your profile to continue watching. Manage profiles and personalize your EnternFlix experience for each family member.",
  keywords: [
    "profile",
    "select profile",
    "family",
    "personalization",
    "user profiles",
  ],
  openGraph: {
    title: "Select Profile - EnternFlix",
    description:
      "Choose your profile to continue watching. Manage profiles and personalize your EnternFlix experience for each family member.",
    type: "website",
    siteName: "EnternFlix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Select Profile - EnternFlix",
    description:
      "Choose your profile to continue watching. Manage profiles and personalize your EnternFlix experience for each family member.",
  },
};

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
