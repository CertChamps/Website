import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const THEMES = [
  {
    name: "Nord Dark",
    bg: "#242933",
    accent: "#88c0d0",
    primary: "#88c0d0",
    sub: "#d8dee9",
    // Desktop pill positioning
    pillTop: "18%",
    pillLeft: "60%",
    pillWidth: "min(30%, 170px)",
    pillHeight: "44px",
    circleCenterX: 39,
    circleCenterY: 22,
    delay: 0,
  },
  {
    name: "Camping",
    bg: "#FAF1E4",
    accent: "#3C403B",
    primary: "#618C56",
    sub: "#C2B8AA",
    pillTop: "42%",
    pillLeft: "75%",
    pillWidth: "min(18%, 170px)",
    pillHeight: "44px",
    circleCenterX: 81,
    circleCenterY: 46,
    delay: 0.3,
  },
  {
    name: "Magic Girl",
    bg: "#291f33",
    accent: "#b3a1c4",
    primary: "#a982c4",
    sub: "#86679c",
    pillTop: "68%",
    pillLeft: "67%",
    pillWidth: "min(18%, 170px)",
    pillHeight: "44px",
    circleCenterX: 79,
    circleCenterY: 72,
    delay: 0.6,
  },
];

// Single source of truth for hero copy
function HeroText({ primary, accent, sub }) {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3" style={{ color: primary }}>
        The <span style={{ color: accent }}>Only</span> Customisable Leaving Cert App
      </h2>
      <p className="text-sm sm:text-base md:text-lg" style={{ color: sub }}>
        Choose from a wide range of themes, and study with the aesthetic that matches your vibe. 
      </p>
    </>
  );
}

// Mobile pill (simple button)
function MobilePill({ theme, onSelect }) {
  const [isPointerOver, setIsPointerOver] = useState(false);
  return (
    <motion.button
      className="rounded-full flex items-center justify-center cursor-pointer px-4 py-2 font-semibold text-sm whitespace-nowrap select-none"
      style={{
        backgroundColor: theme.bg,
        color: theme.accent,
      }}
      onMouseEnter={() => {
        setIsPointerOver(true);
        onSelect?.();
      }}
      onMouseLeave={() => setIsPointerOver(false)}
      onClick={() => onSelect?.()}
      animate={{
        scale: isPointerOver ? 1.08 : 1,
      }}
      transition={{
        scale: { duration: 0.2 },
      }}
    >
      {theme.name}
    </motion.button>
  );
}

// Desktop pill (positioned absolutely with floating animation)
function DesktopPill({ theme, onSelect }) {
  const [isPointerOver, setIsPointerOver] = useState(false);
  return (
    <motion.div
      className="absolute rounded-full flex items-center justify-center cursor-pointer px-4 font-semibold text-sm whitespace-nowrap select-none"
      style={{
        top: theme.pillTop,
        left: theme.pillLeft,
        width: theme.pillWidth,
        height: theme.pillHeight,
        backgroundColor: theme.bg,
        color: theme.accent,
      }}
      onMouseEnter={() => {
        setIsPointerOver(true);
        onSelect?.();
      }}
      onMouseLeave={() => setIsPointerOver(false)}
      animate={{
        scale: isPointerOver ? 1.08 : 1,
        y: isPointerOver ? 0 : [0, -8, 0],
      }}
      transition={{
        scale: { duration: 0.2 },
        y: isPointerOver
          ? { duration: 0 }
          : { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: theme.delay ?? 0 },
      }}
    >
      {theme.name}
    </motion.div>
  );
}

const THEME_TRANSITION_MS = 450;

