"use client";
import React, { useState } from "react";

const Create = () => {
  const aiModels = ["GPT-4 (OpenAI)", "Another Model", "Yet Another Model"]; // List of AI models

  const [image, setImage] = useState(null);
  const [theme, setTheme] = useState("");
  const [modelName, setModelName] = useState(aiModels[0]);
  const [aiName, setAiName] = useState("");
  const [aiDescription, setAiDescription] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [disablePayments, setDisablePayments] = useState(false);
  const [price, setPrice] = useState(0);
  const [numChats, setNumChats] = useState(0);
  const [freeChats, setFreeChats] = useState(0);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Model Name:", modelName);
    console.log("AI Name:", aiName);
    console.log("AI Description:", aiDescription);
    console.log("AI Prompt:", aiPrompt);
  };

  return (
    <div className="flex flex-col mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold underline mx-auto mb-6 text-gray-400">Create AI App</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        {/* Upload Image */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-bold text-gray-100"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            className="text-white mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* AI model drop box */}
        <div className="mb-4">
          <label
            htmlFor="aiModel"
            className="block text-sm font-bold text-gray-100"
          >
            AI Model
          </label>
          <select
            id="aiModel"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {aiModels.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* AI Name */}
        <div className="mb-4">
          <label
            htmlFor="theme"
            className="block text-sm font-bold text-gray-100"
          >
            AI Name
          </label>
          <input
            type="text"
            value={aiName}
            onChange={(e) => setAiName(e.target.value)}
            className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* AI Description */}
        <div className="mb-4">
          <label
            htmlFor="aiDescription"
            className="block text-sm font-bold text-gray-100"
          >
            AI Description
          </label>
          <textarea
            id="aiDescription"
            value={aiDescription}
            onChange={(e) => setAiDescription(e.target.value)}
            placeholder="Enter AI Description"
            rows={4} // Set the number of visible rows
            className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* AI Prompt */}
        <div className="mb-4">
          <label
            htmlFor="aiPrompt"
            className="block text-sm font-bold text-gray-100"
          >
            AI Prompt
          </label>
          <textarea
            id="aiPrompt"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Enter AI Prompt"
            rows={4} // Set the number of visible rows
            className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Add more form fields for other inputs */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Create app
        </button>
      </form>
    </div>
  );
};

export default Create;
