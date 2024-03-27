import React from 'react'
import { useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import { Chat } from './Chat';

function ChatContainer({
  messages,
  setMessages,
  isLoading,
  isError,
  isLoggedIn,
  handleChatInput,
  demoPrompts,
}) {
  const chatRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex-1 overflow-y-scroll no-scrollbar">
        <Chat
          messages={messages}
          isLoading={isLoading}
          isError={isError}
          isLoggedIn={isLoggedIn}
          setMessages={setMessages}
          demoPrompts={demoPrompts}
        />
        <div style={{ float: "left", clear: "both" }} ref={chatRef}></div>
      </div>
      <div className="sticky bottom-0 w-full">
        <ChatInput
          onSubmit={handleChatInput}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
}

export default ChatContainer