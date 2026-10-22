"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import "leaflet/dist/leaflet.css";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";

// =====================================================
// TYPES
// =====================================================

type RiskLevel = "High" | "Moderate" | "Low";

type AreaData = {
  id: number;
  name: string;
  safety: number;
  threats: number;
  resolved: number;
  active: number;
  risk: RiskLevel;
  latitude: number;
  longitude: number;
};

type Incident = {
  id: string;
  title: string;
  area: string;
  category: string;
  date: string;
  priority: RiskLevel;
  status: "Under Review" | "Resolved" | "Pending";
  description: string;
  latitude: number;
  longitude: number;
};

// Loose component type used for react-leaflet components (fixes TS2322 prop errors)
type LooseComponent = ComponentType<
  Record<string, unknown> & { children?: ReactNode }
>;

// =====================================================
// EDITABLE DATA ARRAYS
// Replace these demo values with verified API data later.
// =====================================================

const areaData: AreaData[] = [
  {
    id: 1,
    name: "Uttara",
    safety: 72,
    threats: 18,
    resolved: 12,
    active: 6,
    risk: "Moderate",
    latitude: 23.8759,
    longitude: 90.3795,
  },
  {
    id: 2,
    name: "Mirpur",
    safety: 61,
    threats: 24,
    resolved: 14,
    active: 10,
    risk: "High",
    latitude: 23.8223,
    longitude: 90.3654,
  },
  {
    id: 3,
    name: "Dhanmondi",
    safety: 85,
    threats: 10,
    resolved: 8,
    active: 2,
    risk: "Low",
    latitude: 23.7461,
    longitude: 90.3742,
  },
  {
    id: 4,
    name: "Gulshan",
    safety: 91,
    threats: 7,
    resolved: 6,
    active: 1,
    risk: "Low",
    latitude: 23.7925,
    longitude: 90.4078,
  },
  {
    id: 5,
    name: "Mohammadpur",
    safety: 68,
    threats: 16,
    resolved: 10,
    active: 6,
    risk: "Moderate",
    latitude: 23.7663,
    longitude: 90.3586,
  },
  {
    id: 6,
    name: "Bashundhara",
    safety: 94,
    threats: 4,
    resolved: 4,
    active: 0,
    risk: "Low",
    latitude: 23.8229,
    longitude: 90.4251,
  },
  {
    id: 7,
    name: "Motijheel",
    safety: 77,
    threats: 12,
    resolved: 9,
    active: 3,
    risk: "Moderate",
    latitude: 23.733,
    longitude: 90.4172,
  },
  {
    id: 8,
    name: "Sadarghat",
    safety: 58,
    threats: 21,
    resolved: 12,
    active: 9,
    risk: "High",
    latitude: 23.7067,
    longitude: 90.4113,
  },
  {
    id: 9,
    name: "Farmgate",
    safety: 82,
    threats: 8,
    resolved: 7,
    active: 1,
    risk: "Low",
    latitude: 23.7577,
    longitude: 90.3892,
  },
  {
    id: 10,
    name: "Banani",
    safety: 89,
    threats: 6,
    resolved: 5,
    active: 1,
    risk: "Low",
    latitude: 23.7937,
    longitude: 90.4066,
  },
  {
    id: 11,
    name: "Jatrabari",
    safety: 63,
    threats: 19,
    resolved: 11,
    active: 8,
    risk: "High",
    latitude: 23.7104,
    longitude: 90.4356,
  },
  {
    id: 12,
    name: "Badda",
    safety: 74,
    threats: 11,
    resolved: 8,
    active: 3,
    risk: "Moderate",
    latitude: 23.7806,
    longitude: 90.4269,
  },
  {
    id: 13,
    name: "Tejgaon",
    safety: 80,
    threats: 9,
    resolved: 7,
    active: 2,
    risk: "Low",
    latitude: 23.7639,
    longitude: 90.4008,
  },
  {
    id: 14,
    name: "Rampura",
    safety: 70,
    threats: 13,
    resolved: 8,
    active: 5,
    risk: "Moderate",
    latitude: 23.7621,
    longitude: 90.4203,
  },
  {
    id: 15,
    name: "Lalbagh",
    safety: 55,
    threats: 22,
    resolved: 13,
    active: 9,
    risk: "High",
    latitude: 23.7185,
    longitude: 90.388,
  },
];

const monthlyData = [
  { month: "May", threats: 32, resolved: 24 },
  { month: "Jun", threats: 45, resolved: 34 },
  { month: "Jul", threats: 38, resolved: 30 },
  { month: "Aug", threats: 55, resolved: 43 },
  { month: "Sep", threats: 48, resolved: 40 },
  { month: "Oct", threats: 62, resolved: 51 },
];

