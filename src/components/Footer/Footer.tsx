import Link from "next/link";
import React from "react";
import FooterBrand from "./FooterBrand";
import FooterLinkGroup from "./FooterLinkGroup";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/tv-shows", label: "TV Shows" },
  { href: "/my-list", label: "My List" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookie", label: "Cookie Preferences" },
  { href: "/corporate", label: "Corporate Information" },
];

const contactLinks = [
  { href: "/help", label: "Help Center" },
  { href: "/support", label: "Support" },
  { href: "/faq", label: "FAQ" },
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterBrand />
          <FooterLinkGroup title="Navigation" links={navigationLinks} />
          <FooterLinkGroup title="Legal" links={legalLinks} />
          <FooterLinkGroup title="Contact Us" links={contactLinks} />
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} EnternFlix. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
              <Link href="/jobs" className="hover:text-white transition">
                Jobs
              </Link>
              <Link href="/press" className="hover:text-white transition">
                Press
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
