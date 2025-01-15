import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsGithub, BsTwitter, BsX, BsXLg } from "react-icons/bs";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="h-48 bg-zinc-900 text-zinc-400 mt-8 flex items-center justify-between px-8">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.png"
          height={90}
          width={150}
          alt="EnternFlix Logo"
          className="h-12"
        />
        <div className="flex space-x-4 mt-4">
        <Link href="#">
            <BsFacebook size={24} />
          </Link>
          <Link href="#">
            <Image
                src="/x.svg"
                width={24}
                height={24}
                alt="Twitter"
                />
          </Link>
          <Link href="#">
            <BsGithub size={24} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">
            Home
          </a>
          <a href="#" className="hover:text-white">
            About
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </div>
        <div className="mt-4">
          <p>&copy; 2023 EnternFlix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
