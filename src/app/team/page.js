"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Libre_Barcode_39 } from "next/font/google";
import "./team.css";

const barcodeFont = Libre_Barcode_39({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

// Temporary placeholder data
const teamMembers = [
    {
        name: "SANJAI",
        role: "HEAD",
        image: "/sanjai.png", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    }
];

export default function Team() {
    const pageRef = useRef(null);
    const hqBubbleRef = useRef(null);
    const alertBubbleRef = useRef(null);
    const topWindowRef = useRef(null);
    const mainWindowRef = useRef(null);
    const terminalWindowRef = useRef(null);
    const idCardRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentMember = teamMembers[currentIndex];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Animate windows staggering in
            tl.fromTo(
                [topWindowRef.current, mainWindowRef.current, terminalWindowRef.current],
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15 }
            );

            // ID Card pops in
            tl.fromTo(
                idCardRef.current,
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: -4, duration: 0.7, ease: "back.out(1.5)" },
                "-=0.3"
            );

            // Speech bubbles pop
            tl.fromTo(
                [hqBubbleRef.current, alertBubbleRef.current],
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: "back.out(2)" },
                "-=0.5"
            );

            // Subtle float on ID card
            gsap.to(idCardRef.current, {
                y: -10,
                rotation: -2,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1
            });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="team-page" ref={pageRef}>

            {/* Background with gradients is handled in CSS */}

            {/* Floating HQ Bubble */}
            <div className="hq-bubble" ref={hqBubbleRef}>
                <span>BACK AT HQ...CLASSIFIED INFORMATION HAS BEEN LEAKED!</span>
            </div>

            {/* Floating Alert Bubble */}
            <div className="alert-bubble" ref={alertBubbleRef}>
                <span>UNAUTHORIZED<br />ACCESS<br />CONFIRMED.</span>
            </div>

            {/* Floating Websops Alert Bubble */}
            <div className="webops-bubble">
                <span>ALL UNITS<br />REPORT TO<br />WEBOPS!</span>
            </div>

            <div className="windows-container">
                {/* Top small window */}
                <div className="ui-window top-window" ref={topWindowRef}>
                    <div className="window-header">
                        <div className="window-controls">
                            <span className="control close"></span>
                            <span className="control minimize"></span>
                            <span className="control expand"></span>
                        </div>
                        <div className="window-title">C:/HQ/WebOps/Team/profile</div>
                        <div className="window-close-btn">X</div>
                    </div>
                    <div className="window-content top-window-content">
                        <span className="source-ip">SOURCE: 127.0.0.1</span>
                        <span className="encryption-status">ENCRYPTION ACTIVE</span>
                    </div>
                </div>

                {/* Main Team Window */}
                <div className="ui-window main-window" ref={mainWindowRef}>
                    <div className="window-header">
                        <div className="window-controls">
                            <span className="control close"></span>
                            <span className="control minimize"></span>
                            <span className="control expand"></span>
                        </div>
                        <div className="window-title">CLASSIFIED.EXE</div>
                        <div className="window-close-btn">X</div>
                    </div>
                    <div className="window-content main-window-content">
                        <h1 className="team-title">THE TEAM</h1>

                        <div className="slider-area">
                            <div className="arrow left-arrow">◀</div>

                            {/* The ID Card */}
                            <div className="id-card" ref={idCardRef}>
                                <div className="id-card-inner">
                                    <div className="id-photo-section">
                                        <div className="photo-placeholder">
                                            {/* Placeholder for member image */}
                                            {currentMember.image && currentMember.image !== "" ? (
                                                <img src={currentMember.image} alt={currentMember.name} />
                                            ) : (
                                                <div className="person-silhouette"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="id-details-section">
                                        <div className="id-header">
                                            <img src="/webops-logo.png" alt="NITTFEST WebOps" className="webops-logo" />
                                        </div>
                                        <div className="access-title">ACCESS CARD</div>
                                        <div className="member-info">
                                            <p>NAME : {currentMember.name}</p>
                                            <p>ROLE : {currentMember.role}</p>
                                        </div>
                                        <div className={`barcode ${barcodeFont.className}`}>
                                            <span>{currentMember.barcode}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="arrow right-arrow">▶</div>
                        </div>

                        {/* Server Status Footer */}
                        <div className="server-status">
                            <div className="scanning-logs">
                                <p>&gt; scanning node...</p>
                                <p>&gt; 01010111 01000101 01000010</p>
                                <p>&gt; 01001111 01010000 01010011</p>
                            </div>
                            <div className="clearance-level">
                                <div className="restricted-bar">
                                    <div className="block"></div>
                                    <span>RESTRICTED</span>
                                    <div className="block"></div>
                                    <span>SERVER</span>
                                </div>
                                <p>CLEARANCE: LEVEL 5</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terminal Window */}
                <div className="ui-window terminal-window" ref={terminalWindowRef}>
                    <div className="window-header terminal-header">
                        <div className="window-title">terminal.exe</div>
                        <div className="window-close-btn">X</div>
                    </div>
                    <div className="window-content terminal-content">
                        <p>access_granted();</p>
                        <p>breach_detected();</p>
                        <p>firewall_override = true;</p>
                        <p>system_scan_active();</p>
                    </div>
                </div>
            </div>

            <div className="desktop-indicator">Desktop - 11</div>
        </div>
    );
}
