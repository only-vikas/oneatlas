import { NextRequest } from "next/server";
import { apiSuccess, handleApiError } from "@/lib/api/response";
import { paretoQuerySchema } from "@/lib/api/schemas";
import { fetchPareto } from "@/lib/api/data-access";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const query = paretoQuerySchema.parse(searchParams);
    const result = await fetchPareto(query);
    return apiSuccess(result);
  } catch (err) {
    return handleApiError(err);
  }
}
