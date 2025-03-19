import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import Navbar from "@/_components/Navbar";
import { auth } from "@/server/auth";
import { Role } from "@/lib/members";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const sesion = await auth();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        {sesion?.user.role === Role.SUPER_ADMIN && <Navbar />}
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
