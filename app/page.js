"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const nittfestTextRef = useRef(null);
  const nfLogoRef = useRef(null);
  const dottedTextureRef = useRef(null);
  const bgRef = useRef(null);
  const blackbarRef = useRef(null);

  useEffect(() => {
    // Use manual scroll restoration to prevent jump on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Reset scroll on load and temporarily lock it
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    // Background image scrolls up securely to 580px
    gsap.fromTo(
      bgRef.current,
      { marginTop: 0 },
      {
        marginTop: -580,
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: () => {
          // Unlock scroll after animation finishes
          document.body.style.overflow = "auto";
          // Reveal blackbar fixed at bottom
          gsap.to(blackbarRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" });
        }
      }
    );

    // NITTFEST text drops in from top
    gsap.fromTo(
      nittfestTextRef.current,
      { y: -200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );

    // NF logo fades up from below
    gsap.fromTo(
      nfLogoRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", delay: 0.7 }
    );

    // Dotted texture fades in after logo
    gsap.fromTo(
      dottedTextureRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.0, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  return (
    <main className="relative min-h-screen bg-[#BC1D1A]">
      {/* 1. Full Width Landing Page Asset */}
      <div className="relative w-full overflow-hidden">

        {/* Wrapper for image so it animates and scales alone */}
        <div
          ref={bgRef}
          className="relative w-full h-auto block transform translate-x-[70px] scale-110 origin-right"
        >
          <img
            src="/assets/landingpage/landingpageclear.jpg"
            alt="NITTFEST Landing Page"
            className="w-full h-auto block"
          />
        </div>

        {/* Blackbar positioned firmly at the bottom of the screen */}
        <img
          ref={blackbarRef}
          src="/assets/landingpage/blackbar.svg"
          alt="Black Cover"
          className="absolute top-209 left-[23%] w-[50%] z-50 pointer-events-none opacity-0"
        />

        {/* NITTFEST Text SVG — top centre overlay */}
        <div className="absolute top-0 left-0 right-0 flex flex-col items-center pointer-events-none gap-4">
          <img
            ref={nittfestTextRef}
            src="/assets/landingpage/nittfest text.svg"
            alt="NITTFEST"
            className="w-[clamp(200px,40vw,560px)] h-auto"
          />
          <div className="absolute top-0 left-0 right-0 flex flex-col items-center pointer-events-none gap-4">
            <img
              src="/assets/landingpage/nf3dsvg.svg"
              alt="NF Logo"
              className="w-[clamp(200px,150vw,250px)] h-auto mt-40"
            />
          </div>

          <img
            src="/assets/landingpage/comikaze.png"
            alt="Black Cover"
            className="absolute top-100 bottom-0 left-120 w-200 z-50 pointer-events-none"
          />


        </div>

      </div>

      {/* Thanos Hand Snap Hamburger Menu Button */}
      <div className="fixed top-8 right-8 z-100 cursor-pointer hover:scale-110 transition-transform duration-200">
        <img
          src="/assets/landingpage/hamburger/thanos-handsnap.svg"
          alt="Menu"
          className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg"
        />
      </div>
    </main>
  );
}
