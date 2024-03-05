"use client";
import { useEffect, useRef } from "react";
import Message from "./Message";

export function Chat({ messages }) {
  const chatRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div style={{ float: "left", clear: "both" }} ref={chatRef}></div>
    </div>
  );
}
