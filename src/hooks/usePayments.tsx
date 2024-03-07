"use client";
import { useEffect, useState, useRef } from "react";
import { Payments } from "@nevermined-io/payments";
import { usePathname } from "next/navigation";

export function usePayments() {
  const SESSION_STORAGE_KEY = "loginState";
  const pathname = usePathname();
  const nvmRef = useRef(
    new Payments({
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`,
      environment: "appStaging",
      appId: process.env.NEXT_PUBLIC_APP_TITLE,
      version: "v1",
    })
  );
  const [payments, setPayments] = useState<Payments>(nvmRef.current);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sessionKey, setSessionKey] = useState<String>("");

  useEffect(() => {
    nvmRef.current.init();
    setPayments(nvmRef.current);

    let storedState = sessionStorage.getItem(SESSION_STORAGE_KEY);
    storedState = storedState ? JSON.parse(storedState) : false
    if(!nvmRef.current.isLoggedIn && storedState){
        login()
    }
  }, []);

  useEffect(() => {
    if (payments.isLoggedIn) {
      setIsLoggedIn(true);
      setSessionKey(payments.sessionKey);
    }
  }, [payments.isLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const login = () => {
    nvmRef.current.connect();
  };

  const logout = () => {
    nvmRef.current.logout();
    setPayments(nvmRef.current);
    setIsLoggedIn(payments.isLoggedIn);
  };

  const goToServiceDetails = (did: String) => {
    payments.getServiceDetails(did);
  };

  async function createService(
    name: String,
    description: String,
    endpoint: String,
    modelId: String,
    subscriptionDid: String
  ) {
    console.log("creating webservice");
    if (isLoggedIn) {
      console.error("CreateService: User Not logged in");
      return null;
    }
    const result = await payments.createService({
      subscriptionDid: subscriptionDid,
      name: name,
      description: description,
      price: 0n, //10000000n,   //10USDC // TODO Change this to get from user
      tokenAddress: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
      serviceChargeType: "fixed",
      authType: "oauth",
      token: process.env.NEXT_PUBLIC_BEARER_TOKEN,
      amountOfCredits: 1,
      duration: 30,
      endpoints: [{ post: `${endpoint}/ai_service/${modelId}` }],
      tags: ["llm", "gpt"],
      sampleLink: `${process.env.NEXT_PUBLIC_APP_URL}/chats/${modelId}`,
      //   integration: `Chat with this endooint here: ${endpoint}`,
    });
    console.log(result);
    return result.did;
  }

  return {
    login,
    logout,
    isLoggedIn,
    sessionKey,
    goToServiceDetails,
    createService,
  };
}
