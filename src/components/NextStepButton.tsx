import React from "react";
import { useSetRecoilState } from "recoil";
import { currentStepAtom } from "@/store/atoms/createPageAtoms";
import { Step } from "./Stepper";

function NextStepButton() {
  const setCurrentStep = useSetRecoilState(currentStepAtom);

  const handleClick = () => {
    setCurrentStep((currStep) => currStep + 1);
  };

  return (
    <Step targetSteps={[1, 2]}>
      
        <button
          type="button"
          className="stepButtons"
          onClick={handleClick}
        >
          Next
        </button>
    </Step>
  );
}

export default NextStepButton;
