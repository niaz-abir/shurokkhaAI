"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaShieldAlt,
  FaArrowRight,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaCamera,
  FaUsers,
  FaClipboardCheck,
  FaRegLightbulb,
  FaLock,
  FaCheckCircle,
  FaClock,
  FaBullhorn,
  FaFileAlt,
  FaTimes,
  FaCloudUploadAlt,
  FaChevronDown,
  FaInfoCircle,
  
} from "react-icons/fa";

const categories = [
  "Public Safety",
  "Harassment",
  "Road & Infrastructure",
  "Environmental Issue",
  "Public Service",
  "Community Problem",
  "Personal Experience",
  "Other",
];

const reportSteps = [
  {
    number: "01",
    title: "You submit a report",
    description:
      "Describe your concern and provide any relevant location or supporting details.",
    icon: FaFileAlt,
  },
  {
    number: "02",
    title: "Admin reviews it",
    description:
      "Your submission can be reviewed by authorized administrators for relevance and follow-up.",
    icon: FaClipboardCheck,
  },
  {
    number: "03",
    title: "Appropriate action",
    description:
      "Verified information can support community awareness and appropriate next steps.",
    icon: FaCheckCircle,
  },
];

const guidelines = [
  "Describe the issue clearly and honestly.",
  "Share a location when it is relevant and safe.",
  "Avoid posting private information about other people.",
  "Do not submit threats, false accusations, or abusive content.",
];

