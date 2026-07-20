import type { Metadata } from "next";
import { Inter_Tight, Roboto_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-aspekta",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADR Prediction — Integrated Biosciences",
  description: "Upload a prescription PDF and get an adverse drug reaction risk report.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen bg-abyssal-ink font-aspekta antialiased">{children}</body>
    </html>
  );
}
