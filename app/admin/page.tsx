"use client";

import Link from "next/link";
import {
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineLocationMarker,
  HiOutlineBell,
  HiOutlineViewGrid,
  HiOutlineChartBar,
  HiOutlineShieldExclamation,
} from "react-icons/hi";
import { HiOutlineRadio } from "react-icons/hi2";
import { FiArrowUpRight } from "react-icons/fi";

const adminRoutes = [
  {
    title: "Community Reports",
    description:
      "Review community posts, reported issues, and submitted concerns.",
    path: "/admin/community-reports",
    icon: HiOutlineUsers,
    tag: "Community",
    number: "01",
    accent: "from-blue-500/20 to-cyan-400/5",
    iconColor: "text-cyan-300",
  },
  {
    title: "Live Map Tracking",
    description:
      "Monitor submitted location reports and review incoming safety concerns.",
    path: "https://safeguard-live.vercel.app/admin",
    icon: HiOutlineLocationMarker,
    tag: "Live Monitoring",
    number: "02",
    accent: "from-indigo-500/20 to-blue-400/5",
    iconColor: "text-blue-300",
  },
  {
    title: "Create Area Reports",
    description:
      "Monitor submitted location reports and review incoming safety concerns.",
    path: "/admin/create-area-report",
    icon: HiOutlineLocationMarker,
    tag: "Live Monitoring",
    number: "02",
    accent: "from-indigo-500/20 to-blue-400/5",
    iconColor: "text-blue-300",
  },
  {
    title: "All Area Reports",
    description:
      "Monitor submitted location reports and review incoming safety concerns.",
    path: "/admin/view-area-report",
    icon: HiOutlineLocationMarker,
    tag: "Live Monitoring",
    number: "02",
    accent: "from-indigo-500/20 to-blue-400/5",
    iconColor: "text-blue-300",
  },
];

const Admin = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_65%_40%,rgba(0,91,189,0.4),transparent_48%),linear-gradient(120deg,#061a38_0%,#020817_65%,#000000_100%)] text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        {/* Header */}
        <header className="mb-12 flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-500/15 shadow-lg shadow-blue-950/30">
              <HiOutlineShieldCheck className="h-7 w-7 text-cyan-300" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-wide">
                Shurokkha<span className="text-cyan-300">AI</span>
              </h1>
              <p className="mt-1 text-[10px] tracking-[0.22em] text-slate-400">
                ADMINISTRATION PANEL
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-400 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Admin workspace
            </div>

            <button
              type="button"
              aria-label="Notifications"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition hover:border-blue-300/30 hover:bg-blue-500/10"
            >
              <HiOutlineBell className="h-5 w-5 text-slate-300" />
            </button>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/15 text-sm font-bold text-blue-200">
              A
            </div>
          </div>
        </header>

        {/* Welcome section */}
        <section className="mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3.5 py-1.5 text-xs font-medium text-cyan-200">
            <HiOutlineShieldCheck className="h-4 w-4" />
            ADMIN WORKSPACE
          </div>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Admin <span className="text-blue-300">Dashboard</span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Manage community submissions, monitor live reports, and keep
                your community safety operations organized in one place.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10">
                <HiOutlineViewGrid className="h-6 w-6 text-blue-300" />
              </div>

              <div>
                <p className="text-xs text-slate-400">Workspace</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Safety Management
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Overview cards */}
        <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition duration-300 hover:border-blue-400/30 hover:bg-white/[0.07]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Management Areas
              </span>

              <div className="rounded-xl bg-blue-400/10 p-2.5">
                <HiOutlineViewGrid className="h-5 w-5 text-blue-300" />
              </div>
            </div>

            <p className="mt-5 text-3xl font-bold">02</p>
            <p className="mt-2 text-xs text-slate-500">
              Available admin sections
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Community</span>

              <div className="rounded-xl bg-cyan-400/10 p-2.5">
                <HiOutlineUsers className="h-5 w-5 text-cyan-300" />
              </div>
            </div>

            <p className="mt-5 text-3xl font-bold">Reports</p>
            <p className="mt-2 text-xs text-slate-500">
              User-submitted concerns
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition duration-300 hover:border-indigo-400/30 hover:bg-white/[0.07] sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Live Monitoring</span>

              <div className="rounded-xl bg-indigo-400/10 p-2.5">
                <HiOutlineRadio className="h-5 w-5 text-indigo-300" />
              </div>
            </div>

            <p className="mt-5 text-3xl font-bold">Live</p>
            <p className="mt-2 text-xs text-slate-500">
              Submitted location reports
            </p>
          </div>
        </section>

        {/* Management Center */}
        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">
                Management Center
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Select a section to manage and review its submissions.
              </p>
            </div>

            <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400">
              {String(adminRoutes.length).padStart(2, "0")} available sections
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {adminRoutes.map((route) => {
              const Icon = route.icon;

              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#071426]/70 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300/30 hover:shadow-2xl hover:shadow-blue-950/30 sm:p-8"
                >
                  {/* Card gradient */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${route.accent} opacity-60 transition duration-300 group-hover:opacity-100`}
                  />

                  <div className="relative">
                    <div className="mb-8 flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] transition duration-300 group-hover:scale-105 group-hover:border-blue-300/20">
                        <Icon className={`h-7 w-7 ${route.iconColor}`} />
                      </div>

                      <span className="text-sm font-medium tracking-[0.2em] text-slate-600">
                        {route.number}
                      </span>
                    </div>

                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-slate-300">
                      {route.tag}
                    </span>

                    <h4 className="mt-4 text-xl font-bold transition-colors group-hover:text-blue-200 sm:text-2xl">
                      {route.title}
                    </h4>

                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                      {route.description}
                    </p>

                    <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-5">
                      <span className="inline-flex items-center rounded-lg bg-[#04f06a] px-4 py-2 text-sm font-semibold text-[#020817] transition-all duration-300 group-hover:bg-[#00d85e] group-hover:shadow-lg group-hover:shadow-[#04f06a]/20">
                        Open dashboard
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition duration-300 group-hover:border-blue-300/30 group-hover:bg-blue-500/20">
                        <FiArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Footer */}
       
      </div>
    </main>
  );
};

export default Admin;