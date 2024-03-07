"use client";
import { useEffect, useState, useRef, useMemo } from "react";
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
  const isLoggedIn = useMemo(()=> nvmRef.current.isLoggedIn, [nvmRef.current.isLoggedIn]);
  const [sessionKey, setSessionKey] = useState<String>("");

  useEffect(() => {
    nvmRef.current.init();

    let storedState = sessionStorage.getItem(SESSION_STORAGE_KEY);
    storedState = storedState ? JSON.parse(storedState) : false
    if(!nvmRef.current.isLoggedIn && storedState){
        login()
    }
  }, []);

  useEffect(() => {
    if (nvmRef.current.isLoggedIn) {
      setSessionKey(nvmRef.current.sessionKey);
    }
    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify(nvmRef.current.isLoggedIn)
    );
  }, [nvmRef.current.isLoggedIn]);

  const login = () => {
    nvmRef.current.connect();
  };

  const logout = () => {
    nvmRef.current.logout();
  };

  const goToServiceDetails = (did: string) => {
    nvmRef.current.getServiceDetails(did);
  };

  async function createService(
    name: string,
    description: string,
    endpoint: string,
    modelId: string,
    subscriptionDid: string,
    price: BigInt,
    amountOfCredits: number,
    duration: number,
  ) {
    console.log("creating webservice");
    if (!isLoggedIn) {
      console.error("CreateService: User Not logged in");
      login()
    }
    try {
      const result = await nvmRef.current.createService({
        subscriptionDid: subscriptionDid,
        name: name,
        description: description,
        price: price, //10000000n,   //10USDC // TODO Change this to get from user
        tokenAddress: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
        serviceChargeType: "fixed",
        authType: "oauth",
        token: process.env.NEXT_PUBLIC_BEARER_TOKEN,
        amountOfCredits: amountOfCredits,
        duration: duration,
        endpoints: [{ post: `${endpoint}/ai_service/${modelId}` }],
        tags: ["llm"],
        sampleLink: `${process.env.NEXT_PUBLIC_APP_URL}/chats/${modelId}`,
        integration: `To integrate this API, send a POST request to https:<Nevermined_Proxy_url>/ai_service/${modelId} with a JSON object containing a "messages" array. \nInclude an Authorization header with your JWT token.`,
      });
      console.log(result);
      return result.did;
    } catch (error) {
      console.error(error)
      return null;
    }
    
  }

  return {
    nvmRef,
    login,
    logout,
    isLoggedIn,
    sessionKey,
    goToServiceDetails,
    createService,
  };
}
