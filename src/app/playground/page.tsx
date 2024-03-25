"use client";
import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { Chat } from "@/components/Chat";
import { useEffect, useRef, useContext } from "react";
import { AppContext } from "@/data/AppContext";
import { usePlayground } from "@/hooks/usePlayground";
import { ModelSidebar } from "@/components/ModelSideBar";


export default function PlaygroundPage() {
  const { payments } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [baseModel, setBaseModel] = useState("");
  const [prompt, setPrompt] = useState("");
  const { isLoading, isError, getChatResponse } = usePlayground(
    baseModel,
    prompt
  );

  async function getModelList() {
    try {
      const response = await fetch(`/api/model_list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data['model_list']); // Handle the response data here
      return data["model_list"];
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return [];
    }
  }

  function addMessage(input, isSystemMessage) {
    setMessages((prevMessages) => [
      ...prevMessages,
      getMessageObject(input, isSystemMessage),
    ]);
  }

  function getMessageObject(input, isSystemMessage) {
    return {
      role: isSystemMessage ? "assistant" : "user",
      content: input,
    };
  }

  const chatRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    (async () => {
      const modelListTmp = await getModelList();
      setBaseModel(modelListTmp[0].id);
      setModelList(modelListTmp);
    })();
  }, []);

  useEffect(() => {
    console.log("Using base model: ", baseModel);
  }, [baseModel]);

  async function handleChatInput(input) {
    console.log("Chat input: " + input);
    addMessage(input, false);
    try {
      const severMessage = await getChatResponse([
        ...messages,
        getMessageObject(input, false),
      ]);
      // const severMessage = input
      addMessage(severMessage, true);
    } catch (error) {
      console.error("Error handling chat input:", error);
    }
  }

  return (
    <main className="h-screen pt-20">
      <div className="flex h-full">
        <div className="flex flex-col h-full w-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <Chat
              messages={messages}
              isLoading={isLoading}
              isError={isError}
              isLoggedIn={payments.isLoggedIn}
            />
          </div>
          <div className="sticky bottom-0 w-full">
            <ChatInput
              onSubmit={handleChatInput}
              isLoading={isLoading}
              isLoggedIn={payments.isLoggedIn}
            />
            <div style={{ float: "left", clear: "both" }} ref={chatRef}></div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden sm:block w-1/4 ">
          <ModelSidebar
            models={modelList}
            onSelectModel={setBaseModel}
            onEnterPrompt={setPrompt}
          />
        </div>
      </div>
    </main>
  );
}
