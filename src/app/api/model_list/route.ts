import { listModels } from "../chatApi";

export async function GET() {
  const modelList = listModels()
  return Response.json({ model_list: modelList });
}
