import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Manage your EnternFlix account settings, subscription, security, devices, and profiles. Update your preferences and account information.",
  keywords: [
    "account",
    "settings",
    "profile",
    "subscription",
    "security",
    "devices",
    "preferences",
  ],
  openGraph: {
    title: "Account Settings - EnternFlix",
    description:
      "Manage your EnternFlix account settings, subscription, security, devices, and profiles. Update your preferences and account information.",
    type: "website",
    siteName: "EnternFlix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Account Settings - EnternFlix",
    description:
      "Manage your EnternFlix account settings, subscription, security, devices, and profiles. Update your preferences and account information.",
  },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
