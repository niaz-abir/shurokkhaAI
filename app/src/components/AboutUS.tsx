"use client";

import Image from "next/image";
import {
  FaShieldAlt,
  FaUsers,
  FaCheckCircle,
  FaBrain,
  FaMapMarkedAlt,
} from "react-icons/fa";

const highlights = [
  {
    icon: FaBrain,
    title: "AI-Powered Protection",
    description:
      "Intelligent gesture, fall, and voice detection helps identify potential emergencies and support faster responses.",
  },
  {
    icon: FaUsers,
    title: "Community-Driven Safety",
    description:
      "Empowering people to share safety concerns, report incidents, and build stronger, more informed communities.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Real-Time Awareness",
    description:
      "Location-based safety information and emergency alerts help people stay aware of potential risks around them.",
  },
];

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#020817] py-20 text-white sm:py-24 lg:py-24"
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-blue-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.10),transparent_55%)]" />

      {/* Full-width container */}
      <div className="mx-auto grid w-full grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-12 xl:px-16">
        {/* LEFT: Image */}
        <div className="relative w-full lg:mx-0">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-cyan-400/10 to-transparent blur-2xl" />

          <div className="group relative">
            {/* Image container: displays the complete image without cropping */}
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#061a38] shadow-2xl shadow-blue-950/40">
              <Image
                src="/image/banner.jpeg"
                alt="People working together to support their community"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="block h-auto w-full object-contain transition duration-700 ease-out group-hover:scale-[1.02]"
                priority
              />

              {/* Image overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020817]/90 via-[#020817]/25 to-[#061a38]/5" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-500/10" />

              {/* Floating badge */}
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-[#061a38]/75 px-4 py-2.5 text-xs font-semibold tracking-wider text-white shadow-lg backdrop-blur-xl sm:left-7 sm:top-7">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-cyan-400" />
                </span>
                SMARTER SAFETY. STRONGER COMMUNITIES.
              </div>

              {/* Image caption */}
              {/* <div className="absolute inset-x-0 bottom-0 p-5 sm:p-9">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-blue-500/20 text-xl text-cyan-300 shadow-lg shadow-blue-950/30 backdrop-blur-xl sm:mb-5 sm:h-14 sm:w-14 sm:text-2xl">
                  <FaShieldAlt />
                </div>

                <p className="max-w-md text-xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Technology with a purpose.
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Safety for everyone.
                  </span>
                </p>

                <p className="mt-3 max-w-sm text-xs leading-6 text-slate-300 sm:mt-4 sm:text-base sm:leading-7">
                  Bringing AI, emergency response, and community awareness
                  together for a safer tomorrow.
                </p>
              </div> */}
            </div>

            {/* Floating information card */}
            <div className="absolute -bottom-7 right-3 z-10 max-w-[245px] rounded-2xl border border-white/10 bg-[#07162d]/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:-right-5 sm:p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-lg text-cyan-300">
                  <FaCheckCircle />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">People First</p>
                  <p className="text-xs text-slate-400">
                    Our guiding principle
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
                Building technology around real-world safety needs.
              </p>
            </div>

            {/* Decorative corner */}
            <div className="absolute -left-4 -top-4 -z-10 h-24 w-24 rounded-tl-[2rem] border-l-2 border-t-2 border-cyan-400/50 sm:-left-6 sm:-top-6 sm:h-32 sm:w-32" />
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="pt-5 lg:pt-0">
          {/* Section label */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2.5">
            <FaShieldAlt className="text-sm text-cyan-300" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200 sm:text-sm">
              About ShurokkhaAI
            </span>
          </div>

          {/* Heading */}
          <h2 className="max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Making Our World
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Safer with AI.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            At ShurokkhaAI, we believe everyone deserves to feel safer in their
            community. We bring together AI-powered emergency detection,
            real-time alerts, location-based safety awareness, and community
            reporting to help people respond to potential dangers more
            effectively.
          </p>

          {/* Feature cards */}
          <div className="mt-9 space-y-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group flex gap-4 rounded-2xl border border-white/[0.07] bg-gradient-to-r from-[#07162d]/90 to-[#061a38]/60 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:from-blue-950/70 hover:to-[#061a38] hover:shadow-xl hover:shadow-blue-950/20 sm:p-5"
                  style={{
                    animation: `aboutFadeUp 650ms ease-out ${index * 150}ms both`,
                  }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/10 text-xl text-cyan-300 transition duration-300 group-hover:border-cyan-300/30 group-hover:bg-cyan-400/10 group-hover:text-cyan-200">
                    <Icon />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white transition-colors group-hover:text-cyan-200 sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Entrance animation */}
      <style jsx>{`
        @keyframes aboutFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
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
