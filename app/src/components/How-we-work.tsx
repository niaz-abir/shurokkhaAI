"use client";

import Link from "next/link";
import {
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaBrain,
  FaUsers,
  FaArrowRight,
  FaShieldAlt,
  FaCheck,
  FaBell,
  FaLocationArrow,
  FaRegClock,
  FaCircle,
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
    visual: "report",
  },
  {
    number: "02",
    eyebrow: "CONTEXT MATTERS",
    title: "Put safety on the map.",
    description:
      "Location-based information helps people understand where incidents happen and which areas may need more attention.",
    icon: FaMapMarkerAlt,
    points: ["Location-based reports", "Local safety awareness"],
    visual: "map",
  },
  {
    number: "03",
    eyebrow: "SMARTER INSIGHTS",
    title: "Turn information into insight.",
    description:
      "Where implemented, AI-assisted tools can help organize submitted information and highlight patterns for better-informed decisions.",
    icon: FaBrain,
    points: ["AI-assisted analysis", "Information-driven awareness"],
    visual: "insights",
  },
  {
    number: "04",
    eyebrow: "STRONGER TOGETHER",
    title: "Connect people to action.",
    description:
      "Community members and authorized administrators can review reports, stay informed, and support appropriate responses.",
    icon: FaUsers,
    points: ["Community collaboration", "Administrative review"],
    visual: "community",
  },
];

function ReportVisual() {
  return (
    <div className="relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0B1729] p-6 sm:p-8">
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-blue-500/15 blur-[70px]" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
            <FaShieldAlt />
          </div>
          <div>
            <p className="text-sm font-bold text-white">ShurokkhaAI</p>
            <p className="mt-1 text-[11px] text-slate-500">Community portal</p>
          </div>
        </div>
        <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-300">
          New report
        </span>
      </div>

      <div className="relative my-8 rounded-2xl border border-white/10 bg-[#101F34] p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
            <FaExclamationTriangle />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Report a concern</p>
            <p className="mt-1 text-xs text-slate-500">
              Help your community stay informed
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-2 w-full rounded-full bg-white/[0.07]" />
          <div className="h-2 w-4/5 rounded-full bg-white/[0.07]" />
          <div className="h-2 w-2/3 rounded-full bg-white/[0.07]" />
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl bg-blue-600 px-4 py-3">
          <span className="text-xs font-bold text-white">Submit a report</span>
          <FaArrowRight className="text-xs text-white" />
        </div>
      </div>

      <div className="relative flex items-center gap-2 text-xs text-slate-400">
        <FaCircle className="text-[7px] text-cyan-400" />
        Every voice can make a difference.
      </div>
    </div>
  );
}

