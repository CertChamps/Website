import { motion } from "framer-motion";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import crownIdleUrl from "../assets/crown_idle.riv?url";

const HEADING = "Why isn't there an easier way to learn?";
const SUBHEADING = "It all began with two students, one shared experience, and one simple question.";
const CHAMP_GOLD = "radial-gradient(circle at 40.5% 70%, #FFD700, #FFBD53, #FFA500)";

const ease = [0.22, 0.61, 0.36, 1];

function AnimatedWords({ text, delay = 0, highlight }) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => {
        const plain = word.replace(/[^\w']/g, "").toLowerCase();
        const highlighted = highlight && plain === highlight.toLowerCase();
        return (
          <motion.span
            key={`${word}-${i}`}
            className={`inline-block mr-[0.28em] last:mr-0${
              highlighted ? " font-bold bg-clip-text text-transparent" : ""
            }`}
            style={highlighted ? { backgroundImage: CHAMP_GOLD } : undefined}
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
        );
      })}
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
    <div className="w-28 h-28 sm:w-36 sm:h-36" aria-hidden>
      <RiveComponent style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}

const founders = [
  {
    name: "Cian",
    text: "Cian spent countless hours studying on his iPad and kept thinking there had to be a better, more natural and more efficient way to prepare for exams. The technology was already in our hands, but the study experience still felt like it had not caught up.",
  },
  {
    name: "Ben",
    text: "Ben saw a different challenge. He believed that students should not have to pay huge amounts to access high-quality educational resources. Good education should be accessible to everyone, and students should have the opportunity to learn, practise and improve regardless of their circumstances.",
  },
];

export default function AboutSection() {
  return (
    <section className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 md:pb-20">
      <div className="text-center mb-10 md:mb-12">
        <div className="flex justify-center -mb-2">
          <FloatingCrown />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-dark-grey mb-3">
          <AnimatedWords text={HEADING} highlight="learn" />
        </h1>
        <p className="text-dark-grey text-sm sm:text-base max-w-xl mx-auto">
          <AnimatedWords text={SUBHEADING} delay={0.28} />
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <p className="text-sm sm:text-base leading-relaxed text-dark-grey">
          Ben and I sat our Leaving Certs and both achieved 613/625 points. While preparing for our exams, we noticed
          something that went beyond grades. The way students studied was changing, but the tools available to them
          weren&apos;t changing with it.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((founder) => (
            <div key={founder.name} className="rounded-2xl bg-white border border-grey/20 p-6">
              <h2 className="text-xl font-bold text-blue mb-3">{founder.name}</h2>
              <p className="text-sm leading-relaxed text-dark-grey">{founder.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed text-dark-grey">
          <p className="text-black font-semibold">These two ideas became the foundation of CertChamps.</p>
          <p>
            We&apos;ve always been passionate about engineering, technology and programming, so we decided to put our
            skills to work and build the kind of study platform we wished we had when preparing for our own Leaving
            Cert exams.
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-blue pt-4">
            The best way to learn is by doing.
          </h2>
          <p>
            Reading about a topic can help you understand the fundamentals, but it&apos;s practising questions, making
            mistakes, learning from them and trying again that makes knowledge stick. That&apos;s why CertChamps is built
            around active practice and exam preparation, giving students an easier way to practise questions, identify
            what they need to improve and build confidence along the way.
          </p>
          <p className="text-black font-semibold">We didn&apos;t want to create just another question bank.</p>
          <p>
            We set out to build a complete study ecosystem that fits naturally into the way students learn today. From
            our web platform to our mobile and iPad apps, CertChamps brings the tools students need for revision and
            exam practice together in one connected experience.
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-blue pt-4">Our goal</h2>
          <p className="text-black font-semibold">Make studying more efficient, accessible and effective.</p>
          <p>
            We built CertChamps because we experienced the problem ourselves. We built it for the students who are
            experiencing it today.
          </p>
          <p>
            We&apos;re here to improve the way students learn, and the way they prepare for exams. Ultimately, we&apos;re
            creating the platform we wish we had when we were preparing for our own tests.
          </p>
        </div>

        <a
          href="https://app.certchamps.ie"
          className="mt-8 inline-block bg-gold text-black font-bold rounded-md px-5 py-3 hover:bg-gold/90 transition-colors"
        >
          Get started
        </a>
      </div>
    </section>
  );
}
