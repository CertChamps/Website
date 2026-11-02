import { GraduationCap, School } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="relative z-10 px-4 py-24 sm:px-6 sm:py-28 md:px-8 lg:py-32">
      <div className="mx-auto max-w-[900px] text-center">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-black sm:text-4xl lg:text-[clamp(2.5rem,4vw,3.5rem)]">
          Trusted by <span className="text-[#E99A11]">thousands</span> of Irish students and schools.
        </h2>
        <p className="mx-auto mt-6 max-w-[650px] text-base leading-relaxed text-dark-grey sm:text-lg">
          From exam questions to feedback and free resources, CertChamps brings the tools for focused study together in one place.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <div className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[#E3E7ED] bg-white px-5 py-3 text-sm font-semibold text-black sm:text-base">
            <GraduationCap className="h-5 w-5 text-[#E99A11]" strokeWidth={1.8} aria-hidden="true" />
            Irish students
          </div>
          <div className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[#E3E7ED] bg-white px-5 py-3 text-sm font-semibold text-black sm:text-base">
            <School className="h-5 w-5 text-[#E99A11]" strokeWidth={1.8} aria-hidden="true" />
            Schools
          </div>
        </div>
      </div>
    </section>
  );
}
