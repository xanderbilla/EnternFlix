import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/env/env";
import { PROXY_CACHE } from "@/constants/common";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;

  const upstreamPath = path.join("/");
  const search = request.nextUrl.search;
  const upstreamUrl = `${config.customApi.baseUrl}/${upstreamPath}${search}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    PROXY_CACHE.UPSTREAM_TIMEOUT_MS,
  );

  try {
    const upstream = await fetch(upstreamUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      next: { revalidate: PROXY_CACHE.MAX_AGE_S },
    });

    clearTimeout(timeoutId);

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream returned an error", status: upstream.status },
        { status: upstream.status },
      );
    }

    const body: unknown = await upstream.json();

    return NextResponse.json(body, {
      status: 200,
      headers: {
        "Cache-Control": `public, s-maxage=${PROXY_CACHE.MAX_AGE_S}, stale-while-revalidate=${PROXY_CACHE.STALE_WHILE_REVALIDATE_S}`,
      },
    });
  } catch (err) {
    clearTimeout(timeoutId);

    const isTimeout = err instanceof Error && err.name === "AbortError";

    return NextResponse.json(
      { error: isTimeout ? "Upstream timed out" : "Proxy error" },
      { status: isTimeout ? 504 : 502 },
    );
  }
}

export function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
