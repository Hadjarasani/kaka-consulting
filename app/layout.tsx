import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import RecaptchaProvider from "@/components/providers/RecaptchaProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KAKA CONSULTING | Services & Conseil en Informatique",
  description: "KAKA CONSULTING accompagne les entreprises dans leur transformation digitale : développement web, logiciels, data et intelligence artificielle.",
  keywords: [
    "KAKA CONSULTING",
    "conseil informatique",
    "développement web",
    "développement logiciel",
    "data",
    "intelligence artificielle",
    "transformation digitale",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <RecaptchaProvider>
            {children}
          </RecaptchaProvider>
        </main>
      </body>
    </html>
  );
}
