import { headers } from "next/headers";
import prisma from "@/lib/prisma";

/*
curl -H "Authorization: Bearer 1234"  \
  -X POST "localhost:3000/api/get_model_did" \
  -H 'Content-Type: application/json' \
   -d '{
        "model_id":  "45a37359-5f6e-4e88-bdd8-800dff04d198"
   }'
*/
export async function POST(req: Request) {
  const useHeader = headers(req);
  const authToken = (useHeader.get("authorization") || "").split("Bearer ")[1];

  if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
    try {
      const body = await req.json();
      const { model_id } = body;

      const modelInfo = await prisma.modelData.findUnique({
        where: { model_id },
      });

      if (!modelInfo || !modelInfo.model_did) {
        return Response.json({ error: "Model ID not found or model_did not defined" }, {status: 404});
      }
      
      return Response.json(
        {
          model_id,
          model_did: modelInfo.model_did,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating model data:", error);
      return Response.json({ error: "Internal server error" }, { status: 500});
    }
  }

  return Response.json({ error: "Invalid Auth Token" }, {status: 401});
}
