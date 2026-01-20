import type { Metadata } from "next";
import { Bangers, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NF PORTFOLIO | Nittfest",
  description: "Official Portfolio for NF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bangers.variable} ${roboto.variable} antialiased bg-comic-red`}>
        {children}
      </body>
    </html>
  );
}
