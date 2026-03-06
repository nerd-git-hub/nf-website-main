"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./aboutus.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutUs() {
  const spidermanRef = useRef(null);
  const ropeRef = useRef(null);
  const titleRef = useRef(null);
  const textBoxRef = useRef(null);
  const speechBubbleRef = useRef(null);
  const pageRef = useRef(null);
  const tornPaperRef = useRef(null);
  const skylineRef = useRef(null);

  useGSAP(() => {
    const scrollerNode = document.querySelector("#main-scroll-container");

    // Master timeline for coordinated animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: pageRef.current,
        start: "top 80%",
        ...(scrollerNode && { scroller: scrollerNode }),
      }
    });

    // Torn paper edge slides down from top
    tl.fromTo(
      tornPaperRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    // City skyline rises from bottom
    tl.fromTo(
      skylineRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );

    // Title animation - dramatic slam-in with rotation
    tl.fromTo(
      titleRef.current,
      { x: -400, opacity: 0, scale: 0.3, rotate: -20 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        rotate: -5,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Text box animation - scale and rotate in with comic pop
    tl.fromTo(
      textBoxRef.current,
      { opacity: 0, scale: 0.2, rotate: -20, x: -100 },
      {
        opacity: 1,
        scale: 1,
        rotate: -3,
        x: 0,
        duration: 0.5,
        ease: "back.out(1.5)",
      },
      "-=0.2"
    );

    // Spider-Man rope extends from top
    tl.fromTo(
      ropeRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      { scaleY: 1, duration: 0.3, ease: "none" },
      "-=0.2"
    );

    // Spider-Man drops from above with bounce
    tl.fromTo(
      spidermanRef.current,
      { y: -600, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "bounce.out",
        onComplete: () => {
          // Spider-Man gentle swinging after landing
          gsap.to(spidermanRef.current, {
            rotation: 6,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            transformOrigin: "top center",
          });
        }
      },
      "-=0.3"
    );

    // Speech bubble pops in with spring
    tl.fromTo(
      speechBubbleRef.current,
      { scale: 0, opacity: 0, rotate: -10 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          // Subtle pulse on speech bubble
          gsap.to(speechBubbleRef.current, {
            scale: 1.03,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      },
      "-=0.2"
    );

    // Subtle floating animation on the text box
    tl.add(() => {
      gsap.to(textBoxRef.current, {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, "-=0.2");

  }, { scope: pageRef });

  return (
    <div className="aboutus-page" ref={pageRef}>
      {/* Torn paper edge at top */}
      <div className="torn-paper-edge" ref={tornPaperRef}>
        <img
          src="/top-border.png"
          alt="Torn Border"
          className="torn-border-img"
        />
      </div>

      {/* Main content area */}
      <div className="aboutus-content">
        {/* Title */}
        <h1 className="aboutus-title" ref={titleRef}>
          ABOUT US
        </h1>

        {/* Description box */}
        <div className="aboutus-textbox" ref={textBoxRef}>
          <p>
            NITTFEST IS THE ANNUAL CULTURAL FEST OF NIT TRICHY, WHERE
            CREATIVITY, ENERGY, AND EXPRESSION COLLIDE. FROM THRILLING EVENTS
            AND HANDS-ON WORKSHOPS TO UNFORGETTABLE INFORMAL, EVERY MOMENT IS
            DESIGNED TO LEAVE AN IMPACT. THIS YEAR, NITTFEST STEPS INTO A
            COMIC-INSPIRED WORLD — BOLD IDEAS, STRIKING MOMENTS, AND STORIES
            THAT BREAK THE FRAME.
          </p>
        </div>

        {/* Spider-Man section */}
        <div className="spiderman-container">
          {/* Rope */}
          <div className="spiderman-rope" ref={ropeRef}></div>
          {/* Spider-Man */}
          <div className="spiderman-character" ref={spidermanRef}>
            <Image
              src="/spiderman.png"
              alt="Spider-Man hanging from web"
              width={240}
              height={330}
              priority
            />
          </div>
        </div>

        {/* Speech bubble */}
        <div className="speech-bubble" ref={speechBubbleRef}>
          <span>&quot;A FEST WRITTEN IN BOLD PANELS&quot;</span>
        </div>
      </div>

      {/* City skyline */}
      <div className="city-skyline" ref={skylineRef}>
        <img
          src="/cityline.svg"
          alt="City skyline"
          className="cityline-img"
        />
      </div>
    </div>
  );
}
