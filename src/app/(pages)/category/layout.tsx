import dynamic from "next/dynamic";
import type { Metadata } from "next";

const Footer = dynamic(() => import("@/components/Footer/Footer"));
const Navbar = dynamic(() => import("@/components/Navbar/Navbar"));

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
        <Footer />
      </body>
    </html>
  );
}