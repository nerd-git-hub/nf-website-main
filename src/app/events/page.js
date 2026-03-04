'use client';

import React, { useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NITTFESTEvents() {
  const [isOpen, setIsOpen] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const eventsRef = useRef(null);
  const ironmanRef = useRef(null);
  const bookRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const scrollerNode = document.querySelector("#main-scroll-container");

    // 1. Initial Load Sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        ...(scrollerNode && { scroller: scrollerNode }),
      }
    });

    tl.from(eventsRef.current, {
      y: -50, opacity: 0, duration: 0.8, ease: "power3.out"
    })
      .from(ironmanRef.current, {
        x: -100, opacity: 0, duration: 0.8, ease: "power3.out"
      }, "-=0.4")
      .from(bookRef.current, {
        scale: 0.8, opacity: 0, rotation: -2, duration: 1, ease: "back.out(1.5)"
      }, "-=0.4")
      .from(buttonRef.current, {
        y: 50, opacity: 0, duration: 0.6, ease: "power3.out",
        onComplete: () => {
          // 2. Continuous Floating Effects
          gsap.to(ironmanRef.current, {
            y: "-=15",
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });

          gsap.to(bookRef.current, {
            y: "-=10",
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });
        }
      }, "-=0.6");

  }, { scope: containerRef });

  // Exact Figma Gradient
  const figmaGradient = 'linear-gradient(180deg, #000000 0%, #570000 11%, #690000 22%, #7C0000 33%, #900000 44%, #A50E00 56%, #BB2A00 67%, #D13E00 78%, #E7520C 89%, #FE6522 100%)';

  return (
    <main
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: figmaGradient }}
    >
      {/* 1. EVENTS TEXT */}
      <div className="absolute top-8 left-12 z-20 w-[25%] max-w-[350px]">
        <div ref={eventsRef}>
          <img
            src="/EVENTS_TEXT.svg"
            alt="Events"
            className="w-full h-auto drop-shadow-xl"
          />
        </div>
      </div>

      {/* 2. IRON MAN */}
      <div className="absolute bottom-4 left-12 z-10 w-[40%] h-[75%] flex justify-center items-end pointer-events-none">
        <div ref={ironmanRef} className="w-full h-full flex justify-center items-end">
          <img
            src="/Ironman.png"
            alt="Ironman"
            className="max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      {/* 3. BOOK COVER */}
      <div className="absolute top-1/2 right-12 translate-x-[-120px] translate-y-[calc(-50%-35px)] scale-[1.25] z-30 w-[50%] h-[95%] flex items-center justify-center">
        <div ref={bookRef} className="h-full w-full flex justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="relative h-full w-full flex justify-center transition-transform hover:scale-105 active:scale-95 duration-500"
          >
            <img
              src="/Book_cover.svg"
              alt="NITTFEST Archive"
              className="h-[90%] w-auto max-w-full object-contain drop-shadow-[50px_50px_100px_rgba(0,0,0,0.9)] rounded-r-[2rem]"
            />
          </button>
        </div>
      </div>

      {/* 4. STYLISH BUTTON */}
      <div className="absolute bottom-0 right-0 z-40">
        <div ref={buttonRef}>
          <button
            onClick={() => setIsOpen(true)}
            className="px-10 py-5 bg-[#FFD700] text-black font-black italic uppercase tracking-[0.15em] text-xl border-t-4 border-l-4 border-black rounded-tl-2xl hover:bg-white transition-colors duration-300"
          >
            Click the Book to Open
          </button>
        </div>
      </div>

      {/* 5. DIRECT 2-PAGE SPREAD OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 text-white bg-white/10 w-14 h-14 rounded-full flex items-center justify-center text-2xl hover:bg-white hover:text-black transition-all z-[60]"
          >
            ✕
          </button>

          {/* EXACT SIZING FIX: Height is strictly 80vh, width is mathematically calculated based on the 2-page aspect ratio (1100/750 = 1.46) */}
          <div className="h-[80vh] w-[calc(80vh*1.46)] max-w-[95vw] flex items-center justify-center">
            <HTMLFlipBook
              width={550}
              height={750}
              size="stretch"
              showCover={false}
              className="book-no-box"
              startPage={0}
            >
              {/* Internal 6 Pages */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border-l-2 border-zinc-300 h-full w-full p-8 overflow-hidden shadow-2xl">
                  <div className="grid grid-cols-3 grid-rows-4 gap-3 h-full border-8 border-black p-3 bg-zinc-50">
                    <div className="border-4 border-black bg-zinc-200 row-span-2"></div>
                    <div className="border-4 border-black bg-zinc-200 row-span-2"></div>
                    <div className="border-4 border-black bg-zinc-200"></div>
                    <div className="border-4 border-black bg-zinc-200"></div>

                    <div className="border-4 border-black bg-black col-span-3 flex items-center justify-center">
                      <span className="text-white font-black italic uppercase text-2xl md:text-3xl">Page 0{i + 1}</span>
                    </div>

                    <div className="border-4 border-black bg-zinc-200"></div>
                    <div className="border-4 border-black bg-zinc-200"></div>
                    <div className="border-4 border-black bg-black text-white p-2 text-xs font-bold flex items-end">DATA_{i + 1}</div>
                  </div>
                </div>
              ))}
            </HTMLFlipBook>
          </div>
        </div>
      )}

      <style jsx global>{`
        .stf__parent, .stf__block {
          background: transparent !important;
        }
        .book-no-box {
          filter: drop-shadow(0 0 100px rgba(0,0,0,1));
        }
      `}</style>
    </main>
  );
}