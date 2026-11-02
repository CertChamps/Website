import { FunctionSquare, Plus, Radical, Sigma } from "lucide-react";
import laptopEssay from "../assets/laptop_essay.png";

export default function LaptopEssaySection() {
  return (
    <section className="relative z-10 px-4 py-20 sm:px-6 sm:py-24 md:px-8 lg:py-28">
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block" aria-hidden="true">
        <Sigma className="study-icon-drift absolute left-[4%] top-[16%] h-10 w-10 -rotate-6 text-black/15" strokeWidth={1.7} />
        <FunctionSquare className="study-icon-drift absolute right-[4%] top-[20%] h-9 w-9 rotate-6 text-black/15" strokeWidth={1.7} />
        <Plus className="study-icon-drift absolute bottom-[14%] left-[6%] h-9 w-9 rotate-6 text-black/15" strokeWidth={1.7} />
        <Radical className="study-icon-drift absolute bottom-[12%] right-[5%] h-9 w-9 -rotate-6 text-black/15" strokeWidth={1.7} />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="max-w-[520px]">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-black sm:text-4xl lg:text-[clamp(2.5rem,4vw,3.5rem)]">
            <span className="text-[#E99A11]">Typing is faster,</span> so you get your feedback quicker.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-dark-grey sm:text-lg">
            Write longer answers with a keyboard and get feedback while your ideas are still fresh. Your question, essay and feedback stay together on one screen.
          </p>
          <a
            href="https://app.certchamps.ie"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5A623] px-7 py-3 text-base font-semibold text-black transition-colors hover:bg-[#E99A11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Start practising
          </a>
        </div>

        <div className="flex w-full justify-center lg:justify-end">
          <div className="w-full max-w-[720px]">
            <div className="overflow-hidden rounded-t-[18px] rounded-b-[6px] border-[9px] border-[#202327] bg-[#202327] shadow-[0_10px_24px_rgba(24,42,68,0.14)]">
              <img
                src={laptopEssay}
                alt="CertChamps essay workspace showing a typed answer and AI feedback"
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
            <div className="relative mx-auto h-4 w-[108%] -translate-x-[3.7%] rounded-b-[18px] border border-[#C8D0D8] bg-[#E7EBEF] shadow-[0_5px_10px_rgba(24,42,68,0.08)]">
              <span className="absolute left-1/2 top-0 h-[3px] w-16 -translate-x-1/2 rounded-b-md bg-[#C5CDD5]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
