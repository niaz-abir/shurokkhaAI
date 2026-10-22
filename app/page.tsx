"use client";

import { useEffect, useState } from "react";

import AboutUs from "./src/components/AboutUS";
import Banner from "./src/components/Banner";
import Footer from "./src/components/Footer";
import HowWeWork from "./src/components/How-we-work";
import Navbar from "./src/components/Navbar";
import Services from "./src/components/Services";
import VideoSection from "./src/components/VideoSection";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowPopup(true);
    }, 300);

    const hideTimer = setTimeout(() => {
      setShowPopup(false);
    }, 10300);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* Main Website */}
      <Navbar />
      <Banner />
      <AboutUs />
      <Services />
      <HowWeWork />
      <VideoSection />
      <Footer />

      {/* Live Map Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm animate-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="live-map-title"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-8 text-center text-white shadow-2xl animate-popup">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              aria-label="Close popup"
              className="absolute right-4 top-3 text-3xl text-gray-400 transition-colors hover:text-white"
            >
              &times;
            </button>

            {/* Location Icon */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>

            {/* Popup Content */}
            <h2 id="live-map-title" className="mb-3 text-2xl font-bold">
              Your Safety Matters!
            </h2>

            <p className="mb-7 text-sm leading-6 text-gray-300">
              Need help staying safe? Explore our{" "}
              <strong className="font-bold text-white">Live Map</strong> feature
              to share your live location with authorized administrators when
              you choose to do so.
            </p>

            {/* Red Live Map Button */}
            <a
              href="https://safeguard-live.vercel.app/"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-red-900/30 transition-all duration-300 hover:scale-[1.03] hover:bg-red-700 hover:shadow-red-900/50 active:scale-95"
            >
              Live Map
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>

            <p className="mt-4 text-xs text-gray-500">
              This popup will close automatically in 10 seconds.
            </p>
          </div>
        </div>
      )}

      {/* Smooth Popup Animations */}
      <style jsx>{`
        .animate-overlay {
          animation: overlayIn 0.45s ease-out both;
        }

        .animate-popup {
          animation: popupIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes overlayIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
        }

        @keyframes popupIn {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-overlay,
          .animate-popup {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
