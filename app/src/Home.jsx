import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import clean_full_app from "./assets/clean_full_app.png";
import StudyIconsParallax from "./components/StudyIconsParallax";
import HeroCard from "./components/HeroCard";
import MobileAppSection from "./components/MobileAppSection";
import AiHelpSection from "./components/AiHelpSection";
import DiscoverSection from "./components/DiscoverSection";
import LaptopEssaySection from "./components/LaptopEssaySection";
import DeviceShowcaseSection from "./components/DeviceShowcaseSection";
import TrustSection from "./components/TrustSection";

export default function Home() {
  const [previewZoomed, setPreviewZoomed] = useState(false);

  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="hidden lg:block">
        <StudyIconsParallax />
      </div>

      <section className="relative z-10 w-full px-4 pt-28 pb-14 sm:px-6 sm:pt-24 md:px-8 lg:pt-12 lg:pb-24">
        <div className="mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-[1400px] flex-col justify-center gap-12 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14 xl:gap-16">
          <div className="flex flex-col items-start text-left">
            <h1 className="text-4xl font-bold leading-[1.02] tracking-[-0.055em] text-black sm:text-5xl lg:text-[clamp(3rem,5vw,4.25rem)]">
              Practice like a <span className="block w-fit bg-[linear-gradient(90deg,#FFBD53,#FFA500)] bg-clip-text text-transparent">Champ</span>
            </h1>
            <p className="mt-6 max-w-[480px] text-base leading-relaxed text-dark-grey sm:text-lg">
              Practise real Leaving Cert questions, get instant AI feedback, and track your progress in one place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://app.certchamps.ie"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5A623] px-7 py-3 text-base font-semibold text-black transition-colors hover:bg-[#E99A11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Get Started
              </a>
              <a
                href="#ai-help"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-blue/25 bg-white px-6 py-3 text-base font-semibold text-blue transition-colors hover:border-blue/50 hover:bg-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                See How It Works
              </a>
            </div>
            <p className="mt-5 text-sm text-dark-grey">Made by students, for students.</p>
          </div>

          <div className="w-full lg:-ml-12 lg:w-[calc(100%+4rem)]">
            <button
              type="button"
              onClick={() => setPreviewZoomed((zoomed) => !zoomed)}
              aria-pressed={previewZoomed}
              aria-label={previewZoomed ? "Show full product preview" : "Zoom in on handwritten answer and AI feedback"}
              className={`relative block w-full overflow-hidden rounded-xl border border-[#D9DEE6] bg-white text-left shadow-[0_10px_24px_rgba(24,42,68,0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${previewZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
            >
              <img
                src={clean_full_app}
                alt="CertChamps notes, practice question and AI study tools"
                className={`block w-full transition-transform duration-700 ease-in-out motion-reduce:transition-none ${previewZoomed ? "scale-[1.35]" : "scale-100"}`}
                style={{ transformOrigin: "80% 45%" }}
                fetchPriority="high"
              />
              <span className="pointer-events-none absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full border border-grey/20 bg-white/95 text-black" aria-hidden="true">
                {previewZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </span>
            </button>
          </div>
        </div>
      </section>

      <DiscoverSection />
      <LaptopEssaySection />
      <MobileAppSection />
      <AiHelpSection />
      <HeroCard />
      <DeviceShowcaseSection />
      <TrustSection />
    </div>
  );
}
