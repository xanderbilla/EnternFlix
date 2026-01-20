import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - EnternFlix",
  description:
    "Sign in to your EnternFlix account or create a new account to start streaming movies, TV shows, and anime.",
  keywords: [
    "sign in",
    "login",
    "register",
    "account",
    "authentication",
    "streaming",
  ],
  openGraph: {
    title: "Sign In - EnternFlix",
    description:
      "Sign in to your EnternFlix account or create a new account to start streaming movies, TV shows, and anime.",
    type: "website",
    siteName: "EnternFlix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In - EnternFlix",
    description:
      "Sign in to your EnternFlix account or create a new account to start streaming movies, TV shows, and anime.",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
