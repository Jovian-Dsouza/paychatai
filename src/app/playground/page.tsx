"use client";
import { useState } from "react";
import { useEffect } from "react";
import { usePlayground } from "@/hooks/usePlayground";
import { ModelSidebar } from "@/components/ModelSideBar";
import ChatContainer from "@/components/ChatContainer";

export default function PlaygroundPage() {
  const [messages, setMessages] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [baseModel, setBaseModel] = useState("");
  const [prompt, setPrompt] = useState("");
  const { isLoading, isError, getChatResponse } = usePlayground(
    baseModel,
    prompt
  );
  const [demoPrompts, setDemoPrompts] = useState([]);

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

  useEffect(() => {
    (async () => {
      const modelListTmp = await getModelList();
      setBaseModel(modelListTmp[0].id);
      setModelList(modelListTmp);
    })();
  }, []);

  // useEffect(() => {
  //   console.log("Using base model: ", baseModel);
  // }, [baseModel]);

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
        <ChatContainer
          messages={messages}
          setMessages={setMessages}
          isLoading={isLoading}
          isError={isError}
          isLoggedIn={true}
          handleChatInput={handleChatInput}
          demoPrompts={demoPrompts}
        />
        {/* Sidebar */}
        <div className="hidden sm:block w-1/4 pb-4 pr-4 ">
          <ModelSidebar
            models={modelList}
            baseModel={baseModel}
            prompt={prompt}
            setBaseModel={setBaseModel}
            setPrompt={setPrompt}
          />
        </div>
      </div>
    </main>
  );
}