export default function CommunityPage() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [imageName, setImageName] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event:any) {
    event.preventDefault();

    setStatus("");
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      formData.set("isAnonymous", String(isAnonymous));

      // This endpoint must be implemented to store reports and
      // make them available in the admin dashboard.
      const response = await fetch("/api/reports", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "We couldn't submit your report. Please try again.",
        );
      }

      setStatusType("success");
      setStatus(
        result.message || "Your report was submitted successfully for review.",
      );
      setImageName("");
      setIsAnonymous(false);
      form.reset();
    } catch (error) {
      setStatusType("error");
      
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#020817] text-white">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-blue-600/[0.09] blur-[130px]" />
        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/[0.08] blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="transition hover:text-cyan-300">
            Home
          </Link>
          <FaArrowRight className="text-[9px]" />
          <span className="text-cyan-300">Community</span>
        </div>

        {/* Hero */}
        <section className="relative mb-12 grid gap-10 lg:mb-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                Your voice matters
              </span>
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
              See a problem?
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                Speak up.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Your community deserves to be heard. Report local problems, share
              safety concerns, or bring attention to issues that need action.
              Every meaningful report starts with someone speaking up.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-cyan-300" />
                Community focused
              </div>
              <div className="flex items-center gap-2">
                <FaClipboardCheck className="text-cyan-300" />
                Admin review workflow
              </div>
            </div>
          </div>

          {/* Hero information panel */}
          <div className="relative overflow-hidden rounded-3xl border border-blue-400/15 bg-gradient-to-br from-[#0D1E35] to-[#071426] p-6 sm:p-8">
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-cyan-400/10 blur-[70px]" />

            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-xl text-cyan-300">
                <FaBullhorn />
              </div>

              <div>
                <p className="text-lg font-bold text-white">
                  Make your concern count.
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  One place to report an issue, provide useful context, and help
                  administrators understand what is happening in the community.
                </p>
              </div>
            </div>

            <div className="relative mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <FaUsers className="text-lg text-blue-300" />
                <p className="mt-3 text-sm font-bold text-white">
                  Community voice
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Share local concerns
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <FaClipboardCheck className="text-lg text-cyan-300" />
                <p className="mt-3 text-sm font-bold text-white">
                  Admin review
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Support accountability
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.8fr)] lg:gap-10">
          {/* Report form */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#081426]/95 shadow-2xl shadow-black/20">
            <div className="border-b border-white/[0.08] bg-gradient-to-r from-blue-500/[0.09] to-transparent px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-xl text-cyan-300">
                  <FaFileAlt />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Submit a report
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Tell us what happened. Fields marked * are required.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-6 p-6 sm:p-8"
            >
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  What is your report about? *
                </label>

                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    required
                    defaultValue=""
                    className="w-full appearance-none rounded-xl border border-white/10 bg-[#0C1A2E] px-4 py-3.5 pr-11 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                  >
                    <option value="" disabled>
                      Select an issue category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
                </div>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Report title *
                </label>

                <input
                  id="title"
                  name="title"
                  required
                  minLength={5}
                  maxLength={120}
                  placeholder="Briefly describe the problem"
                  className="w-full rounded-xl border border-white/10 bg-[#0C1A2E] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Example: Broken streetlights near the local market
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Describe the issue *
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  minLength={20}
                  maxLength={3000}
                  rows={6}
                  placeholder="What happened? Where did it happen? Why does it need attention? Share the relevant details..."
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#0C1A2E] px-4 py-3.5 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                />

                <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-slate-500">
                  <FaInfoCircle className="mt-0.5 shrink-0 text-cyan-400" />
                  Stick to what you observed or experienced. Avoid sharing
                  unverified accusations.
                </p>
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200"
                >
                  <FaMapMarkerAlt className="text-cyan-300" />
                  Location of the issue *
                </label>

                <input
                  id="location"
                  name="location"
                  required
                  maxLength={250}
                  placeholder="Area, road, landmark, or neighborhood"
                  className="w-full rounded-xl border border-white/10 bg-[#0C1A2E] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Share only the location details necessary to understand the
                  concern. Avoid posting someone's private address.
                </p>
              </div>

              {/* Contact details */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Your name {!isAnonymous && "*"}
                  </label>

                  <input
                    id="name"
                    name="name"
                    required={!isAnonymous}
                    disabled={isAnonymous}
                    maxLength={100}
                    placeholder={
                      isAnonymous ? "Name hidden" : "Enter your name"
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#0C1A2E] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Email address{" "}
                    <span className="font-normal text-slate-500">
                      (optional)
                    </span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={254}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-[#0C1A2E] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                  />
                </div>
              </div>

              {/* Optional attachment */}
              <div>
                <label
                  htmlFor="attachment"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Supporting photo{" "}
                  <span className="font-normal text-slate-500">(optional)</span>
                </label>

                <label
                  htmlFor="attachment"
                  className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-blue-400/25 bg-blue-500/[0.035] px-5 py-7 text-center transition hover:border-cyan-400/50 hover:bg-cyan-400/[0.04]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl text-cyan-300 transition group-hover:bg-cyan-400/10">
                    <FaCloudUploadAlt />
                  </span>

                  <span className="mt-4 text-sm font-semibold text-slate-200">
                    {imageName || "Click to upload a photo"}
                  </span>

                  <span className="mt-2 text-xs text-slate-500">
                    JPG, PNG, or WEBP · Maximum 5 MB
                  </span>

                  <input
                    id="attachment"
                    name="attachment"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0];

                      if (!file) {
                        setImageName("");
                        return;
                      }

                      if (file.size > 5 * 1024 * 1024) {
                        event.target.value = "";
                        setImageName("");
                        setStatusType("error");
                        setStatus("Please select an image smaller than 5 MB.");
                        return;
                      }

                      setImageName(file.name);
                      setStatus("");
                    }}
                  />
                </label>

                {imageName && (
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById("attachment");

                      setImageName("");
                    }}
                    className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-red-300"
                  >
                    <FaTimes /> Remove attachment
                  </button>
                )}
              </div>

              {/* Anonymous option */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(event) => setIsAnonymous(event.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-cyan-400"
                  />

                  <span>
                    <span className="flex items-center gap-2 text-sm font-semibold text-white">
                      <FaLock className="text-cyan-300" />
                      Submit without displaying my name
                    </span>

                    <span className="mt-2 block text-xs leading-6 text-slate-400">
                      Your name will be omitted from this submission. This
                      interface does not guarantee complete anonymity; the
                      backend must enforce privacy and access controls.
                    </span>
                  </span>
                </label>
              </div>

              {/* Status */}
              {status && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${
                    statusType === "success"
                      ? "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-200"
                      : "border-red-400/20 bg-red-400/[0.06] text-red-200"
                  }`}
                >
                  {statusType === "success" ? (
                    <FaCheckCircle className="mt-1 shrink-0" />
                  ) : (
                    <FaExclamationTriangle className="mt-1 shrink-0" />
                  )}
                  {status}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isSubmitting ? "Submitting report..." : "Submit Report"}
                {!isSubmitting && (
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                )}
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                Please provide accurate information. Reports may be reviewed by
                authorized administrators before further action.
              </p>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-8">
            {/* How it works */}
            <div className="rounded-3xl border border-white/10 bg-[#081426]/95 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <FaClipboardCheck />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    What happens next?
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    The reporting workflow
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-6">
                {reportSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.number} className="relative flex gap-4">
                      {index !== reportSteps.length - 1 && (
                        <div className="absolute bottom-[-19px] left-[17px] top-10 w-px bg-gradient-to-b from-cyan-400/30 to-transparent" />
                      )}

                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-sm text-cyan-300">
                        <Icon />
                      </div>

                      <div className="pt-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-cyan-400">
                            {step.number}
                          </span>
                          <h3 className="text-sm font-bold text-white">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-xs leading-6 text-slate-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guidelines */}
            <div className="rounded-3xl border border-white/10 bg-[#081426]/95 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
                  <FaRegLightbulb />
                </div>
                <h2 className="text-lg font-bold text-white">
                  Before you report
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {guidelines.map((guideline) => (
                  <div key={guideline} className="flex items-start gap-3">
                    <FaCheckCircle className="mt-1 shrink-0 text-cyan-400" />
                    <p className="text-xs leading-6 text-slate-400">
                      {guideline}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy note */}
            <div className="rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-[#0C2034] to-[#081426] p-6">
              <div className="flex items-start gap-3">
                <FaLock className="mt-1 shrink-0 text-cyan-300" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Your information matters
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    Reports should be accessible only to the people who need
                    them. Appropriate authentication, authorization, and privacy
                    protections must be implemented on the server.
                  </p>
                  <Link
                    href="/privacy-policy"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-cyan-300 transition hover:text-white"
                  >
                    Privacy information <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            {/* Emergency note */}
            <div className="rounded-3xl border border-amber-400/15 bg-amber-400/[0.035] p-6">
              <div className="flex items-start gap-3">
                <FaExclamationTriangle className="mt-1 shrink-0 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Immediate danger?
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    Do not wait for an online report to be reviewed. Contact the
                    appropriate local emergency service if you or someone else
                    is in immediate danger.
                  </p>
                  <Link
                    href="/sos"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber-300 transition hover:text-white"
                  >
                    Visit SOS page <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Bottom community CTA */}
        <section className="relative mt-16 overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-[#0B1B30] to-[#071426] p-7 sm:mt-20 sm:p-10 lg:p-12">
          {/* Background glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-[90px]" />

          <div className="relative">
            {/* Heading */}
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                Our Community Impact
              </span>

              <h2 className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                Every report brings us one step closer to a safer community.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Every concern matters. Together, we turn community voices into
                meaningful action and work toward safer neighborhoods.
              </p>
            </div>

            {/* Statistics */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total Reports */}
              <div className="group rounded-2xl border border-blue-400/15 bg-[#020817]/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <FaFileAlt className="text-xl" />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-400">
                  Total Reports Received
                </p>

                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                  1,250+
                </h3>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Community concerns submitted
                </p>
              </div>

              {/* Resolved Reports */}
              <div className="group rounded-2xl border border-emerald-400/15 bg-[#020817]/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                  <FaCheckCircle className="text-xl" />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-400">
                  Successfully Resolved
                </p>

                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                  860+
                </h3>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Issues marked as resolved
                </p>
              </div>

              {/* Under Review */}
              <div className="group rounded-2xl border border-amber-400/15 bg-[#020817]/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-400/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <FaClock className="text-xl" />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-400">
                  Under Review
                </p>

                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                  245
                </h3>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Reports awaiting further action
                </p>
              </div>

              {/* Community Members */}
              <div className="group rounded-2xl border border-cyan-400/15 bg-[#020817]/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <FaUsers className="text-xl" />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-400">
                  Community Reports
                </p>

                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                  145
                </h3>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Other reports in progress
                </p>
              </div>
            </div>

          
          </div>
        </section>
      </div>
    </main>
  );
}
