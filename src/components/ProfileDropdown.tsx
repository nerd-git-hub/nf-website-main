"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Package, LogOut } from "lucide-react";

export default function ProfileDropdown() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!user) return null;

    // Get the first initial of the user's name
    const getInitial = () => {
        if (user.name && user.name.length > 0) {
            return user.name.charAt(0).toUpperCase();
        }
        return "U"; // Default letter if no name
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="User menu"
                className="w-12 h-12 rounded-full border-4 border-black bg-yellow-400 hover:bg-yellow-300 text-black font-bangers text-3xl flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
            >
                <span style={{ paddingTop: "4px" }}>{getInitial()}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border-4 border-black shadow-[6px_6px_0_0_#000] z-50 flex flex-col">
                    <Link
                        href="/orders"
                        onClick={() => setIsOpen(false)}
                        className="w-full text-left px-4 py-3 border-b-4 border-black font-bangers text-xl tracking-wider text-black bg-white hover:bg-gray-100 flex items-center gap-2 transition-colors"
                    >
                        <Package size={20} strokeWidth={3} />
                        ORDERS
                    </Link>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            logout();
                        }}
                        className="w-full text-left px-4 py-3 font-bangers text-xl tracking-wider text-white bg-red-500 hover:bg-red-400 flex items-center gap-2 transition-colors"
                    >
                        <LogOut size={20} strokeWidth={3} className="text-white" />
                        LOGOUT
                    </button>
                </div>
            )}
        </div>
    );
}
