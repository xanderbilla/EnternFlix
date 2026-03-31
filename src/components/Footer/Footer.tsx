import Link from "next/link";
import React from "react";
import FooterBrand from "./FooterBrand";
import FooterLinkGroup from "./FooterLinkGroup";

const navigationLinks = [
  { href: "/anime", label: "Anime" },
  { href: "/tv-shows", label: "TV Shows" },
  { href: "/movies", label: "Movies" },
];

const accountLinks = [
  { href: "/account", label: "My Account" },
  { href: "/browse", label: "Profiles" },
  { href: "/auth", label: "Sign In" },
];

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "About Us" },
];

const contactLinks = [
  { href: "#", label: "Help Center" },
  { href: "#", label: "FAQ" },
  {
    href: "mailto:support@enternflix.com",
    label: "support@enternflix.com",
    isEmail: true,
  },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 mt-8 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <FooterBrand />
          </div>
          <FooterLinkGroup title="Browse" links={navigationLinks} />
          <FooterLinkGroup title="Account" links={accountLinks} />
          <FooterLinkGroup title="Legal" links={legalLinks} />
          <FooterLinkGroup title="Support" links={contactLinks} />
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} EnternFlix. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <Link
                href="https://github.com/xanderbilla"
                className="hover:text-white transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Developer
              </Link>
              <Link
                href="https://github.com/xanderbilla/EnternFlix"
                className="hover:text-white transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
