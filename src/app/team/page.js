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

import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
    weight: ['400'],  // use only 400 for thin text
    subsets: ['latin'],
    display: 'swap',
});

// Temporary placeholder data
const teamMembers = [
    {
        name: "THARUN AADESH",
        role: "OVERALL COORDINATOR",
        image: "tharun.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "KETHAN REDDY",
        role: "CHAIRPERSON",
        image: "kethan.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "SAICHARAN",
        role: "TREASURER",
        image: "sai.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "SANJAI KUMAR",
        team: "WEBOPS",
        role: "HEAD",
        image: "sanjai.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "AMITESH",
        team: "WEBOPS",
        role: "HEAD",
        image: "amitesh.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "VARUN HARSHA",
        team: "PAIN",
        role: "HEAD",
        image: "varunH.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "RAHUL PANDIYAN",
        team: "DESIGN",
        role: "HEAD",
        image: "rahul.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "ANGELINE INIYA",
        team: "DESIGN",
        role: "HEAD",
        image: "angeline.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "SUDHARSHANARAM",
        team: "EVENTS",
        role: "HEAD",
        image: "sudh.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "ROSHINI",
        team: "EVENTS",
        role: "HEAD",
        image: "rosh.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "VENKAT",
        team: "MARKETING",
        role: "HEAD",
        image: "venkat.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "VARUN CHANDAR",
        team: "MARKETING",
        role: "HEAD",
        image: "varunC.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "ANISH NARAYANAN",
        team: "ORGANIZING COMMITTEE",
        role: "HEAD",
        image: "anish.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "DHARUNIKA SARASWATHY",
        team: "ORGANIZING COMMITTEE",
        role: "HEAD",
        image: "dhar.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "NAREN SRINIVAS",
        team: "PRNC",
        role: "HEAD",
        image: "naren.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "JEFFREY JAYAPACKIYARAJ",
        team: "PRNC",
        role: "HEAD",
        image: "jeff.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "GUGHAN SRIDHAR",
        team: "AMBIENCE",
        role: "HEAD",
        image: "gu.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
    {
        name: "NANDHINEE",
        team: "AMBIENCE",
        role: "HEAD",
        image: "nan.jpeg", // Assuming existence; fallback to silhouette via CSS if not used
        barcode: "*NITTFESTWEBOPS*"
    },
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

    const nextMember = () => {

        gsap.to(idCardRef.current, {
            x: -300,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex((prev) => (prev + 1) % teamMembers.length);

                gsap.fromTo(
                    idCardRef.current,
                    { x: 300, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4 }
                );
            }
        });

    };

    const prevMember = () => {

        gsap.to(idCardRef.current, {
            x: 300,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex((prev) =>
                    prev === 0 ? teamMembers.length - 1 : prev - 1
                );

                gsap.fromTo(
                    idCardRef.current,
                    { x: -300, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4 }
                );
            }
        });

    };


    useEffect(() => {

        const ctx = gsap.context(() => {

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Animate windows
            tl.fromTo(
                [topWindowRef.current, mainWindowRef.current, terminalWindowRef.current],
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15 }
            );

            // ID card pop
            tl.fromTo(
                idCardRef.current,
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: -4, duration: 0.7, ease: "back.out(1.5)" },
                "-=0.3"
            );

            // speech bubbles
            tl.fromTo(
                [hqBubbleRef.current, alertBubbleRef.current],
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: "back.out(2)" },
                "-=0.5"
            );

            // floating card
            gsap.to(idCardRef.current, {
                y: -6,
                duration: 3.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, pageRef);


        const handleKey = (e) => {
            if (e.key === "ArrowRight") nextMember();
            if (e.key === "ArrowLeft") prevMember();
        };

        window.addEventListener("keydown", handleKey);

        return () => {
            ctx.revert();
            window.removeEventListener("keydown", handleKey);
        };
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
                        <div className="window-title">C:/HQ/NITTFEST/Team/profile</div>
                        <a href="/" className="window-close-btn">X</a>
                    </div>
                    <div className="window-content top-window-content">
                        <span className={`source-ip ${barlowCondensed.className}`}>SOURCE: 127.0.0.1</span>
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
                        <a href="/" className="window-close-btn">X</a>
                    </div>
                    <div className="window-content main-window-content">
                        <h1 className="team-title">THE TEAM</h1>

                        <div className="slider-area">
                            <div className="arrow left-arrow" onClick={prevMember}>◀</div>

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
                                            <img src="logo_real.png" alt="NITTFEST WebOps" className="webops-logo" />
                                        </div>
                                        <div className="access-title">ACCESS CARD</div>
                                        <div className="member-info">
                                            <p>
                                                <span className="label">NAME :</span>
                                                <span className="value">{currentMember.name}</span>
                                            </p>
                                            {currentMember.team && (
                                                <p>
                                                    <span className="label">TEAM :</span>
                                                    <span className="value">{currentMember.team}</span>
                                                </p>
                                            )}
                                            <p>
                                                <span className="label">ROLE :</span>
                                                <span className="value">{currentMember.role}</span>
                                            </p>
                                        </div>
                                        <div className={`barcode ${barcodeFont.className}`}>
                                            <span>{currentMember.barcode}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="arrow right-arrow" onClick={nextMember}>▶</div>
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
                <div className={`ui-window terminal-window ${barlowCondensed.className}`} ref={terminalWindowRef}>
                    <div className="window-header terminal-header">
                        <div className="window-title">Terminal.exe</div>
                        <a href="/" className="window-close-btn">X</a>
                    </div>
                    <div className="window-content terminal-content">
                        <p>access_granted();</p>
                        <p>breach_detected();</p>
                        <p>firewall_override = true;</p>
                        <p>system_scan_active();</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
