"use client";
import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { Chat } from "@/components/Chat";
import Image from "next/image";
import { useEffect, useRef, useContext } from "react";
import { AppContext } from "@/data/AppContext";
import { useChat } from "@/hooks/useChat";

export default function ChatPage({ params }: { params: { modelId: string } }) {
  const { payments } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const { isLoading, isError, getChatResponse, modelDid } = useChat(
    process.env.NEXT_PUBLIC_BACKEND_URL,
    params.modelId,
    process.env.NEXT_PUBLIC_BEARER_TOKEN
  );

  function addMessage(input, isSystemMessage) {
    setMessages((prevMessages) => [
      ...prevMessages,
      getMessageObject(input, isSystemMessage),
    ]);
  }

  function getMessageObject(input, isSystemMessage) {
    return {
      role: isSystemMessage ? "assistant" : "user",
      content: input,
    };
  }

  const chatRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);


  async function handleChatInput(input) {
    console.log("Chat input: " + input);
    addMessage(input, false);
    try {
      const severMessage = await getChatResponse([
        ...messages,
        getMessageObject(input, false),
      ]);
      addMessage(severMessage, true);
    } catch (error) {
      console.error("Error handling chat input:", error);
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <Chat
          messages={messages}
          isLoading={isLoading}
          isError={isError}
          isLoggedIn={payments.isLoggedIn}
        />
      </div>
      <div className="sticky bottom-0 w-full">
        <ChatInput
          onSubmit={handleChatInput}
          isLoading={isLoading}
          isLoggedIn={payments.isLoggedIn}
        />
        <div style={{ float: "left", clear: "both" }} ref={chatRef}></div>
      </div>
    </div>
  );
}
