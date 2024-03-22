import OpenAI from "openai";

export const openRouter = new OpenAI({
    baseURL: process.env.OPENROUTER_BASE_URL,
    apiKey: process.env.OPENROUTER_API_KEY,
});


export function listModels() {
  const modelData = {
    "Nous: Capybara 7B (free)": "nousresearch/nous-capybara-7b:free",
    "Mistral 7B Instruct (free)": "mistralai/mistral-7b-instruct:free",
    "MythoMist 7B (free)": "gryphe/mythomist-7b:free",
    "Toppy M 7B (free)": "undi95/toppy-m-7b:free",
    "Cinematika 7B (alpha) (free)": "openrouter/cinematika-7b:free",
    "Google: Gemma 7B (free)": "google/gemma-7b-it:free",
  };
  return Object.keys(modelData).map((name) => ({ name, id: modelData[name] }));
}