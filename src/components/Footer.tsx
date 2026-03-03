import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

/** Footer navigation link groups. */
const FOOTER_LINKS = {
  explore: [
    { label: "Menu", href: "#menu" },
    { label: "Events", href: "#live" },
    { label: "Reservations", href: "#reserve" },
    { label: "Gallery", href: "#" },
  ],
  info: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#location" },
    { label: "Privacy Policy", href: "#" },
  ],
};

/** Social media links. */
const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://instagram.com/thefalconcafe", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/thefalconcafe", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/thefalconcafe", label: "Twitter" },
];

/**
 * @description Site footer with branding, navigation links, social icons,
 * and a staff login link. Matches the "Footer & Staff Login Modal"
 * Stitch screen aesthetic.
 *
 * @returns {JSX.Element} The footer component.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-falcon-dark border-t border-falcon-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <span className="text-2xl font-bold tracking-widest text-falcon-gold">
              THE FALCON
            </span>
            <p className="mt-4 text-falcon-text-secondary text-sm max-w-sm leading-relaxed">
              Panchkula&apos;s premier destination for fine dining, craft
              cocktails, and unforgettable evenings. Sector 16.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-falcon-surface
                      border border-falcon-border flex items-center
                      justify-center text-falcon-text-secondary
                      hover:text-falcon-gold hover:border-falcon-gold/30
                      transition-all duration-300"
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4
              className="text-sm font-semibold tracking-[0.15em]
                uppercase text-falcon-gold mb-4"
            >
              Explore
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-falcon-text-secondary
                      hover:text-falcon-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4
              className="text-sm font-semibold tracking-[0.15em]
                uppercase text-falcon-gold mb-4"
            >
              Information
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.info.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-falcon-text-secondary
                      hover:text-falcon-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 border-t border-falcon-border
            flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-falcon-text-muted">
            © {currentYear} The Falcon Cafe &amp; Lounge. All rights reserved.
          </p>
          <Link
            href="/admin"
            className="text-xs text-falcon-text-muted
              hover:text-falcon-gold transition-colors duration-300"
          >
            Staff Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
