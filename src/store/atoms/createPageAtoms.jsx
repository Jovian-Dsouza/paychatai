import { atom } from "recoil";

export const imageAtom = atom({
  key: "imageAtom",
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
  default: null,
});

export const priceAtom = atom({
  key: "priceAtom",
  default: null,
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
