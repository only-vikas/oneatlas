import { NextRequest } from "next/server";
import { apiSuccess, handleApiError } from "@/lib/api/response";
import { modelsQuerySchema } from "@/lib/api/schemas";
import { fetchModels } from "@/lib/api/data-access";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const query = modelsQuerySchema.parse(searchParams);
    const result = await fetchModels(query);
    return apiSuccess(result);
  } catch (err) {
    return handleApiError(err);
  }
}
