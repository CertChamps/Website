"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Package, Calendar, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export type TimeLine_01Entry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface TimeLine_01Props {
  title?: string;
  description?: string;
  entries?: TimeLine_01Entry[];
  className?: string;
}

export const defaultEntries: TimeLine_01Entry[] = [
  {
    icon: Package,
    title: "Practice & Flashcards",
    subtitle: "Version 2.1.0 • Feb 2025",
    description:
      "CertChamps now includes advanced practice modes and smart flashcards so you can drill every topic before exam day.",
    items: [
      "New topic filters and difficulty levels",
      "Spaced repetition for long-term retention",
      "Offline mode for study on the go",
      "Progress tracking per chapter",
      "Accessibility improvements across the app",
    ],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    button: {
      url: "#",
      text: "Start practicing",
    },
  },
  {
    icon: Sparkles,
    title: "Theme & Personalisation",
    subtitle: "Version 2.0.0 • Jan 2025",
    description:
      "Customise your study experience with themes and layout options so CertChamps fits how you learn.",
    items: [
      "Light and dark mode with schedule support",
      "Custom accent colours",
      "Font size and spacing controls",
      "Focus mode to reduce distractions",
    ],
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  },
  {
    icon: Zap,
    title: "Faster & Smoother",
    subtitle: "Version 1.8.0 • Dec 2024",
    description:
      "Performance and animations have been upgraded so studying feels responsive and enjoyable on any device.",
    items: [
      "Smoother transitions and micro-interactions",
      "Faster load times and less data usage",
      "Improved stability on low-end devices",
      "Better battery usage in the background",
    ],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  },
  {
    icon: Calendar,
    title: "CertChamps Launch",
    subtitle: "Version 1.5.0 • Oct 2024",
    description:
      "CertChamps is here — built for Leaving Cert students who want to practice maths like a champ.",
    items: [
      "Full curriculum coverage for Maths",
      "Structured by exam papers and topics",
      "Instant feedback and worked solutions",
      "Designed for phones and tablets",
    ],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    button: {
      url: "#",
      text: "Get started",
    },
  },
];

/**
 * Behavior: Only the card that is currently centered in the viewport is "open".
 * As you scroll, the active card expands to reveal its full content. Others stay collapsed.
 */
export default function TimeLine_01({
  title = "What's new",
  description = "Stay up to date with the latest features and improvements in CertChamps — built to help you practice maths and ace the Leaving Cert.",
  entries = defaultEntries,
}: TimeLine_01Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    itemRefs.current[i] = el;
  };
  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mb-6 text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-16 md:mt-24 md:space-y-24">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="relative flex flex-col gap-4 md:flex-row md:gap-16"
                ref={(el) => setItemRef(el, index)}
                aria-current={isActive ? "true" : "false"}
              >
                <div className="top-8 flex h-min w-64 shrink-0 items-center gap-4 md:sticky">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-lg p-2 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <entry.icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {entry.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {entry.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                />

                <article
                  className={
                    "flex flex-col rounded-2xl border p-3 transition-all duration-300 " +
                    (isActive
                      ? "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-black shadow-lg"
                      : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black")
                  }
                >
                  {entry.image && (
                    <img
                      src={entry.image}
                      alt={`${entry.title} visual`}
                      className="mb-4 h-72 w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2
                        className={
                          "text-md font-medium leading-tight tracking-tight transition-colors duration-200 md:text-lg " +
                          (isActive ? "text-foreground" : "text-foreground/70")
                        }
                      >
                        {entry.title}
                      </h2>
                      <p
                        className={
                          "text-xs leading-relaxed transition-all duration-300 md:text-sm " +
                          (isActive
                            ? "text-muted-foreground line-clamp-none"
                            : "text-muted-foreground/80 line-clamp-2")
                        }
                      >
                        {entry.description}
                      </p>
                    </div>

                    <div
                      aria-hidden={!isActive}
                      className={
                        "grid transition-all duration-500 ease-out " +
                        (isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0")
                      }
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 pt-2">
                          {entry.items && entry.items.length > 0 && (
                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-black">
                              <ul className="space-y-2">
                                {entry.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                                    <span className="leading-relaxed">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {entry.button && (
                            <div className="flex justify-end">
                              <Button
                                variant="default"
                                size="sm"
                                className="group font-normal transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                                asChild
                              >
                                <a
                                  href={entry.button.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {entry.button.text}
                                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
