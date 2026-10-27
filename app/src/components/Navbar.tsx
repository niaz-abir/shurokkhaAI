"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaShieldAlt,
  FaBars,
  FaTimes,
  FaArrowRight,
  FaChevronDown,
} from "react-icons/fa";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Community", href: "/community" },
  { name: "About Us", href: "#about" },
  { name: "Our Services", href: "#services" },
  { name: "Live Map", href: "https://safeguard-live.vercel.app/" },
  { name: "Area report", href: "/area-report" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-10">
      <nav className="w-full rounded-2xl border border-white/10 bg-[#071426]/65 shadow-2xl shadow-black/20 backdrop-blur-2xl backdrop-saturate-150">
        <div className="flex min-h-[76px] items-center justify-between px-4 sm:px-6 lg:px-7">
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#04F06A]/25 bg-[#04F06A]/10 text-[#04F06A] transition duration-300 group-hover:bg-[#04F06A]/20 group-hover:shadow-lg group-hover:shadow-[#04F06A]/10">
              <Image
                src="/image/logo.png"
                alt="ShurokkhaAI Logo"
                width={44}
                height={44}
                priority
                className="h-full w-full object-contain p-1"
              />
            </span>

            <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Shurokkha
              <span className="text-[#04F06A]">AI</span>
              <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.25em] text-slate-400">
                Intelligent Safety Platform
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative rounded-xl px-4 py-3 text-sm font-medium transition duration-300 ${
                  index === 0
                    ? "text-[#04F06A]"
                    : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {link.name}

                <span
                  className={`absolute bottom-1.5 left-4 right-4 h-[2px] origin-left rounded-full bg-[#04F06A] transition-transform duration-300 ${
                    index === 0
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 xl:flex">
            <Link
              href="https://sos-system-06x2.onrender.com/"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#04F06A] px-5 py-3 text-sm font-bold text-[#071426] shadow-lg shadow-[#04F06A]/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#35ff88] hover:shadow-xl hover:shadow-[#04F06A]/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
              </span>
              SOS Emergency
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-xl text-white transition hover:border-[#04F06A]/40 hover:bg-[#04F06A]/10 hover:text-[#04F06A] xl:hidden"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          id="mobile-navigation"
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out xl:hidden ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-1 border-t border-white/10 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-[#04F06A]"
                >
                  {link.name}
                  <FaArrowRight className="text-xs opacity-50" />
                </Link>
              ))}

              <div className="grid grid-cols-2 gap-3 pt-3">
                <Link
                  href="https://sos-system-06x2.onrender.com/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#04F06A] px-3 py-3 text-sm font-bold text-[#071426] transition hover:bg-[#35ff88]"
                >
                  SOS Emergency
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
