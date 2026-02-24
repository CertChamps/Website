import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import filter_demo from "../assets/videos/Filter_Demo.mp4";
import ai_demo from "../assets/videos/AI_demo.mp4";
import log_demo from "../assets/videos/log_demo.mp4";
import timer_demo from "../assets/videos/Timer_Demo.mp4";

// ——— Grid settings for desktop ———
const COLS = 64;
const ROWS = 64;
const GRID_HEIGHT = "1000px";

// Converts [start, end] (0-based, end inclusive) to CSS grid line
const span = (start, end) => `${start + 1} / ${end + 2}`;

// Desktop layout positions
const LAYOUT = [
  { col: [0, 20], row: [0, 40] },
  { col: [0, 20], row: [41, 63] },
  { col: [21, 63], row: [0, 30] },
  { col: [21, 63], row: [31, 63] },
];

const GRID_CARDS = [
  {
    id: "ai",
    video: ai_demo,
    title: "AI always by your side",
    description: "Ask AI to help you to solve questions and explain concepts. Our AI can view your workings and can see the current question you are working on.",
    cta: "try it out",
  },
  {
    id: "timer",
    video: timer_demo,
    title: "Manage your time",
    description: "Built-in pomodoro timer to maximise focus and productivity. Set custom timers to keep track of timing when completing questions, and never run out of time in an exam again.",
    cta: "start",
  },
  {
    id: "filter",
    video: filter_demo,
    title: "Find your paper quicker than ever.",
    description: "No more clicking through many pages just to find the paper you need. Find it in record with our powerful filter system. We found our paper in under 2 seconds.",
    cta: "try beat us",
  },
  {
    id: "log",
    video: log_demo,
    title: "Instant log tables.",
    description: "Open your log tables instantly on the exact page you need for each question. No more wasting time flipping through pages of log tables. One click and you are good to go.",
  },
];

const HEADING_TEXT = "Every tool you need in one place.";
const TYPE_MS_PER_CHAR = 25;

// Card component for mobile (flex layout)
function MobileCard({ card, index, typingDone }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className="rounded-lg overflow-hidden flex flex-col cursor-pointer w-full border border-grey/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {card.video && (
        <>
          <div className="w-full aspect-video p-3 sm:p-4">
            <video
              ref={videoRef}
              src={card.video}
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="px-4 sm:px-5 pb-6 sm:pb-8 pt-2 sm:pt-3">
            <h3 className="text-lg sm:text-xl font-bold text-blue">{card.title}</h3>
            <p className="text-dark-grey text-sm py-2">{card.description}</p>
            {card.cta && (
              <a href="https://app.certchamps.ie" className="text-grey bg-grey/10 hover:bg-blue/10 hover:text-blue px-4 sm:px-5 py-1 rounded-md font-bold mt-2 inline-flex items-center gap-1.5 text-sm sm:text-base">
                {card.cta}
                <ArrowUpRight className="w-4 h-4 shrink-0 translate-y-0.5" strokeWidth={3} />
              </a>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}

// Card component for desktop (grid layout with hover effects)
function DesktopCard({ card, index, gridCol, gridRow, typingDone, mousePos, gridRect }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [localMousePos, setLocalMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!cardRef.current || !gridRect) {
      setLocalMousePos({ x: -1000, y: -1000 });
      return;
    }
    const cardRect = cardRef.current.getBoundingClientRect();
    const cardOffsetX = cardRect.left - gridRect.left;
    const cardOffsetY = cardRect.top - gridRect.top;
    setLocalMousePos({
      x: mousePos.x - cardOffsetX,
      y: mousePos.y - cardOffsetY,
    });
  }, [mousePos, gridRect]);

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className="rounded-lg overflow-hidden flex flex-col cursor-pointer"
      style={{
        gridColumn: gridCol,
        gridRow: gridRow,
        border: "1px solid transparent",
        backgroundImage: `linear-gradient(white, white), radial-gradient(300px circle at ${localMousePos.x}px ${localMousePos.y}px, #FFBD53, rgba(174, 174, 174, 0.2) 60%)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {card.video && (
        <>
          <div className="flex-1 min-h-0 relative p-6">
            <video
              ref={videoRef}
              src={card.video}
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="shrink-0 px-5 pb-10 pt-5">
            <h3 className="text-xl font-bold text-blue">{card.title}</h3>
            <p className="text-dark-grey text-sm py-2">{card.description}</p>
            {card.cta && (
              <a href="https://app.certchamps.ie" className="text-grey bg-grey/10 hover:bg-blue/10 hover:text-blue px-5 py-1 rounded-md font-bold mt-2 inline-flex items-center gap-1.5">
                {card.cta}
                <ArrowUpRight className="w-4 h-4 shrink-0 translate-y-0.5" strokeWidth={3} />
              </a>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function FeaturesGrid() {
  const [typedLength, setTypedLength] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [gridRect, setGridRect] = useState(null);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const typingDone = typedLength >= HEADING_TEXT.length;

  useEffect(() => {
    if (!isInView) return;
    if (typedLength >= HEADING_TEXT.length) return;
    const t = setTimeout(() => setTypedLength((n) => n + 1), TYPE_MS_PER_CHAR);
    return () => clearTimeout(t);
  }, [typedLength, isInView]);

  const handleGridMouseMove = (e) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    setGridRect(rect);
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleGridMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <section ref={sectionRef} className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 pb-8 bg-white overflow-hidden">
      <h3 className="text-2xl sm:text-3xl md:text-4xl text-dark-grey py-6 md:py-8 font-semibold leading-tight min-h-[1.2em]">
        {HEADING_TEXT.slice(0, typedLength)}
        {typedLength < HEADING_TEXT.length && (
          <span className="inline-block w-0.5 h-[0.9em] bg-dark-grey ml-0.5 align-baseline animate-pulse" aria-hidden />
        )}
      </h3>
      
      {/* Mobile: Vertical flex layout */}
      <div className="flex flex-col gap-4 lg:hidden">
        {GRID_CARDS.map((card, index) => (
          <MobileCard
            key={card.id}
            card={card}
            index={index}
            typingDone={typingDone}
          />
        ))}
      </div>

      {/* Desktop: Original 64x64 grid layout */}
      <div
        ref={gridRef}
        className="hidden lg:grid w-full gap-0 relative"
        style={{
          height: GRID_HEIGHT,
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
        onMouseMove={handleGridMouseMove}
        onMouseLeave={handleGridMouseLeave}
      >
        {GRID_CARDS.map((card, index) => {
          const place = LAYOUT[index];
          const gridCol = span(place.col[0], place.col[1]);
          const gridRow = span(place.row[0], place.row[1]);
          return (
            <DesktopCard
              key={card.id}
              card={card}
              index={index}
              gridCol={gridCol}
              gridRow={gridRow}
              typingDone={typingDone}
              mousePos={mousePos}
              gridRect={gridRect}
            />
          );
        })}
      </div>
    </section>
  );
}
