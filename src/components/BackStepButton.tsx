import React from "react";
import { useSetRecoilState } from "recoil";
import { currentStepAtom } from "@/store/atoms/createPageAtoms";
import { Step } from "./Stepper";

function BackStepButton() {
  const setCurrentStep = useSetRecoilState(currentStepAtom);

  const handleClick = () => {
    setCurrentStep((currStep) => currStep - 1);
  };

  return (
    <Step targetSteps={[2, 3]}>
      
        <button
          type="button"
          className="stepButtons"
          onClick={handleClick}
        >
          Back
        </button>
    </Step>
  );
}

export default BackStepButton;
