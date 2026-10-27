import {
  FaShieldAlt,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
  FaPhoneAlt,
  FaLeaf,
  FaBrain,
  FaCheckCircle,
  FaMapMarkedAlt,
} from "react-icons/fa";


export default function Home() {
  return (
    <main className="min-h-screen mt-14 w-full overflow-hidden bg-[#020817] text-white">
      <section className="relative isolate w-full overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_65%_40%,rgba(0,91,189,0.4),transparent_48%),linear-gradient(120deg,#061a38_0%,#020817_65%,#000000_100%)]" />

        <div className="absolute right-[15%] top-20 -z-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute -left-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* FULL-WIDTH HERO CONTENT */}
        <div className="grid min-h-[760px] w-full grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-12 lg:py-16 xl:gap-14 xl:px-16 2xl:px-20">
          {/* LEFT CONTENT */}
          <div className="relative z-10 w-full min-w-0">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-blue-500/10 px-4 py-2 text-sm text-sky-300">
              <FaShieldAlt />
              AI-Powered Safety & Civic Platform
            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl xl:text-7xl 2xl:text-8xl">
              Safer People,
              <span className="mt-3 block bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-200 bg-clip-text text-transparent">
                Stronger Communities
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg xl:text-xl">
              ShurokkhaAI helps people stay safe, report civic problems,
              discover safer routes, and build cleaner and more responsible
              communities with AI-powered insights.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#safety-features"
                className="inline-flex items-center gap-3 rounded-md border border-blue-400/40 bg-white/[0.03] px-7 py-4 font-medium text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-sky-400 hover:bg-blue-500/10"
              >
                <FaShieldAlt className="text-sky-400" />
                Explore Safety
              </a>
            </div>

            {/* FEATURE ICONS */}
            {/* Safety Features */}
            <div
              id="safety-features"
              className="mt-14 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-0"
            >
              {[
                {
                  icon: FaShieldAlt,
                  label: "Instant SOS",
                  second: "Emergency Assistance",
                  color: "text-rose-400",
                  glow: "group-hover:shadow-rose-500/20",
                  bg: "group-hover:bg-rose-400/10",
                },
                {
                  icon: FaMapMarkedAlt,
                  label: "Live Safety Map",
                  second: "Real-Time Awareness",
                  color: "text-sky-400",
                  glow: "group-hover:shadow-sky-500/20",
                  bg: "group-hover:bg-sky-400/10",
                },
                {
                  icon: FaUsers,
                  label: "Stronger Together",
                  second: "Community Support",
                  color: "text-violet-400",
                  glow: "group-hover:shadow-violet-500/20",
                  bg: "group-hover:bg-violet-400/10",
                },
                {
                  icon: FaLeaf,
                  label: "Safer Neighborhoods",
                  second: "Area-Based Reporting",
                  color: "text-emerald-400",
                  glow: "group-hover:shadow-emerald-500/20",
                  bg: "group-hover:bg-emerald-400/10",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    style={{ animationDelay: `${index * 120}ms` }}
                    className="group animate-[fadeInUp_0.7s_ease-out_both] flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-xl sm:flex-col sm:gap-4 sm:border-transparent sm:bg-transparent sm:p-0 sm:shadow-none"
                  >
                    <div
                      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-all duration-300 group-hover:scale-110 group-hover:border-white/15 ${item.bg} ${item.glow} group-hover:shadow-lg sm:h-12 sm:w-12`}
                    >
                      <Icon
                        className={`text-xl transition-all duration-300 group-hover:rotate-[-6deg] sm:text-2xl ${item.color}`}
                      />

                      <span
                        className={`absolute -right-1 -top-1 h-2 w-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${item.color.replace(
                          "text-",
                          "bg-",
                        )}`}
                      />
                    </div>

                    <div className="min-w-0 pt-0.5 sm:pt-0">
                      <p className="text-sm font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-sky-200">
                        {item.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                        {item.second}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT VISUAL DASHBOARD — NO MAX-WIDTH */}
          <div className="relative mt-4 w-full min-w-0 lg:mt-0">
            {/* Blue glow */}
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/25 blur-[100px] sm:h-96 sm:w-96" />

            {/* Main safety visual */}
            <div className="relative w-full overflow-hidden rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-950/90 via-[#071a37]/90 to-slate-950/95 p-5 shadow-2xl shadow-blue-950/60 backdrop-blur-xl sm:p-7 lg:p-6 xl:p-8">
              {/* Dashboard header */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-400">
                    ShurokkhaAI Monitor
                  </p>

                  <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                    Community Safety
                  </h2>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-400/10">
                  <FaShieldAlt className="text-2xl text-sky-400" />
                </div>
              </div>

              {/* Status */}
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                  <FaCheckCircle className="text-xl text-emerald-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold">Safety Dashboard</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Stay informed. Stay prepared.
                  </p>
                </div>

                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
              </div>

              {/* Quick actions */}
              <p className="mb-3 mt-7 text-sm font-semibold text-slate-300">
                Community Quick Actions
              </p>

              <div className="space-y-3">
                {[
                  {
                    icon: FaExclamationTriangle,
                    title: "Report a Civic Issue",
                    desc: "Road damage, waste, public hazards",
                  },
                  {
                    icon: FaMapMarkerAlt,
                    title: "Find a Safer Route",
                    desc: "Explore locations and safety tips",
                  },
                  {
                    icon: FaPhoneAlt,
                    title: "Emergency Support",
                    desc: "Find relevant help and contacts",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group flex items-center gap-3 rounded-xl border border-blue-400/15 bg-blue-500/[0.06] p-3 transition duration-300 hover:border-sky-400/50 hover:bg-blue-500/[0.12] sm:gap-4 sm:p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-lg text-sky-400 transition duration-300 group-hover:bg-sky-400/15">
                        <Icon />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white sm:text-base">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                          {item.desc}
                        </p>
                      </div>

                      <FaArrowRight className="shrink-0 text-xs text-slate-500 transition duration-300 group-hover:translate-x-1 group-hover:text-sky-400" />
                    </div>
                  );
                })}
              </div>

              {/* AI Insight */}
              <div className="mt-6 flex items-start gap-4 rounded-xl border border-sky-400/20 bg-sky-400/[0.07] p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-400/10">
                  <FaBrain className="text-2xl text-sky-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold sm:text-base">
                    AI-Assisted Civic Insights
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                    Helping communities identify and prioritize reported
                    concerns.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating label — desktop */}
            <div className="absolute -left-4 top-24 hidden items-center gap-3 rounded-xl border border-blue-400/30 bg-[#061a38]/95 px-4 py-3 shadow-xl shadow-blue-950/50 xl:flex">
              <FaShieldAlt className="text-xl text-sky-400" />

              <div>
                <p className="text-xs font-semibold">Safety First</p>
                <p className="mt-1 text-[10px] text-slate-400">
                  People & community
                </p>
              </div>
            </div>

            {/* Floating label — desktop */}
            <div className="absolute -right-3 bottom-16 hidden items-center gap-3 rounded-xl border border-blue-400/30 bg-[#061a38]/95 px-4 py-3 shadow-xl shadow-blue-950/50 xl:flex">
              <FaLeaf className="text-xl text-emerald-400" />

              <div>
                <p className="text-xs font-semibold">Civic Responsibility</p>
                <p className="mt-1 text-[10px] text-slate-400">
                  Better shared spaces
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500/70 to-transparent" />
      </section>
    </main>
  );
}

