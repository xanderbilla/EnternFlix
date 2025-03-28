import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 mt-8 py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div className="flex flex-col space-y-6">
            <Image
              src="/logo.png"
              height={90}
              width={150}
              alt="EnternFlix Logo"
              className="h-12 object-contain"
            />
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition">
                <BsFacebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <BsTwitter size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <BsInstagram size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <BsGithub size={20} />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/movies" className="hover:text-white transition">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/tv-shows" className="hover:text-white transition">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/my-list" className="hover:text-white transition">
                  My List
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie" className="hover:text-white transition">
                  Cookie Preferences
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="hover:text-white transition">
                  Corporate Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@enternflix.com"
                  className="hover:text-white transition"
                >
                  support@enternflix.com
                </a>
              </li>
            </ul>
          </div>
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
