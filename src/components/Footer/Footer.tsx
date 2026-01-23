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
    <footer className="bg-zinc-900 text-zinc-400 mt-8 py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <FooterBrand />
          <FooterLinkGroup title="Browse" links={navigationLinks} />
          <FooterLinkGroup title="Account" links={accountLinks} />
          <FooterLinkGroup title="Legal" links={legalLinks} />
          <FooterLinkGroup title="Support" links={contactLinks} />
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} EnternFlix. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
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
