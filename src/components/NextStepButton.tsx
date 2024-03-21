import React from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  currentStepAtom,
  descAtom,
  nameAtom,
  subscriptionAtom,
  showModelDetailEmptyFieldErrorAtom,
  showMonetizationEmptyFieldErrorAtom,
} from "@/store/atoms/createPageAtoms";
import { Step } from "./Stepper";

function NextStepButton() {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);
  const name = useRecoilValue(nameAtom)
  const desc = useRecoilValue(descAtom)
  const subscription = useRecoilValue(subscriptionAtom)
  const setShowModelDetailEmptyFieldError = useSetRecoilState(
    showModelDetailEmptyFieldErrorAtom
  );
  const setShowMonetizationEmptyFieldError = useSetRecoilState(
    showMonetizationEmptyFieldErrorAtom
  ); 

  const handleClick = () => {
    if(currentStep === 1 && (!name.trim() || !desc.trim())){
      setShowModelDetailEmptyFieldError(true)
      return
    }
    //TODO Make a check such that either credits or duration is not empty
    if (currentStep == 2 && !subscription.trim()){
      setShowMonetizationEmptyFieldError(true)
      return
    } 
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
