"use client";
import { useCreateModel } from "@/hooks/useCreateModel";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "@/data/AppContext";
import { TransactionModal } from "@/components/TransactionalModel";
import { useRouter } from "next/navigation";
import { Stepper } from "@/components/Stepper";
import { useRecoilState, useRecoilValue } from "recoil";
import ModelDetailFormStep from "@/components/ModelDetailFormStep";
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
  useResetCreatePageAtomsToDefault,
} from "@/store/atoms/createPageAtoms";
import MonetizationFormStep from "@/components/MonetizationFormStep";
import NextStepButton from "@/components/NextStepButton";
import BackStepButton from "@/components/BackStepButton";
import CreateButton from "@/components/CreateButton";
import { ReviewFormStep } from "@/components/ReviewFormStep";

const Create = () => {
  const router = useRouter();
  const [aiModels, setAiModels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modelDid, setModelDid] = useState(null);
  const {
    getModelList,
    isError: isCreateModelError,
    createModel,
    createModelId,
  } = useCreateModel(
    process.env.NEXT_PUBLIC_BACKEND_URL,
    process.env.NEXT_PUBLIC_BEARER_TOKEN
  );
  const { payments } = useContext(AppContext);

  const image = useRecoilValue(imageAtom);
  // const baseModel = useRecoilValue(baseModelAtom);
  const [baseModel, setBaseModel] = useRecoilState(baseModelAtom);
  const name = useRecoilValue(nameAtom);
  const desc = useRecoilValue(descAtom);
  const prompt = useRecoilValue(promptAtom);
  const subscription = useRecoilValue(subscriptionAtom);
  const price = useRecoilValue(priceAtom);
  const amountOfCredits = useRecoilValue(amountOfCreditsAtom);
  const duration = useRecoilValue(durationAtom);
  const { resetAllAtoms } = useResetCreatePageAtomsToDefault();

  const handleCreate = async (e) => {
    setShowModal(true);
    e.preventDefault();

    const modelId = createModelId();
    // Create Service on Nevermind
    const modelDidTemp = await payments.createService(
      name,
      desc,
      process.env.NEXT_PUBLIC_BACKEND_URL,
      modelId,
      subscription,
      BigInt(price) * BigInt(10 ** 6),
      amountOfCredits,
      duration
    );

    // Store  in DB
    const createResult = await createModel(modelId, modelDidTemp);
    if (isCreateModelError) {
      console.error("Create Model error");
      setShowModal(false);
      return;
    }

    console.log("ModelDid: ", modelDidTemp);
    setModelDid(modelDidTemp);
    resetAllAtoms();
  };

  useEffect(() => {
    (async () => {
      const aiModelsTmp = await getModelList();
      setAiModels(aiModelsTmp);
      if (aiModelsTmp.length > 0) {
        setBaseModel(aiModelsTmp[0].id);
      }
    })();
  }, []);

  return (
    <div className="w-full min-h-full">
      <div className="flex flex-col mx-auto p-4 mt-20 h-full">
        <TransactionModal show={showModal} showLoading={!modelDid}>
          {modelDid ? (
            <div>
              <h1 className="text-3xl text-center font-extrabold">
                AI Model Created 🎉
              </h1>
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  onClick={() => {
                    payments.goToServiceDetails(modelDid);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Check Model
                </button>
                <button
                  onClick={() => {
                    router.push(`/chats/${modelDid}`);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                  Chat Now
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setModelDid(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl text-center font-extrabold">
                Creating your AI 🤖
              </h1>
              <p className="text-gray-600">
                Please wait while your AI is being created...
              </p>
            </div>
          )}
        </TransactionModal>

        <h1 className="text-3xl font-bold underline mx-auto mb-5 text-gray-400">
          🛠️👩‍💻 Create your Chat AI 🤖
        </h1>

        <Stepper />
        <form onSubmit={handleCreate} className="max-w-lg w-full mx-auto">
          {/* Todo: remove aimodels as parameter */}
          <ModelDetailFormStep aiModels={aiModels} />
          <MonetizationFormStep />
          <ReviewFormStep />

          <div className="flex justify-between">
            <BackStepButton />
            <NextStepButton />
            <CreateButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
