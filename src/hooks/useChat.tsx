import { AppContext } from "@/data/AppContext";
import { useContext, useEffect, useState } from "react";

export function useChat(modelId: String) {
  const { payments } = useContext(AppContext);
  const [serviceToken, setServiceToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modelDid, setModelDid] = useState();

  useEffect(() => {
    (async () => {
      if (payments.isLoggedIn && modelDid) {
        const result = await payments.getServiceToken(modelDid);
        setServiceToken(result.token);
        // console.log("Proxy URL ", result.token["neverminedProxyUri"]);
        // console.log(
        //   "Access Token: ",
        //   result.token["accessToken"],
        // );
      }
    })();
  }, [payments.isLoggedIn, modelDid]);

  async function getChatResponse(messages) {
    setIsLoading(true);
    setIsError(false);
    const endpoint = `${serviceToken["neverminedProxyUri"]}/api/chat/${modelId}`;
    const token = serviceToken["accessToken"];

    // const token = "1234"
    // const endpoint = `${process.env.NEXT_PUBLIC_APP_URL}/api/chat/${modelId}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIsLoading(false);
      return data["result"];
    } catch (error) {
      setIsError(true);
      throw new Error("There was a problem with the fetch operation:", error);
    }
  }

  useEffect(() => {
    if (modelId) {
      getModelDid();
    }
  }, [modelId]);

  async function getModelDid() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/get_model_did/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model_id: modelId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setModelDid(data["model_did"]);
      console.log("Model Did", data['model_did']);
      // return data["model_did"];
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // return { error: error };
    }
  }

  return {
    isLoading,
    isError,
    getChatResponse,
    modelDid,
  };
}
