import { NextRequest } from "next/server";
import { apiSuccess, apiError, handleApiError } from "@/lib/api/response";
import { slugParamSchema } from "@/lib/api/schemas";
import { fetchModelProviders } from "@/lib/api/data-access";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const rawParams = await params;
    const { slug } = slugParamSchema.parse(rawParams);
    const result = await fetchModelProviders(slug);

    if (!result) {
      return apiError(`Model '${slug}' not found`, "NOT_FOUND", 404);
    }

    return apiSuccess(result);
  } catch (err) {
    return handleApiError(err);
  }
}