function MapVisual() {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-[#0B1729] p-6 sm:p-8">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-[20%] top-0 h-full w-px bg-cyan-300/20" />
        <div className="absolute left-[45%] top-0 h-full w-px rotate-[22deg] bg-cyan-300/20" />
        <div className="absolute left-[75%] top-0 h-full w-px -rotate-[18deg] bg-cyan-300/20" />
        <div className="absolute left-0 top-[30%] h-px w-full bg-cyan-300/20" />
        <div className="absolute left-0 top-[65%] h-px w-full bg-cyan-300/20" />
        <div className="absolute left-0 top-[85%] h-px w-full bg-cyan-300/20" />
      </div>

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Location awareness
          </p>
          <h4 className="mt-2 text-lg font-bold text-white">
            Every place matters.
          </h4>
        </div>
        <FaLocationArrow className="text-xl text-cyan-300" />
      </div>

      <div className="relative my-8 flex min-h-[120px] items-center justify-center">
        <div className="absolute h-36 w-36 rounded-full border border-cyan-400/15" />
        <div className="absolute h-24 w-24 rounded-full border border-cyan-400/20" />
        <div className="absolute h-14 w-14 rounded-full bg-cyan-400/10" />
        <div className="absolute h-24 w-24 animate-pulse rounded-full bg-cyan-400/10 blur-2xl" />

        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/30 bg-[#102D43] text-2xl text-cyan-300 shadow-lg shadow-cyan-950/40">
          <FaMapMarkerAlt />
        </div>

        <div className="absolute left-[22%] top-[20%] flex h-8 w-8 items-center justify-center rounded-full border border-blue-300/30 bg-blue-500/20 text-xs text-blue-200">
          <FaMapMarkerAlt />
        </div>
        <div className="absolute bottom-[8%] right-[22%] flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-500/20 text-xs text-cyan-200">
          <FaMapMarkerAlt />
        </div>
      </div>

      <div className="relative rounded-xl border border-white/10 bg-[#101F34]/90 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
            <FaMapMarkerAlt />
          </div>
          <div>
            <p className="text-xs font-bold text-white">
              Location-based reports
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Understand local safety concerns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightsVisual() {
  const bars = [35, 55, 42, 72, 50, 88, 65, 95, 58, 76, 48, 82];

  return (
    <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-blue-400/15 bg-gradient-to-br from-[#102744] via-[#0B1729] to-[#071426] p-6 sm:p-8">
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-blue-500/15 blur-[70px]" />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
            Intelligent assistance
          </p>
          <h4 className="mt-2 text-lg font-bold text-white">
            Find meaning in information.
          </h4>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-400/10 text-xl text-blue-300">
          <FaBrain />
        </div>
      </div>

      <div className="relative my-8 rounded-2xl border border-white/10 bg-[#071426]/70 p-5">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">
            Pattern overview
          </span>
          <span className="rounded-md bg-blue-400/10 px-2 py-1 text-[10px] font-bold text-blue-300">
            CONCEPT
          </span>
        </div>

        <div className="flex h-24 items-end gap-2">
          {bars.map((height, index) => (
            <div
              key={index}
              className="flex h-full flex-1 items-end overflow-hidden rounded-t-sm bg-white/[0.05]"
            >
              <div
                className="w-full rounded-t-sm bg-gradient-to-t from-blue-600 to-cyan-300"
                style={{
                  height: `${height}%`,
                  opacity: 0.45 + (index % 4) * 0.15,
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-[11px] leading-5 text-slate-400">
          <FaBrain className="shrink-0 text-cyan-300" />
          AI-assisted analysis, where implemented.
        </div>
      </div>

      <p className="relative text-xs leading-5 text-slate-500">
        Illustrative visualization — not live platform data.
      </p>
    </div>
  );
}

function CommunityVisual() {
  return (
    <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0B1729] p-6 sm:p-8">
      <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-cyan-500/10 blur-[70px]" />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Community response
          </p>
          <h4 className="mt-2 text-lg font-bold text-white">
            Stronger, together.
          </h4>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-xl text-cyan-300">
          <FaUsers />
        </div>
      </div>

      <div className="relative my-8 rounded-2xl border border-white/10 bg-[#101F34] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
            <FaBell />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Community update</p>
            <p className="mt-1 text-xs text-slate-500">
              Stay informed about reported concerns
            </p>
          </div>
        </div>

        <div className="my-5 h-px bg-white/10" />

        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {["A", "C", "R", "S"].map((letter, index) => (
              <div
                key={letter}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#101F34] text-xs font-black text-white ${
                  index % 2 === 0 ? "bg-blue-600" : "bg-cyan-700"
                }`}
              >
                {letter}
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold text-white">
              People working together
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Community and authorized administrators
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex items-center gap-2 text-xs text-slate-400">
        <FaRegClock className="text-cyan-300" />
        Awareness can support timely action.
      </div>
    </div>
  );
}

const visuals = [ReportVisual, MapVisual, InsightsVisual, CommunityVisual];

export default function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="relative isolate overflow-hidden bg-[#020817] py-24 text-white sm:py-28 lg:py-32"
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
        {/* Introduction */}
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.15fr_0.85fr] md:items-end lg:pb-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                From awareness to action
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
              A safer community
              <br />
              starts with{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                one action.
              </span>
            </h2>
          </div>

          <div className="md:pb-2 md:pl-6">
            <p className="max-w-lg text-base leading-8 text-slate-400 sm:text-lg">
              ShurokkhaAI brings people, location-based information, and
              intelligent tools together in a clear journey—from reporting a
              concern to supporting community action.
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-slate-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <FaShieldAlt />
              </span>
              Built around people. Driven by awareness.
            </div>
          </div>
        </div>

        {/* Journey steps */}
        <div className="relative py-14 sm:py-20">
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const Visual = visuals[index];
              const reversed = index % 2 === 1;

              return (
                <article
                  key={step.number}
                  className="grid items-center gap-7 md:grid-cols-2 md:gap-12 lg:gap-20"
                >
                  {/* Text panel */}
                  <div className={reversed ? "md:order-2" : "md:order-1"}>
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

                  {/* Visual panel */}
                  <div className={reversed ? "md:order-1" : "md:order-2"}>
                    <Visual />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      
      </div>
    </section>
  );
}
