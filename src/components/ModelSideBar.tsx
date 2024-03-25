import { TextArea } from "./TextArea";
import { SelectInput } from "./SelectInput";

export const ModelSidebar = ({ models, baseModel, prompt, setBaseModel, setPrompt }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="sidebar h-full bg-gray-900 border-2 border-gray-500 rounded-xl p-4 flex flex-col">
      <form onSubmit={handleSubmit}>
        {/* Base Model Drop Box */}
        <SelectInput
          label="Model"
          value={baseModel}
          onChange={(e) => setBaseModel(e)}
          options={models}
          id="model"
        />

        {/* AI Prompt */}
        <TextArea
          label="Task Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e)}
          placeholder="Enter Task Prompt"
          id="prompt"
          rows={20}
        />
      </form>
    </div>
  );
};
