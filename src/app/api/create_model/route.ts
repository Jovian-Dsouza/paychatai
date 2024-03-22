import { headers } from "next/headers";
import prisma from "@/lib/prisma";

/*
curl -H "Authorization: Bearer 1234"  \
  -X POST "localhost:3000/api/create_model" \
  -H 'Content-Type: application/json' \
  -d '{
  "model_id": "your_model_id",
  "model_did": "your_model_did",
  "base_model": "your_base_model_value",
  "prompt": "your_prompt_value",
  "name": "Your Model Name",
  "base_model_provider": "Provider Name",
  "subscription_id": "Your Subscription ID",
  "description": "description"
}'
*/
export async function POST(req: Request) {
  const useHeader = headers(req);
  const authToken = (useHeader.get("authorization") || "").split("Bearer ")[1];

  if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
    try {
      const body = await req.json();

      // Check if all mandatory columns are present
      const mandatoryColumns = [
        "model_id",
        "model_did",
        "base_model",
        "prompt",
        "description",
        "name",
        "base_model_provider",
        "subscription_id",
      ];
      const hasMandatoryColumns = mandatoryColumns.every((col) =>
        body.hasOwnProperty(col)
      );

      if (!hasMandatoryColumns) {
        return Response.json({ error: "Missing mandatory columns"}, {status: 400});
      }

      // let imageId;
      // // Insert into Image table if imageData is provided
      // if (body.imageData) {
      //   const imageData = body.imageData; // Assuming you're passing imageData in the request body
      //   const image = await prisma.image.create({
      //     data: {
      //       imageData: imageData,
      //     },
      //   });
      //   imageId = image.id;
      // }

      // Insert into ModelData table
      const modelData = await prisma.modelData.create({
        data: {
          model_id: body.model_id,
          model_did: body.model_did,
          base_model: body.base_model,
          name: body.name,
          prompt: body.prompt,
          description: body.description,
          base_model_provider: body.base_model_provider,
          base_model_api: body.base_model_api,
          max_output_tokens: body.max_output_tokens,
          welcome_message: body.welcome_message,
          avatar_image_id: body.avatar_image_id,
          integration: body.integration,
          api_description: body.api_description,
          subscription_id: body.subscription_id,
          price: body.price,
          credits: body.credits,
          duration: body.duration,
          charge_type: body.charge_type,
          max_credits: body.max_credits,
          min_credits: body.min_credits,
        },
      });

      return Response.json({
        message: "Model data created successfully", modelData: modelData
      }, {status: 201});
    } catch (error) {
      console.error("Error creating model data:", error);
      return Response.json({ error: "Internal server error" }, { status: 500});
    }
  }

  return Response.json({ error: "Invalid Auth Token" }, {status: 401});
}
