import StudyIconsParallax from "./components/StudyIconsParallax";
import HeroCard from "./components/HeroCard";
import MobileAppSection from "./components/MobileAppSection";
import AiHelpSection from "./components/AiHelpSection";
import DiscoverSection from "./components/DiscoverSection";
import LaptopEssaySection from "./components/LaptopEssaySection";
import DeviceShowcaseSection from "./components/DeviceShowcaseSection";
import TrustSection from "./components/TrustSection";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="hidden lg:block">
        <StudyIconsParallax />
      </div>

      <DeviceShowcaseSection />
      <DiscoverSection />
      <LaptopEssaySection />
      <MobileAppSection />
      <AiHelpSection />
      <HeroCard />
      <TrustSection />
    </div>
  );
}
