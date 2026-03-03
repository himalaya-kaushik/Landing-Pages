"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/** Navigation links matching the Stitch design. */
const NAV_LINKS = [
  { label: "Live Updates", href: "#live" },
  { label: "Menu", href: "#menu" },
  { label: "Reserve", href: "#reserve" },
  { label: "Find Us", href: "#location" },
];

/**
 * @description Fixed-position navigation bar with glassmorphism effect.
 * Features "THE FALCON" branding, gold-accent nav links, and a
 * hamburger menu on mobile. Background opacity increases on scroll.
 *
 * @returns {JSX.Element} The sticky navbar component.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    /**
     * Tracks scroll position to toggle the opaque navbar background.
     * Fires on every scroll event — lightweight since it only sets a boolean.
     */
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * @description Closes mobile menu and scrolls to a section.
   * @param {React.MouseEvent<HTMLAnchorElement>} event - Click event.
   */
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false);
    const href = event.currentTarget.getAttribute("href");

    if (href && href.startsWith("#")) {
      event.preventDefault();
      const targetElement = document.querySelector(href);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-falcon-black/90 backdrop-blur-xl border-b border-falcon-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <span className="text-2xl font-bold tracking-widest text-falcon-gold">
              THE FALCON
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="text-sm font-medium tracking-wide text-falcon-text-secondary
                  hover:text-falcon-gold transition-colors duration-300
                  relative after:absolute after:bottom-[-4px] after:left-0
                  after:w-0 after:h-[2px] after:bg-falcon-gold
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reserve"
              onClick={handleNavClick}
              className="px-6 py-2.5 bg-falcon-gold text-falcon-black text-sm
                font-semibold rounded-lg hover:bg-falcon-gold-hover
                transition-colors duration-300"
            >
              Book a Table
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-falcon-text-secondary
              hover:text-falcon-gold transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-falcon-dark/95 backdrop-blur-xl
              border-t border-falcon-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-lg font-medium text-falcon-text-secondary
                    hover:text-falcon-gold transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reserve"
                onClick={handleNavClick}
                className="mt-2 px-6 py-3 bg-falcon-gold text-falcon-black
                  text-center font-semibold rounded-lg
                  hover:bg-falcon-gold-hover transition-colors"
              >
                Book a Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
