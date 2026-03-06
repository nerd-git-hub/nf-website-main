"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HighlightsPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const scrollerNode = document.querySelector("#main-scroll-container");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        ...(scrollerNode && { scroller: scrollerNode }),
      },
    });

    // Fade in background and move it up slightly for a parallax feel
    tl.fromTo(".bg-image",
      { opacity: 0, y: 30 },
      { opacity: 0.5, y: 0, duration: 0.8, ease: "power2.out" }
    )
      .fromTo(".heading-svg",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.6"
      )
      // Staggered entry for the highlight rows
      .fromTo(".animate-box",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      );
  }, { scope: containerRef });

  return (
    <main
      ref={containerRef}
      /* pb-[240px] (approx pb-60) provides the final spacing adjustment. 
         If you need it even lower, increase 240 to 255.
      */
      className="relative min-h-screen bg-black text-white flex flex-col items-center pt-20 pb-[240px] px-6 md:px-12 overflow-x-hidden"
    >
      {/* 1. SCROLLING BACKGROUND LAYER */}
      <div className="bg-image absolute inset-0 z-0 pointer-events-none h-full">
        <Image
          src="/Hightlights background.svg"
          alt="Cityscape Silhouettes"
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">

        {/* 2. HEADING SVG */}
        <div className="heading-svg relative w-64 md:w-96 h-24 mb-4">
          <Image
            src="/Highlights Text.svg"
            alt="Highlights"
            fill
            priority
            className="object-contain object-left"
          />
        </div>

        {/* --- ROW 1 --- */}
        <div className="flex w-full h-64 md:h-[400px] gap-2 md:gap-4">
          {/* Box 1: Image Left with Slant Out */}
          <div
            className="animate-box group relative w-[42%] overflow-hidden bg-zinc-900 cursor-pointer border border-white/5 shadow-2xl transition-all duration-500 hover:z-20"
            style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 100px) 100%, 0 100%)" }}
          >
            <Image
              src="/image1.jpg"
              alt="H1"
              fill
              className="object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 scale-[1.02] group-hover:scale-110"
            />
          </div>

          {/* Box 2: Dark Red Right with Slant In */}
          <div
            className="animate-box group relative flex-1 overflow-hidden bg-[#2a0a0a] cursor-pointer border border-white/5 shadow-2xl transition-all duration-500 hover:z-20"
            style={{ clipPath: "polygon(100px 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <Image
              src="/image2.jpg"
              alt="H2"
              fill
              className="object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 scale-[1.02] group-hover:scale-110"
            />
            {/* Subtle color overlay to keep it "Dark Red" until hovered */}
            <div className="absolute inset-0 bg-[#2a0a0a]/30 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>

        {/* --- ROW 2 --- */}
        <div className="flex w-full h-64 md:h-[400px] gap-2 md:gap-4">
          {/* Box 3: Dark Red Left with Slant Out */}
          <div
            className="animate-box group relative flex-1 overflow-hidden bg-[#2a0a0a] cursor-pointer border border-white/5 shadow-2xl transition-all duration-500 hover:z-20"
            style={{ clipPath: "polygon(0 0, calc(100% - 100px) 0, 100% 100%, 0 100%)" }}
          >
            <Image
              src="/image3.jpg"
              alt="H3"
              fill
              className="object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 scale-[1.02] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#2a0a0a]/30 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* Box 4: Image Right with Slant In */}
          <div
            className="animate-box group relative w-[42%] overflow-hidden bg-zinc-900 cursor-pointer border border-white/5 shadow-2xl transition-all duration-500 hover:z-20"
            style={{ clipPath: "polygon(100px 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <Image
              src="/image4.jpg"
              alt="H4"
              fill
              className="object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 scale-[1.02] group-hover:scale-110"
            />
          </div>
        </div>

      </div>
    </main>
  );
}