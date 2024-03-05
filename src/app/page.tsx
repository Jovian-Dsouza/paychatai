"use client";
import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { Chat } from "@/components/Chat";
import Image from "next/image";
import { getChatResponse } from "@/services/dummy_server";

export default function Home() {
  const [messages, setMessages] = useState([]);

  function addMessage(input, isSystemMessage) {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length,
        data: input,
        img: !isSystemMessage ? "user_logo.png" : "icp_logo.jpeg",
      },
    ]);
  }

  async function handleChatInput(input) {
    console.log("Chat input: " + input);
    addMessage(input, false);
    const severMessage = await getChatResponse(messages);
    addMessage(severMessage, true);
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <Chat messages={messages} />
      </div>
      <div className="sticky bottom-0 w-full">
        <ChatInput onSubmit={handleChatInput} />
      </div>
    </div>
  );
}
