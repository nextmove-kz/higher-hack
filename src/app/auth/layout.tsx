import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Higher Hack",
  description: "HR Tech revolution",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthNavbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

const AuthNavbar = () => {
  return (
    <div className="flex justify-between p-8 m-auto">
      <Link href="/" className="hover:underline text-lg font-mono">
        Higher Hack
      </Link>
    </div>
  );
};
