import { headers } from "next/headers";
import type { CountryCode } from "@puja/types";
import { COUNTRIES, DEFAULT_COUNTRY } from "@puja/config";

export async function getRequestCountry(): Promise<CountryCode> {
  const headersList = await headers();
  const code = headersList.get("x-country-code") as CountryCode | null;
  if (code && COUNTRIES[code]) return code;
  return DEFAULT_COUNTRY;
}

export async function getCountryConfig() {
  const code = await getRequestCountry();
  return COUNTRIES[code];
}
