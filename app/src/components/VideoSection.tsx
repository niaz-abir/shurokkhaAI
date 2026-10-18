"use client";

import { useEffect, useRef, useState } from "react";
import { FaPlay, FaShieldAlt } from "react-icons/fa";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let isMounted = true;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];

        if (!entry) return;

        if (entry.isIntersecting) {
          video
            .play()
            .then(() => {
              if (isMounted) {
                setIsPlaying(true);
              }
            })
            .catch(() => {
              if (isMounted) {
                setIsPlaying(false);
              }
            });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(section);

    return () => {
      isMounted = false;
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#020817] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
            <FaShieldAlt aria-hidden="true" />
            Safety in Action
          </div>

          <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Building a Safer Community,
            <span className="mt-2 block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Together.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Discover how ShurokkhaAI brings community reporting, safety
            awareness, and technology together to help create safer
            neighborhoods.
          </p>
        </div>

        {/* Video container */}
        <div className="group relative mx-auto max-w-5xl">
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-blue-600/40 via-cyan-400/30 to-blue-600/40 opacity-60 blur-xl transition duration-700 group-hover:opacity-100" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#071426] shadow-2xl shadow-blue-950/40 sm:rounded-3xl">
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              src="/video.mp4"
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              controls={false}
              aria-label="ShurokkhaAI community safety introduction video"
            />

            {!isPlaying && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#020817]/35">
                {/* <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-blue-600/90 text-xl text-white shadow-xl shadow-blue-950/40 backdrop-blur-sm sm:h-20 sm:w-20">
                  <FaPlay className="ml-1" aria-hidden="true" />
                </div> */}
              </div>
            )}

            {/* Bottom label */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#020817]/95 via-[#020817]/60 to-transparent px-5 pb-5 pt-16 sm:px-8 sm:pb-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                    ShurokkhaAI
                  </p>
                  <h3 className="mt-2 text-lg font-bold sm:text-2xl">
                    Technology for safer neighborhoods
                  </h3>
                </div>

                {/* <span className="w-fit rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-xs font-medium text-slate-200 backdrop-blur-md">
                  {isPlaying ? "Now playing" : "Video ready"}
                </span> */}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          The video plays automatically when this section enters your screen.
        </p>
      </div>
    </section>
  );
}
