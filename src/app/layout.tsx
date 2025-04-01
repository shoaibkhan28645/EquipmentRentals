// app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Footer from "@/components/layout/Footer";

import "./globals.css";
import Navbar from "./../components/layout/TempNavbar";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BACKHOE - Construction Equipment Rentals",
  description:
    "Rent or buy high-quality construction equipment for your projects. Excavators, loaders, lifts and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
