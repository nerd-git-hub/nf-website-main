import { Bangers, Inter } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "NITTFEST 2025 | Comikaze",
  description: "The official website for NITTFEST 2025 - Unleash your inner hero.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bangers.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

