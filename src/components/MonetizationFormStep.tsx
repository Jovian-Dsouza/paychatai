import React from "react";
import { Step } from "./Stepper";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  subscriptionAtom,
  priceAtom,
  amountOfCreditsAtom,
  durationAtom,
  chargeTypeAtom,
  minCreditsAtom,
  maxCreditsAtom,
  showMonetizationEmptyFieldErrorAtom,
} from "@/store/atoms/createPageAtoms";
import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";

function MonetizationFormStep() {
  const serviceChargeTypeList = ["fixed", "dynamic"].map((item) => ({
    id: item,
    name: item,
  }));
  const [subscription, setSubscription] = useRecoilState(subscriptionAtom);
  const [price, setPrice] = useRecoilState(priceAtom);
  const [amountOfCredits, setAmountOfCredits] =
    useRecoilState(amountOfCreditsAtom);
  const [minCredits, setMinCredits] = useRecoilState(minCreditsAtom);
  const [maxCredits, setMaxCredits] = useRecoilState(maxCreditsAtom);
  const [duration, setDuration] = useRecoilState(durationAtom);
  const [chargeType, setChargeType] = useRecoilState(chargeTypeAtom);
  const showEmptyFieldError = useRecoilValue(
    showMonetizationEmptyFieldErrorAtom
  );

  return (
    <Step targetSteps={[2]}>
      {/* <div className="font-bold text-xl text-white  mb-4">Monetization 💸</div> */}

      <div className="font-bold text-lg mb-2">
        <span className="text-indigo-600">Credit based:</span>{" "}
        <span className="text-sm text-gray-600">
          (Number of Credits Used per Request)
        </span>
      </div>

      <div className="flex items-center justify-between space-x-4">
        <SelectInput
          label="Charge Type"
          value={chargeType}
          onChange={(e) => setChargeType(e)}
          options={serviceChargeTypeList}
          id="charge_type"
        />
        {chargeType === "fixed" ? (
          <TextInput
            label="Credits"
            value={amountOfCredits}
            onChange={(e) => setAmountOfCredits(e)}
            placeholder="Enter Credits"
            id="credits"
            type="int"
          />
        ) : (
          <div className="flex items-center justify-between space-x-4">
            <TextInput
              label="Min Credits"
              value={minCredits}
              onChange={(e) => setMinCredits(e)}
              placeholder="Min Credits"
              id="min_credits"
              type="int"
            />
            <TextInput
              label="Max Credits"
              value={maxCredits}
              onChange={(e) => setMaxCredits(e)}
              placeholder="Max Credits"
              id="max_credits"
              type="int"
            />
          </div>
        )}
      </div>

      <div className="pt-2"></div>

      {/* Time Based */}
      <div className="font-bold text-lg text-indigo-600 mb-1">Time Based</div>
      {/* Duration */}
      <TextInput
        label="Duration (Days)"
        value={duration}
        onChange={(e) => setDuration(e)}
        placeholder="Enter Duration"
        id="duration"
        type="int"
      />

      <div className="pt-2"></div>

      <div className="font-bold text-lg text-indigo-600 mb-1">Subscription</div>
      {/* <div className="flex items-center mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Create New Subscription
        </label>
      </div> */}

      {/* Subscription */}
      <TextInput
        label="Subscription ID"
        value={subscription}
        onChange={(e) => setSubscription(e)}
        placeholder="Enter Subscription ID"
        id="subscription"
        showError={showEmptyFieldError}
      />

      <div className="flex justify-between items-center space-x-4">
        {/* Price */}
        {/* <TextInput
          label="Price (USD)"
          value={price}
          onChange={(e) => setPrice(e)}
          placeholder="Enter Price"
          id="price"
        /> */}
      </div>
    </Step>
  );
}

export default MonetizationFormStep;
