"use client";

import React from "react";

// A reusable marquee row component that takes a single row image path and scrolls it horizontally
const MarqueeRow = ({ imageSrc, reverse = false, speed = "40s", heightClass = "h-24 md:h-32 lg:h-40" }) => {
    return (
        <div className="relative flex overflow-hidden w-full group py-0 -my-2 md:-my-4">
            <div
                className={`flex whitespace-nowrap min-w-full ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
                style={{ animationDuration: speed }}
            >
                {/* Render the full row SVG twice to create the seamless infinite scroll effect */}
                {[1, 2].map((_, index) => (
                    <div key={index} className={`shrink-0 px-2 lg:px-4 ${heightClass} relative flex items-center justify-center`}>
                        <img
                            src={imageSrc}
                            alt={`Sponsor row panel ${index}`}
                            className="h-full w-auto max-w-none object-contain drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function SponsorsPage() {
    return (
        <div
            className="min-h-screen w-full bg-cover bg-center overflow-hidden flex flex-col justify-center gap-0 py-10"
            style={{ backgroundImage: "url('/assets/sponsor/sponsorsbg.jpg')" }}
        >
            <div className="relative z-10 w-full flex flex-col justify-center items-center gap-0 -ml-4 pt-12 md:pt-20">

                {/* Overlapping Yellow/Blackbar */}
                <div className="absolute top-0 left-0 z-30 ml-4 md:ml-8 mt-6 md:mt-10 w-[95%] max-w-[550px] flex items-center justify-center">
                    <img
                        src="/assets/sponsor/yellowblackbar.svg"
                        alt="Banner Background"
                        className="w-full h-auto object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                    />
                    <p className="absolute font-anime-ace text-[#0a0a0a] text-sm sm:text-base md:text-xl lg:text-2xl tracking-wide whitespace-nowrap pl-2 pb-1 md:pb-2">
                        NITTFEST IS POWERED BY HEROES...
                    </p>
                </div>

                {/* Rows 1 & 2 */}
                <div className="w-full flex flex-col items-center justify-center -space-y-4 md:-space-y-8 mt-4 md:mt-8">
                    <MarqueeRow imageSrc="/assets/sponsor/row1.svg" speed="30s" heightClass="h-28 md:h-40 lg:h-52" />
                    <MarqueeRow imageSrc="/assets/sponsor/row2.svg" reverse={true} speed="35s" heightClass="h-40 md:h-52 lg:h-72" />
                </div>

                {/* The massive central 2026 SPONSORS row (Static) */}
                <div className="relative w-full max-w-7xl px-4 py-0 my-0 flex flex-col md:flex-row justify-center items-center z-20 gap-0 -rotate-1 -mt-2 md:-mt-4 mb-0 md:-mb-2">
                    {/* 2026 graphic - reduced size */}
                    <img
                        src="/assets/sponsor/assetzip/2026.svg"
                        alt="2026"
                        className="w-[50%] md:w-[40%] max-w-[350px] object-contain drop-shadow-2xl"
                    />
                    {/* SPONSORS graphic - reduced size */}
                    <img
                        src="/assets/sponsor/assetzip/sponsors.svg"
                        alt="Sponsors Assemble"
                        className="w-[95%] md:w-[75%] max-w-[700px] object-contain drop-shadow-2xl -mt-7 md:-mt-4"
                    />
                </div>

                {/* Rows 3 & 4 */}
                <div className="w-full flex flex-col items-center justify-center -space-y-4 md:-space-y-8">
                    <MarqueeRow imageSrc="/assets/sponsor/row3.svg" speed="25s" heightClass="h-36 md:h-48 lg:h-64" />
                    <MarqueeRow imageSrc="/assets/sponsor/row4.svg" reverse={true} speed="40s" heightClass="h-40 md:h-52 lg:h-72" />
                </div>

            </div>
        </div>
    );
}