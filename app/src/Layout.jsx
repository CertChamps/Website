import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import GoogleAnalytics from "./GoogleAnalytics.jsx";
import { motion as Motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "./assets/logo.png";

const PAGE_TITLES = {
  "/": "CertChamps | Leaving Cert Study & Practice Platform",
  "/pricing": "Pricing | CertChamps",
  "/about": "About | CertChamps",
  "/privacy": "Privacy Policy | CertChamps",
  "/terms": "Terms of Service | CertChamps",
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
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
    setHasScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] ?? PAGE_TITLES["/"];
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash === "#pricing") {
      navigate("/pricing", { replace: true });
      return;
    }
    if (location.hash === "#about") {
      navigate("/about", { replace: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash, navigate]);

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
        className={`fixed top-4 right-4 left-4 z-50 mx-auto flex w-auto max-w-[1160px] items-center justify-between rounded-2xl border border-[#E6EAF0] bg-[#FCFCFD] px-3 shadow-[0_3px_12px_rgba(24,42,68,0.08)] transition-all duration-300 sm:px-4 md:px-8 ${hasScrolled ? "py-2" : "py-3 sm:py-4"}`}
      >
        <Link to="/" className="relative z-50 flex shrink-0 items-center gap-2">
          <img src={logo} alt="CertChamps Leaving Cert study platform" className={`object-contain transition-all duration-300 ${hasScrolled ? "h-7 w-7" : "h-8 w-8"}`} />
          <h1 className="text-sm font-bold text-black sm:text-base">
            Cert<span className="text-gold">Champs</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center flex-1 justify-center gap-6">
          <Link to="/about" className="text-dark-grey hover:text-blue transition-colors">
            About
          </Link>
          <Link to="/pricing" className="text-dark-grey hover:text-blue transition-colors">
            Pricing
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://app.certchamps.ie"
            className="px-3 py-2 font-semibold text-black transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log In
          </a>
          <a
            href="https://app.certchamps.ie"
            className="rounded-md bg-[#F5A623] px-4 py-2 font-semibold text-black transition-colors hover:bg-[#E99A11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Get Started
          </a>
        </div>

        <div className="relative z-50 flex items-center gap-1 md:hidden">
          <a
            href="https://app.certchamps.ie"
            className="inline-flex min-h-11 items-center rounded-md bg-[#F5A623] px-2 text-xs font-semibold text-black transition-colors hover:bg-[#E99A11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:px-3 sm:text-sm"
          >
            Get Started
          </a>
          <button
            className="-mr-1 min-h-11 min-w-11 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
          </button>
        </div>

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
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl text-dark-grey hover:text-blue transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl text-dark-grey hover:text-blue transition-colors"
                >
                  Pricing
                </Link>
                <a
                  href="https://app.certchamps.ie"
                  className="mt-4 text-xl font-semibold text-black hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Log In
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
                <img src={logo} alt="CertChamps Leaving Cert study platform" className="w-10 h-10 object-contain" />
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
                    <Link to="/about" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-dark-grey hover:text-blue transition-colors text-sm">
                      Terms of Service
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
      <GoogleAnalytics />
    </div>
  );
}
