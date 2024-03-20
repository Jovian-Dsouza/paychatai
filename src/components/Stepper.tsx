import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentStepAtom } from "@/store/atoms/createPageAtoms";

export function Stepper() {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom)

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="mx-auto">
      <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center rounded-lg shadow-sm text-gray-400 sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        <li
          className={`flex items-center ${
            currentStep >= 1 ? "text-blue-600 dark:text-blue-500" : ""
          }`}
          onClick={() => handleStepChange(1)}
        >
          <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
            1
          </span>
          Model Info
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 lg:ms-8 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center ${
            currentStep >= 2 ? "text-blue-600 dark:text-blue-500" : ""
          }`}
          onClick={() => handleStepChange(2)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
              currentStep >= 2
                ? "border-blue-500"
                : "dark:border-gray-400 border-gray-500"
            }`}
          >
            2
          </span>
          Monetization
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 lg:ms-8 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center ${
            currentStep >= 3 ? "text-blue-600 dark:text-blue-500" : ""
          }`}
          onClick={() => handleStepChange(3)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
              currentStep >= 3
                ? "border-blue-500"
                : "dark:border-gray-400 border-gray-500"
            }`}
          >
            3
          </span>
          Review
        </li>
      </ol>
    </div>
  );
}

export function Step({ targetSteps, children }) {
  const currentStep = useRecoilValue(currentStepAtom);
  if (targetSteps.includes(currentStep)) {
    return children;
  } else {
    return null; // If the current step does not match any of the target steps, return null
  }
}