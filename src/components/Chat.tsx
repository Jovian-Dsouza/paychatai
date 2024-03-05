"use client";

import Message from "./Message";

export function Chat({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
