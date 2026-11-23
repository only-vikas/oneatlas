import { NextRequest } from "next/server";
import { apiSuccess, handleApiError } from "@/lib/api/response";
import { fetchMarketPulse } from "@/lib/api/data-access";

export async function GET(_req: NextRequest) {
  try {
    const pulse = await fetchMarketPulse();
    return apiSuccess(pulse);
  } catch (err) {
    return handleApiError(err);
  }
}
