"use client";

import Message from "./Message";
import { LoadingIndicator } from "./LoadingIndicator";

export function Chat({ messages, isLoading, isError }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
      {isError && <div>Error loading messages</div>}
    </div>
  );
}