const categoryData = [
  { name: "Harassment", value: 35, color: "#ef4444" },
  { name: "Suspicious activity", value: 25, color: "#f97316" },
  { name: "Theft", value: 20, color: "#eab308" },
  { name: "Unsafe roads", value: 20, color: "#04F06A" },
];

const incidents: Incident[] = [
  {
    id: "SR-1042",
    title: "Suspicious activity reported",
    area: "Uttara Sector 12",
    category: "Suspicious Activity",
    date: "22 Oct 2026",
    priority: "High",
    status: "Under Review",
    description: "Sample report requiring verification by the authorized team.",
    latitude: 23.8759,
    longitude: 90.3795,
  },
  {
    id: "SR-1041",
    title: "Harassment report",
    area: "Mirpur",
    category: "Harassment",
    date: "22 Oct 2026",
    priority: "High",
    status: "Resolved",
    description: "Sample report marked resolved for dashboard demonstration.",
    latitude: 23.8223,
    longitude: 90.3654,
  },
  {
    id: "SR-1040",
    title: "Unsafe road conditions",
    area: "Gulshan",
    category: "Unsafe Location",
    date: "21 Oct 2026",
    priority: "Moderate",
    status: "Under Review",
    description: "Sample road safety report awaiting review.",
    latitude: 23.7925,
    longitude: 90.4078,
  },
  {
    id: "SR-1039",
    title: "Theft report",
    area: "Dhanmondi",
    category: "Theft",
    date: "20 Oct 2026",
    priority: "Low",
    status: "Resolved",
    description: "Sample report closed after review.",
    latitude: 23.7461,
    longitude: 90.3742,
  },
];

// =====================================================
// INTERACTIVE MAP
// Dynamic loading keeps Leaflet browser-only.
// react-leaflet components are cast to a loose type so TypeScript
// does not fail when @types/leaflet is missing/unresolved.
// =====================================================

