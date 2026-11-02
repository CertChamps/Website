import aiDemo from "../assets/videos/AI_demo.mp4";
import aiDemoPoster from "../assets/ai_demo_poster.png";

export default function AiHelpSection() {
  return (
    <section id="ai-help" className="relative z-10 scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 md:px-8 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-1 max-w-[520px]">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-black sm:text-4xl lg:text-[clamp(2.5rem,4vw,3.5rem)]">
            <span className="text-[#E99A11]">AI help</span> for Leaving Cert &amp; Junior Cert questions
          </h2>
          <p className="mt-6 text-base leading-relaxed text-dark-grey sm:text-lg">
            Get AI help with Leaving Cert questions, explanations and concepts. Our AI can view your workings and the questions you are working on to help you understand each step.
          </p>
          <a
            href="https://app.certchamps.ie"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5A623] px-7 py-3 text-base font-semibold text-black transition-colors hover:bg-[#E99A11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            try it out
          </a>
        </div>

        <div className="order-2 flex justify-center lg:justify-end">
          <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-[#D9DEE6] bg-white shadow-[0_10px_24px_rgba(24,42,68,0.14)]">
            <video
              src={aiDemo}
              poster={aiDemoPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="CertChamps AI answering a study question"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
