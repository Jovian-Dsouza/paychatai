import { headers } from "next/headers";
import { getChatResponse } from "../chatApi";

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
) {
  const useHeader = headers(req);
  const authToken = (useHeader.get("authorization") || "").split("Bearer ")[1];

  if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
    try {
      const body = await req.json();
      const { messages, prompt, base_model } = body;

      if (!base_model) {
        return Response.json(
          {
            error: "Base model not found for the specified model_id",
          },
          { status: 404 }
        );
      }
      if (prompt) {
        // Insert prompt message if available, at the start of message array
        messages.unshift({ role: "system", content: prompt });
      }

      //   console.log("messages: ", messages);
      const result = await getChatResponse(base_model, messages);

      return Response.json({ result });
    } catch (error) {
      console.error("Error creating model data:", error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  return Response.json({ error: "Invalid Auth Token" }, { status: 401 });
}