export default function HeroCard() {
  const cardRef = useRef(null);
  const [clipPath, setClipPath] = useState("circle(0% at 50% 50%)");
  const [activeThemeIndex, setActiveThemeIndex] = useState(null);
  const [expandedOverlays, setExpandedOverlays] = useState([false, false, false]);
  const [isDesktop, setIsDesktop] = useState(false);
  const transitionTimeoutRef = useRef(null);

  // Check if desktop
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleThemeSelect = (index) => {
    if (index === activeThemeIndex) return;
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    const prevIndex = activeThemeIndex;
    setActiveThemeIndex(index);
    
    setExpandedOverlays(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    
    if (prevIndex !== null) {
      transitionTimeoutRef.current = setTimeout(() => {
        setExpandedOverlays(prev => {
          const next = [...prev];
          next[prevIndex] = false;
          return next;
        });
      }, THEME_TRANSITION_MS + 50);
    }
  };

  const handleThemeLeave = () => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    const prevIndex = activeThemeIndex;
    setActiveThemeIndex(null);
    
    if (prevIndex !== null) {
      transitionTimeoutRef.current = setTimeout(() => {
        setExpandedOverlays([false, false, false]);
      }, THEME_TRANSITION_MS + 50);
    }
  };

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const updateProgress = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const viewportCenter = vh / 2;
      const progressStart = vh * 0.7;
      const progressEnd = viewportCenter - rect.height / 2;
      const progress = Math.max(
        0,
        Math.min(1, (progressStart - rect.top) / (progressStart - progressEnd))
      );
      const radius = progress * 150;
      setClipPath(`circle(${radius}% at 50% 50%)`);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const baseColors = { primary: "#757575", accent: "#757575", sub: "#757575" };
  const scrollRevealColors = { primary: "#ffffff", accent: "#FFAC3B", sub: "rgba(255,255,255,0.95)" };

  // Get circle center based on active theme (for desktop)
  const getCircleCenter = (index) => {
    if (index === null || !isDesktop) return { x: 50, y: 50 };
    return { x: THEMES[index].circleCenterX, y: THEMES[index].circleCenterY };
  };

  return (
    <section
      ref={cardRef}
      className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-16 bg-white"
    >
      <div className="relative w-full overflow-hidden rounded-2xl md:rounded-4xl min-h-[320px] sm:min-h-[360px] md:min-h-[400px]">
        {/* Background layers */}
        <div className="absolute inset-0 z-0 bg-white rounded-2xl md:rounded-4xl" />
        <div
          className="absolute inset-0 z-10 rounded-2xl md:rounded-4xl"
          style={{
            backgroundColor: "rgb(41, 75, 126)",
            clipPath,
          }}
        />

        {/* Base text layer */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-none rounded-2xl md:rounded-4xl">
          <div className="px-6 sm:px-8 md:px-14 py-6 sm:py-8 md:py-10 w-full lg:max-w-[55%]">
            <HeroText {...baseColors} />
          </div>
        </div>

        {/* Scroll reveal layer */}
        <div
          className="absolute inset-0 z-30 flex flex-col justify-center pointer-events-none rounded-2xl md:rounded-4xl"
          style={{ clipPath }}
          aria-hidden
        >
          <div className="px-6 sm:px-8 md:px-14 py-6 sm:py-8 md:py-10 w-full lg:max-w-[55%]">
            <HeroText {...scrollRevealColors} />
          </div>
        </div>

        {/* Theme overlays */}
        {THEMES.map((theme, i) => {
          const center = isDesktop ? { x: theme.circleCenterX, y: theme.circleCenterY } : { x: 50, y: 50 };
          return (
            <motion.div
              key={theme.name}
              className="absolute inset-0 flex flex-col justify-center rounded-2xl md:rounded-4xl pointer-events-none"
              style={{ backgroundColor: theme.bg, zIndex: 31 + i }}
              initial={false}
              animate={{
                clipPath: expandedOverlays[i]
                  ? `circle(150% at ${center.x}% ${center.y}%)`
                  : `circle(0% at ${center.x}% ${center.y}%)`,
              }}
              transition={{ 
                duration: THEME_TRANSITION_MS / 1000, 
                ease: [0.4, 0, 0.2, 1] 
              }}
            >
              <div className="px-6 sm:px-8 md:px-14 py-6 sm:py-8 md:py-10 w-full lg:max-w-[55%]">
                <HeroText primary={theme.primary} accent={theme.accent} sub={theme.sub} />
              </div>
            </motion.div>
          );
        })}

        {/* Desktop: Pills positioned inside the card */}
        <div className="absolute inset-0 z-50 rounded-4xl pointer-events-none hidden lg:block">
          <div className="absolute inset-0 pointer-events-auto" onMouseLeave={handleThemeLeave}>
            {THEMES.map((theme, i) => (
              <DesktopPill
                key={theme.name}
                theme={theme}
                onSelect={() => handleThemeSelect(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Pills below the card */}
      <div 
        className="flex flex-wrap justify-center gap-3 mt-6 lg:hidden"
        onMouseLeave={handleThemeLeave}
      >
        {THEMES.map((theme, i) => (
          <MobilePill
            key={theme.name}
            theme={theme}
            onSelect={() => handleThemeSelect(i)}
          />
        ))}
      </div>
    </section>
  );
}
