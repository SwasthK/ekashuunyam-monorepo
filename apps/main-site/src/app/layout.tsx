import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import LenisScrollProvider from "@/lib/lenis-provider";
import { ScrollProvider } from "@/lib/scroll-context";
import { NavigationBar } from "./_components/navigation-bar/nav";

export const metadata: Metadata = {
  title: "Ekashunyam 2.0",
  description: "Ekashunyam 2.0 is an inter collegiate fest organised by IT club, department of Computer Science,SDM College Ujire.",
  icons: [{ rel: "icon", url: "/f1.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          {/* Disable Navbar for now */}
          <NavigationBar />
          <ScrollProvider>
            <LenisScrollProvider>
              {children}
            </LenisScrollProvider>
          </ScrollProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
