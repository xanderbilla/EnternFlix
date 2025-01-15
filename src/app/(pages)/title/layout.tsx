import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EnternFlix",
  description: "Next Gen Entertainment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
