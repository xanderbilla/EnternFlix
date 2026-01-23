import Link from "next/link";
import { FooterLinkGroupProps } from "@/types/components";

export default function FooterLinkGroup({
  title,
  links,
}: FooterLinkGroupProps) {
  return (
    <div>
      <h3 className="text-white font-medium mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {link.isEmail ? (
              <a href={link.href} className="hover:text-white transition">
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="hover:text-white transition">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
