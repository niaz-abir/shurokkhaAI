"use client";

import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaSyncAlt,
  FaExclamationCircle,
  FaTrashAlt,
} from "react-icons/fa";

const API_URL = "https://shurokkha-ai-server.vercel.app/api/reports";

type CommunityReport = {
  _id?: string;
  id?: string;
  category: string;
  title: string;
  description: string;
  location: string;
  name?: string | null;
  email?: string | null;
  isAnonymous?: boolean;
  imageUrl?: string | null;
  status?: string;
  createdAt?: string;
};

export default function AllCommunityReports() {
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingError, setDeletingError] = useState("");

  // Fetch all reports
  async function fetchReports() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch reports.");
      }

      setReports(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("Fetch community reports error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while fetching reports.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  // Delete a report without refreshing the page
  async function handleDeleteReport(report: CommunityReport) {
    const reportId = report._id || report.id;

    if (!reportId) {
      setDeletingError("Cannot delete this report because its ID is missing.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${report.title}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(reportId);
      setDeletingError("");

      const response = await fetch(
        `${API_URL}/${encodeURIComponent(reportId)}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete report.");
      }

      // Immediately remove the deleted report from the UI.
      setReports((currentReports) =>
        currentReports.filter((item) => (item._id || item.id) !== reportId),
      );

      console.log("Community report deleted successfully:", reportId);
    } catch (err) {
      console.error("Delete community report error:", err);

      setDeletingError(
        err instanceof Error
          ? err.message
          : "Something went wrong while deleting the report.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  // Format date
  function formatDate(date?: string) {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  // Status badge styles
  function statusStyle(status?: string) {
    switch ((status || "Pending").toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "resolved":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  }

  return (
    <section className="mt-24 min-h-screen bg-[radial-gradient(ellipse_at_65%_40%,rgba(0,91,189,0.4),transparent_48%),linear-gradient(120deg,#061a38_0%,#020817_65%,#000000_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              All Community Reports
            </h1>

            <p className="mt-2 text-sm text-gray-300">
              Manage reports submitted by the community.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchReports}
            disabled={loading || deletingId !== null}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#04F06A] px-5 py-3 text-sm font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Refresh Reports
          </button>
        </div>

        {/* Delete error notification */}
        {deletingError && (
          <div
            role="alert"
            className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
          >
            <p>{deletingError}</p>

            <button
              type="button"
              onClick={() => setDeletingError("")}
              className="shrink-0 font-semibold hover:text-white"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}

        {/* Report count */}
        <div className="mb-6 rounded-2xl border border-green-500/20 bg-white/[0.03] p-5 shadow-sm shadow-blue-950">
          <p className="text-lg text-gray-200">Total Community Reports</p>

          <p className="mt-2 text-3xl font-bold text-[#04F06A]">
            {reports.length}
          </p>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <div className="h-48 bg-white/10" />

                <div className="space-y-4 p-5">
                  <div className="h-4 w-1/3 rounded bg-white/10" />
                  <div className="h-6 w-3/4 rounded bg-white/10" />
                  <div className="h-4 rounded bg-white/10" />
                  <div className="h-4 w-2/3 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fetch error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <FaExclamationCircle className="mx-auto text-3xl text-red-400" />

            <h2 className="mt-3 font-semibold text-white">
              Could not load community reports
            </h2>

            <p className="mt-2 text-sm text-red-300">{error}</p>

            <button
              type="button"
              onClick={fetchReports}
              className="mt-4 rounded-lg bg-[#04F06A] px-5 py-2 text-sm font-semibold text-black hover:bg-green-400"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && reports.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-6 py-16 text-center">
            <FaExclamationCircle className="mx-auto text-4xl text-gray-500" />

            <h2 className="mt-4 text-lg font-semibold text-white">
              No community reports yet
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Submitted reports will appear here.
            </p>
          </div>
        )}

        {/* Community report cards */}
        {!loading && !error && reports.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reports.map((report, index) => {
              const reportId = report._id || report.id || "";
              const isDeleting = deletingId === reportId;

              return (
                <article
                  key={reportId || index}
                  className="group overflow-hidden rounded-2xl border border-green-500/20 bg-white/[0.03] shadow-sm shadow-green-950 transition duration-300 hover:-translate-y-1 hover:border-green-500/50 hover:shadow-lg"
                >
                  {/* Image */}
                  {report.imageUrl ? (
                    <div className="h-52 overflow-hidden bg-white/5">
                      <img
                        src={report.imageUrl}
                        alt={report.title || "Community report"}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-36 items-center justify-center bg-white/[0.03] text-sm text-gray-400">
                      No image attached
                    </div>
                  )}

                  <div className="p-5">
                    {/* Category and status */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-[#04F06A]">
                        {report.category || "Uncategorized"}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                          report.status,
                        )}`}
                      >
                        {report.status || "Pending"}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-4 break-words text-lg font-bold text-white">
                      {report.title || "Untitled Report"}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-gray-300">
                      {report.description || "No description provided."}
                    </p>

                    {/* Report details */}
                    <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
                      <div className="flex items-start gap-3 text-sm text-gray-300">
                        <FaMapMarkerAlt className="mt-1 shrink-0 text-green-500" />

                        <span className="break-words">
                          {report.location || "Location not provided"}
                        </span>
                      </div>

                      <div className="flex items-start gap-3 text-sm text-gray-300">
                        <FaUser className="mt-1 shrink-0 text-[#04F06A]" />

                        <span className="break-words">
                          {report.isAnonymous
                            ? "Anonymous Reporter"
                            : report.name || "Name not provided"}
                        </span>
                      </div>

                      {!report.isAnonymous && report.email && (
                        <div className="flex items-start gap-3 text-sm text-gray-300">
                          <FaEnvelope className="mt-1 shrink-0 text-[#04F06A]" />

                          <span className="break-all">{report.email}</span>
                        </div>
                      )}

                      <div className="flex items-start gap-3 text-sm text-gray-300">
                        <FaCalendarAlt className="mt-1 shrink-0 text-[#04F06A]" />

                        <span>{formatDate(report.createdAt)}</span>
                      </div>
                    </div>

                    {/* Report ID */}
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <p className="break-all text-xs text-gray-400">
                        Report ID: {reportId || "N/A"}
                      </p>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteReport(report)}
                      disabled={isDeleting || deletingId !== null}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaTrashAlt />

                      {isDeleting ? "Deleting..." : "Delete Report"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
