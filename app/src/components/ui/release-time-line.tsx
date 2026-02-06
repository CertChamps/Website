"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowUpRight,
  Package,
  Calendar,
  Sparkles,
  Zap,
  ChevronDown,
} from "lucide-react";
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
  themeActive?: boolean;
  theme?: {
    bg: string;
    text: string;
    textMuted: string;
    accent: string;
    cardBg: string;
    cardBorder: string;
    shimmer: string;
    buttonBg: string;
    buttonText: string;
  };
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

export default function TimeLine_01({
  title = "What's new",
  description = "Stay up to date with the latest features and improvements in CertChamps — built to help you practice maths and ace the Leaving Cert.",
  entries = defaultEntries,
  themeActive = false,
  theme,
}: TimeLine_01Props) {
  const t = themeActive && theme ? theme : null;
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const displayEntries = entries.slice(0, 3);

  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardRefs.current[i] = el;
  }, []);

  // Track which image cards have scrolled into view (one-time reveal)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (idx !== -1) {
              setRevealed((prev) => new Set(prev).add(idx));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [displayEntries.length]);

  // Track which sidebar section should be active based on scroll
  useEffect(() => {
    if (!cardRefs.current.length) return;

    let frame = 0;
    const update = () => {
      frame = requestAnimationFrame(update);
      const target = window.innerHeight * 0.4;
      let best = 0;
      let bestDist = Infinity;
      cardRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - target);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIndex((prev) => (prev !== best ? best : prev));
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="py-32 pt-40">
      <div className="container">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
          {/* -------- LEFT: sticky sidebar -------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-8">
              <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl transition-colors duration-700" style={{ color: t ? t.text : undefined }}>
                {title}
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base transition-colors duration-700" style={{ color: t ? t.textMuted : undefined }}>
                {description}
              </p>
            </div>

            <nav className="space-y-3">
              {displayEntries.map((entry, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      cardRefs.current[index]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      })
                    }
                    className={
                      "w-full rounded-2xl border px-5 py-4 text-left transition-all duration-700 " +
                      (isActive
                        ? "border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-black"
                        : "border-transparent bg-gray-50 hover:bg-gray-100 dark:bg-black/30 dark:hover:bg-black/50")
                    }
                    style={t ? {
                      backgroundColor: isActive ? t.cardBg : t.shimmer,
                      borderColor: isActive ? t.cardBorder : 'transparent',
                    } : undefined}
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={
                            "flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-700 " +
                            (isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground")
                          }
                          style={t ? {
                            backgroundColor: isActive ? t.accent : t.shimmer,
                            color: isActive ? t.buttonText : t.textMuted,
                          } : undefined}
                        >
                          <entry.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="block text-sm font-semibold leading-tight transition-colors duration-700" style={{ color: t ? t.text : undefined }}>
                            {entry.title}
                          </span>
                          <span className="block text-xs text-muted-foreground transition-colors duration-700" style={{ color: t ? t.textMuted : undefined }}>
                            {entry.subtitle}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={
                          "h-4 w-4 shrink-0 text-muted-foreground/60 transition-all duration-700 " +
                          (isActive ? "rotate-180" : "rotate-0")
                        }
                        style={{ color: t ? t.textMuted : undefined }}
                      />
                    </div>

                    {/* Collapsible details */}
                    <div
                      className={
                        "grid transition-all duration-500 ease-out " +
                        (isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0")
                      }
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-3 pt-4 text-sm text-muted-foreground transition-colors duration-700" style={{ color: t ? t.textMuted : undefined }}>
                          <p className="leading-relaxed">{entry.description}</p>

                          {entry.items && entry.items.length > 0 && (
                            <ul className="space-y-1.5 pl-0.5">
                              {entry.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50 transition-colors duration-700" style={{ backgroundColor: t ? t.accent : undefined }} />
                                  <span className="leading-relaxed">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {entry.button && (
                            <div className="pt-1">
                              <Button
                                variant="default"
                                size="sm"
                                className="group font-normal transition-colors duration-700"
                                style={t ? { backgroundColor: t.accent, color: t.buttonText } : undefined}
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
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* -------- RIGHT: scrolling image cards -------- */}
          <div className="flex flex-col gap-14 md:gap-20">
            {displayEntries.map((entry, index) => {
              const isRevealed = revealed.has(index);
              return (
                <div
                  key={index}
                  ref={(el) => setCardRef(el, index)}
                  className={
                    "rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] dark:border-gray-800 dark:bg-black sm:p-5 " +
                    (isRevealed
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0")
                  }
                  style={t ? { backgroundColor: t.cardBg, borderColor: t.cardBorder } : undefined}
                >
                  {entry.image && (
                    <img
                      src={entry.image}
                      alt={`${entry.title} visual`}
                      className="h-[320px] w-full rounded-2xl object-cover sm:h-[400px]"
                      loading="lazy"
                    />
                  )}
                  <div className="mt-4 px-1">
                    <h3 className="text-base font-semibold transition-colors duration-700" style={{ color: t ? t.text : undefined }}>{entry.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground transition-colors duration-700" style={{ color: t ? t.textMuted : undefined }}>
                      {entry.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
