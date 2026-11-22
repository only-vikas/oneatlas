import { NextRequest } from "next/server";
import { apiSuccess, handleApiError } from "@/lib/api/response";
import { directoryQuerySchema } from "@/lib/api/schemas";
import { fetchDirectory } from "@/lib/api/data-access";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const { type } = directoryQuerySchema.parse(searchParams);
    const result = await fetchDirectory(type);
    return apiSuccess(result);
  } catch (err) {
    return handleApiError(err);
  }
}
