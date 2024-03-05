import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/components/SideBar";
import { ClientProvider } from "@/components/ClientProvider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nevermined Chat",
  description: "Nevermined Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <ClientProvider />
          <Header />
          <div className="flex-1 bg-[#343541]">{children}</div>
        </div>
      </body>
    </html>
  );
}
