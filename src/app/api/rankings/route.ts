import { NextRequest } from "next/server";
import { apiSuccess, handleApiError } from "@/lib/api/response";
import { rankingsQuerySchema } from "@/lib/api/schemas";
import { fetchRankings } from "@/lib/api/data-access";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const query = rankingsQuerySchema.parse(searchParams);
    const result = await fetchRankings(query);
    return apiSuccess(result);
  } catch (err) {
    return handleApiError(err);
  }
}
