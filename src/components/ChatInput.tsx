import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState, useRef } from "react";

export function ChatInput({ onSubmit }) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = prompt.trim();
    onSubmit(input);
    setPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form className="p-5 space-x-5 flex items-end" onSubmit={(e) => sendMessage(e)}>
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={handleInputChange}
          placeholder="Type your message here"
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled::text-gray-300 resize-none"
          style={{
            height: `${
              textareaRef.current ? textareaRef.current.scrollHeight : "auto"
            }px`,
          }}
        />
        <button
          type="submit"
          disabled={!prompt}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2
                    rounded disabled:bg-gray-300 disabled:cursor-not-allowed h-10"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
