import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { motion as Motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "./assets/logo.png";

export default function Layout() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ben.long@certchamps.ie");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 10);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <nav
        className={`bg-white/95 backdrop-blur-sm py-4 px-4 md:px-8 w-full flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hasScrolled ? "border-b border-grey/20" : "border-b border-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 z-50">
          <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
          <h1 className="font-bold text-black">
            Cert<span className="text-gold">Champs</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center flex-1 justify-center gap-6">
          <Link to="/" className="text-dark-grey hover:text-blue transition-colors">
            about
          </Link>
          <Link to="/" className="text-dark-grey hover:text-blue transition-colors">
            pricing
          </Link>
          <Link to="/" className="text-dark-grey hover:text-blue transition-colors">
            contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://app.certchamps.ie"
            className="bg-blue/10 text-blue px-5 py-2 rounded-md font-bold hover:bg-blue/20 transition-colors"
          >
            login
          </a>
        </div>

        <button
          className="md:hidden z-50 p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <Motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-white z-40 md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full gap-8 pt-16">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl text-dark-grey hover:text-blue transition-colors"
                >
                  about
                </Link>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl text-dark-grey hover:text-blue transition-colors"
                >
                  pricing
                </Link>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl text-dark-grey hover:text-blue transition-colors"
                >
                  contact
                </Link>
                <a
                  href="https://app.certchamps.ie"
                  className="bg-blue text-white px-8 py-3 rounded-md font-bold text-xl mt-4"
                >
                  login
                </a>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="w-full bg-light-grey border-t border-grey/20 mt-12 md:mt-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16">
          <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-12">
            <div className="flex flex-col items-center md:items-start">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
                <h1 className="font-bold text-black text-xl">
                  Cert<span className="text-gold">Champs</span>
                </h1>
              </Link>
              <a
                href="https://app.certchamps.ie"
                className="bg-blue text-white px-5 py-2 rounded-md font-bold text-sm inline-block hover:bg-blue/90 transition-colors"
              >
                Get Started
              </a>
            </div>

            <div className="flex flex-row justify-center gap-16 md:gap-20">
              <div>
                <h4 className="font-semibold text-black mb-4">Pages</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-black mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://www.instagram.com/certchamps/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-grey hover:text-blue transition-colors text-sm"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@certchamps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-grey hover:text-blue transition-colors text-sm"
                    >
                      TikTok
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/107425792/admin/dashboard/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-grey hover:text-blue transition-colors text-sm"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleCopyEmail}
                      className="text-dark-grey hover:text-blue transition-colors text-sm"
                    >
                      {emailCopied ? "Email Copied!" : "Email"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-grey/20 mt-10 md:mt-12 pt-6 md:pt-8 flex justify-center md:justify-between items-center">
            <p className="text-dark-grey text-xs md:text-sm text-center">
              © {new Date().getFullYear()} CertChamps. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
