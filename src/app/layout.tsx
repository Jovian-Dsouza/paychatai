import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/components/SideBar";
import { ClientProvider } from "@/components/ClientProvider";
import Header from "@/components/Header";
import { AppContextProvider } from "@/data/AppContext";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PayChatAI",
  description: "PayChatAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <ClientProvider />
        <AppContextProvider>
          <div className="flex flex-col justify-between min-h-screen bg-gray-900">
            <div className="flex flex-col">
              <Header />
              {children}
            </div>
            <Footer />
          </div>
        </AppContextProvider>
      </body>
    </html>
  );
}
