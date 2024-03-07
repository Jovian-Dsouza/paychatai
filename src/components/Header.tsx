"use client";
import Image from "next/image";
import Link from "next/link";
import { menuLinks } from "@/data/constants";
import { AppContext } from "@/data/AppContext";
import { useContext, useEffect } from "react";

function Header() {
  const { payments } = useContext(AppContext);

  const handleLoginButton = () => {
    if (payments.isLoggedIn) {
      payments.logout();
    } else {
      payments.login();
    }
  };

  return (
    <div className="bg-black sticky top-0 z-30 flex justify-center items-center px-20 py-3">
      <div className="flex justify-between items-center w-full text-sm max-w-6xl">
        <Link
          href="/"
          className={`flex items-center space-x-2 font-bold text-lg text-white`}
        >
          {/* <Image src="/logo.svg" alt="NVM Chat Logo" width={40} height={40} /> */}
          <div className="text-2xl">NVM Chat</div>
        </Link>
        <div className="flex justify-center items-center space-x-6">
          {menuLinks.map((link, index) => (
            <Link
              href={link.href}
              className={`text-white font-semibold underline-offset-8 hover:underline`}
              key={index}
            >
              {link.text}
            </Link>
          ))}
          <button
            onClick={handleLoginButton}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {payments.isLoggedIn ? "Log Out" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
