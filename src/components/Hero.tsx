'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col font-comic">
            {/* Background Image (Absolute) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/backdrop.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Top Banner (Sticky at top, natural flow) */}
            <div className="sticky top-0 w-full z-50 pointer-events-none">
                <img
                    src="/colaborate_1.png"
                    alt="Collaborate with us"
                    className="w-full h-auto block"
                />
            </div>

            {/* Main Content Area (Fills remaining space, centered) */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative w-[300px] lg:w-[600px] h-[80px] lg:h-[150px]"
                >
                    <img
                        src="/nittfest.png"
                        alt="NITTFEST"
                        className="w-full h-full object-contain filter drop-shadow-[4px_4px_0_#000]"
                    />
                </motion.div>

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 1.5 }}
                    className="relative w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] drop-shadow-2xl"
                >
                    <img
                        src="/logo.png"
                        alt="NF Logo"
                        className="w-full h-full object-contain filter drop-shadow-[5px_5px_10px_rgba(0,0,0,0.5)]"
                    />
                </motion.div>
            </div>


        </div>
    );
}
