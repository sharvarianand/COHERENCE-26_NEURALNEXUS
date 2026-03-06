import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import GSAPProvider from "@/providers/GSAPProvider";
import LenisProvider from "@/providers/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rosey — Smart Enough to Reach. Human Enough to Close.",
  description:
    "AI-powered outreach automation that researches leads, writes personalized messages, and hands off only when they're ready to close.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable}`}>
        <GSAPProvider>
          <LenisProvider>{children}</LenisProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
