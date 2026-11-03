import ipadDiscover from "../assets/ipad_discover.png";
import laptopEssay from "../assets/laptop_essay.png";
import mobileQuestion from "../assets/mobile_question.png";

export default function DeviceShowcaseSection() {
  return (
    <section className="relative z-10 px-4 pt-32 pb-24 sm:px-6 sm:pt-36 sm:pb-28 md:px-8 lg:pb-32">
      <div className="mx-auto max-w-[760px] text-center">
        <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.055em] text-black sm:text-5xl lg:text-[clamp(3rem,5vw,4.25rem)]">
          Your study space, on <span className="text-[#E99A11]">every screen.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[620px] text-base leading-relaxed text-dark-grey sm:text-lg">
          Explore resources, practise questions and get feedback on your laptop, iPad or iPhone.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://app.certchamps.ie"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5A623] px-7 py-3 text-base font-semibold text-black transition-colors hover:bg-[#E99A11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Get Started
          </a>
          <a
            href="#ai-help"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#E3E7ED] bg-white px-6 py-3 text-base font-semibold text-dark-grey transition-colors hover:border-[#C8D0D8] hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            See How It Works
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-[1280px] items-end justify-center gap-2 sm:mt-14 sm:gap-4 lg:gap-7" role="group" aria-label="CertChamps on iPad, laptop and iPhone">
        <div className="w-[34%] lg:w-[35%]">
          <div className="overflow-hidden rounded-[10px] border-[3px] border-[#1B1D21] bg-[#1B1D21] shadow-[0_10px_24px_rgba(24,42,68,0.12)] sm:rounded-[18px] sm:border-[5px] lg:rounded-[26px] lg:border-[8px]">
            <img
              src={ipadDiscover}
              alt="CertChamps Discover resources on an iPad"
              className="block h-auto w-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="w-[44%] lg:w-[45%]">
          <div className="overflow-hidden rounded-t-[7px] rounded-b-[3px] border-[3px] border-[#202327] bg-[#202327] shadow-[0_10px_24px_rgba(24,42,68,0.12)] sm:rounded-t-[12px] sm:border-[5px] lg:rounded-t-[16px] lg:rounded-b-[5px] lg:border-[8px]">
            <img
              src={laptopEssay}
              alt="CertChamps essay and AI feedback on a laptop"
              className="block h-auto w-full"
                loading="eager"
                fetchPriority="high"
            />
          </div>
          <div className="relative mx-auto h-2 w-[108%] -translate-x-[3.7%] rounded-b-[8px] border border-[#C8D0D8] bg-[#E7EBEF] shadow-[0_5px_10px_rgba(24,42,68,0.08)] sm:h-3 lg:h-4 lg:rounded-b-[18px]">
            <span className="absolute left-1/2 top-0 h-[2px] w-8 -translate-x-1/2 rounded-b-md bg-[#C5CDD5] sm:w-12 lg:h-[3px] lg:w-16" aria-hidden="true" />
          </div>
        </div>

        <div className="w-[14%] lg:w-[13.5%]">
          <div className="rounded-[12px] border-[2px] border-[#17191D] bg-[#17191D] shadow-[0_10px_24px_rgba(24,42,68,0.12)] sm:rounded-[22px] sm:border-[4px] lg:rounded-[34px] lg:border-[7px]">
            <div className="relative overflow-hidden rounded-[9px] bg-white sm:rounded-[17px] lg:rounded-[27px]">
              <img
                src={mobileQuestion}
                alt="CertChamps Leaving Cert question on an iPhone"
                className="block h-auto w-full"
                loading="lazy"
              />
              <span className="pointer-events-none absolute left-1/2 top-0.5 h-[5px] w-[18px] -translate-x-1/2 rounded-full bg-[#17191D] sm:top-1 sm:h-[9px] sm:w-[34px] lg:top-1.5 lg:h-[14px] lg:w-[54px]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
