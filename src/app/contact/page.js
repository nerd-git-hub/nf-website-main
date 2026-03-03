"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "./contact.css";

export default function Contact() {
    const pageRef = useRef(null);
    const speechBubbleRef = useRef(null);
    const cardRef = useRef(null);
    const itachiRef = useRef(null);
    const sasukeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Itachi walks in from left
            tl.fromTo(
                itachiRef.current,
                { x: -300, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                }
            );

            // Sasuke walks in from right
            tl.fromTo(
                sasukeRef.current,
                { x: 300, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                },
                "-=0.7"
            );

            // Speech bubble pops in with elastic effect
            tl.fromTo(
                speechBubbleRef.current,
                { scale: 0, opacity: 0, rotate: -15 },
                {
                    scale: 1,
                    opacity: 1,
                    rotate: -2,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.5)",
                },
                "-=0.5"
            );

            // Contact card slides in and fades
            tl.fromTo(
                cardRef.current,
                { opacity: 0, y: 50, scale: 0.92 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "back.out(1.4)",
                },
                "-=0.4"
            );

            // Subtle floating on the card
            gsap.to(cardRef.current, {
                y: -4,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 2.5,
            });

            // Subtle pulse on speech bubble
            gsap.to(speechBubbleRef.current, {
                scale: 1.03,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 3,
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="contact-page" ref={pageRef}>
            {/* Manga background */}
            <div className="contact-bg">
                <Image
                    src="/manga-bg.png"
                    alt="Manga panel background"
                    fill
                    priority
                />
            </div>

            {/* Itachi character - left side */}
            <div className="contact-character-left" ref={itachiRef}>
                <Image
                    src="/ITACHI_SASUKE-removebg-preview 3.png"
                    alt="Itachi"
                    width={600}
                    height={900}
                    priority
                />
            </div>

            {/* Sasuke character - right side */}
            <div className="contact-character-right" ref={sasukeRef}>
                <Image
                    src="/ITACHI_SASUKE-removebg-preview 3 (1).png"
                    alt="Sasuke"
                    width={500}
                    height={900}
                    priority
                />
            </div>

            {/* Speech bubble */}
            <div className="contact-speech-bubble" ref={speechBubbleRef}>
                <span>&quot;A FEST WRITTEN IN BOLD PANELS&quot;</span>
            </div>

            {/* Contact card */}
            <div className="contact-card" ref={cardRef}>
                <h2>CONTACT US:</h2>
                <div className="contact-info">
                    <p>9374837438 - BLAH BLAH</p>
                    <p>7497397598 - BLUE BLUE</p>
                </div>
                <div className="contact-email-section">
                    <h3>EMAIL US:</h3>
                    <p>NITTFEST@GMAIL.COM</p>
                </div>
            </div>
        </div>
    );
}
