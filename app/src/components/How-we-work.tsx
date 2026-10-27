"use client";

import {
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaBrain,
  FaUsers,
  FaCheck,
  FaShieldAlt,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    eyebrow: "THE FIRST STEP",
    title: "Speak up. Be heard.",
    description:
      "Report a safety concern, share a local problem, or request urgent assistance. Every report begins with someone willing to speak up.",
    icon: FaExclamationTriangle,
    points: ["Community issue reporting", "Safety concern submission"],
    video: "/image/area-report.mp4",
  },
  {
    number: "02",
    eyebrow: "CONTEXT MATTERS",
    title: "Put safety on the map.",
    description:
      "Location-based information helps people understand where incidents happen and which areas may need more attention.",
    icon: FaMapMarkerAlt,
    points: ["Location-based reports", "Local safety awareness"],
    video: "/image/community.mp4",
  },
  {
    number: "03",
    eyebrow: "SMARTER INSIGHTS",
    title: "Turn information into insight.",
    description:
      "Where implemented, AI-assisted tools can help organize submitted information and highlight patterns for better-informed decisions.",
    icon: FaBrain,
    points: ["AI-assisted analysis", "Information-driven awareness"],
    video: "/image/livemap.mp4",
  },
  {
    number: "04",
    eyebrow: "STRONGER TOGETHER",
    title: "Connect people to action.",
    description:
      "Community members and authorized administrators can review reports, stay informed, and support appropriate responses.",
    icon: FaUsers,
    points: ["Community collaboration", "Administrative review"],
    video: "/image/area-report.mp4",
  },
];

function VideoPanel({
  src,
  number,
}: {
  src: string;
  number: string;
}) {
  return (
    <div className="group relative">
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-transparent blur-xl transition duration-500 group-hover:from-blue-500/30" />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1729] shadow-2xl shadow-blue-950/30 transition duration-500 group-hover:border-cyan-400/30">
        <video
          className="aspect-video w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <FaShieldAlt />
            </div>

            <span className="text-sm font-semibold text-slate-200">
              ShurokkhaAI
            </span>
          </div>

          <span className="font-mono text-xs font-bold tracking-[0.2em] text-cyan-400">
            {number} / 04
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="relative isolate overflow-hidden bg-[#020817] py-20 text-white sm:py-24 lg:py-32"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 top-24 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-700/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mb-12 text-center sm:mb-16 lg:mb-20">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
              From awareness to action
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
            How We{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Discover how ShurokkhaAI brings people, location-based information,
            and intelligent tools together—from reporting a concern to
            supporting community action.
          </p>
        </div>

        {/* Journey introduction */}
        <div className="border-b border-white/10 pb-10 sm:pb-12">
          <h3 className="max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            A safer community starts with{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
              one action.
            </span>
          </h3>

          <div className="mt-5 flex items-center gap-3 text-sm font-semibold text-slate-200">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <FaShieldAlt />
            </span>
            Built around people. Driven by awareness.
          </div>
        </div>

        {/* Four steps with alternating video and text */}
        <div className="space-y-16 py-14 sm:space-y-20 sm:py-20 lg:space-y-28">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const videoFirst = index % 2 === 1;

            return (
              <article
                key={step.number}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
              >
                {/* Video: right in sections 1 and 3, left in sections 2 and 4 */}
                <div className={videoFirst ? "md:order-1" : "md:order-2"}>
                  <VideoPanel src={step.video} number={step.number} />
                </div>

                {/* Original text content */}
                <div className={videoFirst ? "md:order-2" : "md:order-1"}>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm font-bold tracking-[0.2em] text-cyan-400">
                      {step.number}
                    </span>

                    <span className="h-px w-10 bg-cyan-400/40" />

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
                      {step.eyebrow}
                    </span>
                  </div>

                  <div className="mt-6 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-lg text-cyan-300">
                      <Icon />
                    </div>

                    <div>
                      <h3 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                        {step.title}
                      </h3>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 pl-0 sm:pl-16">
                    {step.points.map((point) => (
                      <span
                        key={point}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] font-medium text-slate-300 sm:text-xs"
                      >
                        <FaCheck className="text-[10px] text-cyan-400" />
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
;
