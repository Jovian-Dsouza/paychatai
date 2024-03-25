import React from "react";
import Image from "next/image";

function Message({ message, userName, aiName, userAvatar, aiAvatar }: any) {
  const isSystemMessage = message.role == "assistant";
  const displayName = !isSystemMessage ? userName : aiName;
  const avatar = !isSystemMessage ? userAvatar : aiAvatar;

  return (
    <div className={`py-4 text-white`}>
      <div className="flex space-x-4 px-10 max-w-2xl mx-auto">
        <Image
          src={avatar}
          alt=""
          className="h-6 w-6 rounded-full"
          width={32}
          height={32}
        />
        <div className="flex flex-col">
          <div className="text-md font-bold">{displayName}</div>
          <p className="text-sm whitespace-pre-line">{message.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
