import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MEASUREMENT_ID = "G-T9KRDYV6J";
const CONSENT_KEY = "certchamps-analytics-consent";

function pagePath(location) {
  return `${location.pathname}${location.search}${location.hash}`;
}

function isLocalHost() {
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

function configAnalytics(path) {
  if (typeof window.gtag !== "function") return;
  window.gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
    debug_mode: isLocalHost(),
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
  });
}

export function trackPageView(path) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
    send_to: MEASUREMENT_ID,
  });
}

function setAnalyticsConsent(granted, path) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {
    /* ignore quota / private mode */
  }
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  if (granted) configAnalytics(path);
}

export default function GoogleAnalytics() {
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const skipFirstView = useRef(true);

  useEffect(() => {
    try {
      setShowBanner(!localStorage.getItem(CONSENT_KEY));
    } catch {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    if (skipFirstView.current) {
      skipFirstView.current = false;
      return;
    }
    trackPageView(pagePath(location));
  }, [location.pathname, location.search, location.hash]);

  const choose = (granted) => {
    setAnalyticsConsent(granted, pagePath(location));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[60] rounded-xl border border-grey/20 bg-white p-4 shadow-lg">
      <p className="text-sm text-dark-grey leading-relaxed">
        We use Google Analytics to understand how the site is used. You can accept or decline
        analytics cookies. See our{" "}
        <Link to="/privacy" className="text-blue underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-3 flex flex-wrap gap-2 justify-end">
        <button
          type="button"
          onClick={() => choose(false)}
          className="px-4 py-2 rounded-md text-sm font-semibold text-dark-grey hover:bg-light-grey transition-colors"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="px-4 py-2 rounded-md text-sm font-bold bg-blue text-white hover:bg-blue/90 transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
