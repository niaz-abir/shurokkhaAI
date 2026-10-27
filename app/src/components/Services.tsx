"use client";

import Link from "next/link";
import {
  FaShieldAlt,
  FaExclamationTriangle,
  FaMapMarkedAlt,
  FaUsers,
  FaArrowRight,
  FaBrain,
} from "react-icons/fa";

const services = [
  {
    number: "01",
    icon: FaShieldAlt,
    title: "Personal Safety",
    description:
      "Stay protected with AI-powered emergency detection designed to recognize potential danger and help people seek assistance.",
    tags: ["AI Detection", "Emergency Alerts"],
    link: "https://sos-system-06x2.onrender.com/",
    accent: "from-blue-500 to-cyan-400",
    glow: "group-hover:shadow-blue-500/10",
  },
  {
    number: "02",
    icon: FaExclamationTriangle,
    title: "Community Reporting",
    description:
      "Report civic issues and safety concerns, helping communities bring attention to problems that need action.",
    tags: ["Issue Reports", "Community"],
    link: "/community",
    accent: "from-cyan-400 to-sky-500",
    glow: "group-hover:shadow-cyan-500/10",
  },
  {
    number: "03",
    icon: FaMapMarkedAlt,
    title: "Live Safety Map",
    description:
      "Explore reported incidents and location-based safety information to make more informed decisions about your surroundings.",
    tags: ["Location Awareness", "Safety Insights"],
    link: "https://safeguard-live.vercel.app/",
    accent: "from-sky-400 to-indigo-500",
    glow: "group-hover:shadow-indigo-500/10",
  },
  {
    number: "04",
    icon: FaUsers,
    title: "Smart Community",
    description:
      "Connect with your community, share local concerns, and encourage collective responsibility for safer public spaces.",
    tags: ["Public Awareness", "Civic Action"],
    link: "/area-report",
    accent: "from-indigo-400 to-cyan-400",
    glow: "group-hover:shadow-cyan-500/10",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate w-full overflow-hidden bg-[#020817] py-24 text-white sm:py-28 lg:py-24"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.12),transparent_55%)]" />

      {/* Full-width container */}
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-blue-500/10 px-4 py-2.5">
            <FaBrain className="text-sm text-cyan-300" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200 sm:text-sm">
              What We Offer
            </span>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Our{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-200 bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Intelligent technology, community engagement, and real-time safety
            awareness — working together to help build safer communities for
            everyone.
          </p>

          <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-300" />
        </div>

        {/* Four service cards */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5 2xl:gap-7">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className={`group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0a1b36] via-[#07162d] to-[#040c1c] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-sky-400/40 hover:shadow-2xl ${service.glow} sm:p-7 xl:p-6 2xl:p-7`}
                style={{
                  animation: `serviceFadeUp 650ms ease-out ${index * 120}ms both`,
                }}
              >
                {/* Hover glow */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${service.accent} opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-25`}
                />

                {/* Top line */}
                <div
                  className={`absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r ${service.accent} transition-all duration-500 group-hover:w-full`}
                />

                {/* Card number and icon */}
                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br ${service.accent} bg-opacity-10 shadow-lg transition duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className="text-2xl text-white" />
                  </div>

                  <span className="text-sm font-bold tracking-widest text-slate-600 transition-colors duration-300 group-hover:text-cyan-300">
                    {service.number}
                  </span>
                </div>

                {/* Card content */}
                <div className="relative mt-8 flex-1">
                  <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-200 2xl:text-2xl">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {service.description}
                  </p>

                  {/* Service tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-blue-400/15 bg-blue-500/[0.07] px-3 py-1.5 text-[11px] font-medium text-slate-300 transition-colors duration-300 group-hover:border-cyan-400/20 group-hover:text-cyan-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer */}
                <div className="relative mt-8 border-t border-white/[0.08] pt-5">
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-3 text-sm font-semibold text-slate-300 transition-colors duration-300 hover:text-white group-hover:text-cyan-300"
                  >
                    Explore Service
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:translate-x-1 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
                      <FaArrowRight className="text-xs" />
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom call-to-action */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-blue-400/15 bg-gradient-to-r from-[#071a37] via-[#0a2145] to-[#06152c] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-10">
          <div className="pointer-events-none absolute -right-10 -top-24 h-56 w-56 rounded-full bg-blue-500/15 blur-[80px]" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-2xl text-cyan-300" />
              <h3 className="text-xl font-bold sm:text-2xl">
                Safety starts with awareness.
              </h3>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Explore ShurokkhaAI and discover how technology and community
              action can contribute to a safer environment.
            </p>
          </div>

          <Link
            href="/community"
            className="group relative mt-6 inline-flex shrink-0 items-center justify-center gap-3 bg-[#04F06A] rounded-xl border border-sky-400/30 text-black px-6 py-4 text-sm font-bold  shadow-lg shadow-blue-950/40 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-900/40 lg:mt-0"
          >
            Join the Community
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Entrance animation */}
      <style jsx>{`
        @keyframes serviceFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
