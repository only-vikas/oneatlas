import { NextRequest } from "next/server";
import { apiSuccess, apiError, handleApiError } from "@/lib/api/response";
import { slugParamSchema } from "@/lib/api/schemas";
import { fetchModelBySlug } from "@/lib/api/data-access";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const rawParams = await params;
    const { slug } = slugParamSchema.parse(rawParams);
    const model = await fetchModelBySlug(slug);

    if (!model) {
      return apiError(`Model '${slug}' not found`, "NOT_FOUND", 404);
    }

    return apiSuccess(model);
  } catch (err) {
    return handleApiError(err);
  }
}
