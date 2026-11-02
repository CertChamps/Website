import { Percent, Plus, Radical, Sigma } from "lucide-react";
import ipadDiscover from "../assets/ipad_discover.png";

export default function DiscoverSection() {
  return (
    <section className="relative z-10 px-4 py-20 sm:px-6 sm:py-24 md:px-8 lg:py-28">
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block" aria-hidden="true">
        <Radical className="study-icon-drift absolute left-[3%] top-[18%] h-9 w-9 -rotate-6 text-black/15" strokeWidth={1.7} />
        <Plus className="study-icon-drift absolute right-[4%] top-[14%] h-9 w-9 rotate-6 text-black/15" strokeWidth={1.7} />
        <Sigma className="study-icon-drift absolute bottom-[12%] left-[6%] h-10 w-10 rotate-6 text-black/15" strokeWidth={1.7} />
        <Percent className="study-icon-drift absolute bottom-[15%] right-[5%] h-9 w-9 -rotate-6 text-black/15" strokeWidth={1.7} />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <div className="order-1 max-w-[520px] lg:order-2">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-black sm:text-4xl lg:text-[clamp(2.5rem,4vw,3.5rem)]">
            Discover <span className="text-[#E99A11]">free resources</span> with no resistance.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-dark-grey sm:text-lg">
            Find notes, videos and other study resources in one place. Explore what other students have shared and get straight to what you need for your next study session.
          </p>
          <a
            href="https://app.certchamps.ie"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5A623] px-7 py-3 text-base font-semibold text-black transition-colors hover:bg-[#E99A11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Explore resources
          </a>
        </div>

        <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
          <div className="relative w-full max-w-[720px] rounded-[32px] border-[10px] border-[#1B1D21] bg-[#1B1D21] shadow-[0_12px_30px_rgba(24,42,68,0.14)]">
            <span className="pointer-events-none absolute left-1/2 top-[3px] h-1 w-1 -translate-x-1/2 rounded-full bg-[#545962]" aria-hidden="true" />
            <div className="overflow-hidden rounded-[22px] bg-white">
              <img
                src={ipadDiscover}
                alt="CertChamps Discover page showing free notes, videos and study resources"
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
