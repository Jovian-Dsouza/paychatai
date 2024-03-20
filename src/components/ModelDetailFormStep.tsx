import React from 'react'
import { Step } from '@/components/Stepper'
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  imageAtom,
  baseModelAtom,
  nameAtom,
  descAtom,
  promptAtom,
} from "@/store/atoms/createPageAtoms";
import { TextInput } from './TextInput';
import { SelectInput } from './SelectInput';

function ModelDetailFormStep({ aiModels }) {
  const setImage = useSetRecoilState(imageAtom);
  const [baseModel, setBaseModel] = useRecoilState(baseModelAtom);
  const [name, setName] = useRecoilState(nameAtom);
  const [desc, setDesc] = useRecoilState(descAtom);
  const [prompt, setPrompt] = useRecoilState(promptAtom);
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <Step targetSteps={[1]}>
      <div className="flex justify-between items-center space-x-4">
        {/* Name */}
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter AI Name"
          id="name"
        />

        {/* Base Model Drop Box */}
        <SelectInput
          label="Model"
          value={baseModel}
          onChange={(e) => setBaseModel(e.target.value)}
          options={aiModels}
          id="model"
        />
      </div>

      {/* AI Description */}
      <div className="mb-4">
        <label
          htmlFor="aiDescription"
          className="block text-sm font-bold text-gray-100"
        >
          Description
        </label>
        <textarea
          id="aiDescription"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter AI Description"
          rows={4} // Set the number of visible rows
          className="createInput"
        />
      </div>

      {/* AI Prompt */}
      <div className="mb-4">
        <label
          htmlFor="aiPrompt"
          className="block text-sm font-bold text-gray-100"
        >
          Prompt
        </label>
        <textarea
          id="aiPrompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter AI Prompt"
          rows={4} // Set the number of visible rows
          className="createInput"
        />
      </div>

      {/* Upload Image */}
      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-bold text-gray-100"
          htmlFor="image_upload"
        >
          Upload Image (optional)
        </label>
        <input
          className="block w-full text-sm file:py-1 file:px-2 file:border-0 font-semibold text-gray-700 border border-gray-300 rounded-lg file:rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="image_upload_help"
          id="image_upload"
          type="file"
          onChange={handleImageUpload}
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="image_upload_help"
        >
          SVG, PNG, JPG or JPEG.
        </p>
      </div>
    </Step>
  );
}

export default ModelDetailFormStep