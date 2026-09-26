import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SHARED_FEATURES = [
  "Every past paper, subject, level and topic",
  "Questions by topic",
  "Full Discover tab: notes, videos and community resources",
  "Friends, posts and social study",
  "Themes, timers and instant log tables",
  "Progress insights and detailed mistake feedback",
  "5 AI tutor messages per month",
  "1 instant answer check per month",
  "30 Discover AI searches per month",
];

const ACE_ONLY_FEATURES = [
  "200 AI tutor messages per month",
  "40 instant answer checks per month",
  "200 Discover AI searches per month",
  "100 AI whiteboard question matches per month",
];

const FREE_FEATURES = [
  ...SHARED_FEATURES.map((text) => ({ text, included: true })),
  ...ACE_ONLY_FEATURES.map((text) => ({ text, included: false })),
];

const ACE_FEATURES = [
  ...SHARED_FEATURES.map((text) => ({ text, included: true })),
  ...ACE_ONLY_FEATURES.map((text) => ({ text, included: true })),
];

const HEADING = "simple pricing";
const SUBHEADING =
  "Start free with every paper, Discover, and a taste of AI. Upgrade to CertChamps ACE when you want higher limits.";

const ease = [0.22, 0.61, 0.36, 1];

function AnimatedWords({ text, className, delay = 0 }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.28em] last:mr-0"
          variants={{
            hidden: { opacity: 0, y: 16, filter: "blur(12px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

const ACE_THEMES = [
  {
    name: "Nord Dark",
    dot: "#88c0d0",
    bg: "#242933",
    accent: "#88c0d0",
    primary: "#88c0d0",
    sub: "#d8dee9",
    originX: 78,
    originY: 9,
  },
  {
    name: "Camping",
    dot: "#618C56",
    bg: "#FAF1E4",
    accent: "#3C403B",
    primary: "#618C56",
    sub: "#8a7f72",
    originX: 86,
    originY: 9,
  },
  {
    name: "Magic Girl",
    dot: "#a982c4",
    bg: "#291f33",
    accent: "#b3a1c4",
    primary: "#a982c4",
    sub: "#c4b3d4",
    originX: 94,
    originY: 9,
  },
];

const ACE_DEFAULT_THEME = {
  bg: "#294B7E",
  accent: "#FFBD53",
  primary: "#ffffff",
  sub: "rgba(255,255,255,0.8)",
};

const THEME_TRANSITION_MS = 450;

function AceCardBody({ theme, features, price, period, description, cta, href }) {
  return (
    <div className="relative flex flex-col h-full p-6 md:p-8" style={{ color: theme.primary }}>
      <h3 className="text-xl md:text-2xl font-bold pr-20">
        Cert<span style={{ color: theme.accent }}>Champs</span> ACE
      </h3>
      <div className="mt-4 mb-2 flex items-baseline gap-1.5">
        <span className="text-4xl md:text-5xl font-extrabold tracking-tight">{price}</span>
        {period && (
          <span className="text-base font-medium" style={{ color: theme.sub }}>
            {period}
          </span>
        )}
      </div>
      <p className="text-sm mb-6" style={{ color: theme.sub }}>
        {description}
      </p>
      <ul className="space-y-3 flex-1 mb-8">
        {features.map((item) => {
          const Icon = item.included ? Check : X;
          return (
            <li key={item.text} className="flex items-start gap-3 text-sm leading-relaxed">
              <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: theme.accent }} strokeWidth={3} />
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
      <a
        href={href}
        className="text-center font-bold rounded-md px-5 py-3 transition-opacity hover:opacity-90"
        style={{ backgroundColor: theme.accent, color: theme.bg }}
      >
        {cta}
      </a>
    </div>
  );
}

function AcePlanCard({ price, period, description, features, cta, href }) {
  const [activeThemeIndex, setActiveThemeIndex] = useState(null);
  const [expandedOverlays, setExpandedOverlays] = useState([false, false, false]);
  const transitionTimeoutRef = useRef(null);

  const handleThemeSelect = (index) => {
    if (index === activeThemeIndex) return;
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    const prevIndex = activeThemeIndex;
    setActiveThemeIndex(index);
    setExpandedOverlays((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    if (prevIndex !== null) {
      transitionTimeoutRef.current = setTimeout(() => {
        setExpandedOverlays((prev) => {
          const next = [...prev];
          next[prevIndex] = false;
          return next;
        });
      }, THEME_TRANSITION_MS + 50);
    }
  };

  const handleThemeLeave = () => {
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
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
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative h-full">
      <span className="absolute -top-3 left-6 z-20 bg-gold text-black text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full">
        recommended
      </span>
      <div
        className="relative overflow-hidden rounded-2xl h-full shadow-lg"
        style={{ backgroundColor: ACE_DEFAULT_THEME.bg }}
        onMouseLeave={handleThemeLeave}
      >
        <AceCardBody
          theme={ACE_DEFAULT_THEME}
          features={features}
          price={price}
          period={period}
          description={description}
          cta={cta}
          href={href}
        />
        {ACE_THEMES.map((theme, i) => (
          <motion.div
            key={theme.name}
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: theme.bg, zIndex: 10 + i }}
            initial={false}
            animate={{
              clipPath: expandedOverlays[i]
                ? `circle(160% at ${theme.originX}% ${theme.originY}%)`
                : `circle(0% at ${theme.originX}% ${theme.originY}%)`,
            }}
            transition={{ duration: THEME_TRANSITION_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
          >
            <AceCardBody
              theme={theme}
              features={features}
              price={price}
              period={period}
              description={description}
              cta={cta}
              href={href}
            />
          </motion.div>
        ))}
        <div className="absolute top-5 right-5 z-50 flex items-center gap-2">
          {ACE_THEMES.map((theme, i) => (
            <button
              key={theme.name}
              type="button"
              aria-label={`Preview ${theme.name} theme`}
              className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm cursor-pointer transition-transform hover:scale-125"
              style={{
                backgroundColor: theme.dot,
                outline: activeThemeIndex === i ? `2px solid ${theme.dot}` : "none",
                outlineOffset: "2px",
              }}
              onMouseEnter={() => handleThemeSelect(i)}
              onFocus={() => handleThemeSelect(i)}
              onClick={() => handleThemeSelect(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlanCard({ name, price, period, description, features, featured, cta, href }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 md:p-8 h-full ${
        featured
          ? "bg-[#294B7E] text-white shadow-lg"
          : "bg-white border border-grey/20 text-black"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-6 bg-gold text-black text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full">
          recommended
        </span>
      )}
      <h3 className="text-xl md:text-2xl font-bold">
        {name === "ACE" ? (
          <>
            Cert<span className="text-gold">Champs</span> ACE
          </>
        ) : (
          name
        )}
      </h3>
      <div className="mt-4 mb-2 flex items-baseline gap-1.5">
        <span className="text-4xl md:text-5xl font-extrabold tracking-tight">{price}</span>
        {period && (
          <span className={`text-base font-medium ${featured ? "text-white/70" : "text-dark-grey"}`}>
            {period}
          </span>
        )}
      </div>
      <p className={`text-sm mb-6 ${featured ? "text-white/80" : "text-dark-grey"}`}>{description}</p>
      <ul className="space-y-3 flex-1 mb-8">
        {features.map((item) => {
          const Icon = item.included ? Check : X;
          return (
            <li
              key={item.text}
              className={`flex items-start gap-3 text-sm leading-relaxed ${
                item.included ? "" : featured ? "text-white/50" : "text-dark-grey/70"
              }`}
            >
              <Icon
                className={`w-4 h-4 mt-0.5 shrink-0 ${
                  item.included
                    ? featured
                      ? "text-gold"
                      : "text-blue"
                    : featured
                      ? "text-white/45"
                      : "text-grey"
                }`}
                strokeWidth={3}
              />
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
      <a
        href={href}
        className={`text-center font-bold rounded-md px-5 py-3 transition-colors ${
          featured
            ? "bg-gold text-black hover:bg-gold/90"
            : "bg-blue/10 text-blue hover:bg-blue/20"
        }`}
      >
        {cta}
      </a>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20 scroll-mt-24"
    >
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-dark-grey mb-3">
          <AnimatedWords text={HEADING} />
        </h2>
        <p className="text-dark-grey text-sm sm:text-base max-w-xl mx-auto">
          <AnimatedWords text={SUBHEADING} delay={0.28} />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
        <PlanCard
          name="Free"
          price="€0"
          description="Every paper and topic, Discover, and AI with monthly limits."
          features={FREE_FEATURES}
          cta="Get started"
          href="https://app.certchamps.ie"
        />
        <AcePlanCard
          price="€40"
          period="/ year"
          description="The same full library, with AI allowances that go much further and reset monthly."
          features={ACE_FEATURES}
          cta="Get CertChamps ACE"
          href="https://app.certchamps.ie"
        />
      </div>

      <p className="text-center text-xs text-dark-grey mt-6 md:mt-8">
        ACE is billed annually and renews until cancelled. Access continues until the end of the paid year.
      </p>
    </section>
  );
}
