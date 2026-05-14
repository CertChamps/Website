import { useRef, useState } from "react";
import { motion as Motion, useScroll, useTransform, useSpring } from "framer-motion";
import full_app from "./assets/full_app.webp";
import ai_snippet from "./assets/ai_snippet_app.webp";
import StudyIconsParallax from "./components/StudyIconsParallax";
import FeaturesGrid from "./components/FeaturesGrid";
import HeroCard from "./components/HeroCard";
import promo from "./assets/videos/promo_vid.mp4";

export default function Home() {
  const videoSectionRef = useRef(null);
  const champRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!champRef.current) return;
    const rect = champRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "start center"],
  });

  const videoScaleRaw = useTransform(videoScrollProgress, [0, 1], [1.05, 1]);
  const videoScale = useSpring(videoScaleRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const videoYRaw = useTransform(videoScrollProgress, [0, 1], [30, 0]);
  const videoY = useSpring(videoYRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative overflow-x-hidden w-full">
      <div className="hidden lg:block">
        <StudyIconsParallax />
      </div>

      <section
        className="relative z-10 min-h-screen w-full bg-transparent pt-24 md:pt-28 pb-8"
        onMouseMove={handleMouseMove}
      >
        <div className="flex flex-col items-center justify-start w-full relative px-4 md:px-8">
          <div className="flex flex-col items-center w-full z-10 py-4 md:py-5">
            <Motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight -tracking-[0.1rem] md:-tracking-[0.15rem] mb-4 text-black w-full text-center"
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            >
              Practice like a{" "}
              <span
                ref={champRef}
                className="font-bold relative inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #FFD700, #FFBD53, #FFA500)`,
                }}
              >
                Champ
              </span>
            </Motion.h1>
            <Motion.h2
              className="text-base sm:text-lg md:text-xl text-dark-grey w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto text-center px-4"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            >
              The all in one Leaving Cert platform that helps you practice questions, exactly how you want.
            </Motion.h2>
          </div>

          <div className="hidden md:block relative w-full h-[50vh] lg:h-[55vh]">
            <Motion.img
              src={full_app}
              alt="full_app"
              className="h-full max-h-[500px] object-contain absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-[55%] z-10"
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            />
            <Motion.img
              src={ai_snippet}
              alt="ai_snippet"
              className="h-full max-h-[520px] object-contain absolute top-1/2 -translate-y-[45%] left-1/2 translate-x-[15%] z-10"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </div>

          <div className="md:hidden w-full flex flex-col items-center py-8">
            <Motion.img
              src={full_app}
              alt="full_app"
              className="w-[85%] max-w-[400px] object-contain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </div>

          <div className="w-full flex justify-center items-center py-6 md:py-8">
            <Motion.a
              href="https://app.certchamps.ie"
              className="bg-blue/10 text-blue px-6 py-3 rounded-md font-bold text-lg md:text-xl cursor-pointer hover:bg-blue/20 transition-colors"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              Get Started
            </Motion.a>
          </div>
        </div>
      </section>

      <FeaturesGrid />
      <HeroCard />

      <section ref={videoSectionRef} className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-dark-grey mb-6 md:mb-8">
          see certchamps in action
        </h2>
        <Motion.div
          className="w-full p-2 md:p-4 rounded-xl bg-grey/20 overflow-hidden origin-center"
          style={{ scale: videoScale, y: videoY }}
        >
          <video src={promo} controls loop className="w-full rounded-lg md:rounded-xl" style={{ aspectRatio: "16/9" }} />
        </Motion.div>
      </section>
    </div>
  );
}
