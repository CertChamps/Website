import { useState } from "react";

const THEMES = [
  {
    name: "Nord Dark",
    bg: "#242933",
    primary: "#88C0D0",
    accent: "#88C0D0",
    sub: "#D8DEE9",
  },
  {
    name: "Camping",
    bg: "#FAF1E4",
    primary: "#618C56",
    accent: "#3C403B",
    sub: "#3C403B",
  },
  {
    name: "Magic Girl",
    bg: "#291F33",
    primary: "#B3A1C4",
    accent: "#B3A1C4",
    sub: "#D7CBE0",
  },
];

const DEFAULT_THEME = {
  bg: "#FFFFFF",
  primary: "#151515",
  accent: "#E99A11",
  sub: "#757575",
};

export default function HeroCard() {
  const [activeThemeIndex, setActiveThemeIndex] = useState(null);
  const activeTheme = activeThemeIndex === null ? DEFAULT_THEME : THEMES[activeThemeIndex];

  return (
    <section
      className="relative z-10 w-full px-4 py-20 transition-colors duration-500 motion-reduce:transition-none sm:px-6 sm:py-24 md:px-8 lg:py-28"
      style={{ backgroundColor: activeTheme.bg }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActiveThemeIndex(null);
      }}
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
          <div className="w-full max-w-[440px] rounded-3xl border border-[#E3E7ED] bg-white p-5 shadow-[0_10px_24px_rgba(24,42,68,0.10)] sm:p-6">
            <div className="grid gap-3" role="group" aria-label="Choose a study theme">
              {THEMES.map((theme, index) => (
                <button
                  key={theme.name}
                  type="button"
                  aria-pressed={activeThemeIndex === index}
                  onMouseEnter={() => setActiveThemeIndex(index)}
                  onMouseLeave={() => setActiveThemeIndex(null)}
                  onFocus={() => setActiveThemeIndex(index)}
                  onClick={() => setActiveThemeIndex(index)}
                  className="flex min-h-16 w-full items-center rounded-xl border border-black/10 px-5 text-left text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                  style={{ backgroundColor: theme.bg, color: theme.primary }}
                >
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 max-w-[520px] lg:order-2">
          <h2
            className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] transition-colors duration-500 motion-reduce:transition-none sm:text-4xl lg:text-[clamp(2.5rem,4vw,3.5rem)]"
            style={{ color: activeTheme.primary }}
          >
            The <span style={{ color: activeTheme.accent }}>Only</span> Customisable Leaving Cert App
          </h2>
          <p
            className="mt-6 text-base leading-relaxed transition-colors duration-500 motion-reduce:transition-none sm:text-lg"
            style={{ color: activeTheme.sub }}
          >
            Choose from a wide range of themes, and study with the aesthetic that matches your vibe.
          </p>
        </div>
      </div>
    </section>
  );
}
