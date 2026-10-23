"use client";

import { useCallback, useEffect, useState } from "react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://shurokkha-ai-server.vercel.app"}/api/area-reports`;

type AreaReport = {
  _id: string;
  name: string;
  safety: number;
  threats: number;
  resolved: number;
  active: number;
  risk: "High" | "Moderate" | "Low";
  latitude: number;
  longitude: number;
  createdAt?: string;
};

export default function AreaReportPage() {
  const [reports, setReports] = useState<AreaReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch all area reports
  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch area reports");
      }

      setReports(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Delete without refreshing the page
  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete report");
      }

      // Immediately remove the deleted report from the screen.
      setReports((previousReports) =>
        previousReports.filter((report) => report._id !== id),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete report");
    } finally {
      setDeletingId(null);
    }
  };

  const riskColor: Record<string, string> = {
    High: "bg-red-500/15 text-red-400 border-red-500/30",
    Moderate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  };

  return (
    <main className="min-h-screen bg-[#020817] mt-14 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-400">
              Admin Dashboard
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">Area Reports</h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage all area safety reports.
            </p>
          </div>

          <button
            onClick={fetchReports}
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-800 bg-[#061a38]/70 p-5">
          <p className="text-sm text-slate-400">Total Area Reports</p>
          <p className="mt-2 text-3xl font-bold">{reports.length}</p>
        </div>

        {error && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            <span>{error}</span>
            <button onClick={fetchReports} className="font-semibold underline">
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-[#061a38]/60 p-10 text-center text-slate-400">
            Fetching area reports...
          </div>
        ) : reports.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-[#061a38]/60 p-12 text-center">
            <h2 className="text-xl font-semibold">No area reports found</h2>
            <p className="mt-2 text-sm text-slate-400">
              Create an area report to see it here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#061a38]/60">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="border-b border-slate-800 bg-[#071426] text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-4">Area Name</th>
                  <th className="px-5 py-4">Safety</th>
                  <th className="px-5 py-4">Threats</th>
                  <th className="px-5 py-4">Resolved</th>
                  <th className="px-5 py-4">Active</th>
                  <th className="px-5 py-4">Risk</th>
                  <th className="px-5 py-4">Coordinates</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {reports.map((report) => (
                  <tr
                    key={report._id}
                    className="transition hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4 font-semibold">{report.name}</td>

                    <td className="px-5 py-4">{report.safety}/100</td>
                    <td className="px-5 py-4">{report.threats}</td>
                    <td className="px-5 py-4 text-emerald-400">
                      {report.resolved}
                    </td>
                    <td className="px-5 py-4 text-amber-400">
                      {report.active}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          riskColor[report.risk] || riskColor.Moderate
                        }`}
                      >
                        {report.risk}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-400">
                      <div>Lat: {report.latitude}</div>
                      <div>Lng: {report.longitude}</div>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleDelete(report._id, report.name)}
                        disabled={deletingId === report._id}
                        className="rounded-lg border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === report._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
