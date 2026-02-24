import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "./assets/logo.png";
import full_app from "./assets/full_app.png";
import ai_snippet from "./assets/ai_snippet_app.png";
import StudyIconsParallax from "./components/StudyIconsParallax";
import FeaturesGrid from "./components/FeaturesGrid";
import HeroCard from "./components/HeroCard";
import promo from "./assets/videos/promo_vid.mp4";

function App() {
  const heroRef = useRef(null);
  const videoSectionRef = useRef(null);
  const champRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [emailCopied, setEmailCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ben.long@certchamps.ie');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // Track mouse for gradient effect
  const handleMouseMove = (e) => {
    if (!champRef.current) return;
    const rect = champRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const parallaxBig = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const parallaxSmall = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Video section scroll animation
  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "start center"],
  });

  const videoScaleRaw = useTransform(videoScrollProgress, [0, 1], [1.05, 1]);
  const videoScale = useSpring(videoScaleRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const videoYRaw = useTransform(videoScrollProgress, [0, 1], [30, 0]);
  const videoY = useSpring(videoYRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Track if user has scrolled for navbar border
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 10);
  });

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="relative overflow-x-hidden w-full">
      {/* Floating icons - desktop only */}
      <div className="hidden lg:block">
        <StudyIconsParallax />
      </div>

      {/* Navbar */}
      <nav className={`bg-white/95 backdrop-blur-sm py-4 px-4 md:px-8 w-full flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? "border-b border-grey/20" : "border-b border-transparent"}`}>
        <a href="/" className="flex items-center gap-2 z-50">
          <img src={logo} alt="logo" className="w-8 h-8 object-contain"/>
          <h1 className="font-bold text-black">Cert<span className="text-gold">Champs</span></h1>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center flex-1 justify-center gap-6">
          <a href="/" className="text-dark-grey hover:text-blue transition-colors">about</a>
          <a href="/" className="text-dark-grey hover:text-blue transition-colors">pricing</a>
          <a href="/" className="text-dark-grey hover:text-blue transition-colors">contact</a>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a href="https://app.certchamps.ie" className="bg-blue/10 text-blue px-5 py-2 rounded-md font-bold hover:bg-blue/20 transition-colors">login</a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden z-50 p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-white z-40 md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full gap-8 pt-16">
                <a href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-dark-grey hover:text-blue transition-colors">about</a>
                <a href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-dark-grey hover:text-blue transition-colors">pricing</a>
                <a href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-dark-grey hover:text-blue transition-colors">contact</a>
                <a href="https://app.certchamps.ie" className="bg-blue text-white px-8 py-3 rounded-md font-bold text-xl mt-4">login</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen w-full bg-transparent pt-24 md:pt-28 pb-8" onMouseMove={handleMouseMove}>
        <div className="flex flex-col items-center justify-start w-full relative px-4 md:px-8">
          {/* Hero Text */}
          <div className="flex flex-col items-center w-full z-10 py-4 md:py-5">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight -tracking-[0.1rem] md:-tracking-[0.15rem] mb-4 text-black w-full text-center"
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            >
              Practice like a{" "}
              <span 
                ref={champRef}
                className="font-bold relative inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #FFD700, #FFBD53, #FFA500)`,
                }}
              >
                Champ
              </span>
            </motion.h1>
            <motion.h2
              className="text-base sm:text-lg md:text-xl text-dark-grey w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto text-center px-4"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            >
              The all in one Leaving Cert platform that helps you practice questions, exactly how you want.
            </motion.h2>
          </div>

          {/* Hero Images - Desktop only with parallax */}
          <div className="hidden md:block relative w-full h-[50vh] lg:h-[55vh]">
            <motion.img
              src={full_app}
              alt="full_app"
              className="h-full max-h-[500px] object-contain absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-[55%] z-10"
              style={{ y: parallaxBig }}
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            />
            <motion.img
              src={ai_snippet}
              alt="ai_snippet"
              className="h-full max-h-[520px] object-contain absolute top-1/2 -translate-y-[45%] left-1/2 translate-x-[15%] z-10"
              style={{ y: parallaxSmall }}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </div>

          {/* Hero Images - Mobile/Tablet - single image */}
          <div className="md:hidden w-full flex flex-col items-center py-8">
            <motion.img
              src={full_app}
              alt="full_app"
              className="w-[85%] max-w-[400px] object-contain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </div>

          {/* CTA Button */}
          <div className="w-full flex justify-center items-center py-6 md:py-8">
            <motion.a
              href="https://app.certchamps.ie"
              className="bg-blue/10 text-blue px-6 py-3 rounded-md font-bold text-lg md:text-xl cursor-pointer hover:bg-blue/20 transition-colors"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              Get Started
            </motion.a>
          </div>
        </div>
      </section>

      <FeaturesGrid />
      <HeroCard />

      {/* Video Section */}
      <section ref={videoSectionRef} className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-dark-grey mb-6 md:mb-8">see certchamps in action</h2>
        <motion.div 
          className="w-full p-2 md:p-4 rounded-xl bg-grey/20 overflow-hidden origin-center"
          style={{ scale: videoScale, y: videoY }}
        >
          <video 
            src={promo} 
            controls 
            loop 
            className="w-full rounded-lg md:rounded-xl"
            style={{ aspectRatio: '16/9' }}
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-light-grey border-t border-grey/20 mt-12 md:mt-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16">
          {/* Footer Grid - responsive */}
          <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-12">
            {/* Logo & CTA */}
            <div className="flex flex-col items-center md:items-start">
              <a href="/" className="flex items-center gap-2 mb-4">
                <img src={logo} alt="logo" className="w-10 h-10 object-contain"/>
                <h1 className="font-bold text-black text-xl">Cert<span className="text-gold">Champs</span></h1>
              </a>
              <a href="https://app.certchamps.ie" className="bg-blue text-white px-5 py-2 rounded-md font-bold text-sm inline-block hover:bg-blue/90 transition-colors">
                Get Started
              </a>
            </div>

            {/* Pages & Connect - side by side on mobile */}
            <div className="flex flex-row justify-center gap-16 md:gap-20">
              {/* Pages */}
              <div>
                <h4 className="font-semibold text-black mb-4">Pages</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-dark-grey hover:text-blue transition-colors text-sm">Home</a></li>
                  <li><a href="/" className="text-dark-grey hover:text-blue transition-colors text-sm">About</a></li>
                  <li><a href="/" className="text-dark-grey hover:text-blue transition-colors text-sm">Pricing</a></li>
                  <li><a href="/" className="text-dark-grey hover:text-blue transition-colors text-sm">Contact</a></li>
                </ul>
              </div>

              {/* Socials */}
              <div>
                <h4 className="font-semibold text-black mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="https://www.instagram.com/certchamps/" target="_blank" rel="noopener noreferrer" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tiktok.com/@certchamps" target="_blank" rel="noopener noreferrer" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      TikTok
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/107425792/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <button onClick={handleCopyEmail} className="text-dark-grey hover:text-blue transition-colors text-sm">
                      {emailCopied ? 'Email Copied!' : 'Email'}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-grey/20 mt-10 md:mt-12 pt-6 md:pt-8 flex justify-center md:justify-between items-center">
            <p className="text-dark-grey text-xs md:text-sm text-center">© {new Date().getFullYear()} CertChamps. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
