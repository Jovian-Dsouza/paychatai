import { useEffect, useState } from "react";
import { TextArea } from "./TextArea";
import { SelectInput } from "./SelectInput";

export const ModelSidebar = ({ models, onSelectModel, onEnterPrompt }) => {
  const [selectedModel, setSelectedModel] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelectModel(selectedModel);
    onEnterPrompt(prompt);
  };

  useEffect(()=> {
    if(models.length != 0){
      setSelectedModel(models[0].id)
    }
  }, [models])

  return (
    <div className="sidebar h-full bg-gray-900 border-2 border-gray-500 rounded-xl p-4 flex flex-col">
      <form onSubmit={handleSubmit}>
        {/* Base Model Drop Box */}
        <SelectInput
          label="Model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e)}
          options={models}
          id="model"
        />

        {/* AI Prompt */}
        <TextArea
          label="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e)}
          placeholder="Enter AI Prompt"
          id="prompt"
        />
        <button type="submit" className="stepButtons">
          Set
        </button>
      </form>
    </div>
  );
};
