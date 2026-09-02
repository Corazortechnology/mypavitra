import type { CountryCode } from "@puja/types";
import { COUNTRIES, DEFAULT_COUNTRY, URL_PREFIX_TO_COUNTRY } from "@puja/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COUNTRY_COOKIE = "puja_country";
const SKIP_PREFIXES = ["/admin", "/api", "/_next", "/favicon", "/sitemap", "/robots"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  let countryCode: CountryCode = DEFAULT_COUNTRY;
  let rewritePath = pathname;

  if (firstSegment && URL_PREFIX_TO_COUNTRY[firstSegment]) {
    countryCode = URL_PREFIX_TO_COUNTRY[firstSegment];
    rewritePath = "/" + segments.slice(1).join("/");
    if (rewritePath === "/") rewritePath = "/";
  }

  const cookieCountry = request.cookies.get(COUNTRY_COOKIE)?.value as CountryCode | undefined;
  if (!firstSegment && cookieCountry && COUNTRIES[cookieCountry]) {
    countryCode = cookieCountry;
  }

  const response = NextResponse.rewrite(new URL(rewritePath || "/", request.url));

  response.headers.set("x-country-code", countryCode);
  response.headers.set("x-url-prefix", COUNTRIES[countryCode].urlPrefix ?? "");
  response.cookies.set(COUNTRY_COOKIE, countryCode, {
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
