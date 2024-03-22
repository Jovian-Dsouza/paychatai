import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState, useRecoilValue } from "recoil";
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
  baseModelProviderAtom,
  baseModelApiKeyAtom,
  maxOutputTokensAtom,
  welcomeMsgAtom,
  avatarAtom,
  SampleLinkAtom,
  tagsAtom,
  integrationAtom,
  apiDescAtom,
  minCreditsAtom,
  maxCreditsAtom,
  chargeTypeAtom,

} from "@/store/atoms/createPageAtoms";

export function useCreateModel(endpoint: String, token: String) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const name = useRecoilValue(nameAtom);
  const desc = useRecoilValue(descAtom);
  const prompt = useRecoilValue(promptAtom);
  const subscription = useRecoilValue(subscriptionAtom);
  const price = useRecoilValue(priceAtom);
  const amountOfCredits = useRecoilValue(amountOfCreditsAtom);
  const duration = useRecoilValue(durationAtom);
  const baseModel = useRecoilValue(baseModelAtom);
  const baseModelProvider = useRecoilValue(baseModelProviderAtom);
  const baseModelApiKey = useRecoilValue(baseModelApiKeyAtom)
  const welcomeMsg = useRecoilValue(welcomeMsgAtom);
  const avatar = useRecoilValue(avatarAtom);
  const sampleLink = useRecoilValue(SampleLinkAtom);
  const tags = useRecoilValue(tagsAtom);
  const integration = useRecoilValue(integrationAtom);
  const apiDesc = useRecoilValue(apiDescAtom);
  const minCredits = useRecoilValue(minCreditsAtom);
  const maxCredits = useRecoilValue(maxCreditsAtom);
  const chargeType = useRecoilValue(chargeTypeAtom);
  const maxOutputTokens = useRecoilValue(maxOutputTokensAtom);



  async function getModelList() {
    try {
      const response = await fetch(`/api/model_list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data['model_list']); // Handle the response data here
      return data['model_list']
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return []
    }
  }

  async function createModel(modelId: String, modelDid: String) {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(`/api/create_model`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_id: modelId,
          model_did: modelDid,
          base_model: baseModel,
          name: name,
          prompt: prompt,
          description: desc,
          base_model_provider: baseModelProvider,
          base_model_api: baseModelApiKey,
          max_output_tokens: maxOutputTokens,
          welcome_message: welcomeMsg,
          avatar_image_id: avatar,
          integration: integration,
          api_description: apiDesc,
          subscription_id: subscription,
          price: price,
          credits: amountOfCredits,
          duration: duration,
          charge_type: chargeType,
          max_credits: maxCredits,
          min_credits: minCredits,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("create data")
      console.log(data)
      setIsLoading(false);
      return data; // Adjust as needed based on the response structure
    } catch (error) {
      setIsError(true);
      console.error("There was a problem with the fetch operation:", error);
      return { error: error };
    }
  }

  const createModelId = () => {
    return uuidv4();
  };

  return {
    isLoading,
    isError,
    getModelList,
    createModel,
    createModelId,
  };
}