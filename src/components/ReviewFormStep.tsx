import React from "react";
import { Step } from "./Stepper";
import { useRecoilValue } from "recoil";
import {
  imageAtom,
  baseModelAtom,
  nameAtom,
  descAtom,
  promptAtom,
  subscriptionAtom,
  priceAtom,
  amountOfCreditsAtom,
  durationAtom,
  chargeTypeAtom,
  minCreditsAtom,
  maxCreditsAtom,
  imageUrlAtom,
} from "@/store/atoms/createPageAtoms";
import Image from "next/image";

function InformationBlock({ label, value, postfix = "" }) {
  if (!value) return null;
  const maxLength = 35;
  let displayValue = value;
  if (value.length > maxLength) {
    displayValue = `${value.substring(0, maxLength)}...`;
  }
  displayValue = `${displayValue} ${postfix}`;
  return (
    <div className="flex space-x-2 items-center w-[80%] justify-between">
      <label
        htmlFor={label.toLowerCase()}
        className="block text-sm font-bold text-gray-600"
      >
        {label}:
      </label>
      <div id={label.toLowerCase()} className="text-gray-300">
        {displayValue}
      </div>
    </div>
  );
}

function ImageBlock({imageUrl}) {
    if(!imageUrl){
        return null
    }
    return (
      <div className="mb-4 rounded-lg overflow-hidden shadow-md">
        <img src={imageUrl} alt="Service Image" className="w-32 h-32" />
      </div>
    );
}

// Dummy values for demonstration
const dummyValues = {
  name: "Dummy Name",
  desc: "Dummy Description",
  prompt: "Dummy Prompt",
  subscription:
    "did:nv:35f5096b7a9ac668b1f536027bf32c782e69ff682c1fa1918086d28ce147352d",
  price: "100",
  amountOfCredits: "50",
  minCredits: "50",
  maxCredits: "100",
  duration: "30",
  chargeType: "fixed",
};

export function ReviewFormStep() {
  const name = useRecoilValue(nameAtom);
  const desc = useRecoilValue(descAtom);
  const prompt = useRecoilValue(promptAtom);
  const subscription = useRecoilValue(subscriptionAtom);
  const price = useRecoilValue(priceAtom);
  const amountOfCredits = useRecoilValue(amountOfCreditsAtom);
  const duration = useRecoilValue(durationAtom);
  const chargeType = useRecoilValue(chargeTypeAtom);
  const minCredits = useRecoilValue(minCreditsAtom);
  const maxCredits = useRecoilValue(maxCreditsAtom);
  const image = useRecoilValue(imageAtom);
  const imageUrl = useRecoilValue(imageUrlAtom)
  const baseModel = useRecoilValue(baseModelAtom);
  return (
    <Step targetSteps={[3]}>
      <div className="flex flex-col justify-center items-center space-y-2 mb-4">
        {/* Image */}
        <ImageBlock imageUrl={imageUrl} />

        {/* Name */}
        <InformationBlock label="Name" value={name} />

        {/* Base Model */}
        <InformationBlock label="Base Model" value={baseModel} />

        {/* Subscription */}
        <InformationBlock label="Subscription ID" value={subscription} />

        {/* Subscription Charge Type */}
        <InformationBlock label="Subscription Type" value={chargeType} />

        {/* Price */}
        {/* <InformationBlock label="Price (USD)" value={`$price USD`} /> */}

        {chargeType === "fixed" ? (
          <InformationBlock label="Amount of Credits" value={amountOfCredits} />
        ) : (
          <div className="flex flex-col w-full justify-center items-center">
            <InformationBlock label="Min Credits" value={minCredits} />
            <InformationBlock label="Max Credits" value={maxCredits} />
          </div>
        )}

        {/* Duration */}
        <InformationBlock
          label="Duration (Days)"
          value={duration}
          postfix="days"
        />

        {/* Sample Link */}
      </div>
    </Step>
  );
}
