"use client";

import Message from "./Message";
import { LoadingIndicator } from "./LoadingIndicator";

export function Chat({ messages, isLoading, isError, isLoggedIn }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 && !isLoading && !isError && isLoggedIn && (
        <div className="text-gray-500 text-center py-8 max-w-xl mx-auto">
          The chat is currently empty. No messages are available at the moment.
          Please feel free to start the conversation, and I'll be here to assist
          you promptly.
        </div>
      )}
      {messages.length === 0 && !isLoading && !isError && !isLoggedIn && (
        <div className="text-gray-500 text-center py-8 max-w-xl mx-auto">
          You need to log in to continue the conversation. Please log in to
          access the chat and interact with me.
        </div>
      )}
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
      {isError && <div>Error loading messages</div>}
    </div>
  );
}
