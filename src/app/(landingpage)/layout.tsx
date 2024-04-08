import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link Tree",
  description:
    "Linktree lets you create a landing page with everything you are, from your Instagram, TikTok, Twitter, website, store, videos, music, podcast, events and more. Join 40M+ people using Linktree to share, sell and grow your audience with one simple link in bio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="mx-auto max-w-7xl p-6">{children}</main>
      </body>
    </html>
  );
}
