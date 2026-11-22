import { NextRequest } from "next/server";
import { apiSuccess, handleApiError } from "@/lib/api/response";
import { searchQuerySchema } from "@/lib/api/schemas";
import { searchAll } from "@/lib/api/data-access";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const { q } = searchQuerySchema.parse(searchParams);
    const result = await searchAll(q);
    return apiSuccess(result);
  } catch (err) {
    return handleApiError(err);
  }
}
