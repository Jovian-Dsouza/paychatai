"use client";
import { useState } from "react";
import { useEffect, useRef, useContext } from "react";
import { AppContext } from "@/data/AppContext";
import { useChat } from "@/hooks/useChat";
import ChatContainer from "@/components/ChatContainer";

export default function ChatPage({ params }: { params: { modelId: string } }) {
  const { payments } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const { isLoading, isError, getChatResponse, modelDid } = useChat(
    params.modelId
  );
  const [demoPrompts, setDemoPrompts] = useState([]);

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
      // const severMessage = input
      addMessage(severMessage, true);
    } catch (error) {
      console.error("Error handling chat input:", error);
    }
  }

  return (
    <main className="h-screen pt-20">
      <div className="flex flex-col h-full">
        <ChatContainer
          messages={messages}
          setMessages={setMessages}
          isLoading={isLoading}
          isError={isError}
          isLoggedIn={payments.isLoggedIn}
          handleChatInput={handleChatInput}
          demoPrompts={demoPrompts}
        />
      </div>
    </main>
  );
}
