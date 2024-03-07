"use client";

import { createContext } from "react";
import { usePayments } from "@/app/hooks/usePayments";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const payments = usePayments()

  return (
    <AppContext.Provider value={{ payments }}>
      {children}
    </AppContext.Provider>
  );
}
