import { Step } from "./Stepper";
import React, { useState, useContext } from "react";
import { AppContext } from "@/data/AppContext";

function CreateButton() {
  const { payments } = useContext(AppContext);
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
    <Step targetSteps={[3]}>
      <div className="relative inline-block">
        <button
          type="submit"
          // disabled={!payments.isLoggedIn}
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
    </Step>
  );
}

export default CreateButton;
