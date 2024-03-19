import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export async function middleware(request) {
  const open = await get("open");
  const redirects = await get("redirects");
  if (!open) {
    return NextResponse.json("closed");
  }
  const url = request.nextUrl;
  for (const redirect of redirects) {
    if (redirect.source === url.pathname) {
      url.pathname = redirect.destination;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
