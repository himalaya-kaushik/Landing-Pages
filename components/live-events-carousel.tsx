"use client";

import Image from "next/image";
import {
  faArrowLeft,
  faArrowRight,
  faChair,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";

export type LiveEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  seats: string;
  image: string;
};

type LiveEventsCarouselProps = {
  events: LiveEvent[];
};

export function LiveEventsCarousel({ events }: LiveEventsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (events.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % events.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [events.length]);

  const activeEvent = events[activeIndex];
  const nextEvent = useMemo(
    () => events[(activeIndex + 1) % events.length],
    [activeIndex, events]
  );

  if (!activeEvent) {
    return null;
  }

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex((current) =>
      current === 0 ? events.length - 1 : current - 1
    );
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % events.length);
  };

  return (
    <div className="overflow-hidden rounded-4xl border border-[#edd9c6] bg-white shadow-[0_20px_60px_rgba(49,31,9,0.08)]">
      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-[320px] md:min-h-[440px]">
          <Image
            src={activeEvent.image}
            alt={`${activeEvent.title} poster`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 55vw"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent" />
          <p className="absolute bottom-6 left-6 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#311f09]">
            {activeEvent.date}
          </p>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <p className="inline-flex rounded-full bg-[#fef4ea] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#b57f50]">
            Live events
          </p>

          <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#311f09]">
            {activeEvent.title}
          </h3>

          <div className="mt-5 space-y-2 text-sm text-[#5c452f]">
            <p>
              <FontAwesomeIcon icon={faClock} className="mr-2" aria-hidden />
              <span className="font-semibold text-[#311f09]">Time:</span>{" "}
              {activeEvent.time}
            </p>
            <p>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="mr-2"
                aria-hidden
              />
              <span className="font-semibold text-[#311f09]">Location:</span>{" "}
              {activeEvent.location}
            </p>
            <p>
              <FontAwesomeIcon icon={faChair} className="mr-2" aria-hidden />
              <span className="font-semibold text-[#311f09]">Availability:</span>{" "}
              {activeEvent.seats}
            </p>
          </div>

          <p className="mt-6 text-base leading-7 text-[#5f4b3a]">
            {activeEvent.description}
          </p>

          <div className="mt-6 rounded-2xl border border-[#f0dfcf] bg-[#fffcf8] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#bc8a5f]">
              Next event
            </p>
            <p className="mt-1 font-medium text-[#311f09]">{nextEvent.title}</p>
            <p className="text-sm text-[#6d5641]">
              {nextEvent.date} at {nextEvent.time}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              className="rounded-full border border-[#d9b493] px-4 py-2 text-sm font-semibold text-[#8d5f34] transition hover:bg-[#fff2e4]"
              aria-label="Show previous event"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" aria-hidden />
              Previous
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-full border border-[#d9b493] px-4 py-2 text-sm font-semibold text-[#8d5f34] transition hover:bg-[#fff2e4]"
              aria-label="Show next event"
            >
              Next
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" aria-hidden />
            </button>
            <a
              href="#reservation"
              className="rounded-full bg-[#ea6d27] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d85e1e]"
            >
              Reserve for event
            </a>
          </div>

          <div className="mt-7 flex items-center gap-2">
            {events.map((event, index) => (
              <button
                key={event.id}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition ${
                  index === activeIndex
                    ? "w-8 bg-[#ea6d27]"
                    : "w-2.5 bg-[#e5d0bd] hover:bg-[#c8a688]"
                }`}
                aria-label={`Show event ${index + 1}: ${event.title}`}
                aria-pressed={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
