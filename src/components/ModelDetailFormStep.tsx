import React from 'react'
import { Step } from '@/components/Stepper'
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  imageAtom,
  baseModelAtom,
  nameAtom,
  descAtom,
  promptAtom,
  imageUrlAtom,
  showModelDetailEmptyFieldErrorAtom,
} from "@/store/atoms/createPageAtoms";
import { TextInput } from './TextInput';
import { TextArea } from './TextArea';
import { SelectInput } from './SelectInput';

function ModelDetailFormStep({ aiModels }) {
  const setImage = useSetRecoilState(imageAtom);
  const setImageUrl = useSetRecoilState(imageUrlAtom)
  const [baseModel, setBaseModel] = useRecoilState(baseModelAtom);
  const [name, setName] = useRecoilState(nameAtom);
  const [desc, setDesc] = useRecoilState(descAtom);
  const [prompt, setPrompt] = useRecoilState(promptAtom);
  const showEmptyFieldError = useRecoilValue(showModelDetailEmptyFieldErrorAtom)

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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
          showError={showEmptyFieldError}
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
      <TextArea
        label="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Enter AI Description"
        id="desc"
        showError={showEmptyFieldError}
      />

      {/* AI Prompt */}
      <TextArea
        label="Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter AI Prompt"
        id="prompt"
      />

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
          accept="image/*"
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