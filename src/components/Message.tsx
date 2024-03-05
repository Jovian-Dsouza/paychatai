import React from 'react'

function Message({ message }: any) {

  const isChatGPT = message.id % 2 == 0

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.img} alt="" className="h-8 w-8 rounded-full" />
        <p className="pt-1 text-sm whitespace-pre-line">{message.data}</p>
      </div>
    </div>
  );
}

export default Message