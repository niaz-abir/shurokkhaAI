"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaLocationArrow,
  FaShieldAlt,
  FaUserShield,
  FaCheckCircle,
  FaArrowRight,
  FaExclamationTriangle,
  FaCrosshairs,
  FaLock,
  FaMapMarkedAlt,
  FaStop,
  FaPlay,
  FaRoute,
  FaClock,
} from "react-icons/fa";
import type { IconType } from "react-icons";

interface LocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface LocationPoint {
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface LiveMapResponse {
  success?: boolean;
  message?: string;
  data?: {
    _id: string;
    name: string;
    status: string;
    currentLocation: {
      latitude: number;
      longitude: number;
      updatedAt: string;
    };
    locationHistory: LocationPoint[];
  };
}

interface LocationStep {
  icon: IconType;
  number: string;
  title: string;
  description: string;
}

const API_URL = "https://shurokkha-ai-server.vercel.app/api/live-map";

const locationSteps: LocationStep[] = [
  {
    icon: FaUserShield,
    number: "01",
    title: "Enter your name",
    description:
      "Provide your name so authorized staff can identify your check-in.",
  },
  {
    icon: FaCrosshairs,
    number: "02",
    title: "Capture your location",
    description: "Allow your browser to access your current coordinates.",
  },
  {
    icon: FaRoute,
    number: "03",
    title: "Start tracking",
    description:
      "Choose to share ongoing location updates and stop tracking whenever you wish.",
  },
];

export default function LiveMapPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(
    null,
  );
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [locationHistory, setLocationHistory] = useState<LocationPoint[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const trackingIdRef = useRef<string | null>(null);
  const trackingActiveRef = useRef(false);
  const requestInProgressRef = useRef(false);

  const updateLocationText = (coords: LocationCoordinates) => {
    setCoordinates(coords);
    setLocation(
      `Lat: ${coords.latitude.toFixed(6)}, Lng: ${coords.longitude.toFixed(6)}`,
    );
  };

  const getLiveLocation = (): void => {
    setError("");
    setStatus("");

    if (!navigator.geolocation) {
      setError("Your browser does not support location access.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: LocationCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };

        updateLocationText(coords);
        setLoadingLocation(false);
      },
      (locationError) => {
        setLoadingLocation(false);

        if (locationError.code === 1) {
          setError(
            "Location permission was denied. Please allow location access in your browser settings.",
          );
        } else if (locationError.code === 2) {
          setError("Your location is unavailable. Please try again.");
        } else {
          setError(
            "Location request timed out. Please try again in an area with a better GPS signal.",
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  const sendLocationUpdate = useCallback(
    async (coords: LocationCoordinates, id: string, personName: string) => {
      // Avoid overlapping network requests when GPS updates arrive quickly.
      if (requestInProgressRef.current || !trackingActiveRef.current) return;

      requestInProgressRef.current = true;

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: personName,
            trackingId: id,
            latitude: coords.latitude,
            longitude: coords.longitude,
          }),
        });

        const result: LiveMapResponse = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Unable to update your location.");
        }

        console.log("Live location updated:", result);

        setLastUpdated(new Date().toISOString());
        setLocationHistory((previous) => [
          ...previous,
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
            timestamp: new Date().toISOString(),
          },
        ]);
      } catch (updateError) {
        console.error("Location update error:", updateError);
        setError(
          updateError instanceof Error
            ? updateError.message
            : "Location update failed. Please check your connection.",
        );
      } finally {
        requestInProgressRef.current = false;
      }
    },
    [],
  );

  const stopTracking = useCallback((showMessage = true) => {
    trackingActiveRef.current = false;

    if (watchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    setTracking(false);

    if (showMessage) {
      setStatus(
        "Location sharing stopped on this device. Previously submitted location history remains available to authorized administrators.",
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      trackingActiveRef.current = false;

      if (watchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setError("");
    setStatus("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!coordinates) {
      setError("Please get your current location before submitting.");
      return;
    }

    if (!navigator.geolocation) {
      setError("Your browser does not support location access.");
      return;
    }

    setSubmitting(true);

    try {
      // Create the initial tracking record in MongoDB.
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }),
      });

      const result: LiveMapResponse = await response.json();

      if (!response.ok || !result.data?._id) {
        throw new Error(result.message || "Unable to submit your location.");
      }

      const id = result.data._id;

      console.log("Live Map POST Response:", result);
      console.log("Tracking ID:", id);

      setTrackingId(id);
      trackingIdRef.current = id;
      setLocationHistory(
        result.data.locationHistory || [
          {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            timestamp: new Date().toISOString(),
          },
        ],
      );
      setLastUpdated(new Date().toISOString());
      setTracking(true);
      trackingActiveRef.current = true;

      setStatus(
        "Your check-in was submitted successfully. Location sharing is now active.",
      );

      const personName = name.trim();

      // Keep requesting location updates while this page is active.
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          if (!trackingActiveRef.current) return;

          const current: LocationCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };

          updateLocationText(current);

          const currentTrackingId = trackingIdRef.current;

          if (currentTrackingId) {
            void sendLocationUpdate(current, currentTrackingId, personName);
          }
        },
        (locationError) => {
          if (!trackingActiveRef.current) return;

          if (locationError.code === 1) {
            setError(
              "Location permission was revoked. Location updates may have stopped.",
            );
            stopTracking(false);
          } else {
            setError(
              "Unable to get a new location. Check your GPS signal and try again.",
            );
          }
        },
        {
          enableHighAccuracy: true,
          maximumAge: 3000,
          timeout: 20000,
        },
      );

      watchIdRef.current = watchId;
      setName("");
    } catch (submitError: unknown) {
      console.error("Live Map submission error:", submitError);

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#020817] text-white">
      {/* HERO */}
      <section className="relative mt-8 px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[110px]" />
        <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-[110px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-bold tracking-wide text-cyan-300">
              <FaShieldAlt />
              WOMEN&apos;S SAFETY LIVE MAP
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your location.
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Your safety matters.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              Share your location with the ShurokkhaAI safety team. When you
              explicitly start location sharing, your device can send updates
              while this page remains active. You can stop sharing at any time.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#safety-checkin"
                className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Share My Location
                <FaArrowRight />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-cyan-400/30"
              >
                How It Works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <FaLock className="text-cyan-300" />
                Permission-based location
              </span>
              <span className="flex items-center gap-2">
                <FaUserShield className="text-cyan-300" />
                Authorized admin reporting
              </span>
            </div>
          </div>

          {/* LOCATION PREVIEW */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-8 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-[#071426] p-5 shadow-2xl shadow-blue-950/30 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                    Location preview
                  </p>
                  <h2 className="mt-2 text-lg font-bold">
                    Your safety check-in
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-xl text-blue-300">
                  <FaMapMarkedAlt />
                </div>
              </div>

              <div className="relative mt-6 flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-blue-400/10 bg-[#020817]">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(59,130,246,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.18) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                <div className="absolute left-8 top-10 h-24 w-24 rounded-full border border-blue-400/20" />
                <div className="absolute bottom-8 right-8 h-32 w-32 rounded-full border border-cyan-400/15" />

                <div className="relative flex flex-col items-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full border text-2xl shadow-lg ${
                      tracking
                        ? "animate-pulse border-emerald-300/40 bg-emerald-400/10 text-emerald-300 shadow-emerald-900/30"
                        : "border-cyan-300/30 bg-cyan-400/10 text-cyan-300 shadow-cyan-900/30"
                    }`}
                  >
                    <FaMapMarkerAlt />
                  </div>

                  <div className="mt-3 rounded-xl border border-white/10 bg-[#071426] px-4 py-3 text-center">
                    <p className="text-sm font-bold text-white">
                      {tracking
                        ? "Location sharing active"
                        : "Location check-in"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {coordinates
                        ? `${coordinates.latitude.toFixed(5)}, ${coordinates.longitude.toFixed(5)}`
                        : "Waiting for your permission"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-400/10 bg-blue-500/[0.05] p-4">
                <FaShieldAlt className="mt-0.5 shrink-0 text-cyan-300" />
                <p className="text-xs leading-6 text-slate-400">
                  This is a location preview, not a street map. Your browser
                  must remain able to provide location updates for tracking to
                  continue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHECK-IN FORM */}
      <section
        id="safety-checkin"
        className="scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-[#0B1B30] to-[#071426]">
            <div className="border-b border-white/[0.06] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-300">
                  <FaLocationArrow />
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    Share Your Live Location
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Enter your name, capture your current coordinates, and
                    choose to start sharing location updates.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Your Full Name <span className="text-cyan-300">*</span>
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  maxLength={100}
                  disabled={tracking || submitting}
                  className="w-full rounded-xl border border-white/10 bg-[#020817]/80 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Your Current Location <span className="text-cyan-300">*</span>
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="location"
                    type="text"
                    placeholder="Click the button to get your location"
                    value={location}
                    readOnly
                    required
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#020817]/80 px-4 py-4 text-sm text-slate-300 outline-none placeholder:text-slate-600"
                  />

                  <button
                    type="button"
                    onClick={getLiveLocation}
                    disabled={loadingLocation || submitting || tracking}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-4 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FaCrosshairs
                      className={loadingLocation ? "animate-spin" : ""}
                    />
                    {loadingLocation ? "Locating..." : "Use My Location"}
                  </button>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Allow location permission when your browser asks. Geolocation
                  normally requires HTTPS or localhost.
                </p>

                {coordinates && (
                  <div className="mt-3 flex items-start gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-3 text-xs leading-5 text-emerald-300">
                    <FaCheckCircle className="mt-0.5 shrink-0" />
                    Location captured. Estimated accuracy: about{" "}
                    {Math.round(coordinates.accuracy)} metres. Actual accuracy
                    may vary.
                  </div>
                )}
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-4 text-sm leading-6 text-red-300"
                >
                  <FaExclamationTriangle className="mt-1 shrink-0" />
                  {error}
                </div>
              )}

              {status && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 text-sm leading-6 text-emerald-300"
                >
                  <FaCheckCircle className="mt-1 shrink-0" />
                  {status}
                </div>
              )}

              {tracking && (
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                    Location sharing is active
                  </div>
                  <p className="mt-2 break-words text-xs leading-6 text-slate-400">
                    Tracking ID: {trackingId}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Saved location points: {locationHistory.length}
                  </p>
                  {lastUpdated && (
                    <p className="mt-1 text-xs text-slate-400">
                      Last update: {new Date(lastUpdated).toLocaleTimeString()}
                    </p>
                  )}
                </div>
              )}

              <div className="rounded-xl border border-white/[0.07] bg-[#020817]/50 p-4">
                <p className="text-xs leading-6 text-slate-400">
                  When you start sharing, your name and location updates are
                  sent to the backend for authorized admin review. You can stop
                  sharing from this page at any time.
                </p>
              </div>

              {!tracking ? (
                <button
                  type="submit"
                  disabled={submitting || loadingLocation || !coordinates}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:from-blue-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? "Starting Location Sharing..."
                    : "Start Sharing Location"}
                  {!submitting && <FaPlay />}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => stopTracking(true)}
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-red-400/25 bg-red-400/10 px-6 py-4 text-sm font-bold text-red-300 transition hover:bg-red-400/15"
                >
                  <FaStop />
                  Stop Location Sharing
                </button>
              )}
            </form>
          </div>

          {/* SIDE PANEL */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-cyan-400/15 bg-[#071426] p-6 sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-xl text-cyan-300">
                <FaUserShield />
              </div>

              <h3 className="mt-5 text-xl font-black">
                What happens after submission?
              </h3>

              <div className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-sm font-bold text-blue-300">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">
                      Initial location saved
                    </h4>
                    <p className="mt-1 text-xs leading-6 text-slate-400">
                      Your initial check-in is stored in the backend.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-sm font-bold text-blue-300">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Location updates sent</h4>
                    <p className="mt-1 text-xs leading-6 text-slate-400">
                      While sharing is active, new coordinates are sent to your
                      tracking record.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-sm font-bold text-cyan-300">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">
                      Admin reviews the trail
                    </h4>
                    <p className="mt-1 text-xs leading-6 text-slate-400">
                      The admin report page can view the latest coordinates and
                      stored location history.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/15 bg-gradient-to-br from-[#0B1B30] to-[#071426] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <FaLock className="text-xl text-cyan-300" />
                <h3 className="text-lg font-black">Your privacy matters</h3>
              </div>

              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
                <li className="flex gap-3">
                  <FaCheckCircle className="mt-1 shrink-0 text-cyan-300" />
                  Location access requires browser permission.
                </li>
                <li className="flex gap-3">
                  <FaCheckCircle className="mt-1 shrink-0 text-cyan-300" />
                  Tracking is started by your explicit action.
                </li>
                <li className="flex gap-3">
                  <FaCheckCircle className="mt-1 shrink-0 text-cyan-300" />
                  Stop sharing whenever you choose.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-5">
              <div className="flex items-start gap-3">
                <FaExclamationTriangle className="mt-1 shrink-0 text-amber-300" />
                <div>
                  <h3 className="text-sm font-bold text-amber-200">
                    Tracking limitations
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    Location updates may pause if the browser tab closes, the
                    device suspends the page, GPS becomes unavailable, or the
                    internet disconnects. Stopping sharing here stops new
                    updates; it does not erase previously stored history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="px-5 pb-16 pt-4 sm:px-8 sm:pb-24 lg:px-12"
      >
        <div className="mx-auto max-w-7xl rounded-3xl border border-blue-400/15 bg-gradient-to-br from-[#0B1B30] to-[#071426] p-7 sm:p-10 lg:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              Simple. Voluntary. Purposeful.
            </span>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl">
              Three steps to share your location
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Capture your location, start sharing, and stop whenever you wish.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {locationSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-white/[0.07] bg-[#020817]/60 p-6 transition hover:border-cyan-400/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-cyan-300">
                      <Icon />
                    </div>
                    <span className="text-sm font-bold text-slate-600">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-blue-400/15 bg-blue-500/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h3 className="font-bold text-white">
                Help make your community safer.
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Share your location only when you choose to use this service.
              </p>
            </div>

            <Link
              href="/community"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.06]"
            >
              Community Reports
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