const SafetyMap = dynamic(
  async () => {
    const RL = await import("react-leaflet");

    const MapContainer = RL.MapContainer as unknown as LooseComponent;
    const TileLayer = RL.TileLayer as unknown as LooseComponent;
    const CircleMarker = RL.CircleMarker as unknown as LooseComponent;
    const Popup = RL.Popup as unknown as LooseComponent;

    function MapContent({
      areas,
      reports,
    }: {
      areas: AreaData[];
      reports: Incident[];
    }) {
      return (
        <MapContainer
          center={[23.7806, 90.4]}
          zoom={11}
          scrollWheelZoom
          style={{ height: "100%", width: "100%", background: "#061a38" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {areas.map((area) => {
            const color =
              area.risk === "High"
                ? "#ef4444"
                : area.risk === "Moderate"
                  ? "#f59e0b"
                  : "#04F06A";

            return (
              <CircleMarker
                key={`area-${area.id}`}
                center={[area.latitude, area.longitude]}
                radius={
                  area.risk === "High" ? 17 : area.risk === "Moderate" ? 12 : 8
                }
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.35,
                  weight: 2,
                }}
              >
                <Popup>
                  <div style={{ color: "#111", minWidth: 170 }}>
                    <strong>{area.name}</strong>
                    <p>Safety score: {area.safety}%</p>
                    <p>Reported threats: {area.threats}</p>
                    <p>Resolved: {area.resolved}</p>
                    <p>Active: {area.active}</p>
                    <strong style={{ color }}>Risk: {area.risk}</strong>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

          {reports.map((report) => (
            <CircleMarker
              key={`report-${report.id}`}
              center={[report.latitude, report.longitude]}
              radius={5}
              pathOptions={{
                color: "#fff",
                fillColor: "#ef4444",
                fillOpacity: 1,
                weight: 1,
              }}
            >
              <Popup>
                <div style={{ color: "#111", minWidth: 170 }}>
                  <strong>{report.title}</strong>
                  <p>{report.area}</p>
                  <p>{report.category}</p>
                  <p>{report.date}</p>
                  <p>Status: {report.status}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      );
    }

    return MapContent;
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-white/60">
        Loading live map...
      </div>
    ),
  },
);

// =====================================================
// STYLING HELPERS
// =====================================================

const riskColors: Record<RiskLevel, string> = {
  High: "#ef4444",
  Moderate: "#f59e0b",
  Low: "#04F06A",
};

const statusClasses: Record<Incident["status"], string> = {
  Resolved: "border-[#04F06A]/20 bg-[#04F06A]/10 text-[#04F06A]",
  "Under Review": "border-amber-400/20 bg-amber-400/10 text-amber-300",
  Pending: "border-red-400/20 bg-red-400/10 text-red-300",
};

// =====================================================
// MAIN PAGE
// =====================================================

export default function AreaReportPage() {
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "All">("All");
  const [statusFilter, setStatusFilter] = useState<Incident["status"] | "All">(
    "All",
  );

  const filteredAreas = useMemo(
    () =>
      riskFilter === "All"
        ? areaData
        : areaData.filter((area) => area.risk === riskFilter),
    [riskFilter],
  );

  const filteredIncidents = useMemo(
    () =>
      statusFilter === "All"
        ? incidents
        : incidents.filter((item) => item.status === statusFilter),
    [statusFilter],
  );

  const totalThreats = areaData.reduce((sum, area) => sum + area.threats, 0);
  const totalResolved = areaData.reduce((sum, area) => sum + area.resolved, 0);
  const totalActive = areaData.reduce((sum, area) => sum + area.active, 0);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_65%_40%,rgba(0,91,189,0.4),transparent_48%),linear-gradient(120deg,#061a38_0%,#020817_65%,#000000_100%)] px-4 py-8 text-[#F2EFEA] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* HEADER */}
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex rounded-full border border-[#04F06A]/20 bg-[#04F06A]/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-[#04F06A]">
              SHUROKKHAAI / AREA INTELLIGENCE
            </span>
            <h1 className="mt-18 text-3xl font-bold tracking-tight sm:text-4xl">
              Area Safety Report
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300/70">
              Explore area safety indicators, threats, resolved reports, and
              geographic incident patterns.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-[#04F06A]/20 bg-[#04F06A]/10 px-4 py-2 text-xs font-medium text-[#04F06A] sm:self-auto">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#04F06A]" />
            Area monitoring dashboard
          </div>
        </header>

        {/* SECTION 1: AREA CARDS */}
        <section>
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#04F06A]">
                Section 01
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Area-by-Area Safety Matrix
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              {areaData.length} monitored areas · Sample data
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {areaData.map((area) => (
              <article
                key={area.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/10 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#04F06A]/30 hover:bg-slate-900/90"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{area.name}</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Dhaka Metropolitan Area
                    </p>
                  </div>
                  <span
                    className="rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                    style={{
                      color: riskColors[area.risk],
                      borderColor: `${riskColors[area.risk]}40`,
                      backgroundColor: `${riskColors[area.risk]}12`,
                    }}
                  >
                    {area.risk} Risk
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: riskColors[area.risk] }}
                    >
                      {area.safety}%
                    </p>
                    <p className="mt-1 text-xs text-slate-400">Safety score</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{area.threats}</p>
                    <p className="text-xs text-slate-400">Total threats</p>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${area.safety}%`,
                      backgroundColor: riskColors[area.risk],
                    }}
                  />
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Resolved</p>
                    <p className="mt-1 font-semibold text-[#04F06A]">
                      {area.resolved}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Active</p>
                    <p className="mt-1 font-semibold text-red-400">
                      {area.active}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Resolution</p>
                    <p className="mt-1 font-semibold text-slate-200">
                      {area.threats > 0
                        ? `${Math.round((area.resolved / area.threats) * 100)}%`
                        : "—"}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Coordinates: {area.latitude.toFixed(4)},{" "}
                  {area.longitude.toFixed(4)}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                label: "Reported threats",
                value: totalThreats,
                color: "#ef4444",
              },
              {
                label: "Resolved reports",
                value: totalResolved,
                color: "#04F06A",
              },
              { label: "Active reports", value: totalActive, color: "#f59e0b" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-4"
              >
                <p className="text-xs text-slate-400">{item.label}</p>
                <p
                  className="mt-2 text-2xl font-bold"
                  style={{ color: item.color }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: FULL-WIDTH MAP */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-2xl shadow-black/20">
          <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#04F06A]">
                Section 02
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Live Safety & Risk-Zone Map
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Select a marker to view the area or incident details.
              </p>
            </div>

            <select
              value={riskFilter}
              onChange={(event) =>
                setRiskFilter(event.target.value as RiskLevel | "All")
              }
              className="rounded-xl border border-white/10 bg-[#061a38] px-4 py-3 text-sm text-white outline-none focus:border-[#04F06A]"
              aria-label="Filter map by risk"
            >
              <option value="All">All risk levels</option>
              <option value="High">High risk</option>
              <option value="Moderate">Moderate risk</option>
              <option value="Low">Low risk</option>
            </select>
          </div>

          <div className="px-3 pb-3 sm:px-5 sm:pb-5">
            <div className="h-[420px] overflow-hidden rounded-xl border border-white/10 sm:h-[540px]">
              <SafetyMap areas={filteredAreas} reports={incidents} />
            </div>
          </div>

          <div className="flex flex-wrap gap-5 border-t border-white/10 px-5 py-4">
            {[
              { name: "High risk", color: "#ef4444" },
              { name: "Moderate risk", color: "#f59e0b" },
              { name: "Low risk", color: "#04F06A" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>

          <p className="px-5 pb-5 text-xs leading-5 text-amber-300/80">
            Demo map: locations and threat levels are illustrative, not verified
            real-world safety information. Replace with verified reports before
            making safety decisions.
          </p>
        </section>

        {/* SECTION 3: MODERN SAFETY ANALYTICS */}
        <section className="relative">
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#04F06A]/20 bg-[#04F06A]/[0.07] px-3 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#04F06A]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#04F06A]">
                  Intelligence Overview
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Safety <span className="text-[#04F06A]">Analytics</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Discover reporting patterns, track resolution performance, and
                compare safety conditions across monitored areas.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 md:self-auto">
              <svg
                className="h-4 w-4 text-[#04F06A]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 3v18h18" />
                <path d="m7 14 4-4 4 4 6-7" />
              </svg>
              <span className="text-xs font-medium text-slate-300">
                Analytics dashboard
              </span>
            </div>
          </div>

          {/* KPI summary cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Threats",
                value: totalThreats,
                description: "Reports across all areas",
                icon: "!",
                color: "#F87171",
                change: "Reported",
              },
              {
                label: "Successfully Resolved",
                value: totalResolved,
                description: "Resolved reports",
                icon: "✓",
                color: "#04F06A",
                change: "Resolved",
              },
              {
                label: "Active Threats",
                value: totalActive,
                description: "Require attention",
                icon: "↗",
                color: "#FBBF24",
                change: "Active",
              },
              {
                label: "Average Safety",
                value: `${Math.round(
                  areaData.reduce((sum, area) => sum + area.safety, 0) /
                    Math.max(areaData.length, 1),
                )}%`,
                description: "Across monitored areas",
                icon: "◎",
                color: "#60A5FA",
                change: "Area score",
              },
            ].map((metric) => (
              <article
                key={metric.label}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07152b]/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.09] blur-2xl transition group-hover:opacity-20"
                  style={{ backgroundColor: metric.color }}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                      {metric.value}
                    </p>
                  </div>

                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl border text-lg font-bold"
                    style={{
                      color: metric.color,
                      backgroundColor: `${metric.color}12`,
                      borderColor: `${metric.color}30`,
                    }}
                  >
                    {metric.icon}
                  </div>
                </div>

                <div className="relative mt-5 flex items-center justify-between gap-2 border-t border-white/[0.07] pt-3">
                  <span className="text-[11px] text-slate-500">
                    {metric.description}
                  </span>
                  <span
                    className="rounded-full px-2 py-1 text-[10px] font-semibold"
                    style={{
                      color: metric.color,
                      backgroundColor: `${metric.color}12`,
                    }}
                  >
                    {metric.change}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Main charts */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            {/* Monthly trend chart */}
            <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0b1c35]/95 to-[#050d1d]/95 p-5 sm:p-6 xl:col-span-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#04F06A]" />
                    <h3 className="text-base font-bold text-white">
                      Incident Activity
                    </h3>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Monthly reports and resolution performance
                  </p>
                </div>

                <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[10px] text-slate-400">
                  Last 6 months · Demo data
                </span>
              </div>

              <div className="mt-7 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 8, left: -22, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="threatFillModern"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#F87171"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#F87171"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="resolvedFillModern"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#04F06A"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="95%"
                          stopColor="#04F06A"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      stroke="#ffffff0b"
                      strokeDasharray="4 6"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8191a9", fontSize: 11 }}
                      dy={10}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8191a9", fontSize: 11 }}
                      allowDecimals={false}
                    />

                    <Tooltip
                      cursor={{ stroke: "#ffffff25", strokeDasharray: "4 4" }}
                      contentStyle={{
                        background: "#07152b",
                        border: "1px solid #ffffff18",
                        borderRadius: "12px",
                        color: "#F2EFEA",
                        fontSize: "12px",
                        boxShadow: "0 15px 40px #00000040",
                      }}
                    />

                    <Legend
                      iconType="circle"
                      iconSize={7}
                      wrapperStyle={{
                        fontSize: "11px",
                        color: "#a7b4c8",
                        paddingTop: "16px",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="threats"
                      name="Reported threats"
                      stroke="#F87171"
                      strokeWidth={2.5}
                      fill="url(#threatFillModern)"
                      activeDot={{ r: 5, strokeWidth: 0 }}
                    />

                    <Area
                      type="monotone"
                      dataKey="resolved"
                      name="Resolved reports"
                      stroke="#04F06A"
                      strokeWidth={2.5}
                      fill="url(#resolvedFillModern)"
                      activeDot={{ r: 5, strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>

            {/* Incident category breakdown */}
            <article className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0b1c35]/95 to-[#050d1d]/95 p-5 sm:p-6 xl:col-span-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <h3 className="text-base font-bold text-white">
                  Threat Breakdown
                </h3>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Distribution by incident category
              </p>

              <div className="relative mt-3 h-[225px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={92}
                      paddingAngle={4}
                      stroke="none"
                    >
                      {categoryData.map((item) => (
                        <Cell key={item.name} fill={item.color} />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background: "#07152b",
                        border: "1px solid #ffffff18",
                        borderRadius: "12px",
                        color: "#F2EFEA",
                        fontSize: "12px",
                      }}
                      formatter={(value: unknown) =>
                        [`${String(value ?? 0)}%`, "Share"] as [string, string]
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {categoryData.reduce((sum, item) => sum + item.value, 0)}%
                  </span>
                  <span className="mt-1 text-[10px] text-slate-500">
                    Total share
                  </span>
                </div>
              </div>

              <div className="mt-3 space-y-4">
                {categoryData.map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-slate-300">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-white">
                        {item.value}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* Area comparison */}
          <article className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-5 sm:p-6">
            <h3 className="text-lg font-semibold">Safety Score by Area</h3>
            <p className="mt-1 text-xs text-slate-400">
              Compare sample safety scores across monitored locations.
            </p>

            <div className="mt-5 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={areaData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 35 }}
                >
                  <defs>
                    <linearGradient
                      id="safetyGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#04F06A"
                        stopOpacity={0.35}
                      />
                      <stop offset="95%" stopColor="#04F06A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff12"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    angle={-35}
                    textAnchor="end"
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#061a38",
                      border: "1px solid #ffffff20",
                      borderRadius: 12,
                      color: "#F2EFEA",
                    }}
                    formatter={(value: unknown) =>
                      [`${String(value ?? 0)}%`, "Safety score"] as [
                        string,
                        string,
                      ]
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="safety"
                    name="Safety score"
                    stroke="#04F06A"
                    strokeWidth={2}
                    fill="url(#safetyGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <p className="mt-4 text-[11px] leading-5 text-slate-500">
            Analytics currently uses illustrative demo data. Connect verified
            backend reports before using these values for real-world safety
            decisions.
          </p>
        </section>

        {/* SECTION 4: REPORT CARDS */}
        <section>
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#04F06A]">
                Section 04
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Recent Incident Reports
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Review incident descriptions, locations, priorities, and
                statuses.
              </p>
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as Incident["status"] | "All",
                )
              }
              className="rounded-xl border border-white/10 bg-[#061a38] px-4 py-3 text-sm text-white outline-none focus:border-[#04F06A]"
              aria-label="Filter reports by status"
            >
              <option value="All">All statuses</option>
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredIncidents.map((report) => (
              <article
                key={report.id}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition duration-300 hover:border-[#04F06A]/25 hover:bg-slate-900/90"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[#04F06A]">
                      {report.id}
                    </p>
                    <h3 className="mt-2 text-lg font-bold">{report.title}</h3>
                  </div>

                  <span
                    className="rounded-full border px-3 py-1 text-xs font-semibold"
                    style={{
                      color: riskColors[report.priority],
                      borderColor: `${riskColors[report.priority]}40`,
                      backgroundColor: `${riskColors[report.priority]}12`,
                    }}
                  >
                    {report.priority} Priority
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                  <span>⌖ {report.area}</span>
                  <span>▦ {report.category}</span>
                  <span>◷ {report.date}</span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300/80">
                  {report.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses[report.status]}`}
                  >
                    {report.status}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      window.open(
                        `https://www.openstreetmap.org/?mlat=${report.latitude}&mlon=${report.longitude}#map=16/${report.latitude}/${report.longitude}`,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                    className="text-xs font-semibold text-sky-400 transition hover:text-[#04F06A]"
                  >
                    View location ↗
                  </button>
                </div>
              </article>
            ))}

            {filteredIncidents.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center text-sm text-slate-400 lg:col-span-2">
                No reports found for this status.
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-white/10 py-5 text-center text-xs leading-5 text-slate-500">
          ShurokkhaAI · Area Safety Intelligence · Illustrative demo data
        </footer>
      </div>
    </main>
  );
}
