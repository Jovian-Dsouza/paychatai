import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState, useRef } from "react";

export function ChatInput({ onSubmit, isLoading, isLoggedIn }) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    // Shift + Enter -> New line
    // Enter -> Make request
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage(e);
    }
  };

  const submitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = prompt.trim();
    if (isLoading) {
      return;
    }
    if (!input && input === "") {
      return;
    }
    onSubmit(input);
    setPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <div className="flex justify-center items-center mt-2 mb-4 mx-2">
      <div className="bg-gray-700/50 text-gray-400 max-w-2xl w-full rounded-2xl text-sm">
        <form
          className="px-5 py-3 space-x-5 flex items-end"
          onSubmit={(e) => submitMessage(e)}
        >
          <textarea
            rows={1}
            ref={textareaRef}
            value={prompt}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
            disabled={!prompt || isLoading || !isLoggedIn}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2
                    rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-3 w-3 -rotate-45" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
