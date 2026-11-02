import ipadDiscover from "../assets/ipad_discover.png";
import laptopEssay from "../assets/laptop_essay.png";
import mobileQuestion from "../assets/mobile_question.png";

export default function DeviceShowcaseSection() {
  return (
    <section className="relative z-10 px-4 py-24 sm:px-6 sm:py-28 md:px-8 lg:py-32">
      <div className="mx-auto max-w-[760px] text-center">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-black sm:text-4xl lg:text-[clamp(2.5rem,4vw,3.5rem)]">
          Your study space, on <span className="text-[#E99A11]">every screen.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[620px] text-base leading-relaxed text-dark-grey sm:text-lg">
          Explore resources, practise questions and get feedback on your laptop, iPad or iPhone.
        </p>
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
              loading="lazy"
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
