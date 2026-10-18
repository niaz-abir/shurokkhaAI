"use client";

import Link from "next/link";
import {
  FaShieldAlt,
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaHeart,
  FaExclamationTriangle,
} from "react-icons/fa";

const footerLinks = {
  Platform: [
    { label: "Home", href: "/" },
    { label: "Community", href: "/community" },
    { label: "Live Safety Map", href: "/live-map" },
    { label: "Woman Mapping", href: "/woman-mapping" },
  ],
  Explore: [
    { label: "How We Work", href: "/#how-we-work" },
    { label: "Events", href: "/event" },
    { label: "Blog", href: "/blog" },
    { label: "Report a Concern", href: "/community" },
  ],
  Resources: [
    { label: "Emergency SOS", href: "/sos" },
    { label: "Safety Guidelines", href: "/safety-guidelines" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: FaGithub,
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.08] bg-[#020817] text-white">
      {/* Background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-blue-600/[0.09] blur-[110px]" />
        <div className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-cyan-500/[0.08] blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_2fr] lg:gap-20">
          {/* Brand column */}
          <div className="max-w-md">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="ShurokkhaAI home"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 text-xl text-cyan-300 transition duration-300 group-hover:border-cyan-300/50 group-hover:shadow-lg group-hover:shadow-cyan-950/30">
                <FaShieldAlt />
              </span>

              <span className="text-2xl font-black tracking-tight">
                Shurokkha
                <span className="text-cyan-400">AI</span>
              </span>
            </Link>

            <p className="mt-6 text-sm leading-7 text-slate-400 sm:text-base">
              Building a more aware, connected, and safer community through
              public participation, location-based information, and intelligent
              technology.
            </p>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-bold text-white">{title}</h3>

                <div className="mt-6 flex flex-col items-start gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-300"
                    >
                      <span>{link.label}</span>
                      <FaArrowRight className="text-[9px] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community CTA */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-r from-[#0B1B30] via-[#0A1930] to-[#092033] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-[70px]" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-lg text-cyan-300">
                <FaHeart />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  A safer community starts with us.
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Speak up about local concerns and help build awareness in your
                  community.
                </p>
              </div>
            </div>

            <Link
              href="/community"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-500"
            >
              Join the Community
              <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Emergency note */}
        <div className="flex flex-col gap-3 border-b border-white/[0.08] py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 text-sm text-slate-400">
            <FaExclamationTriangle className="mt-0.5 shrink-0 text-amber-400" />
            <p className="leading-6">
              <span className="font-semibold text-slate-200">
                Need immediate help?
              </span>{" "}
              Use verified local emergency services for urgent situations.
              ShurokkhaAI is not a replacement for emergency responders.
            </p>
          </div>

          <Link
            href="/sos"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-cyan-300 transition-colors hover:text-white"
          >
            Emergency SOS <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© ShurokkhaAI. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-cyan-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-cyan-300"
            >
              Terms
            </Link>
            <span className="flex items-center gap-1.5">
              Made for safer communities
              <FaHeart className="text-[10px] text-cyan-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
