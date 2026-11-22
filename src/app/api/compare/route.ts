import { NextRequest } from "next/server";
import { apiSuccess, apiError, handleApiError } from "@/lib/api/response";
import { compareQuerySchema } from "@/lib/api/schemas";
import { fetchCompareModels } from "@/lib/api/data-access";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const { slugs } = compareQuerySchema.parse(searchParams);
    const result = await fetchCompareModels(slugs);

    if (!result) {
      return apiError("None of the specified models could be found", "NOT_FOUND", 404);
    }

    return apiSuccess(result);
  } catch (err) {
    return handleApiError(err);
  }
}
