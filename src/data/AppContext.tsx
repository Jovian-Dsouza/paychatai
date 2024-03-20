"use client";

import { createContext } from "react";
import { usePayments } from "@/hooks/usePayments";
import { RecoilRoot } from "recoil";


export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const payments = usePayments()

  return (
    <RecoilRoot>
      <AppContext.Provider value={{ payments }}>{children}</AppContext.Provider>
    </RecoilRoot>
  );
}
