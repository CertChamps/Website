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
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-blue/25 bg-white px-6 py-3 text-base font-semibold text-blue transition-colors hover:border-blue/50 hover:bg-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            See How It Works
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-[1280px] flex-col items-center gap-10 lg:flex-row lg:items-end lg:justify-center lg:gap-7" role="group" aria-label="CertChamps on iPad, laptop and iPhone">
        <div className="order-2 w-full max-w-[580px] lg:order-1 lg:w-[35%] lg:max-w-none">
          <div className="overflow-hidden rounded-[26px] border-[8px] border-[#1B1D21] bg-[#1B1D21] shadow-[0_10px_24px_rgba(24,42,68,0.12)]">
            <img
              src={ipadDiscover}
              alt="CertChamps Discover resources on an iPad"
              className="block h-auto w-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="order-1 w-full max-w-[720px] lg:order-2 lg:w-[45%] lg:max-w-none">
          <div className="overflow-hidden rounded-t-[16px] rounded-b-[5px] border-[8px] border-[#202327] bg-[#202327] shadow-[0_10px_24px_rgba(24,42,68,0.12)]">
            <img
              src={laptopEssay}
              alt="CertChamps essay and AI feedback on a laptop"
              className="block h-auto w-full"
                loading="eager"
                fetchPriority="high"
            />
          </div>
          <div className="relative mx-auto h-4 w-[108%] -translate-x-[3.7%] rounded-b-[18px] border border-[#C8D0D8] bg-[#E7EBEF] shadow-[0_5px_10px_rgba(24,42,68,0.08)]">
            <span className="absolute left-1/2 top-0 h-[3px] w-16 -translate-x-1/2 rounded-b-md bg-[#C5CDD5]" aria-hidden="true" />
          </div>
        </div>

        <div className="order-3 w-[min(55vw,250px)] lg:w-[13.5%]">
          <div className="rounded-[34px] border-[7px] border-[#17191D] bg-[#17191D] shadow-[0_10px_24px_rgba(24,42,68,0.12)]">
            <div className="relative overflow-hidden rounded-[27px] bg-white">
              <img
                src={mobileQuestion}
                alt="CertChamps Leaving Cert question on an iPhone"
                className="block h-auto w-full"
                loading="lazy"
              />
              <span className="pointer-events-none absolute left-1/2 top-1.5 h-[14px] w-[54px] -translate-x-1/2 rounded-full bg-[#17191D]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
