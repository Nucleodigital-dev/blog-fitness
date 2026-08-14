import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const retiredArticlePaths = new Set([
  "/blog/por-que-voce-desiste-da-dieta-estrategias-para-manter-a-constancia",
]);

export async function proxy(request: NextRequest) {
  if (retiredArticlePaths.has(request.nextUrl.pathname)) {
    return new NextResponse(null, { status: 410 });
  }

  // Refresh sessions and protect the administrative area.
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
