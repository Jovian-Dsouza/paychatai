import { atom, useResetRecoilState } from "recoil";

export const imageAtom = atom({
  key: "imageAtom",
  default: null,
});

export const imageUrlAtom = atom({
  key: "imageUrlAtom",
  default: null,
});

export const baseModelProviderAtom = atom({
  key: "baseModelProviderAtom",
  default: "openrouter"
});

export const baseModelApiKeyAtom = atom({
  key: "baseModelApiKeyAtom",
  default: null
});

export const baseModelAtom = atom({
  key: "baseModelAtom",
  default: "",
});

export const nameAtom = atom({
  key: "nameAtom",
  default: "",
});

export const descAtom = atom({
  key: "descAtom",
  default: "",
});

export const promptAtom = atom({
  key: "promptAtom",
  default: "",
});

export const displayNameAtom = atom({
  key: "displayNameAtom",
  default: null,
});

export const maxOutputTokensAtom  = atom({
  key: "maxOutputTokensAtom",
  default: null,
});

export const welcomeMsgAtom = atom({
  key: "welcomeMsgAtom",
  default: null,
});

export const avatarAtom = atom({
  key: "avatarAtom",
  default: null,
});

export const SampleLinkAtom = atom({
  key: "SampleLinkAtom",
  default: null,
});

export const tagsAtom = atom({
  key: "tagsAtom",
  default: [],
});

export const integrationAtom = atom({
  key: "integrationAtom",
  default: null,
});

export const apiDescAtom = atom({
  key: "apiDescAtom",
  default: null,
});

export const subscriptionAtom = atom({
  key: "subscriptionAtom",
  default: "",
});

export const priceAtom = atom({
  key: "priceAtom",
  default: 0,
});

export const amountOfCreditsAtom = atom({
  key: "amountOfCreditsAtom",
  default: null,
});

export const durationAtom = atom({
  key: "durationAtom",
  default: null,
});

export const currentStepAtom = atom({
  key: "currentStepAtom",
  default: 1,
});

export const chargeTypeAtom = atom({
  key: "chargeTypeAtom",
  default: "fixed",
});

export const minCreditsAtom = atom({
  key: "minCreditsAtom",
  default: null,
});

export const maxCreditsAtom = atom({
  key: "maxCreditsAtom",
  default: null,
});

export const showModelDetailEmptyFieldErrorAtom = atom({
  key: "showModelDetailEmptyFieldErrorAtom",
  default: false
});

export const showMonetizationEmptyFieldErrorAtom = atom({
  key: "showMonetizationEmptyFieldErrorAtom",
  default: false,
});

export function useResetCreatePageAtomsToDefault() {
  const resetImageAtom = useResetRecoilState(imageAtom);
  const resetImageUrlAtom = useResetRecoilState(imageUrlAtom);
  const resetBaseModelProviderAtom = useResetRecoilState(baseModelProviderAtom);
  const resetBaseModelApiKeyAtom = useResetRecoilState(baseModelApiKeyAtom);
  const resetBaseModelAtom = useResetRecoilState(baseModelAtom);
  const resetNameAtom = useResetRecoilState(nameAtom);
  const resetDescAtom = useResetRecoilState(descAtom);
  const resetPromptAtom = useResetRecoilState(promptAtom);
  const resetDisplayNameAtom = useResetRecoilState(displayNameAtom);
  const resetMaxOutputTokensAtom = useResetRecoilState(maxOutputTokensAtom);
  const resetWelcomeMsgAtom = useResetRecoilState(welcomeMsgAtom);
  const resetAvatarAtom = useResetRecoilState(avatarAtom);
  const resetSampleLinkAtom = useResetRecoilState(SampleLinkAtom);
  const resetTagsAtom = useResetRecoilState(tagsAtom);
  const resetIntegrationAtom = useResetRecoilState(integrationAtom);
  const resetApiDescAtom = useResetRecoilState(apiDescAtom);
  const resetSubscriptionAtom = useResetRecoilState(subscriptionAtom);
  const resetPriceAtom = useResetRecoilState(priceAtom);
  const resetAmountOfCreditsAtom = useResetRecoilState(amountOfCreditsAtom);
  const resetDurationAtom = useResetRecoilState(durationAtom);
  const resetCurrentStepAtom = useResetRecoilState(currentStepAtom);
  const resetChargeTypeAtom = useResetRecoilState(chargeTypeAtom);
  const resetMinCreditsAtom = useResetRecoilState(minCreditsAtom);
  const resetMaxCreditsAtom = useResetRecoilState(maxCreditsAtom);

  const resetAllAtoms = () => {
    resetImageAtom();
    resetImageUrlAtom();
    resetBaseModelProviderAtom();
    resetBaseModelApiKeyAtom();
    // resetBaseModelAtom();
    resetNameAtom();
    resetDescAtom();
    resetPromptAtom();
    resetDisplayNameAtom();
    resetMaxOutputTokensAtom();
    resetWelcomeMsgAtom();
    resetAvatarAtom();
    resetSampleLinkAtom();
    resetTagsAtom();
    resetIntegrationAtom();
    resetApiDescAtom();
    resetSubscriptionAtom();
    resetPriceAtom();
    resetAmountOfCreditsAtom();
    resetDurationAtom();
    resetCurrentStepAtom();
    // resetChargeTypeAtom();
    resetMinCreditsAtom();
    resetMaxCreditsAtom();
  };

  return {
    resetAllAtoms
  };

}