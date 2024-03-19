"use client";
import Link from "next/link";
import { menuLinks } from "@/data/constants";
import { AppContext } from "@/data/AppContext";
import { useContext, useEffect } from "react";
import Container from "./Container";
import { usePathname } from "next/navigation";

function Header() {
  const { payments } = useContext(AppContext);
  const pathname = usePathname();

  const handleLoginButton = () => {
    if (payments.isLoggedIn) {
      payments.logout();
    } else {
      payments.login();
    }
  };

  return (
    <nav className="z-10 w-full absolute">
      <Container>
        <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
          <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
            <Link
              href="/"
              aria-label="logo"
              className="flex space-x-2 items-center"
            >
              <div aria-hidden="true" className="flex space-x-1">
                <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-white"></div>
                <div className="h-6 w-2 bg-primary"></div>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                PayChatAI
              </span>
            </Link>
          </div>

          <div className="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1 absolute top-full left-0 transition-all duration-300 scale-95 origin-top lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none dark:shadow-none dark:border-gray-700">
            {(!pathname.includes("/chats")) && <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
              <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                {menuLinks.map((link, index) => (
                  <li key={index}> 
                    <Link
                      href={link.href}
                      className="block md:px-4 transition hover:text-primary"
                    >
                      <span>{link.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>}

            <div className="mt-12 lg:mt-0">
              <button
                onClick={handleLoginButton}
                className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-sm font-semibold text-white">
                  {payments.isLoggedIn ? "Log Out" : "Log In"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Header;
