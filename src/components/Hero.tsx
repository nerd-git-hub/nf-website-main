'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden font-comic bg-black">
            {/* Background Image (Fixed, covers full screen) */}
            <div className="fixed inset-0 w-full h-full z-0">
                <img
                    src="/backdrop.png"
                    alt="Background"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Top Banner (Fixed at top) */}
            <div className="fixed top-0 left-0 right-0 w-full z-50 pointer-events-none">
                <img
                    src="/colaborate_1.png"
                    alt="Collaborate with us"
                    className="w-full h-auto block max-w-full"
                />
            </div>

            {/* Main Content Area (Centered in viewport) */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative w-[200px] xs:w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] h-[55px] xs:h-[65px] sm:h-[80px] md:h-[110px] lg:h-[130px] xl:h-[150px]"
                >
                    <img
                        src="/nittfest.png"
                        alt="NITTFEST"
                        className="w-full h-full object-contain filter drop-shadow-[2px_2px_0_#000] sm:drop-shadow-[3px_3px_0_#000] md:drop-shadow-[4px_4px_0_#000]"
                    />
                </motion.div>

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 1.5 }}
                    className="relative w-[200px] h-[200px] xs:w-[250px] xs:h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] drop-shadow-lg sm:drop-shadow-xl md:drop-shadow-2xl"
                >
                    <img
                        src="/logo.png"
                        alt="NF Logo"
                        className="w-full h-full object-contain filter drop-shadow-[3px_3px_6px_rgba(0,0,0,0.5)] sm:drop-shadow-[4px_4px_8px_rgba(0,0,0,0.5)] md:drop-shadow-[5px_5px_10px_rgba(0,0,0,0.5)]"
                    />
                </motion.div>
            </div>
        </div>
    );
}
