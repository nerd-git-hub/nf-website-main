"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function Home() {
  const router = useRouter();
  const nittfestTextRef = useRef(null);
  const nfLogoRef = useRef(null);
  const dottedTextureRef = useRef(null);
  const bgRef = useRef(null);
  const blackbarRef = useRef(null);

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
      // 3. Lightning and rain effects from top-right -> bottom left
      .fromTo(
        ".lightning-effect",
        { x: "50vw", y: "-50vh", opacity: 0 },
        { x: 0, y: 0, opacity: 0.8, duration: 0.6, stagger: 0.1, ease: "power2.out" },
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
      document.body.style.overflow = "hidden";
      tl.current.play();
    } else {
      document.body.style.overflow = "auto";
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  // Toggle function for the hamburger icon
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

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
      <div
        className="fixed top-8 right-8 z-100 cursor-pointer hover:scale-110 transition-transform duration-200"
        onClick={toggleMenu}
      >
        <img
          src="/assets/landingpage/hamburger/thanos-handsnap.svg"
          alt="Menu"
          className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg"
        />
      </div>

      {/* Full Screen Menu Overlay */}
      <div
        ref={menuContainerRef}
        className="fixed inset-0 z-100 opacity-0 pointer-events-none w-full h-full overflow-hidden flex items-center justify-start"
      >
        {/* Red background image replacing the black backdrop */}
        <img
          src="/assets/landingpage/hamburger/redbgham.jpeg"
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
          className="lightning-effect absolute top-2 right-6 w-[8vw] max-w-[1800px] h-auto object-contain z-10 pointer-events-none drop-shadow-2xl opacity-0"
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
                  { text: "Home", path: "/", x: 7.16, y: 34.55, rot: -3.8, fontSize: "2.5cqw" },
                  { text: "Highlights", path: "/highlights", x: 17.02, y: 49.56, rot: 270, fontSize: "3cqw" },
                  { text: "About US", path: "/about", x: 29.84, y: 33.56, rot: 3.3, fontSize: "3cqw" },
                  { text: "Events", path: "/events", x: 42.59, y: 45.81, rot: -87, fontSize: "2.5cqw" },
                  { text: "Sponsors", path: "/sponsors", x: 47.62, y: 52.81, rot: -85, fontSize: "2.5cqw" },
                  { text: "Our Team", path: "/team", x: 60.30, y: 35.43, rot: -2.5, fontSize: "3cqw" },
                  { text: "Contact Us", path: "/contact", x: 73.95, y: 42.81, rot: -90, fontSize: "2.8cqw" },
                  { text: "Merchandise", path: "/merchandise", x: 79.80, y: 53.80, rot: -90, fontSize: "2.6cqw" }
                ].map((item, i) => (
                  <div
                    key={i}
                    onClick={() => router.push(item.path)}
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
  );
}
