"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import HighlightsPage from "./highlights/page";
import AboutUs from "./aboutus/page";
import NITTFESTEvents from "./events/page";
import SponsorsPage from "./sponsors/page";

export default function Home() {
  const router = useRouter();
  const nittfestTextRef = useRef(null);
  const nfLogoRef = useRef(null);
  const dottedTextureRef = useRef(null);
  const bgRef = useRef(null);
  const comiRef = useRef(null);
  const kazeRef = useRef(null);
  const mainScrollContainerRef = useRef(null);

  // Menu animation refs
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuContainerRef = useRef(null);
  const towerRef = useRef(null);
  const menuContentRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    // Use manual scroll restoration to prevent jump on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Reset scroll on load and temporarily lock it
    if (mainScrollContainerRef.current) {
      mainScrollContainerRef.current.scrollTo(0, 0);
      mainScrollContainerRef.current.style.overflowY = "hidden";
    }

    // Unlock scroll immediately or after minor delay since background animation is removed
    if (mainScrollContainerRef.current) {
      mainScrollContainerRef.current.style.overflowY = "auto";
    }

    // NITTFEST text drops in from top
    gsap.fromTo(
      nittfestTextRef.current,
      { y: -200, opacity: 0 },
      { y: -10, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
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

    // Comifinal and Kazefinal collision animation
    gsap.fromTo(
      comiRef.current,
      { xPercent: -200, yPercent: -50, opacity: 0 },
      { xPercent: -95, yPercent: -50, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(
      kazeRef.current,
      { xPercent: 100, yPercent: -50, opacity: 0 },
      { xPercent: -5, yPercent: -50, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    // Initialize the GSAP timeline
    tl.current = gsap.timeline({ paused: true });

    tl.current
      // 1. Show the menu container
      .set(menuContainerRef.current, { zIndex: 60, opacity: 1, pointerEvents: "auto" })
      // 2. Animate the tower in from the left
      .fromTo(towerRef.current, { x: "-150%" }, {
        x: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      // 3. Lightning effects flicker and stay
      .fromTo(
        ".lightning-effect",
        { opacity: 0 },
        {
          keyframes: [
            { opacity: 0.8, duration: 0.05 },
            { opacity: 0.1, duration: 0.05 },
            { opacity: 0.9, duration: 0.05 },
            { opacity: 0.2, duration: 0.05 },
            { opacity: 0.8, duration: 0.3 }
          ],
          stagger: 0.1
        },
        "-=0.6"
      )
      // 4. Animate the menu content sliding in from the RIGHT
      .fromTo(menuContentRef.current,
        { x: "100vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.2)"
        },
        "-=0.4"
      );

  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      if (mainScrollContainerRef.current) mainScrollContainerRef.current.style.overflowY = "hidden";
      tl.current.play();
    } else {
      if (mainScrollContainerRef.current) mainScrollContainerRef.current.style.overflowY = "auto";
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  // Toggle function for the hamburger icon
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false); // Close the menu
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400); // Small delay to let the menu closing animation start
  };

  return (
    <div id="main-scroll-container" ref={mainScrollContainerRef} className="relative w-full snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
      {/* Persisting UI Elements */}
      {/* Top Left NF Logo */}
      <div className="fixed top-8 left-8 z-100 cursor-pointer hover:scale-110 transition-transform duration-200">
        <img
          src="/assets/landingpage/nf3dsvg.svg"
          alt="NF Logo"
          className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg"
          onClick={() => {
            if (mainScrollContainerRef.current) {
              mainScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
      </div>

      {/* Thanos Hand Snap Hamburger Menu Button */}
      <div
        className="absolute top-8 right-8 z-100 cursor-pointer hover:scale-110 transition-transform duration-200 pointer-events-auto"
        onClick={toggleMenu}
      >
        <img
          src="/assets/landingpage/hamburger/thanos-handsnap.svg"
          alt="Menu"
          className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg"
        />
      </div>

      <main id="home" className="relative min-h-screen w-full shrink-0 snap-start bg-[#BC1D1A]">
        {/* 1. Full Width Landing Page Asset */}
        <div className="relative w-full overflow-hidden">

          {/* Wrapper for image so it animates and scales alone */}
          <div
            ref={bgRef}
            className="relative w-full h-auto block transform translate-x-[70px] scale-110 origin-right"
          >
            <img
              src="/assets/landingpage/landingggg.jpeg"
              alt="NITTFEST Landing Page"
              className="w-full h-auto block"
            />
          </div>

          {/* NITTFEST Text SVG — top centre overlay */}
          <div className="absolute top-[20px] left-0 right-0 flex flex-col items-center pointer-events-none gap-2">
            <h1
              ref={nittfestTextRef}
              className="neon-text font-orbitron text-[clamp(40px,8vw,100px)] font-black tracking-[0.1em] md:tracking-[0.2em] uppercase whitespace-nowrap"
            >
              N I T T F E S T
            </h1>
            <img
              ref={comiRef}
              src="/assets/landingpage/comifinal.png"
              alt="Comi"
              className="absolute top-[291%] left-[48.8%] w-[400px] z-50 pointer-events-none opacity-0"
            />
            <img
              ref={kazeRef}
              src="/assets/landingpage/kazefinal.png"
              alt="Kaze"
              className="absolute top-[275%] left-[51%] w-[445px] z-50 pointer-events-none opacity-0"
            />

            <h2
              className="absolute top-[330%] left-1/2 transform -translate-x-1/2 text-black font-bangers text-3xl md:text-5xl tracking-wider z-50"
              style={{
                textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #fff, 0 0 80px #fff"
              }}
            >
              MARCH 13-15
            </h2>


          </div>

        </div>

        {/* Full Screen Menu Overlay */}
        <div
          ref={menuContainerRef}
          className="fixed inset-0 z-100 opacity-0 pointer-events-none w-full h-full overflow-hidden flex items-center justify-start"
        >
          {/* Red background image replacing the black backdrop */}
          <img
            src="/assets/landingpage/bgham.png"
            alt="Menu Background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={toggleMenu} // Close if clicked outside
          />

          {/* Rain SVG covering background (optional enhancement given the dir contents) */}
          <img
            src="/assets/landingpage/hamburger/rainfinal.svg"
            alt="Rain Effect"
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen pointer-events-none"
          />

          {/* Primary Lightning Effects Top Right */}
          <img
            src="/assets/landingpage/hamburger/strike.svg"
            alt="Lightning Strike"
            className="lightning-effect absolute top-[-170px] right-[-100px] w-[35vw] max-w-[1800px] h-auto object-contain z-10 pointer-events-none drop-shadow-2xl opacity-0"
          />
          <img
            src="/assets/landingpage/hamburger/flash.svg"
            alt="Lightning Flash"
            className="lightning-effect absolute top-[-60px] right-[-80px] w-[12vw] max-w-[300px] h-auto object-contain z-10 pointer-events-none mix-blend-screen opacity-0"
          />

          {/* Content Wrapper */}
          <div className="relative h-full w-full flex items-end justify-start z-20 p-0 pointer-events-none">

            {/* Avengers Tower Sliding in from Left (Sizes strictly to contents to prevent wide invisible gap) */}
            <div
              ref={towerRef}
              className="relative h-[95vh] md:h-screen max-w-[45vw] lg:max-w-[40vw] shrink-0 z-30 pointer-events-auto"
            >
              <img
                src="/assets/landingpage/hamburger/Avengerstowerironman.svg"
                alt="Avengers Tower"
                className="h-full w-auto object-contain object-bottom-left drop-shadow-2xl"
              />
            </div>

            {/* Hamburger Menu Content Sliding in from the RIGHT */}
            <div
              ref={menuContentRef}
              className="relative z-20 flex-1 h-full overflow-x-auto overflow-y-hidden pointer-events-auto items-center flex"
            >
              {/* Reduced left padding so the menu is snug against the tower edge */}
              <div className="min-w-max pr-[20vw] pl-2 md:pl-4 h-full flex items-center">
                <div
                  className="relative h-[60vh] md:h-[85vh] ml-6 md:ml-10 shrink-0"
                  style={{ aspectRatio: "1451 / 811", containerType: "inline-size" }}
                >
                  <img
                    src="/assets/landingpage/hamburger/hamburgermenu.svg"
                    alt="Hamburger Menu Options"
                    className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  />

                  {[
                    { text: "Home", id: "home", x: 7.16, y: 34.55, rot: -3.8, fontSize: "2.5cqw" },
                    { text: "Highlights", id: "highlights", x: 17.02, y: 49.56, rot: 270, fontSize: "3cqw" },
                    { text: "About US", id: "aboutus", x: 29.84, y: 33.56, rot: 3.3, fontSize: "3cqw" },
                    { text: "Events", id: "events", x: 42.59, y: 45.81, rot: -87, fontSize: "2.5cqw" },
                    { text: "Sponsors", id: "sponsors", x: 47.62, y: 52.81, rot: -85, fontSize: "2.5cqw" },
                    { text: "Our Team", path: "/team", x: 60.30, y: 35.43, rot: -2.5, fontSize: "3cqw" },
                    { text: "Contact Us", path: "/contact", x: 73.95, y: 42.81, rot: -90, fontSize: "2.8cqw" },
                    { text: "Merchandise", path: "/merch", x: 79.80, y: 53.80, rot: -90, fontSize: "2.6cqw" },
                    { text: "Support", path: "/support", x: 92.80, y: 61.80, rot: -97, fontSize: "2.6cqw" }
                  ].map((item, i) => (
                    <div
                      key={i}
                      onClick={() => item.path ? router.push(item.path) : scrollToSection(item.id)}
                      className="absolute text-white comic-text font-bold text-center cursor-pointer transition-colors duration-300 hover:text-yellow-400 z-10 whitespace-pre-line"
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: `translate(-50%, -50%) rotate(${item.rot}deg)`,
                        fontSize: item.fontSize,
                        lineHeight: "1.1",
                        textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                        letterSpacing: "0.05em"
                      }}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Absolute close button mimicking the thanos snap inside the menu, or just relying on backdrop click */}
          <div
            className={`absolute top-8 right-8 z-100 cursor-pointer hover:scale-110 transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={toggleMenu}
          >
            <img
              src="/assets/landingpage/hamburger/thanos-handsnap.svg"
              alt="Close Menu"
              className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg"
            />
          </div>
        </div>

      </main>

      <section id="aboutus" className="relative w-full h-screen shrink-0 snap-start">
        <AboutUs />
      </section>

      <section id="highlights" className="relative w-full min-h-screen shrink-0 snap-start">
        <HighlightsPage />
      </section>

      <section id="events" className="relative w-full h-screen shrink-0 snap-start">
        <NITTFESTEvents />
      </section>

      <section id="sponsors" className="relative w-full min-h-screen shrink-0 snap-start">
        <SponsorsPage />
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-black py-4 px-8 flex flex-col md:flex-row items-center justify-center gap-4 shrink-0 snap-end z-50 text-white font-orbitron border-t-2 border-nf-red">
        <p className="text-sm md:text-base opacity-80 tracking-widest text-center">
          MADE BY NITTFEST WEBOPS
        </p>
        <div className="hidden md:block w-px h-4 bg-white opacity-40"></div>
        <Link
          href="/contact"
          className="text-sm md:text-base text-nf-red-bright hover:text-white transition-colors duration-300 font-bold uppercase tracking-widest"
        >
          Contact Us
        </Link>
      </footer>
    </div>
  );
}
