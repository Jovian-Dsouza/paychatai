import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { getChatResponse } from "../../chatApi";

/*
curl -H "Authorization: Bearer 1234"  \
  -X POST "http://localhost:3000/api/chat/45a37359-5f6e-4e88-bdd8-800dff04d198" \
  -H 'Content-Type: application/json' \
  -d '{
  "messages": [
      {
          "role": "user",
          "content": "tell me a joke"
      }
  ]
}'
*/
export async function POST(
  req: Request,
  { params }: { params: { modelId: string } }
) {
  const useHeader = headers(req);
  const authToken = (useHeader.get("authorization") || "").split("Bearer ")[1];

  if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
    try {
      const modelId = params.modelId;
      const body = await req.json();
      const { messages } = body;

      // Fetch model information from the database using Prisma
      const modelInfo = await prisma.modelData.findUnique({
        where: { model_id: modelId },
      });
      //   console.log("modelInfo", modelInfo)

      // Check if model information exists and base model is defined
      if (!modelInfo || !modelInfo.base_model) {
        return res
          .status(404)
          .json({ error: "Base model not found for the specified model_id" });
      }

      if (modelInfo.prompt) {
        // Insert prompt message if available, at the start of message array
        messages.unshift({ role: "system", content: modelInfo.prompt });
      }

      //   console.log("messages: ", messages);
      const result = await getChatResponse(modelInfo.base_model, messages);

      return Response.json({ modelId, result });
    } catch (error) {
      console.error("Error creating model data:", error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  return Response.json({ error: "Invalid Auth Token" }, { status: 401 });
}
