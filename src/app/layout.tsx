import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import ContextProvider from "@/config/Web3Provider";
import AppKitModal from "@/components/common/AppKitModal";
import ConsoleFilter from "@/components/common/ConsoleFilter";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Next.js 15 headers API compatibility
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Zylo Vortex - Power Up Platform",
  description: "Join Zylo Vortex and power up your earnings. Stake ZYLO tokens, unlock Power Up units, and earn rewards through our revolutionary staking platform. Start your journey to financial freedom today.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieHeader = headers().get("cookie") ?? "";
  const headersData = await headers();
  const cookies = headersData.get("cookie");
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConsoleFilter />
        <ContextProvider cookies={cookies}>
          {children}
        </ContextProvider>
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
        />
        <div id="w3m-modal" />
        <AppKitModal />
      </body>
    </html>
  );
}
