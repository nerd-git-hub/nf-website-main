"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import localFont from 'next/font/local';
import HighlightsPage from "./highlights/page";

const goodTimesFont = localFont({
  src: '../../public/fonts/GoodTimesRg-Regular.ttf',
  display: 'swap',
});
import AboutUs from "./aboutus/page";
import NITTFESTEvents from "./events/page";
import SponsorsPage from "./sponsors/page";

export default function Home() {
  const router = useRouter();
  const nfLogoRef = useRef(null);
  const dottedTextureRef = useRef(null);
  const bgRef = useRef(null);
  const mainScrollContainerRef = useRef(null);

  // Menu animation refs
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuContainerRef = useRef(null);
  const towerRef = useRef(null);
  const menuContentRef = useRef(null);
  const tl = useRef(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Use manual scroll restoration to prevent jump on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Reset scroll on load and temporarily lock it
    window.scrollTo(0, 0);
    document.body.style.overflowY = "hidden";

    // Unlock scroll immediately or after minor delay since background animation is removed
    document.body.style.overflowY = "auto";

    let ctx = gsap.context(() => {
      // Delay animation slightly to ensure DOM is fully laid out by Next.js router
      requestAnimationFrame(() => {
        // NF logo fades up from below
        if (nfLogoRef.current) {
          gsap.fromTo(
            nfLogoRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", delay: 0.7 }
          );
        }



        // Dotted texture fades in after logo
        if (dottedTextureRef.current) {
          gsap.fromTo(
            dottedTextureRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.0, ease: "power2.out", delay: 0.2 }
          );
        }

      });
    });

    return () => ctx.revert();
  }, [mounted]);

  useEffect(() => {
    let ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflowY = "hidden";
      tl.current.play();
    } else {
      document.body.style.overflowY = "auto";
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
    <div id="main-scroll-container" ref={mainScrollContainerRef} className="relative w-full min-h-screen overflow-x-hidden scroll-smooth">
      {/* Persisting UI Elements */}
      {/* Top Left NF Logo */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-100 cursor-pointer hover:scale-110 transition-transform duration-200">
        <img
          // src="/assets/landingpage/nf3dsvg.svg"
          src="/assets/landingpage/nf3d.png"
          alt="NF Logo"
          className="w-10 h-10 md:w-16 md:h-16 drop-shadow-lg"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      {/* Hamburger Menu Button */}
      <div
        className="absolute top-8 right-8 z-100 cursor-pointer hover:scale-110 transition-transform duration-200 pointer-events-auto"
        onClick={toggleMenu}
      >
        <img
          src="/assets/landingpage/hamburger-real.svg"
          alt="Menu"
          className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg"
        />
      </div>

      <main id="home" className="relative h-screen w-full flex flex-col items-center overflow-hidden">
        {/* 1. Full Width Landing Page Asset */}
        <div className="relative w-full h-full overflow-hidden">

          {/* Wrapper for image so it animates and scales alone */}
          {/* Wrapper for image so it animates and scales alone */}
          <div
            ref={bgRef}
            className="relative w-full h-full block transform origin-right overflow-hidden"
          >
            <img
              src="/assets/landingpage/landingpagebgfinal.png"
              alt="NITTFEST Landing Page"
              className="w-full h-full object-cover object-center md:object-bottom-right block"
            />
          </div>



          {/* Comic Characters and Date — Centered on screen */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-[5vh]">
            <div className="relative w-full max-w-[1200px] h-[50vh] flex items-center justify-center">
              <h2
                className="absolute top-[-18%] md:top-[-5%] left-1/2 transform -translate-x-1/2 font-bangers text-4xl md:text-8xl tracking-widest z-50 text-center w-full px-4"
                style={{
                  color: '#FFD700',
                  WebkitTextStroke: '2px black',
                  dropShadow: '0 4px 8px rgba(0,0,0,0.8)'
                }}
              >
                MARCH 13-15
              </h2>
            </div>
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

            {/* Avengers Tower Sliding in from Left */}
            <div
              ref={towerRef}
              className="absolute left-0 bottom-0 h-[120vh] lg:h-screen max-w-[90vw] lg:max-w-[40vw] shrink-0 z-30 pointer-events-none hidden lg:flex items-end"
            >
              <img
                src="/assets/landingpage/hamburger/Avengerstowerironman.svg"
                alt="Avengers Tower"
                className="h-full w-auto object-contain object-bottom-left drop-shadow-2xl scale-125 md:scale-100 origin-bottom-left pointer-events-auto"
              />
            </div>

            {/* Hamburger Menu Content Sliding in from the RIGHT */}
            <div
              ref={menuContentRef}
              className="relative z-20 w-full h-full overflow-x-auto overflow-y-hidden pointer-events-auto items-center flex"
            >
              {/* Added left padding so menu starts peeking out behind tower but can scroll fully left */}
              <div className="min-w-max pr-[5vw] lg:pr-[5vw] pl-2 lg:pl-[25vw] h-full flex items-center">
                <div
                  className="relative w-[230vw] md:w-[120vw] lg:w-auto lg:h-[85vh] ml-2 lg:ml-10 shrink-0"
                  style={{ aspectRatio: "1451 / 811", containerType: "inline-size" }}
                >
                  <img
                    src="/assets/landingpage/hamburger/hamburgermenu.svg"
                    alt="Hamburger Menu Options"
                    className="absolute inset-0 w-full h-full object-cover drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  />

                  {[
                    { text: "Home", id: "home", x: 7.16, y: 34.55, rot: -3.8, fontSize: "clamp(18px, 3cqw, 30px)" },
                    { text: "Highlights", id: "highlights", x: 17.02, y: 49.56, rot: 270, fontSize: "clamp(18px, 3.5cqw, 35px)" },
                    { text: "About US", id: "aboutus", x: 29.84, y: 33.56, rot: 3.3, fontSize: "clamp(18px, 3.5cqw, 35px)" },
                    { text: "Events", id: "events", x: 42.59, y: 45.81, rot: -87, fontSize: "clamp(18px, 3cqw, 30px)" },
                    { text: "Sponsors", id: "sponsors", x: 47.62, y: 52.81, rot: -85, fontSize: "clamp(18px, 3cqw, 30px)" },
                    { text: "Our Team", path: "/team", x: 60.30, y: 35.43, rot: -2.5, fontSize: "clamp(22px, 3.5cqw, 35px)" },
                    { text: "Contact Us", path: "/contact", x: 73.95, y: 42.81, rot: -90, fontSize: "clamp(18px, 3.2cqw, 32px)" },
                    { text: "Merchandise", path: "/merch", x: 79.80, y: 53.80, rot: -90, fontSize: "clamp(18px, 3cqw, 30px)" },
                    { text: "Support", path: "/support", x: 92.80, y: 61.80, rot: -97, fontSize: "clamp(18px, 3cqw, 30px)" }
                  ].map((item, i) => (
                    <div
                      key={i}
                      onClick={() => item.path ? (window.location.href = item.path) : scrollToSection(item.id)}
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

          {/* Absolute close button inside the menu */}
          <div
            className={`absolute top-8 right-8 z-100 cursor-pointer hover:scale-110 transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={toggleMenu}
          >
            <img
              src="/assets/landingpage/hamburger-real.svg"
              alt="Close Menu"
              className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg brightness-0 invert"
            />
          </div>
        </div>

      </main>

      <section id="aboutus" className="relative w-full min-h-screen">
        <AboutUs />
      </section>

      <section id="highlights" className="relative w-full min-h-screen">
        <HighlightsPage />
      </section>

      <section id="events" className="relative w-full min-h-screen">
        <NITTFESTEvents />
      </section>

      <section id="sponsors" className="relative w-full min-h-screen">
        <SponsorsPage />
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-black py-4 px-8 flex flex-col md:flex-row items-center justify-center gap-4 z-50 text-white font-orbitron border-t-2 border-nf-red">
        <p className="text-sm md:text-base opacity-80 tracking-widest text-center">
          MADE BY NITTFEST WEBOPS
        </p>
        <div className="hidden md:block w-px h-4 bg-white opacity-40"></div>
        <a
          href="/contact"
          className="text-sm md:text-base text-nf-red-bright hover:text-white transition-colors duration-300 font-bold uppercase tracking-widest"
        >
          Contact Us
        </a>
      </footer>
    </div>
  );
}
