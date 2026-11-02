import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Percent, Radical, Sigma, Plus } from "lucide-react";
import mobileQuestion from "../assets/mobile_question.png";
import mobileCalculator from "../assets/mobile_calculator.png";
import mobileDiscover from "../assets/mobile_discover.png";
import appStoreBadge from "../assets/download-on-the-app-store.svg";

const APP_STORE_URL = "https://apps.apple.com/us/app/certchamps-mobile/id6810359289";
const SCREENSHOTS = [
  {
    src: mobileQuestion,
    alt: "CertChamps iPhone app showing a Leaving Cert calculus exam question",
  },
  {
    src: mobileCalculator,
    alt: "CertChamps iPhone app showing the scientific calculator",
  },
  {
    src: mobileDiscover,
    alt: "CertChamps iPhone app showing the Discover study resources page",
  },
];

export default function MobileAppSection() {
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActiveScreenshot((current) => (current + 1) % SCREENSHOTS.length);
    }, 5500);

    return () => window.clearTimeout(timeout);
  }, [activeScreenshot]);

  const showScreenshot = (direction) => {
    setActiveScreenshot((current) =>
      (current + direction + SCREENSHOTS.length) % SCREENSHOTS.length
    );
  };

  return (
    <section className="relative z-10 px-4 py-20 sm:px-6 sm:py-24 md:px-8 lg:py-28">
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block" aria-hidden="true">
        <Sigma className="study-icon-drift absolute left-[3%] top-[15%] h-10 w-10 -rotate-6 text-black/15" strokeWidth={1.7} />
        <Radical className="study-icon-drift absolute right-[4%] top-[23%] h-9 w-9 rotate-6 text-black/15" strokeWidth={1.7} />
        <Percent className="study-icon-drift absolute bottom-[14%] left-[5%] h-9 w-9 rotate-6 text-black/15" strokeWidth={1.7} />
        <Plus className="study-icon-drift absolute bottom-[18%] right-[5%] h-9 w-9 -rotate-6 text-black/15" strokeWidth={1.7} />
      </div>
      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 grid w-full max-w-[430px] grid-cols-[44px_minmax(0,310px)_44px] items-center justify-center gap-2 justify-self-center sm:gap-4 lg:order-1 lg:justify-self-start">
          <button
            type="button"
            onClick={() => showScreenshot(-1)}
            aria-label="Previous app screenshot"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9E0E8] bg-white text-blue transition-colors hover:border-blue/40 hover:bg-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            <ChevronLeft size={23} strokeWidth={2} aria-hidden="true" />
          </button>

          <div className="relative w-full rounded-[48px] border-[8px] border-[#17191D] bg-[#17191D] shadow-[0_18px_36px_rgba(24,42,68,0.16)]">
            <div className="relative aspect-[1125/2436] overflow-hidden rounded-[39px] bg-white">
              {SCREENSHOTS.map((screenshot, index) => (
                <img
                  key={screenshot.src}
                  src={screenshot.src}
                  alt={index === activeScreenshot ? screenshot.alt : ""}
                  aria-hidden={index !== activeScreenshot}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none ${index === activeScreenshot ? "opacity-100" : "opacity-0"}`}
                  loading="lazy"
                />
              ))}
              <span className="pointer-events-none absolute left-1/2 top-2 h-[19px] w-[78px] -translate-x-1/2 rounded-full bg-[#17191D]" aria-hidden="true" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => showScreenshot(1)}
            aria-label="Next app screenshot"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9E0E8] bg-white text-blue transition-colors hover:border-blue/40 hover:bg-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            <ChevronRight size={23} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <div className="order-1 max-w-[520px] lg:order-2">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-black sm:text-4xl lg:text-[clamp(2.5rem,4vw,3.5rem)]">
            One <span className="text-[#E99A11]">connected</span> place to <span className="text-[#E99A11]">study.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-dark-grey sm:text-lg">
            Practise exam questions on your iPhone or settle in at your computer. CertChamps brings your questions, study tools and progress together in one cohesive ecosystem, wherever you study.
          </p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CertChamps Mobile on the App Store"
            className="mt-8 inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
          >
            <img
              src={appStoreBadge}
              alt="Download on the App Store"
              className="block w-[180px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
