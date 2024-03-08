"use client";
import { useCreateModel } from "@/hooks/useCreateModel";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "@/data/AppContext";
import { TransactionModal } from "@/components/TransactionalModel";
import { useRouter } from "next/navigation";

const Create = () => {
  const router = useRouter();
  const [aiModels, setAiModels] = useState([]);
  const [showModal , setShowModal] = useState(false);
  const [modelDid, setModelDid] = useState(null)
  const { getModelList, isError: isCreateModelError, createModel} = useCreateModel(
    process.env.NEXT_PUBLIC_BACKEND_URL,
    process.env.NEXT_PUBLIC_BEARER_TOKEN
  );
  const { payments } = useContext(AppContext);

  const [image, setImage] = useState(null);
  const [modelName, setModelName] = useState("");
  const [aiName, setAiName] = useState("");
  const [aiDescription, setAiDescription] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [subscriptionDid, setSubsciptionDid] = useState("");
  const [price, setPrice] = useState("0");
  const [amountOfCredits, setAmountOfCredits] = useState("5");
  const [duration, setDuration] = useState("30");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleCreate = async (e) => {
    setShowModal(true)
    e.preventDefault();
    console.log("Model Name:", modelName);
    console.log("AI Name:", aiName);
    console.log("AI Description:", aiDescription);
    console.log("AI Prompt:", aiPrompt);
    console.log("Subscription ID: ", subscriptionDid);
    const createResult = await createModel(modelName, aiPrompt)
    if (isCreateModelError) {
      console.error("Create Model error");
      setShowModal(false);
      return;
    }
    const modelId = createResult["model_id"];
    console.log("Model ID", modelId)
    const modelDidTemp = await payments.createService(
      aiName,
      aiDescription,
      process.env.NEXT_PUBLIC_BACKEND_URL,
      modelId,
      subscriptionDid,
      BigInt(price) * BigInt(10**6),
      parseInt(amountOfCredits),
      parseInt(duration)
    );
    console.log("ModelDid: ", modelDidTemp);
    setModelDid(modelDidTemp)
    // payments.goToServiceDetails(modelDid)
    
  };

  useEffect(() => {
    (async () => {
      const aiModelsTmp = await getModelList();
      setAiModels(aiModelsTmp)
      if(aiModelsTmp.length > 0){
        setModelName(aiModelsTmp[0].id)
      }
    })();
  }, []);

  const [showTooltip, setShowTooltip] = useState(false);
  const handleHover = () => {
    if (!payments.isLoggedIn) {
      setShowTooltip(true);
    }
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="flex flex-col mx-auto p-4">
      <TransactionModal show={showModal} showLoading={!modelDid}>
        {modelDid ? (
          <div>
            <h1 className="text-3xl text-center font-extrabold">
              AI Model Created 🎉
            </h1>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => {
                  payments.goToServiceDetails(modelDid);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Check Model
              </button>
              <button
                onClick={() => {
                  router.push(`/chats/${modelDid}`);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Chat Now
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setModelDid(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl text-center font-extrabold">
              Creating your AI 🤖
            </h1>
            <p className="text-gray-600">
              Please wait while your AI is being created...
            </p>
          </div>
        )}
      </TransactionModal>

      <h1 className="text-3xl font-bold underline mx-auto mb-5 text-gray-400">
        Create AI App
      </h1>
      <form onSubmit={handleCreate} className="max-w-lg w-full mx-auto">
        {/* Upload Image */}
        {/* <div className="mb-4">
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
        </div> */}

        <div className="flex justify-between items-center space-x-4">
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
                <option key={index} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
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

        {/* Subscription */}
        <div className="mb-4">
          <label
            htmlFor="theme"
            className="block text-sm font-bold text-gray-100"
          >
            Subscription
          </label>
          <input
            type="text"
            value={subscriptionDid}
            onChange={(e) => setSubsciptionDid(e.target.value)}
            placeholder="Enter Subscription ID"
            className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-between items-center space-x-4">
          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="theme"
              className="block text-sm font-bold text-gray-100"
            >
              Price (USD)
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Price"
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Credits */}
          <div className="mb-4">
            <label
              htmlFor="theme"
              className="block text-sm font-bold text-gray-100"
            >
              Credits
            </label>
            <input
              type="text"
              value={amountOfCredits}
              onChange={(e) => setAmountOfCredits(e.target.value)}
              placeholder="Enter Credits"
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Duration */}
          <div className="mb-4">
            <label
              htmlFor="theme"
              className="block text-sm font-bold text-gray-100"
            >
              Duration (Days)
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter Duration"
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Add more form fields for other inputs */}
        <div className="relative inline-block">
          <button
            type="submit"
            disabled={!payments.isLoggedIn}
            className={`py-2 px-4 rounded font-bold ${
              payments.isLoggedIn
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-400 cursor-not-allowed text-slate-800"
            } transition duration-300 ease-in-out`}
            onMouseOver={handleHover}
            onMouseOut={handleMouseLeave}
          >
            Create app
          </button>
          {showTooltip && (
            <span className="absolute top-0 left-full w-full ml-2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md">
              Please login to create app
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Create;
