import { useState } from "react";

export function useChat(endpoint: String, modelId: String, token: String) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getChatResponse(messages) {
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await fetch(`${endpoint}/ai_service/${modelId}`, {
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
      console.error("There was a problem with the fetch operation:", error);
      return { error: error };
    }
  }

  return {
    isLoading, 
    isError, 
    getChatResponse
  }
}