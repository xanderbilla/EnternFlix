import Link from "next/link";
import { FooterLinkGroupProps } from "@/types/components";

export default function FooterLinkGroup({
  title,
  links,
}: FooterLinkGroupProps) {
  return (
    <div>
      <h3 className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">
        {title}
      </h3>
      <ul className="space-y-1.5 sm:space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {link.isEmail ? (
              <a
                href={link.href}
                className="hover:text-white transition text-xs sm:text-sm"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="hover:text-white transition text-xs sm:text-sm"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
