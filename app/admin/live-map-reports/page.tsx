"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaUser,
  FaSyncAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

interface LocationPoint {
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface LiveLocationRecord {
  _id: string;
  name: string;
  status: string;
  currentLocation: {
    latitude: number;
    longitude: number;
    updatedAt: string;
  };
  locationHistory: LocationPoint[];
  createdAt: string;
  updatedAt: string;
}

const API_URL = "https://shurokkha-ai-server.vercel.app/api/live-map";

export default function LiveMapReportPage() {
  const [records, setRecords] = useState<LiveLocationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchLocations = useCallback(async (manual = false) => {
    if (manual) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await fetch(API_URL, {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch locations.");
      }

      console.log("Admin Live Map API Response:", result);

      setRecords(result.data || []);
      setError("");
    } catch (fetchError: unknown) {
      console.error("Fetch live locations error:", fetchError);

      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to load location records.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void fetchLocations();

    // Refresh the admin list every 5 seconds.
    const intervalId = window.setInterval(() => {
      void fetchLocations();
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [fetchLocations]);

  const formatDate = (date: string) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleString();
  };

  return (
    <main className="min-h-screen bg-[#020817] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-cyan-300">
              <FaMapMarkerAlt />
              ShurokkhaAI Admin
            </div>

            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              Live Map Reports
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              View submitted location records and the coordinates collected
              during each tracking session.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void fetchLocations(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-3 self-start rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400/15 disabled:opacity-50 sm:self-auto"
          >
            <FaSyncAlt className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing..." : "Refresh Reports"}
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-blue-400/15 bg-[#071426] p-5">
            <p className="text-sm text-slate-400">Total Records</p>
            <p className="mt-3 text-3xl font-black">{records.length}</p>
          </div>

          <div className="rounded-2xl border border-emerald-400/15 bg-[#071426] p-5">
            <p className="text-sm text-slate-400">Active Sessions</p>
            <p className="mt-3 text-3xl font-black text-emerald-300">
              {records.filter((record) => record.status === "Active").length}
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/15 bg-[#071426] p-5">
            <p className="text-sm text-slate-400">Location Points</p>
            <p className="mt-3 text-3xl font-black text-cyan-300">
              {records.reduce(
                (total, record) =>
                  total + (record.locationHistory?.length || 0),
                0,
              )}
            </p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-8 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-4 text-sm text-red-300"
          >
            <FaExclamationTriangle className="mt-1 shrink-0" />
            <div>
              <p className="font-bold">Could not load location reports</p>
              <p className="mt-1">{error}</p>
              <p className="mt-2 text-xs text-slate-400">
                Check that your backend is running and its URL is correct.
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="mt-12 rounded-2xl border border-white/10 bg-[#071426] p-12 text-center text-slate-400">
            Loading location reports...
          </div>
        ) : records.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#071426] px-6 py-16 text-center">
            <FaMapMarkerAlt className="mx-auto text-3xl text-slate-600" />
            <h2 className="mt-4 text-lg font-bold">No location reports yet</h2>
            <p className="mt-2 text-sm text-slate-400">
              Submitted check-ins will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {records.map((record) => (
              <article
                key={record._id}
                className="overflow-hidden rounded-2xl border border-blue-400/15 bg-gradient-to-br from-[#0B1B30] to-[#071426]"
              >
                <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-lg text-cyan-300">
                      <FaUser />
                    </div>

                    <div>
                      <h2 className="font-bold">{record.name}</h2>
                      <p className="mt-1 text-xs text-slate-500">
                        ID: {record._id}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${
                      record.status === "Active"
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                        : "border-slate-400/20 bg-slate-400/10 text-slate-300"
                    }`}
                  >
                    {record.status}
                  </span>
                </div>

                <div className="space-y-4 p-5">
                  <div className="rounded-xl border border-cyan-400/10 bg-[#020817]/60 p-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                      <FaMapMarkerAlt />
                      Latest Coordinates
                    </div>

                    <p className="mt-3 break-words text-sm text-slate-200">
                      Latitude: {record.currentLocation?.latitude}
                    </p>
                    <p className="mt-2 break-words text-sm text-slate-200">
                      Longitude: {record.currentLocation?.longitude}
                    </p>

                    <a
                      href={`https://www.google.com/maps?q=${record.currentLocation?.latitude},${record.currentLocation?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200"
                    >
                      View on Google Maps
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-slate-400">
                    <FaClock className="mt-1 shrink-0 text-cyan-300" />
                    <div>
                      <p>Submitted: {formatDate(record.createdAt)}</p>
                      <p className="mt-1">
                        Last update: {formatDate(record.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-bold">Location History</h3>
                      <span className="text-xs text-slate-500">
                        {record.locationHistory?.length || 0} points
                      </span>
                    </div>

                    {record.locationHistory?.length ? (
                      <div className="mt-4 space-y-3">
                        {record.locationHistory
                          .slice()
                          .reverse()
                          .slice(0, 5)
                          .map((point, index) => (
                            <div
                              key={`${point.timestamp}-${index}`}
                              className="flex gap-3 text-xs"
                            >
                              <FaCheckCircle className="mt-0.5 shrink-0 text-cyan-300" />
                              <div className="min-w-0">
                                <p className="break-words text-slate-300">
                                  {point.latitude}, {point.longitude}
                                </p>
                                <p className="mt-1 text-slate-500">
                                  {formatDate(point.timestamp)}
                                </p>
                              </div>
                            </div>
                          ))}

                        {record.locationHistory.length > 5 && (
                          <p className="pt-1 text-xs text-slate-500">
                            Showing the latest 5 points.
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="mt-3 text-xs text-slate-500">
                        No location history available.
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-xs leading-6 text-slate-500">
          This page refreshes the records every 5 seconds. Live movement appears
          only when the user&apos;s device continues sending location updates.
        </p>
      </div>
    </main>
  );
}
