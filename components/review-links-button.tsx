"use client";

import { useEffect, useRef, useState } from "react";

/**
 * @description Review platform link data — name, URL, and brand color
 * used to render each option in the popup.
 */
const REVIEW_PLATFORMS = [
  {
    name: "TripAdvisor",
    href: "https://www.tripadvisor.in/Restaurant_Review-g297616-d14883123-Reviews-Falcon_Cafe_Lounge-Panchkula_Panchkula_District_Haryana.html",
    color: "#34e0a1",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <circle cx="8.5" cy="14" r="2" />
        <circle cx="15.5" cy="14" r="2" />
        <circle cx="8.5" cy="14" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="15.5" cy="14" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 14a7 7 0 0 1 14 0" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M12 7 L15 5 L9 5 Z" />
      </svg>
    ),
  },
  {
    name: "Zomato",
    href: "https://www.zomato.com/chandigarh/falcon-dine-lounge-sector-16-panchkula/reviews",
    color: "#e23744",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <rect x="3" y="8" width="18" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="14.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">Z</text>
      </svg>
    ),
  },
  {
    name: "JustDial",
    href: "https://www.justdial.com/Panchkula/Falcon-Cafe-Lounge-Near-Hdfc-Bank-Panchkula-Sector-16/0172PX172-X172-171203180213-Z8M9_BZDET",
    color: "#0066cc",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">Jd</text>
      </svg>
    ),
  },
];

/**
 * @description A "View More Reviews" button that opens a small popup
 * with links to TripAdvisor, Zomato, and JustDial review pages.
 * Closes when clicking outside or pressing Escape.
 *
 * @returns {JSX.Element} The review links button and popup component.
 *
 * @example
 * <ReviewLinksButton />
 */
export function ReviewLinksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  /**
   * Close the popup when clicking outside of it
   * or when the Escape key is pressed.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={popoverRef} className="relative inline-flex justify-center">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-[#d9b493] bg-white px-7 py-3 font-semibold text-[#8d5f34] shadow-sm transition hover:bg-[#fff2e4] hover:shadow-md"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        View More Reviews
        <span
          className={`inline-block text-xs transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-3 w-72 animate-[fadeIn_0.15s_ease-out] rounded-2xl border border-[#edd9c6] bg-white p-2 shadow-[0_16px_40px_rgba(49,31,9,0.14)]">
          {REVIEW_PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-[#fef5eb]"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${platform.color}18`,
                  color: platform.color,
                }}
              >
                {platform.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#311f09]">
                  {platform.name}
                </p>
                <p className="text-xs text-[#8a6a4d]">
                  Read reviews →
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
