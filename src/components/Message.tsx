import React from 'react'
import Image from "next/image";

function Message({ message }: any) {

  const isSystemMessage = message.role == "assistant"

  return (
    <div className={`py-5 text-white ${isSystemMessage && "bg-[#282e49]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <Image
          src={!isSystemMessage ? "/user_logo.png" : "/chat_logo.png"}
          alt=""
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
        />
        <p className="pt-1 text-sm whitespace-pre-line">{message.content}</p>
      </div>
    </div>
  );
}

export default Message