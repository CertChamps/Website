import { motion } from "framer-motion";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import crownIdleUrl from "../assets/crown_idle.riv?url";

const HEADING = "behind the crown";
const SUBHEADING = "Built by people who have sat the same exams, for students who are in it together.";

const ease = [0.22, 0.61, 0.36, 1];

function AnimatedWords({ text, delay = 0 }) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.28em] last:mr-0"
          variants={{
            hidden: { opacity: 0, y: 16, filter: "blur(12px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

function FloatingCrown() {
  const { RiveComponent } = useRive({
    src: crownIdleUrl,
    artboard: "Artboard",
    stateMachine: "State Machine 1",
    autoplay: true,
    shouldDisableRiveListeners: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });

  return (
    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
      <RiveComponent
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20 scroll-mt-24"
    >
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-dark-grey mb-3">
          <AnimatedWords text={HEADING} />
        </h2>
        <p className="text-dark-grey text-sm sm:text-base max-w-xl mx-auto">
          <AnimatedWords text={SUBHEADING} delay={0.28} />
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute -inset-6 md:-inset-10" aria-hidden>
          <div className="absolute top-4 left-[12%] h-56 w-56 rounded-full bg-gold/35 blur-3xl" />
          <div className="absolute bottom-0 right-[10%] h-64 w-64 rounded-full bg-blue/20 blur-3xl" />
        </div>
        <motion.div
          className="relative rounded-2xl border border-white/70 bg-white/35 backdrop-blur-2xl p-6 sm:p-8 md:p-12 shadow-[0_8px_40px_rgba(21,21,21,0.06)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
            <div className="max-w-3xl space-y-5 text-sm sm:text-base leading-relaxed text-dark-grey">
              <p>
                We are engineers. Of course we know the struggle of having to study even though you really do not want to.
                Of course we know that feeling when you have a very specific question and do not know who to ask.
              </p>
              <p>
                We created CertChamps to make Leaving Cert and Junior Cert practice engaging, and to give students a community around a
                shared goal. After all, you are all in this together.
              </p>
              <p>
                Our goal is a platform that gets the work done without making study feel like a chore. Built out of
                passion, for students who want to practise like a champ.
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-black pt-2">
                why we created it
              </h3>
              <p>
                We saw the growing number of students using iPads and wanted to give them an app that felt like
                everything was integrated into a smooth experience.
              </p>
            </div>
            <div className="flex flex-col items-center shrink-0 mx-auto md:mx-0 md:-mt-2">
              <FloatingCrown />
              <a
                href="https://app.certchamps.ie"
                className="mt-3 inline-block bg-gold text-black font-bold rounded-md px-6 py-3 hover:bg-gold/90 transition-colors"
              >
                Get started
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
