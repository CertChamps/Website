import katieVideo from "../assets/videos/katie_video.mp4";
import katiePoster from "../assets/videos/katie_video_poster.webp";
import cianVideo from "../assets/videos/cian_video.mp4";
import cianPoster from "../assets/videos/cian_video_poster.webp";
import benVideo from "../assets/videos/ben_video.mp4";
import benPoster from "../assets/videos/ben_video_poster.webp";

const videos = [
  { name: "Katie", src: katieVideo, poster: katiePoster },
  { name: "Cian", src: cianVideo, poster: cianPoster },
  { name: "Ben", src: benVideo, poster: benPoster },
];

const testimonials = [
  {
    quote: "It's perfect for exam paper practice, nothing else comes close.",
    name: "James",
    role: "6th year student",
  },
  {
    quote: "I used it to get in some much needed study while travelling to waterpolo games. Life saver.",
    name: "Shane",
    role: "Recent Leaving Cert graduate",
  },
  {
    quote: "Yessss I love using it for grinds, I can just pull up random questions on a topic I'm doing and share my screen directly with my student.",
    name: "Lucy",
    role: "Grinds teacher",
  },
];

export default function TrustSection() {
  return (
    <section className="relative z-10 px-4 py-24 sm:px-6 sm:py-28 md:px-8 lg:py-32">
      <div className="mx-auto max-w-[900px] text-center">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-black sm:text-4xl lg:text-[clamp(2.5rem,4vw,3.5rem)]">
          Trusted by <span className="text-[#E99A11]">1,000+</span> current users.
        </h2>
        <p className="mx-auto mt-6 max-w-[650px] text-base leading-relaxed text-dark-grey sm:text-lg">
          From exam questions to feedback and free resources, CertChamps brings the tools for focused study together in one place.
        </p>
        <div className="mx-auto mt-10 grid max-w-[820px] gap-5 sm:grid-cols-3 sm:gap-6">
          {videos.map(({ name, src, poster }) => (
            <div key={name} className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-[#E3E7ED] bg-white shadow-[0_10px_24px_rgba(24,42,68,0.14)]">
              <video
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`${name}'s CertChamps video`}
                className="block aspect-[9/16] w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-20">
          <h3 className="text-2xl font-bold tracking-[-0.03em] text-black sm:text-3xl">
            What people are saying
          </h3>
          <div className="mt-8 grid gap-5 text-left md:grid-cols-3">
            {testimonials.map(({ quote, name, role }) => (
              <figure key={name} className="flex h-full flex-col rounded-2xl border border-[#E3E7ED] bg-white p-6">
                <blockquote className="flex-1 text-base leading-relaxed text-black">
                  “{quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-black">
                  {name} <span className="font-normal text-dark-grey">· {role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
