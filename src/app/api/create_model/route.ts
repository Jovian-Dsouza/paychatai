import { headers } from "next/headers";
import { insertModelData } from "../modelData";
/*
curl -H "Authorization: Bearer 1234"  \
  -X POST "localhost:3000/api/create_model" \
  -H 'Content-Type: application/json' \
  -d '{
  "model_id": "your_model_id",
  "model_did": "your_model_did",
  "base_model": "your_base_model_value",
  "prompt": "your_prompt_value"
}'
*/
export async function POST(request: Request) {
  const useHeader = headers(request);
  const authToken = (useHeader.get("authorization") || "")
    .split("Bearer ")
    .at(1);
  if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
    const res = await request.json();
    return Response.json(res);
  }
  return Response.json({error: "Invalid Auth Token"}, {status: 401})
  
}
