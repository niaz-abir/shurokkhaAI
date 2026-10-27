"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/api/area-reports`;

type AreaReportForm = {
  name: string;
  safety: string;
  threats: string;
  resolved: string;
  active: string;
  risk: "High" | "Moderate" | "Low";
  latitude: string;
  longitude: string;
};

const initialForm: AreaReportForm = {
  name: "",
  safety: "",
  threats: "",
  resolved: "",
  active: "",
  risk: "Moderate",
  latitude: "",
  longitude: "",
};

export default function CreateAreaReportPage() {
  const [form, setForm] = useState<AreaReportForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );

  function handleChange(field: keyof AreaReportForm, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      name: form.name.trim(),
      safety: Number(form.safety),
      threats: Number(form.threats),
      resolved: Number(form.resolved),
      active: Number(form.active),
      risk: form.risk,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    // See submitted data in the browser console.
    console.log("Submitting area report:", payload);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create area report");
      }

      console.log("Area report saved to database:", result.data);

      setMessage("Area report created successfully!");
      setMessageType("success");
      setForm(initialForm);
    } catch (error) {
      console.error("Create area report error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-700 bg-[#071426] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500";

  return (
    <main className="min-h-screen bg-[#020817] mt-14 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Admin Dashboard
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Create Area Report
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Add area safety metrics and location coordinates.
            </p>
          </div>

          <Link
            href="/admin/specific/area-report"
            className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold transition hover:border-blue-500 hover:bg-blue-500/10"
          >
            View All Reports
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-[#061a38]/70 p-5 shadow-xl sm:p-8"
        >
          {message && (
            <div
              role="status"
              className={`mb-6 rounded-xl border p-4 text-sm ${
                messageType === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/30 bg-red-500/10 text-red-300"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-slate-200"
              >
                Area Name
              </label>
              <input
                id="name"
                className={inputClass}
                placeholder="e.g. Lalbagh"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                maxLength={100}
              />
            </div>

            <div>
              <label
                htmlFor="safety"
                className="text-sm font-medium text-slate-200"
              >
                Safety Score (0–100)
              </label>
              <input
                id="safety"
                type="number"
                min="0"
                max="100"
                step="any"
                className={inputClass}
                placeholder="55"
                value={form.safety}
                onChange={(e) => handleChange("safety", e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="risk"
                className="text-sm font-medium text-slate-200"
              >
                Risk Level
              </label>
              <select
                id="risk"
                className={inputClass}
                value={form.risk}
                onChange={(e) =>
                  handleChange("risk", e.target.value as AreaReportForm["risk"])
                }
                required
              >
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="threats"
                className="text-sm font-medium text-slate-200"
              >
                Total Threats
              </label>
              <input
                id="threats"
                type="number"
                min="0"
                step="1"
                className={inputClass}
                placeholder="22"
                value={form.threats}
                onChange={(e) => handleChange("threats", e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="resolved"
                className="text-sm font-medium text-slate-200"
              >
                Resolved Reports
              </label>
              <input
                id="resolved"
                type="number"
                min="0"
                step="1"
                className={inputClass}
                placeholder="13"
                value={form.resolved}
                onChange={(e) => handleChange("resolved", e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="active"
                className="text-sm font-medium text-slate-200"
              >
                Active Reports
              </label>
              <input
                id="active"
                type="number"
                min="0"
                step="1"
                className={inputClass}
                placeholder="9"
                value={form.active}
                onChange={(e) => handleChange("active", e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="latitude"
                className="text-sm font-medium text-slate-200"
              >
                Latitude
              </label>
              <input
                id="latitude"
                type="number"
                min="-90"
                max="90"
                step="any"
                className={inputClass}
                placeholder="23.7185"
                value={form.latitude}
                onChange={(e) => handleChange("latitude", e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="longitude"
                className="text-sm font-medium text-slate-200"
              >
                Longitude
              </label>
              <input
                id="longitude"
                type="number"
                min="-180"
                max="180"
                step="any"
                className={inputClass}
                placeholder="90.388"
                value={form.longitude}
                onChange={(e) => handleChange("longitude", e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3.5 font-semibold text-white transition hover:from-blue-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? "Submitting..." : "Create Area Report"}
          </button>
        </form>
      </div>
    </main>
  );
}
